import "dotenv/config";

const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
};

export const config = {
  nodeEnv: requireEnv("NODE_ENV"),
  port: process.env.PORT || 3000,
  frontendUrl: requireEnv("FRONTEND_URL"),
  databaseUrl: requireEnv("DATABASE_URL"),
  betterAuthSecret: requireEnv("BETTER_AUTH_SECRET"),
  betterAuthUrl: requireEnv("BETTER_AUTH_URL"),
  upstashRedisUrl: requireEnv("UPSTASH_REDIS_REST_URL"),
  upstashRedisToken: requireEnv("UPSTASH_REDIS_REST_TOKEN"),
  resendApiKey: requireEnv("RESEND_API_KEY"),
  emailSendingDomain: requireEnv("EMAIL_SENDING_DOMAIN"),
  cloudinaryCloudName: requireEnv("CLOUDINARY_CLOUD_NAME"),
  cloudinaryApiKey: requireEnv("CLOUDINARY_API_KEY"),
  cloudinaryApiSecret: requireEnv("CLOUDINARY_API_SECRET")
};
