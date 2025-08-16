import { 
  sanitizeHTML, 
  sanitizeEmail, 
  sanitizeContactFormData, 
  containsSuspiciousPatterns 
} from '../sanitize';

describe('Input Sanitization', () => {
  describe('sanitizeHTML', () => {
    it('should remove HTML tags', () => {
      expect(sanitizeHTML('<script>alert("xss")</script>Hello')).toBe('Hello');
      expect(sanitizeHTML('<p>Hello <b>world</b></p>')).toBe('Hello world');
    });

    it('should handle empty input', () => {
      expect(sanitizeHTML('')).toBe('');
      expect(sanitizeHTML(null as unknown as string)).toBe('');
      expect(sanitizeHTML(undefined as unknown as string)).toBe('');
    });
  });

  describe('sanitizeEmail', () => {
    it('should normalize valid emails', () => {
      expect(sanitizeEmail('Test@Example.COM')).toBe('test@example.com');
      expect(sanitizeEmail('  user@domain.com  ')).toBe('user@domain.com');
    });

    it('should reject invalid emails', () => {
      expect(sanitizeEmail('invalid-email')).toBe('');
      expect(sanitizeEmail('test@')).toBe('');
      expect(sanitizeEmail('<script>@example.com')).toBe('');
    });
  });

  describe('sanitizeContactFormData', () => {
    it('should sanitize all form fields', () => {
      const dirtyData = {
        name: '<script>alert("xss")</script>山田太郎',
        email: '  TEST@Example.COM  ',
        message: 'Hello\r\nworld<script></script>',
        company: '<b>株式会社テスト</b>',
        phone: '03-1234-5678\r\n'
      };

      const sanitized = sanitizeContactFormData(dirtyData);

      expect(sanitized.name).toBe('山田太郎');
      expect(sanitized.email).toBe('test@example.com');
      expect(sanitized.message).toBe('Hello world');
      expect(sanitized.company).toBe('株式会社テスト');
      expect(sanitized.phone).toBe('03-1234-5678');
    });
  });

  describe('containsSuspiciousPatterns', () => {
    it('should detect script injection patterns', () => {
      expect(containsSuspiciousPatterns('<script>alert("xss")</script>')).toBe(true);
      expect(containsSuspiciousPatterns('javascript:void(0)')).toBe(true);
      expect(containsSuspiciousPatterns('onload="malicious()"')).toBe(true);
    });

    it('should detect email header injection', () => {
      expect(containsSuspiciousPatterns('content-type: text/html')).toBe(true);
      expect(containsSuspiciousPatterns('mime-version: 1.0')).toBe(true);
    });

    it('should allow safe content', () => {
      expect(containsSuspiciousPatterns('Hello world')).toBe(false);
      expect(containsSuspiciousPatterns('山田太郎です')).toBe(false);
      expect(containsSuspiciousPatterns('test@example.com')).toBe(false);
    });
  });
});