import { Resend } from "resend";
import { config } from "../config";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const resend = new Resend(config.resendApiKey);

export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: config.emailSendingDomain,
      ...options
    });
    if (error) {
      console.error(error.message || "Failed to send message");
      return false;
    }

    return true;
  } catch (err) {
    console.error("Email service unreachable:", err);
    return false;
  }
}
