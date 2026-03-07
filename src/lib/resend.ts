import { Resend } from "resend";
import { EMAIL_SENDING_DOMAIN, RESEND_API_KEY } from "../config";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

const resend = new Resend(RESEND_API_KEY);

export const sendEmail = async (options: SendEmailOptions): Promise<boolean> => {
  try {
    const { error } = await resend.emails.send({
      from: EMAIL_SENDING_DOMAIN,
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
};
