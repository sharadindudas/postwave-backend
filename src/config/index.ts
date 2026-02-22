import "dotenv/config";

export const PORT = process.env.PORT!,
  DATABASE_URL = process.env.DATABASE_URL!,
  BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET!,
  BETTER_AUTH_URL = process.env.BETTER_AUTH_URL!,
  RESEND_API_KEY = process.env.RESEND_API_KEY!,
  UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL!,
  UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;
