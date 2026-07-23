import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";         // ✅ Points to src/lib/db.js
import User from "@/model/User";          // ✅ Points to src/model/User.js
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    // 🌐 1. GOOGLE PROVIDER
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // 📋 2. MANUAL LOGIN (EMAIL + PASSWORD)
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await connectDB();
        
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email aur Password dono bharo!");
        }

        const user = await User.findOne({ email: credentials.email.toLowerCase() });
        if (!user) {
          throw new Error("Is email se koi account nahi mila! Pehle Sign Up karein.");
        }

        if (!user.password) {
          throw new Error("Aapne Google se account banaya tha. Kripya 'Continue with Google' use karein.");
        }

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Galat password! Kripya dobara check karein.");
        }

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
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email.toLowerCase() });
          
          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email.toLowerCase(),
              image: user.image,
              role: "user",
            });
          }
        } catch (err) {
          console.error("Google user DB save error:", err);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      } else if (token?.email) {
        try {
          await connectDB();
          const dbUser = await User.findOne({ email: token.email.toLowerCase() });
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.role = dbUser.role || "user";
          }
        } catch (e) {
          console.error("JWT sync error:", e);
        }
      }
      return token;
    },
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
    error: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };