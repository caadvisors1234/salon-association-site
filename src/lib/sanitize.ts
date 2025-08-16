import DOMPurify from "isomorphic-dompurify";
import validator from "validator";

/**
 * Sanitization options for different contexts
 */
interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttributes?: Record<string, string[]>;
  stripIgnoreTag?: boolean;
  stripIgnoreTagBody?: string[];
}

/**
 * Strict sanitization options for email content
 */
const EMAIL_SANITIZE_OPTIONS: SanitizeOptions = {
  allowedTags: [], // No HTML tags allowed in email content
  allowedAttributes: {},
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script', 'style'],
};

/**
 * Sanitizes HTML content using DOMPurify
 * @param input Raw HTML string to sanitize
 * @param options Sanitization options
 * @returns Sanitized string
 */
export function sanitizeHTML(input: string, options: SanitizeOptions = EMAIL_SANITIZE_OPTIONS): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  const config: Record<string, unknown> = {
    ALLOWED_TAGS: options.allowedTags || [],
    ALLOWED_ATTR: options.allowedAttributes || {},
    KEEP_CONTENT: true, // Always keep text content
    FORBID_TAGS: options.stripIgnoreTagBody || ['script', 'style'],
  };

  return DOMPurify.sanitize(input, config);
}

/**
 * Sanitizes text content for email usage, removing potential injection attempts
 * @param input Text content to sanitize
 * @returns Sanitized text content
 */
export function sanitizeEmailContent(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove HTML tags completely
  let sanitized = sanitizeHTML(input, EMAIL_SANITIZE_OPTIONS);
  
  // Decode HTML entities
  sanitized = validator.unescape(sanitized);
  
  // Remove email header injection patterns
  sanitized = sanitized
    .replace(/\r\n/g, ' ')     // Remove CRLF
    .replace(/\r/g, ' ')       // Remove CR
    .replace(/\n/g, ' ')       // Remove LF
    .replace(/%0[ad]/gi, ' ')  // Remove URL encoded CRLF
    .replace(/\\r\\n/gi, ' ')  // Remove escaped CRLF
    .replace(/\0/g, '')        // Remove null bytes
    .replace(/\x00/g, '');     // Remove null characters

  // Remove email header keywords at the beginning of lines
  const headerPatterns = [
    /^(bcc|cc|to|from|subject|content-type|mime-version):/gmi
  ];
  
  headerPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });

  // Normalize whitespace
  sanitized = sanitized.replace(/\s+/g, ' ').trim();

  return sanitized;
}

/**
 * Sanitizes email address input
 * @param email Email address to sanitize
 * @returns Sanitized email address or empty string if invalid
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return '';
  }

  // Remove HTML tags
  let sanitized = sanitizeHTML(email, EMAIL_SANITIZE_OPTIONS);
  
  // Remove whitespace and normalize
  sanitized = sanitized.trim().toLowerCase();
  
  // Remove any line breaks or control characters
  sanitized = sanitized.replace(/[\r\n\t]/g, '');
  
  // Validate the email format
  if (!validator.isEmail(sanitized)) {
    return '';
  }

  return sanitized;
}

/**
 * Sanitizes phone number input
 * @param phone Phone number to sanitize
 * @returns Sanitized phone number
 */
export function sanitizePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    return '';
  }

  // Remove HTML tags
  let sanitized = sanitizeHTML(phone, EMAIL_SANITIZE_OPTIONS);
  
  // Remove line breaks and normalize whitespace
  sanitized = sanitized.replace(/[\r\n]/g, '').replace(/\s+/g, ' ').trim();
  
  // Keep only valid phone number characters
  sanitized = sanitized.replace(/[^0-9\-\+\(\)\s]/g, '');
  
  // Limit length to prevent abuse
  if (sanitized.length > 20) {
    sanitized = sanitized.substring(0, 20);
  }

  return sanitized;
}

/**
 * Sanitizes name input
 * @param name Name to sanitize
 * @returns Sanitized name
 */
export function sanitizeName(name: string): string {
  if (!name || typeof name !== 'string') {
    return '';
  }

  // Remove HTML tags
  let sanitized = sanitizeHTML(name, EMAIL_SANITIZE_OPTIONS);
  
  // Remove line breaks and normalize whitespace
  sanitized = sanitized.replace(/[\r\n]/g, '').replace(/\s+/g, ' ').trim();
  
  // Remove potentially dangerous characters but keep international characters
  sanitized = sanitized.replace(/[<>\"']/g, '');
  
  // Limit length
  if (sanitized.length > 50) {
    sanitized = sanitized.substring(0, 50).trim();
  }

  return sanitized;
}

/**
 * Sanitizes company name input
 * @param company Company name to sanitize
 * @returns Sanitized company name
 */
export function sanitizeCompany(company: string): string {
  if (!company || typeof company !== 'string') {
    return '';
  }

  // Remove HTML tags
  let sanitized = sanitizeHTML(company, EMAIL_SANITIZE_OPTIONS);
  
  // Remove line breaks and normalize whitespace
  sanitized = sanitized.replace(/[\r\n]/g, '').replace(/\s+/g, ' ').trim();
  
  // Remove potentially dangerous characters but keep common business characters
  sanitized = sanitized.replace(/[<>\"']/g, '');
  
  // Limit length
  if (sanitized.length > 100) {
    sanitized = sanitized.substring(0, 100).trim();
  }

  return sanitized;
}

/**
 * Comprehensive sanitization for contact form data
 * @param data Contact form data object
 * @returns Sanitized contact form data
 */
export function sanitizeContactFormData(data: {
  company?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}): {
  company?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
} {
  return {
    company: data.company ? sanitizeCompany(data.company) : undefined,
    name: sanitizeName(data.name),
    email: sanitizeEmail(data.email),
    phone: data.phone ? sanitizePhone(data.phone) : undefined,
    message: sanitizeEmailContent(data.message),
  };
}

/**
 * Checks if a string contains suspicious patterns that might indicate an attack
 * @param input String to check
 * @returns true if suspicious patterns are found
 */
export function containsSuspiciousPatterns(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return false;
  }

  const suspiciousPatterns = [
    // Script injection patterns
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload/i,
    /onerror/i,
    /onclick/i,
    
    // Email header injection
    /content-type:/i,
    /mime-version:/i,
    /x-mailer:/i,
    
    // Common XSS patterns
    /eval\(/i,
    /expression\(/i,
    /alert\(/i,
    /confirm\(/i,
    /prompt\(/i,
    
    // URL injection
    /data:text\/html/i,
    /data:application/i,
    
    // SQL injection patterns (though not directly applicable to email, good to catch)
    /union\s+select/i,
    /drop\s+table/i,
    /insert\s+into/i,
    
    // Command injection
    /\|\s*[a-z]/i,
    /;\s*[a-z]/i,
    /&&\s*[a-z]/i,
    
    // Path traversal
    /\.\.\//,
    /\.\.\\\//,
  ];

  return suspiciousPatterns.some(pattern => pattern.test(input));
}

/**
 * Validates that sanitized content is safe for email transmission
 * @param sanitizedData Sanitized contact form data
 * @returns Validation result with details
 */
export function validateSanitizedData(sanitizedData: {
  company?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for empty required fields after sanitization
  if (!sanitizedData.name.trim()) {
    errors.push('Name is required after sanitization');
  }

  if (!sanitizedData.email.trim()) {
    errors.push('Email is required after sanitization');
  }

  if (!sanitizedData.message.trim()) {
    errors.push('Message is required after sanitization');
  }

  // Check for suspicious patterns in sanitized data
  Object.entries(sanitizedData).forEach(([field, value]) => {
    if (value && containsSuspiciousPatterns(value)) {
      warnings.push(`Suspicious patterns detected in ${field} after sanitization`);
    }
  });

  // Check email validity
  if (sanitizedData.email && !validator.isEmail(sanitizedData.email)) {
    errors.push('Email format is invalid after sanitization');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}