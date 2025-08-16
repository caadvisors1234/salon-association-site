/**
 * In-memory rate limiting implementation for contact form submissions
 * Tracks requests by IP address with automatic cleanup of old entries
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
  firstRequest: number;
}

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  cleanupIntervalMs: number;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  error?: string;
}

class RateLimit {
  private store = new Map<string, RateLimitEntry>();
  private config: RateLimitConfig;
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor(config: RateLimitConfig) {
    this.config = config;
    this.startCleanup();
  }

  /**
   * Checks if a request from the given identifier is allowed
   * @param identifier Unique identifier (usually IP address)
   * @returns Rate limit result with success status and metadata
   */
  public check(identifier: string): RateLimitResult {
    const now = Date.now();
    const entry = this.store.get(identifier);

    // No previous requests from this identifier
    if (!entry) {
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.config.windowMs,
        firstRequest: now,
      });

      return {
        success: true,
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests - 1,
        resetTime: now + this.config.windowMs,
      };
    }

    // Check if the rate limit window has expired
    if (now >= entry.resetTime) {
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.config.windowMs,
        firstRequest: now,
      });

      return {
        success: true,
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests - 1,
        resetTime: now + this.config.windowMs,
      };
    }

    // Check if the request exceeds the limit
    if (entry.count >= this.config.maxRequests) {
      return {
        success: false,
        limit: this.config.maxRequests,
        remaining: 0,
        resetTime: entry.resetTime,
        error: `Rate limit exceeded. Try again in ${Math.ceil((entry.resetTime - now) / 1000)} seconds.`,
      };
    }

    // Increment the counter
    entry.count++;
    this.store.set(identifier, entry);

    return {
      success: true,
      limit: this.config.maxRequests,
      remaining: this.config.maxRequests - entry.count,
      resetTime: entry.resetTime,
    };
  }

  /**
   * Manually reset rate limit for a specific identifier
   * @param identifier Unique identifier to reset
   */
  public reset(identifier: string): void {
    this.store.delete(identifier);
  }

  /**
   * Get current status for an identifier without incrementing
   * @param identifier Unique identifier to check
   * @returns Current rate limit status
   */
  public getStatus(identifier: string): Omit<RateLimitResult, 'success'> {
    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry || now >= entry.resetTime) {
      return {
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests,
        resetTime: now + this.config.windowMs,
      };
    }

    return {
      limit: this.config.maxRequests,
      remaining: Math.max(0, this.config.maxRequests - entry.count),
      resetTime: entry.resetTime,
    };
  }

  /**
   * Start the cleanup timer to remove expired entries
   * @private
   */
  private startCleanup(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupIntervalMs);

    // Ensure cleanup timer doesn't keep the process alive
    if (this.cleanupTimer.unref) {
      this.cleanupTimer.unref();
    }
  }

  /**
   * Remove expired entries from the store
   * @private
   */
  private cleanup(): void {
    const now = Date.now();
    let deletedCount = 0;

    for (const [identifier, entry] of this.store.entries()) {
      if (now >= entry.resetTime) {
        this.store.delete(identifier);
        deletedCount++;
      }
    }

    // Log cleanup activity in development
    if (process.env.NODE_ENV === 'development' && deletedCount > 0) {
      console.log(`Rate limit cleanup: removed ${deletedCount} expired entries`);
    }
  }

  /**
   * Stop the cleanup timer and clear all entries
   */
  public destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    this.store.clear();
  }

  /**
   * Get statistics about the rate limiter
   * @returns Object with current statistics
   */
  public getStats(): {
    activeEntries: number;
    totalMemoryUsage: number;
    oldestEntry: number | null;
  } {
    let oldestEntry: number | null = null;

    for (const entry of this.store.values()) {
      if (oldestEntry === null || entry.firstRequest < oldestEntry) {
        oldestEntry = entry.firstRequest;
      }
    }

    return {
      activeEntries: this.store.size,
      totalMemoryUsage: JSON.stringify([...this.store.entries()]).length,
      oldestEntry,
    };
  }
}

// Default configuration for contact form rate limiting
const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 5,           // Maximum 5 requests per window
  windowMs: 60 * 1000,      // 1 minute window
  cleanupIntervalMs: 5 * 60 * 1000, // Cleanup every 5 minutes
};

// Singleton instance for contact form rate limiting
let contactFormRateLimit: RateLimit | null = null;

/**
 * Get the singleton rate limiter instance for contact forms
 * @param config Optional custom configuration
 * @returns RateLimit instance
 */
export function getContactFormRateLimit(config?: Partial<RateLimitConfig>): RateLimit {
  if (!contactFormRateLimit) {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    contactFormRateLimit = new RateLimit(finalConfig);
  }
  return contactFormRateLimit;
}

/**
 * Extract client IP address from request headers
 * @param request Request object with headers
 * @returns Client IP address or fallback
 */
export function getClientIP(request: {
  headers: Record<string, string | string[] | undefined>;
}): string {
  // Check common headers for client IP
  const forwarded = request.headers['x-forwarded-for'];
  if (forwarded) {
    const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded;
    // Take the first IP in the chain
    return ip.split(',')[0].trim();
  }

  const realIP = request.headers['x-real-ip'];
  if (realIP && !Array.isArray(realIP)) {
    return realIP;
  }

  const remoteAddr = request.headers['remote-addr'];
  if (remoteAddr && !Array.isArray(remoteAddr)) {
    return remoteAddr;
  }

  // Fallback to a default value for development/testing
  return '127.0.0.1';
}

/**
 * Create rate limit headers for HTTP responses
 * @param result Rate limit result
 * @returns Headers object
 */
export function createRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
  };
}

/**
 * Clean up rate limiter on process exit
 */
if (typeof process !== 'undefined') {
  process.on('exit', () => {
    if (contactFormRateLimit) {
      contactFormRateLimit.destroy();
    }
  });

  process.on('SIGINT', () => {
    if (contactFormRateLimit) {
      contactFormRateLimit.destroy();
    }
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    if (contactFormRateLimit) {
      contactFormRateLimit.destroy();
    }
    process.exit(0);
  });
}

export type { RateLimitResult, RateLimitConfig };