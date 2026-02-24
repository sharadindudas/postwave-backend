import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../db";
import { config } from "../../config";
import { accounts, sessions, users, verifications } from "../../db/schema";
import { resend } from "../../lib/resend";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications
    }
  }),
  basePath: "/api/v1/auth",
  baseURL: config.betterAuthUrl,
  secret: config.betterAuthSecret,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Postwave@sharadindudas.com",
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
