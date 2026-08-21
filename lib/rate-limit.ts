/**
 * Simple in-memory rate limiter.
 * Works for single-instance deployments (Vercel serverless uses per-instance state,
 * so this provides best-effort protection — good enough for an admin login endpoint).
 *
 * Usage:
 *   const limiter = new RateLimiter({ windowMs: 60_000, max: 10 });
 *   const allowed = limiter.check(ip);
 */

interface Entry {
    count: number;
    resetAt: number;
}

export class RateLimiter {
    private store = new Map<string, Entry>();
    private readonly windowMs: number;
    private readonly max: number;

    constructor({ windowMs, max }: { windowMs: number; max: number }) {
        this.windowMs = windowMs;
        this.max = max;
    }

    /** Returns true if the request is allowed, false if it should be blocked. */
    check(key: string): boolean {
        const now = Date.now();
        const entry = this.store.get(key);

        if (!entry || now > entry.resetAt) {
            // New window
            this.store.set(key, { count: 1, resetAt: now + this.windowMs });
            return true;
        }

        if (entry.count >= this.max) {
            return false;
        }

        entry.count += 1;
        return true;
    }

    /** Returns seconds until the window resets for a given key. */
    retryAfter(key: string): number {
        const entry = this.store.get(key);
        if (!entry) return 0;
        return Math.ceil((entry.resetAt - Date.now()) / 1000);
    }
}

// Singleton: 10 attempts per IP per minute on the auth endpoint
export const authLimiter = new RateLimiter({ windowMs: 60_000, max: 10 });
