import EmailTemplate from "@/components/EmailTemplate/EmailTemplate";
import { Resend } from "resend";
import { nullable } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (emailInfo) => {
  if (!emailInfo) return nullable;

  const response = await Promise.allSettled(
    emailInfo.map(async (data) => {
      if (data.to && data.subject && data.message) {
        const to = data.to;
        const subject = data.subject;
        const message = data.message;

        const sentInfo = await resend.emails.send({
          from: "Study Mate <no-reply@resend.dev>",
          to: to,
          subject: subject,
          react: EmailTemplate({ message }),
        });
        return sentInfo;
      } else {
        const rejectedPromise = new Promise((reject) => {
          return reject(
            new Error(
              `Couldn't send email, please check the ${JSON.stringify(data)}`
            )
          );
        });
        return rejectedPromise;
      }
    })
  );
  return response;
};
