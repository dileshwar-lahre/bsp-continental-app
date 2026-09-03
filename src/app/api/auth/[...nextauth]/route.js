import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

// 📧 Helper Function: Send One-Time Welcome & Terms PDF Email
async function sendWelcomeTermsEmail(email, name) {
  try {
    if (!email) return;
    const cleanEmail = email.toLowerCase().trim();

    await connectDB();
    let user = await User.findOne({ email: cleanEmail });

    // One-Time Trigger Guard
    if (user && user.hasReceivedTermsPdf) {
      console.log(`ℹ️ Terms PDF already delivered to ${cleanEmail}. Skipping duplicate.`);
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "bspcontinental01@gmail.com",
        pass: process.env.EMAIL_PASS || "ivxndxtxbvcamckd",
      },
    });

    const pdfPath = path.join(process.cwd(), "public", "Offer of Terms.pdf");
    const attachments = [];

    if (fs.existsSync(pdfPath)) {
      attachments.push({
        filename: "BSP_Continental_Offer_of_Terms.pdf",
        path: pdfPath,
      });
      console.log("📎 Attached Offer of Terms.pdf successfully!");
    } else {
      console.warn("⚠️ Offer of Terms.pdf not found in public directory:", pdfPath);
    }

    const mailOptions = {
      from: `"BSP CONTINENTAL PVT LTD" <${process.env.EMAIL_USER || "bspcontinental01@gmail.com"}>`,
      to: cleanEmail,
      subject: "Welcome to BSP CONTINENTAL PVT LTD | Terms & Policy Agreement Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #387515;">
            <h1 style="color: #387515; margin: 0; font-size: 22px; text-transform: uppercase;">BSP CONTINENTAL PVT LTD</h1>
            <p style="color: #64748b; font-size: 12px; margin-top: 4px; letter-spacing: 1px;">Secure Finance. Compliant Properties. Sustainable Growth.</p>
          </div>
          
          <div style="padding: 20px 0;">
            <p style="font-size: 15px; color: #1e293b;">Hello <strong>${name || "Valued Customer"}</strong>,</p>
            <p style="font-size: 13px; color: #475569; line-height: 1.6;">
              Aapka account <strong>BSP Continental Pvt. Ltd.</strong> ke portal par successfully connect ho chuka hai.
            </p>
            <p style="font-size: 13px; color: #475569; line-height: 1.6;">
              Aapne hamare platform ke <strong>Terms & Conditions</strong> aur <strong>Privacy Policy</strong> ko acknowledge aur accept kiya hai.
            </p>
            <p style="font-size: 13px; color: #475569; line-height: 1.6;">
              📎 <em>Aapke reference ke liye hamara official <strong>Offer of Terms</strong> document is email ke saath attach kar diya gaya hai.</em>
            </p>
          </div>

          <div style="background-color: #f8fafc; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <p style="margin: 0;"><strong>Office Address:</strong> Shop No OAS 4, Super Market Complex, 2nd Floor, Agrasen Chowk, Bilaspur (C.G.)</p>
            <p style="margin: 5px 0 0 0;"><strong>Helpline:</strong> +91 95750 59137 | <strong>Email:</strong> digitalbsp5@gmail.com</p>
          </div>

          <div style="text-align: center; margin-top: 25px; font-size: 11px; color: #94a3b8;">
            © ${new Date().getFullYear()} BSP CONTINENTAL PVT LTD. All Rights Reserved.
          </div>
        </div>
      `,
      attachments: attachments,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome Email Sent to: ${cleanEmail}`);

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
    console.error("❌ Email trigger error in NextAuth:", err.message);
  }
}

export const authOptions = {
  providers: [
    // 🌐 1. Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // 📋 2. Credentials Login (Email + Password)
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
      }
    })
  ],
  callbacks: {
    // 🔗 SignIn Callback: Sync Google Users & Trigger Email
    async signIn({ user, account }) {
      try {
        await connectDB();
        const cleanEmail = user.email.toLowerCase().trim();

        if (account?.provider === "google") {
          let existingUser = await User.findOne({ email: cleanEmail });
          
          if (!existingUser) {
            existingUser = await User.create({
              name: user.name || "User",
              email: cleanEmail,
              image: user.image || "",
              role: "user",
              hasReceivedTermsPdf: false,
            });
          }
        }

        // Non-blocking welcome email execution
        sendWelcomeTermsEmail(cleanEmail, user.name);
      } catch (err) {
        console.error("Google user DB save error:", err);
      }
      return true;
    },

    // 🔑 JWT Token Sync
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      } else if (token?.email) {
        try {
          await connectDB();
          const dbUser = await User.findOne({ email: token.email.toLowerCase().trim() });
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

    // 👤 Session Payload
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },

    // 🚀 Direct Dashboard Redirect Rule
    async redirect({ url, baseUrl }) {
      // Relative path agar kisi specific protected page ke liye ho
      if (url.startsWith("/")) {
        return url === "/" ? `${baseUrl}/dashboard` : `${baseUrl}${url}`;
      }
      // Same domain URL verification
      else if (new URL(url).origin === baseUrl) {
        const parsed = new URL(url);
        return parsed.pathname === "/" ? `${baseUrl}/dashboard` : url;
      }
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    // ⏳ 30 Days Persistent Cookie (bina logout kare session valid rahega)
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };