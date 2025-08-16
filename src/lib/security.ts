import { headers } from 'next/headers';

// 入力データサニタイズ
export function sanitizeInput(text: string): string {
  if (!text) return '';
  
  // HTMLエスケープ
  let sanitized = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();

  // 危険なパターンを除去
  const dangerousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
  ];

  dangerousPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });

  return sanitized;
}

// レート制限機能（シンプルなメモリベース実装）
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function checkRateLimit(clientIp: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1時間
  const maxRequests = 5; // 1時間に5回まで

  const entry = rateLimitStore.get(clientIp);

  if (!entry || now > entry.resetTime) {
    // 新しいウィンドウまたは期限切れ
    rateLimitStore.set(clientIp, {
      count: 1,
      resetTime: now + windowMs
    });
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    return { 
      allowed: false, 
      resetTime: entry.resetTime 
    };
  }

  // カウントを増加
  entry.count++;
  rateLimitStore.set(clientIp, entry);
  
  return { allowed: true };
}

// クライアントIPを取得
export async function getClientIP(): Promise<string> {
  const headersList = await headers();
  
  // Vercelなどのプロキシ環境での実際のIPを取得
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const cfConnectingIp = headersList.get('cf-connecting-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

// CSRFトークン生成・検証
export function generateCSRFToken(): string {
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function verifyCSRFToken(token: string, expectedToken: string): boolean {
  if (!token || !expectedToken) return false;
  
  // タイミング攻撃を防ぐため、常に同じ時間で比較
  if (token.length !== expectedToken.length) return false;
  
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expectedToken.charCodeAt(i);
  }
  
  return result === 0;
}

// 強化されたメールアドレス検証
export function validateEmailEnhanced(email: string): { 
  isValid: boolean; 
  errors: string[] 
} {
  const result = {
    isValid: false,
    errors: [] as string[]
  };

  if (!email) {
    result.errors.push('メールアドレスが入力されていません');
    return result;
  }

  // 基本的な形式チェック
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    result.errors.push('メールアドレスの形式が正しくありません');
    return result;
  }

  // 長さチェック
  if (email.length > 254) {
    result.errors.push('メールアドレスが長すぎます');
    return result;
  }

  const [localPart, domain] = email.split('@');

  // ローカル部の検証
  if (localPart.length > 64) {
    result.errors.push('メールアドレスのローカル部が長すぎます');
    return result;
  }

  // 危険なパターンをチェック
  const suspiciousDomains = [
    'tempmail.org',
    '10minutemail.com', 
    'guerrillamail.com',
    'mailinator.com',
    'throwaway.email'
  ];

  if (suspiciousDomains.includes(domain.toLowerCase())) {
    result.errors.push('このメールアドレスは使用できません');
    return result;
  }

  // 連続する特殊文字をチェック
  if (/\.{2,}/.test(email) || /__/.test(email)) {
    result.errors.push('メールアドレスに無効な文字列が含まれています');
    return result;
  }

  // 先頭・末尾のドット/ハイフンチェック
  if (localPart.startsWith('.') || localPart.endsWith('.') ||
      domain.startsWith('-') || domain.endsWith('-')) {
    result.errors.push('メールアドレスの形式が正しくありません');
    return result;
  }

  result.isValid = true;
  return result;
}

// 入力データ全体のセキュリティチェック
export function validateContactFormSecurity(data: {
  company?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // 各フィールドをサニタイズして検証
  const sanitizedData = {
    company: data.company ? sanitizeInput(data.company) : '',
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email),
    phone: data.phone ? sanitizeInput(data.phone) : '',
    message: sanitizeInput(data.message)
  };

  // メールアドレスの強化検証
  const emailValidation = validateEmailEnhanced(sanitizedData.email);
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors);
  }

  // スパム的な内容をチェック
  const spamPatterns = [
    /\b(viagra|casino|lottery|winner|prize)\b/i,
    /\b(click here|act now|limited time)\b/i,
    /http[s]?:\/\/[^\s]+/g // URLが含まれている
  ];

  const fullText = `${sanitizedData.name} ${sanitizedData.message}`;
  for (const pattern of spamPatterns) {
    if (pattern.test(fullText)) {
      errors.push('不適切な内容が含まれている可能性があります');
      break;
    }
  }

  // 極端に長いメッセージをチェック
  if (sanitizedData.message.length > 5000) {
    errors.push('メッセージが長すぎます（5000文字以内）');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}