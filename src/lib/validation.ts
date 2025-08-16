import { z } from "zod";
import validator from "validator";

/**
 * Environment variable validation schema for SMTP and email configuration
 * Ensures all required variables are present and valid
 */
export const envSchema = z.object({
  // SMTP Configuration
  SMTP_HOST: z.string().min(1, "SMTP_HOST is required"),
  SMTP_PORT: z.string().refine(
    (val) => {
      const port = parseInt(val, 10);
      return !isNaN(port) && port > 0 && port <= 65535;
    },
    "SMTP_PORT must be a valid port number (1-65535)"
  ),
  SMTP_USER: z.string().email("SMTP_USER must be a valid email address"),
  SMTP_PASS: z.string().min(1, "SMTP_PASS is required"),
  
  // Email Configuration
  CONTACT_FORM_TO_EMAIL: z.string().email("CONTACT_FORM_TO_EMAIL must be a valid email address"),
  CONTACT_FORM_BCC_EMAIL: z.string().email("CONTACT_FORM_BCC_EMAIL must be a valid email address").optional(),
  
  // Site Configuration
  NEXT_PUBLIC_SITE_URL: z.string().url("NEXT_PUBLIC_SITE_URL must be a valid URL").optional(),
});

/**
 * Validates environment variables required for email functionality
 * @returns Parsed and validated environment variables
 * @throws Error if validation fails with detailed error messages
 */
export function validateEnvVars() {
  try {
    const env = {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS,
      CONTACT_FORM_TO_EMAIL: process.env.CONTACT_FORM_TO_EMAIL,
      CONTACT_FORM_BCC_EMAIL: process.env.CONTACT_FORM_BCC_EMAIL,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    };

    return envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Environment variable validation failed:\n${errorMessages.join('\n')}`);
    }
    throw error;
  }
}

/**
 * Extended validation schema for contact form data with additional security checks
 */
export const secureContactFormSchema = z.object({
  company: z.string()
    .optional()
    .refine(
      (val) => !val || validator.isLength(val, { max: 100 }),
      "Company name must be 100 characters or less"
    ),
  name: z.string()
    .min(1, { message: "氏名は必須です。" })
    .max(50, { message: "氏名は50文字以内で入力してください。" })
    .refine(
      (val) => validator.isLength(val.trim(), { min: 1 }),
      "Name cannot be only whitespace"
    ),
  email: z.string()
    .email({ message: "有効なメールアドレスを入力してください。" })
    .refine(
      (val) => validator.isEmail(val) && validator.isLength(val, { max: 254 }),
      "Invalid email format or too long"
    ),
  phone: z.string()
    .optional()
    .refine(
      (val) => !val || (validator.isLength(val, { max: 20 }) && /^[0-9\-\+\(\)\s]+$/.test(val)),
      "Phone number contains invalid characters or is too long"
    ),
  message: z.string()
    .min(1, { message: "お問い合わせ内容は必須です。" })
    .max(2000, { message: "お問い合わせ内容は2000文字以内で入力してください。" })
    .refine(
      (val) => validator.isLength(val.trim(), { min: 1 }),
      "Message cannot be only whitespace"
    ),
});

/**
 * Validates email addresses for potential injection attacks
 * @param email Email address to validate
 * @returns true if email is safe, false otherwise
 */
export function isEmailSafe(email: string): boolean {
  // Check for common injection patterns
  const dangerousPatterns = [
    /[<>]/,           // HTML tags
    /\r|\n/,          // Line breaks (header injection)
    /bcc:/i,          // BCC injection
    /cc:/i,           // CC injection
    /to:/i,           // TO injection (at start)
    /from:/i,         // FROM injection
    /subject:/i,      // SUBJECT injection
    /content-type:/i, // Content-Type injection
  ];

  return !dangerousPatterns.some(pattern => pattern.test(email));
}

/**
 * Validates that a string doesn't contain email header injection attempts
 * @param input String to validate
 * @returns true if input is safe, false otherwise
 */
export function isInputSafeForEmail(input: string): boolean {
  // Check for email header injection patterns
  const headerInjectionPatterns = [
    /\r\n/,           // CRLF injection
    /\r|\n/,          // Line breaks
    /%0[ad]/i,        // URL encoded CRLF
    /\\r\\n/i,        // Escaped CRLF
    /bcc:/i,          // BCC header
    /cc:/i,           // CC header
    /to:/i,           // TO header
    /from:/i,         // FROM header
    /subject:/i,      // SUBJECT header
    /content-type:/i, // Content-Type header
    /mime-version:/i, // MIME-Version header
  ];

  return !headerInjectionPatterns.some(pattern => pattern.test(input));
}

export type ValidatedEnvVars = z.infer<typeof envSchema>;
export type SecureContactFormData = z.infer<typeof secureContactFormSchema>;