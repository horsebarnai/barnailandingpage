/* ============================================================
 * Simple in-memory rate limiter.
 *
 * Use case: shield public POST endpoints (the contact form) from
 * abuse without standing up Redis or Upstash. Sliding-window
 * counter, keyed by an arbitrary string (typically IP).
 *
 * Caveats:
 *  - Memory is per-function-instance. Vercel's Fluid Compute reuses
 *    instances across requests, so this works for the realistic
 *    attack pattern (one IP hammering one endpoint). If an attacker
 *    distributes spam across regions / fresh cold starts, they get
 *    a fresh bucket. For a marketing site contact form, this is
 *    a fine trade-off vs. the complexity of distributed storage.
 *  - For stronger guarantees, swap the bucket store for
 *    @upstash/ratelimit + @upstash/redis (free tier, drop-in API).
 *
 * Returns:
 *  - `{ ok: true }` if the request is within the limit.
 *  - `{ ok: false, retryAfterSeconds }` if the limit is exceeded,
 *    suitable for use in a `Retry-After` HTTP header.
 * ============================================================ */

type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSeconds: number }

const buckets = new Map<string, number[]>()
const MAX_BUCKETS = 5_000

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string
  limit: number
  windowMs: number
}): RateLimitResult {
  const now = Date.now()
  const cutoff = now - windowMs

  // Get + prune the timestamps for this key.
  const recent = (buckets.get(key) ?? []).filter((t) => t > cutoff)

  if (recent.length >= limit) {
    const oldest = recent[0]
    const retryAfterMs = Math.max(0, oldest + windowMs - now)
    return { ok: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) }
  }

  recent.push(now)
  buckets.set(key, recent)

  // Opportunistic GC — every ~100 calls, sweep dead buckets so memory
  // doesn't grow unbounded across long-lived function instances.
  if (buckets.size > MAX_BUCKETS || Math.random() < 0.01) {
    for (const [k, ts] of buckets) {
      const last = ts[ts.length - 1] ?? 0
      if (last < cutoff) buckets.delete(k)
    }
  }

  return { ok: true }
}

/* Extracts the client IP from the request headers Vercel injects.
   Falls back to "unknown" so the limiter still functions (it'll
   bucket all unknown requests together, which is conservative). */
export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for")
  if (fwd) {
    const first = fwd.split(",")[0]?.trim()
    if (first) return first
  }
  return request.headers.get("x-real-ip") ?? "unknown"
}
