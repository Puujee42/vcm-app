import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  // Database
  MONGODB_URI: z.string().url("MONGODB_URI must be a valid connection string"),

  // Auth
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET must be at least 32 characters long"),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),

  // LiveKit
  LIVEKIT_API_KEY: z.string().min(1, "LIVEKIT_API_KEY is required"),
  LIVEKIT_API_SECRET: z.string().min(1, "LIVEKIT_API_SECRET is required"),

  // Cloudinary
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),
  
  // Gmail
  GMAIL_PASS: z.string().min(1, "GMAIL_PASS is required"),
  GMAIL_USER: z.string().email("GMAIL_USER must be a valid email"),

  // QPay
  QPAY_USERNAME: z.string().min(1, "QPAY_USERNAME is required").optional(),
  QPAY_PASSWORD: z.string().min(1, "QPAY_PASSWORD is required").optional(),
  QPAY_BASE_URL: z.string().url().optional(),
});

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Invalid or missing environment variables:", JSON.stringify(parsed.error.format(), null, 2));
  throw new Error("Invalid environment variables. Application failed to boot securely.");
}

export const env = parsed.data;

export function requireNextAuthSecret() {
  if (env.NODE_ENV !== "production") {
    return env.NEXTAUTH_SECRET ?? "temporary-dev-secret-change-me-temporary-dev-secret-change-me"; // Note: Needs to be >=32 chars now
  }
  if (!env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET is required in production");
  }
  return env.NEXTAUTH_SECRET;
}
