import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

// 📧 Background Safe Email Helper
async function sendWelcomeTermsEmail(email, name) {
  try {
    if (!email) return;
    const cleanEmail = email.toLowerCase().trim();

    await connectDB();
    let user = await User.findOne({ email: cleanEmail });

    if (user?.hasReceivedTermsPdf) return;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "bspcontinental01@gmail.com",
        pass: process.env.EMAIL_PASS || "ivxndxtxbvcamckd",
      },
    });

    const attachments = [];
    try {
      const pdfPath = path.join(process.cwd(), "public", "Offer of Terms.pdf");
      if (fs.existsSync(pdfPath)) {
        attachments.push({
          filename: "BSP_Continental_Offer_of_Terms.pdf",
          path: pdfPath,
        });
      }
    } catch (e) {
      console.warn("⚠️ PDF attachment skipped (Serverless FS check):", e.message);
    }

    const mailOptions = {
      from: `"BSP CONTINENTAL PVT LTD" <${process.env.EMAIL_USER || "bspcontinental01@gmail.com"}>`,
      to: cleanEmail,
      subject: "Welcome to BSP CONTINENTAL PVT LTD | Terms & Policy Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #217044;">
            <h1 style="color: #217044; margin: 0; font-size: 22px; text-transform: uppercase;">BSP CONTINENTAL PVT LTD</h1>
            <p style="color: #64748b; font-size: 12px; margin-top: 4px;">Secure Finance. Compliant Properties.</p>
          </div>
          <div style="padding: 20px 0;">
            <p style="font-size: 15px; color: #1e293b;">Hello <strong>${name || "Valued Client"}</strong>,</p>
            <p style="font-size: 13px; color: #475569; line-height: 1.6;">Aapka account BSP Continental portal par successfully authenticate ho chuka hai.</p>
          </div>
        </div>
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    if (user) {
      user.hasReceivedTermsPdf = true;
      await user.save();
    } else {
      await User.findOneAndUpdate(
        { email: cleanEmail },
        { hasReceivedTermsPdf: true },
        { upsert: false }
      );
    }
  } catch (err) {
    console.error("Non-blocking email delivery notice:", err.message);
  }
}

const isProduction = process.env.NODE_ENV === "production";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email aur Password dono bharo!");
        }

        const user = await User.findOne({ email: credentials.email.toLowerCase().trim() });
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
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        await connectDB();
        const cleanEmail = user.email.toLowerCase().trim();

        if (account?.provider === "google") {
          const existingUser = await User.findOne({ email: cleanEmail });
          if (!existingUser) {
            await User.create({
              name: user.name || "User",
              email: cleanEmail,
              image: user.image || "",
              role: "user",
              hasReceivedTermsPdf: false,
            });
          }
        }

        // Email execution non-blocking async
        sendWelcomeTermsEmail(cleanEmail, user.name).catch(() => {});
      } catch (err) {
        console.error("SignIn callback error:", err);
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return url === "/" ? `${baseUrl}/dashboard` : `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        const parsed = new URL(url);
        return parsed.pathname === "/" ? `${baseUrl}/dashboard` : url;
      }
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  cookies: {
    sessionToken: {
      name: isProduction ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProduction,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };