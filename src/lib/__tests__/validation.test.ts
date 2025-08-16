import { isEmailSafe, isInputSafeForEmail, secureContactFormSchema } from '../validation';

describe('Email Security Validation', () => {
  describe('isEmailSafe', () => {
    it('should allow valid email addresses', () => {
      expect(isEmailSafe('test@example.com')).toBe(true);
      expect(isEmailSafe('user.name+tag@domain.co.jp')).toBe(true);
    });

    it('should reject emails with injection patterns', () => {
      expect(isEmailSafe('test@example.com\nbcc:hacker@evil.com')).toBe(false);
      expect(isEmailSafe('test@example.com\rto:hacker@evil.com')).toBe(false);
      expect(isEmailSafe('test<script>@example.com')).toBe(false);
    });
  });

  describe('isInputSafeForEmail', () => {
    it('should allow safe text input', () => {
      expect(isInputSafeForEmail('Hello world')).toBe(true);
      expect(isInputSafeForEmail('山田太郎です。よろしくお願いします。')).toBe(true);
    });

    it('should reject inputs with header injection patterns', () => {
      expect(isInputSafeForEmail('Hello\r\nBCC: hacker@evil.com')).toBe(false);
      expect(isInputSafeForEmail('Test\nSubject: Injected')).toBe(false);
      expect(isInputSafeForEmail('content-type: text/html')).toBe(false);
    });
  });

  describe('secureContactFormSchema', () => {
    it('should validate correct contact form data', () => {
      const validData = {
        name: '山田太郎',
        email: 'yamada@example.com',
        message: 'お問い合わせです。',
        company: '株式会社テスト',
        phone: '03-1234-5678'
      };

      expect(secureContactFormSchema.safeParse(validData).success).toBe(true);
    });

    it('should reject data with invalid email', () => {
      const invalidData = {
        name: '山田太郎',
        email: 'invalid-email',
        message: 'お問い合わせです。'
      };

      expect(secureContactFormSchema.safeParse(invalidData).success).toBe(false);
    });

    it('should reject data with too long fields', () => {
      const longData = {
        name: 'a'.repeat(100),
        email: 'test@example.com',
        message: 'a'.repeat(2001)
      };

      expect(secureContactFormSchema.safeParse(longData).success).toBe(false);
    });
  });
});