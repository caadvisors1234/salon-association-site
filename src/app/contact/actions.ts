"use server";

import { z } from "zod";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/schema";

export async function sendEmail(formData: z.infer<typeof contactFormSchema>) {
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.RESEND_FROM_EMAIL ||
    !process.env.CONTACT_FORM_TO_EMAIL
  ) {
    console.error(
      "ERROR: Email sending environment variables are not set."
    );
    return {
      success: false,
      error: "サーバー設定にエラーがあります。管理者にお問い合わせください。",
    };
  }

  const result = contactFormSchema.safeParse(formData);

  if (!result.success) {
    return { success: false, error: result.error.format() };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.CONTACT_FORM_TO_EMAIL,
      subject: 'ウェブサイトからのお問い合わせ',
      text: `会社名: ${result.data.company || '未入力'}\n氏名: ${result.data.name}\nメールアドレス: ${result.data.email}\n電話番号: ${result.data.phone || '未入力'}\n\nメッセージ:\n${result.data.message}`,
    });
    return { success: true, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error(error);
    return { success: false, error: errorMessage };
  }
} 