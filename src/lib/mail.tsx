import { Resend } from "resend";

import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendEmail(
  from: string,
  to: string,
  subject: string,
  body: React.ReactNode
) {
  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    react: <>{body}</>,
  });

  if (error) {
    throw error;
  }
}
