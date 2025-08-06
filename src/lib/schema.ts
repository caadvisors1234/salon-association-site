import { z } from "zod";

export const contactFormSchema = z.object({
  company: z.string().optional(),
  name: z.string().min(1, { message: "氏名は必須です。" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください。" }),
  phone: z.string().optional(),
  message: z.string().min(1, { message: "お問い合わせ内容は必須です。" }),
}); 