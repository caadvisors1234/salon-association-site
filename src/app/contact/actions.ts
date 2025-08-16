"use server";

import { z } from "zod";
import nodemailer from "nodemailer";
import { headers } from "next/headers";
import { contactFormSchema } from "@/lib/schema";
import { SITE_NAME } from "@/lib/constants";
import { 
  validateEnvVars, 
  secureContactFormSchema, 
  isEmailSafe, 
  isInputSafeForEmail,
  type ValidatedEnvVars 
} from "@/lib/validation";
import { 
  getContactFormRateLimit, 
  getClientIP, 
  createRateLimitHeaders,
  type RateLimitResult 
} from "@/lib/rate-limit";
import { 
  sanitizeContactFormData, 
  validateSanitizedData
} from "@/lib/sanitize";

/**
 * Error types for structured logging and error handling
 */
enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  RATE_LIMIT = 'RATE_LIMIT_ERROR',
  ENVIRONMENT = 'ENVIRONMENT_ERROR',
  SECURITY = 'SECURITY_ERROR',
  SMTP = 'SMTP_ERROR',
  NETWORK = 'NETWORK_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR',
}

/**
 * Structured logging for security events
 */
function logSecurityEvent(
  level: 'info' | 'warn' | 'error',
  type: ErrorType,
  message: string,
  details?: Record<string, unknown>
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    type,
    message,
    ...details,
  };

  if (level === 'error') {
    console.error('[SECURITY]', JSON.stringify(logEntry));
  } else if (level === 'warn') {
    console.warn('[SECURITY]', JSON.stringify(logEntry));
  } else {
    console.log('[SECURITY]', JSON.stringify(logEntry));
  }
}

/**
 * Creates a secure SMTP transporter with enhanced security settings
 */
function createSecureTransporter(envVars: ValidatedEnvVars): nodemailer.Transporter {
  const port = parseInt(envVars.SMTP_PORT, 10);
  const isSecurePort = port === 465;

  return nodemailer.createTransport({
    host: envVars.SMTP_HOST,
    port: port,
    secure: isSecurePort, // Use SSL for port 465, STARTTLS for others
    auth: {
      user: envVars.SMTP_USER,
      pass: envVars.SMTP_PASS,
    },
    // Enhanced security configuration
    tls: {
      // Minimum TLS version
      minVersion: 'TLSv1.2',
      // Reject unauthorized certificates in production
      rejectUnauthorized: process.env.NODE_ENV === 'production',
      // Cipher configuration for better security
      ciphers: 'ECDHE+AESGCM:ECDHE+CHACHA20:DHE+AESGCM:DHE+CHACHA20:!aNULL:!MD5:!DSS',
    },
    // Connection timeouts
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 5000,    // 5 seconds
    socketTimeout: 30000,     // 30 seconds
    // Pool configuration for better performance and security
    pool: true,
    maxConnections: 1,
    maxMessages: 3,
    // Security headers
    headers: {
      'X-Mailer': `${SITE_NAME} Contact Form`,
    },
    // Disable debugging in production
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development',
  });
}

/**
 * Main email sending function with comprehensive security enhancements
 */
export async function sendEmail(formData: z.infer<typeof contactFormSchema>) {
  const requestStart = Date.now();
  let clientIP: string = 'unknown';

  try {
    // 1. Environment Variable Validation
    let envVars: ValidatedEnvVars;
    try {
      envVars = validateEnvVars();
    } catch (error) {
      logSecurityEvent('error', ErrorType.ENVIRONMENT, 'Environment validation failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return {
        success: false,
        error: "サーバー設定にエラーがあります。管理者にお問い合わせください。",
      };
    }

    // 2. Rate Limiting
    const headersList = await headers();
    clientIP = getClientIP({ headers: Object.fromEntries(headersList.entries()) });
    
    const rateLimit = getContactFormRateLimit();
    const rateLimitResult: RateLimitResult = rateLimit.check(clientIP);

    if (!rateLimitResult.success) {
      logSecurityEvent('warn', ErrorType.RATE_LIMIT, 'Rate limit exceeded', {
        clientIP,
        error: rateLimitResult.error,
        resetTime: rateLimitResult.resetTime,
      });
      
      return {
        success: false,
        error: "送信頻度が高すぎます。しばらく時間をおいてから再度お試しください。",
        rateLimitHeaders: createRateLimitHeaders(rateLimitResult),
      };
    }

    // 3. Input Validation
    const validationResult = secureContactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      logSecurityEvent('warn', ErrorType.VALIDATION, 'Form validation failed', {
        clientIP,
        errors: validationResult.error.format(),
      });
      return { 
        success: false, 
        error: validationResult.error.format(),
        rateLimitHeaders: createRateLimitHeaders(rateLimitResult),
      };
    }

    // 4. Input Sanitization
    const sanitizedData = sanitizeContactFormData(validationResult.data);
    const sanitizationValidation = validateSanitizedData(sanitizedData);

    if (!sanitizationValidation.isValid) {
      logSecurityEvent('error', ErrorType.SECURITY, 'Sanitization validation failed', {
        clientIP,
        errors: sanitizationValidation.errors,
        warnings: sanitizationValidation.warnings,
      });
      return {
        success: false,
        error: "入力内容に問題があります。正しい形式で入力してください。",
        rateLimitHeaders: createRateLimitHeaders(rateLimitResult),
      };
    }

    // Log warnings if any suspicious patterns were detected
    if (sanitizationValidation.warnings.length > 0) {
      logSecurityEvent('warn', ErrorType.SECURITY, 'Suspicious patterns detected', {
        clientIP,
        warnings: sanitizationValidation.warnings,
      });
    }

    // 5. Additional Security Checks
    if (!isEmailSafe(sanitizedData.email)) {
      logSecurityEvent('error', ErrorType.SECURITY, 'Unsafe email detected', {
        clientIP,
        email: sanitizedData.email,
      });
      return {
        success: false,
        error: "メールアドレスの形式が正しくありません。",
        rateLimitHeaders: createRateLimitHeaders(rateLimitResult),
      };
    }

    // Check all text fields for header injection
    const textFields = [sanitizedData.name, sanitizedData.message];
    if (sanitizedData.company) textFields.push(sanitizedData.company);
    if (sanitizedData.phone) textFields.push(sanitizedData.phone);

    for (const field of textFields) {
      if (!isInputSafeForEmail(field)) {
        logSecurityEvent('error', ErrorType.SECURITY, 'Email header injection attempt detected', {
          clientIP,
          field,
        });
        return {
          success: false,
          error: "入力内容に無効な文字が含まれています。",
          rateLimitHeaders: createRateLimitHeaders(rateLimitResult),
        };
      }
    }

    // 6. SMTP Configuration and Sending
    const transporter = createSecureTransporter(envVars);

    try {
      // Verify SMTP connection before sending
      await transporter.verify();

      // メール送信設定
      const mailOptions = {
        from: `"${SITE_NAME}" <${envVars.SMTP_USER}>`,
        to: envVars.CONTACT_FORM_TO_EMAIL,
        bcc: envVars.CONTACT_FORM_BCC_EMAIL || undefined,
        subject: 'ウェブサイトからのお問い合わせ',
        text: `会社名: ${sanitizedData.company || '未入力'}\n氏名: ${sanitizedData.name}\nメールアドレス: ${sanitizedData.email}\n電話番号: ${sanitizedData.phone || '未入力'}\n\nメッセージ:\n${sanitizedData.message}`,
        // Security headers
        headers: {
          'X-Mailer': `${SITE_NAME} Contact Form`,
          'X-Priority': '3',
          'X-MSMail-Priority': 'Normal',
        },
      };

      const info = await transporter.sendMail(mailOptions);
      
      // Log successful email send
      logSecurityEvent('info', ErrorType.VALIDATION, 'Email sent successfully', {
        clientIP,
        messageId: info.messageId,
        processingTime: Date.now() - requestStart,
      });

      return { 
        success: true, 
        data: { messageId: info.messageId },
        rateLimitHeaders: createRateLimitHeaders(rateLimitResult),
      };

    } catch (error) {
      // SMTP-specific error handling
      const errorMessage = error instanceof Error ? error.message : 'Unknown SMTP error';
      const errorCode = (error as { code?: string })?.code;
      const errorResponse = (error as { response?: string })?.response;

      let logLevel: 'warn' | 'error' = 'error';
      const userMessage = "メール送信中にエラーが発生しました。しばらく時間をおいてから再度お試しください。";
      let errorType = ErrorType.SMTP;

      // Categorize SMTP errors for better handling
      if (errorCode) {
        switch (errorCode) {
          case 'EAUTH':
            errorType = ErrorType.SMTP;
            logLevel = 'error';
            break;
          case 'ECONNECTION':
          case 'ETIMEDOUT':
          case 'ENOTFOUND':
            errorType = ErrorType.NETWORK;
            logLevel = 'warn';
            break;
          default:
            errorType = ErrorType.SMTP;
            logLevel = 'error';
        }
      }

      logSecurityEvent(logLevel, errorType, 'SMTP error occurred', {
        clientIP,
        errorMessage,
        errorCode,
        errorResponse,
        processingTime: Date.now() - requestStart,
      });

      return { 
        success: false, 
        error: userMessage,
        rateLimitHeaders: createRateLimitHeaders(rateLimitResult),
      };
    } finally {
      // Close the transporter connection
      transporter.close();
    }

  } catch (error) {
    // Catch-all error handler
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    logSecurityEvent('error', ErrorType.UNKNOWN, 'Unexpected error in sendEmail', {
      clientIP: clientIP || 'unknown',
      errorMessage,
      processingTime: Date.now() - requestStart,
    });

    return {
      success: false,
      error: "予期しないエラーが発生しました。管理者にお問い合わせください。",
    };
  }
}