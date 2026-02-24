import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { config } from "../../config";
import { db } from "../../db";
import { accounts, sessions, users, verifications } from "../../db/schema";
import { resend } from "../../lib/resend";

export const auth = betterAuth({
  baseURL: config.betterAuthUrl,
  basePath: "/api/v1/auth",
  trustedOrigins: [config.betterAuthUrl],
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
      await resend.emails.send({
        from: config.emailSendingDomain,
        to: user.email,
        subject: "Reset your password",
        html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`
      });
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: config.emailSendingDomain,
        to: user.email,
        subject: "Verify your email address",
        html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`
      });
    }
  },
  user: {
    additionalFields: {
      avatar: { type: "string" },
      bio: { type: "string" },
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
  }
});

export type Auth = typeof auth;
