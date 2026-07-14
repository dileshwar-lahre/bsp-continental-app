import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    // 🌐 1. GOOGLE PROVIDER LAYER
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // 📋 2. MANUAL LOGIN (EMAIL + PASSWORD) LAYER
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await connectDB();
        
        // Check karo user database me hai ya nahi
        const user = await User.findOne({ email: credentials.email.toLowerCase() });
        if (!user) {
          throw new Error("Is email se koi account nahi mila! Pehle Sign Up karein.");
        }

        // AGAR USER GOOGLE SE REGISTERED THA (Toh uska password nahi hoga DB me)
        if (!user.password) {
          throw new Error("Aapne Google se account banaya tha. Kripya 'Continue with Google' use karein.");
        }

        // Password matching verify karo
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Galat password! Kripya dobara check karein.");
        }

        // Sab sahi hai toh user data token ke liye bhej do
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        };
      }
    })
  ],
  callbacks: {
    // Jab bhi koi login karega (Manual ya Google), ye callback check hoga
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await connectDB();
        
        // Check karo ki is email ka user pehle se hai kya
        const existingUser = await User.findOne({ email: user.email.toLowerCase() });
        
        if (!existingUser) {
          // Naya user hai toh database me save kar do (Bina password ke)
          await User.create({
            name: user.name,
            email: user.email.toLowerCase(),
            image: user.image,
            isEmailVerified: true,
            role: "user", // Default role
          });
        }
      }
      return true;
    },
    
    // Token me user details map karne ke liye (Admin/User segregation ke liye)
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    
    // Frontend ko session data pass karne ke liye
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login', // Kuch bhi glitch ho to wapas login screen par message dikhao
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };