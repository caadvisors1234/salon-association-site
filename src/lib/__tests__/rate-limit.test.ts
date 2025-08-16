import { getContactFormRateLimit, getClientIP, createRateLimitHeaders } from '../rate-limit';

describe('Rate Limiting', () => {
  beforeEach(() => {
    // Reset rate limiter before each test
    const rateLimit = getContactFormRateLimit();
    rateLimit.reset('test-ip');
  });

  describe('Rate Limiter', () => {
    it('should allow requests within limit', () => {
      const rateLimit = getContactFormRateLimit();
      
      const result1 = rateLimit.check('test-ip');
      expect(result1.success).toBe(true);
      expect(result1.remaining).toBe(4); // 5 max - 1 used
      
      const result2 = rateLimit.check('test-ip');
      expect(result2.success).toBe(true);
      expect(result2.remaining).toBe(3); // 5 max - 2 used
    });

    it('should block requests when limit exceeded', () => {
      const rateLimit = getContactFormRateLimit();
      
      // Use up the limit (5 requests)
      for (let i = 0; i < 5; i++) {
        const result = rateLimit.check('test-ip');
        expect(result.success).toBe(true);
      }
      
      // 6th request should be blocked
      const result = rateLimit.check('test-ip');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Rate limit exceeded');
    });

    it('should handle different IPs independently', () => {
      const rateLimit = getContactFormRateLimit();
      
      // Use up limit for first IP
      for (let i = 0; i < 5; i++) {
        rateLimit.check('ip1');
      }
      
      // Second IP should still work
      const result = rateLimit.check('ip2');
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(4);
    });
  });

  describe('getClientIP', () => {
    it('should extract IP from x-forwarded-for header', () => {
      const request = {
        headers: {
          'x-forwarded-for': '192.168.1.1, 10.0.0.1'
        }
      };
      
      expect(getClientIP(request)).toBe('192.168.1.1');
    });

    it('should extract IP from x-real-ip header', () => {
      const request = {
        headers: {
          'x-real-ip': '192.168.1.1'
        }
      };
      
      expect(getClientIP(request)).toBe('192.168.1.1');
    });

    it('should fallback to default IP', () => {
      const request = {
        headers: {}
      };
      
      expect(getClientIP(request)).toBe('127.0.0.1');
    });
  });

  describe('createRateLimitHeaders', () => {
    it('should create correct headers', () => {
      const result = {
        success: true,
        limit: 5,
        remaining: 3,
        resetTime: 1640995200000
      };
      
      const headers = createRateLimitHeaders(result);
      
      expect(headers['X-RateLimit-Limit']).toBe('5');
      expect(headers['X-RateLimit-Remaining']).toBe('3');
      expect(headers['X-RateLimit-Reset']).toBe('1640995200');
    });
  });
});