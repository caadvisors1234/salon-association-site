"use server";

import { z } from "zod";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/schema";
import { 
  checkRateLimit, 
  getClientIP, 
  validateContactFormSecurity,
  sanitizeInput
} from "@/lib/security";
import {
  getAdminHTMLTemplate,
  getAutoReplyHTMLTemplate,
  getAdminTextTemplate,
  getAutoReplyTextTemplate,
  getEmailConfigs,
  replaceSubjectTemplate,
  type EmailTemplateData
} from "@/lib/email-templates";

export async function sendEmail(formData: z.infer<typeof contactFormSchema>) {
  // 環境変数チェック
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

  // レート制限チェック
  const clientIP = await getClientIP();
  const rateLimitResult = checkRateLimit(clientIP);
  
  if (!rateLimitResult.allowed) {
    const resetTime = rateLimitResult.resetTime;
    const resetDate = resetTime ? new Date(resetTime).toLocaleTimeString('ja-JP') : '後ほど';
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return {
      success: false,
      error: `送信回数が制限を超えています。${resetDate}以降に再度お試しください。`,
    };
  }

  // 基本的なバリデーション
  const result = contactFormSchema.safeParse(formData);
  if (!result.success) {
    return { success: false, error: result.error.format() };
  }

  // セキュリティ検証
  const securityValidation = validateContactFormSecurity(result.data);
  if (!securityValidation.isValid) {
    console.warn(`Security validation failed for IP: ${clientIP}`, securityValidation.errors);
    return {
      success: false,
      error: securityValidation.errors[0] || "入力内容に問題があります。",
    };
  }

  // データをサニタイズ
  const sanitizedData = {
    company: result.data.company ? sanitizeInput(result.data.company) : '',
    name: sanitizeInput(result.data.name),
    email: sanitizeInput(result.data.email),
    phone: result.data.phone ? sanitizeInput(result.data.phone) : '',
    message: sanitizeInput(result.data.message)
  };

  // テンプレートデータを準備
  const templateData: EmailTemplateData = {
    ...sanitizedData,
    clientIP,
    timestamp: new Date().toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  };

  const resend = new Resend(process.env.RESEND_API_KEY);
  const emailConfigs = getEmailConfigs();

  try {
    // セキュリティログ記録（個人情報は除く）
    console.info(`Email sending attempt from IP: ${clientIP}, domain: ${sanitizedData.email.split('@')[1] || 'unknown'}`);

    // 1. 管理者向け通知メール（HTMLとテキスト）
    const adminSubject = replaceSubjectTemplate(emailConfigs.adminNotification.subject, templateData);
    const adminHtml = getAdminHTMLTemplate(templateData);
    const adminText = getAdminTextTemplate(templateData);

    const adminEmailData = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: emailConfigs.adminNotification.recipients,
      cc: emailConfigs.adminNotification.cc,
      bcc: emailConfigs.adminNotification.bcc,
      subject: adminSubject,
      html: adminHtml,
      text: adminText,
    });

    console.info(`Admin notification sent successfully to ${emailConfigs.adminNotification.recipients.join(', ')}`);

    // 2. 自動返信メール（HTMLとテキスト）
    const autoReplySubject = emailConfigs.autoReply.subject;
    const autoReplyHtml = getAutoReplyHTMLTemplate(templateData);
    const autoReplyText = getAutoReplyTextTemplate(templateData);

    const autoReplyData = await resend.emails.send({
      from: emailConfigs.autoReply.fromName 
        ? `${emailConfigs.autoReply.fromName} <${process.env.RESEND_FROM_EMAIL}>`
        : process.env.RESEND_FROM_EMAIL,
      to: sanitizedData.email,
      replyTo: emailConfigs.autoReply.replyTo || process.env.RESEND_FROM_EMAIL,
      subject: autoReplySubject,
      html: autoReplyHtml,
      text: autoReplyText,
    });

    console.info(`Auto-reply sent successfully to ${sanitizedData.email}`);

    return { 
      success: true, 
      data: { 
        admin: adminEmailData,
        autoReply: autoReplyData
      }
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error(`Email sending failed for IP: ${clientIP}`, error);
    
    // Resend API特有のエラーハンドリング
    if (errorMessage.includes('rate limit')) {
      return { 
        success: false, 
        error: "現在アクセスが集中しています。しばらく待ってから再度お試しください。" 
      };
    }
    
    if (errorMessage.includes('invalid')) {
      return { 
        success: false, 
        error: "入力内容に不正な値が含まれています。" 
      };
    }

    if (errorMessage.includes('authentication')) {
      console.error('Resend authentication failed');
      return { 
        success: false, 
        error: "メール送信サービスの認証に失敗しました。しばらく待ってから再度お試しください。" 
      };
    }

    return { 
      success: false, 
      error: "メール送信中にエラーが発生しました。しばらく待ってから再度お試しください。" 
    };
  }
} 