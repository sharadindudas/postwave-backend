import { betterAuth } from "better-auth";
import { config } from "../config";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { users, sessions, accounts, verifications } from "../db/schema";
import { sendEmail } from "./resend";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: config.betterAuthUrl,
  basePath: "/api/v1/auth",
  trustedOrigins: [config.frontendUrl],
  secret: config.betterAuthSecret,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications
    }
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      const sent = await sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`
      });
      if (!sent) {
        console.error(`Password reset email failed for ${user.email}`);
        throw new Error("Failed to send password reset email. Please try again.");
      }
    },
    resetPasswordTokenExpiresIn: 900
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      const sent = await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`
      });
      if (!sent) {
        console.error(`Verification email failed for ${user.email}`);
      }
    }
  },
  user: {
    additionalFields: {
      bio: { type: "string" },
      imagePublicId: { type: "string" },
      x: { type: "string" },
      facebook: { type: "string" },
      linkedin: { type: "string" },
      instagram: { type: "string" },
      youtube: { type: "string" },
      threads: { type: "string" },
      tiktok: { type: "string" }
    }
  },
  advanced: {
    database: {
      generateId: () => crypto.randomUUID()
    }
  },
  plugins: [openAPI()]
});

export type Auth = typeof auth;
