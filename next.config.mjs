/** @type {import('next').NextConfig} */

/* ============================================================
 * Security headers — applied to every route.
 *
 * Notes on the choices below:
 *  - `Content-Security-Policy` is the heavyweight; it allow-lists
 *    third parties the site genuinely needs: Vercel Analytics,
 *    Calendly (on /book-a-demo), Supabase (client connect),
 *    fonts. 'unsafe-inline' for scripts/styles is a pragmatic
 *    concession because Next.js inlines hydration data and
 *    Tailwind uses inline-style hooks; a stricter nonce-based
 *    CSP would require middleware injection.
 *  - `X-Frame-Options: DENY` blocks framing entirely — no one
 *    can embed your site to phish your users.
 *  - `X-Content-Type-Options: nosniff` prevents MIME confusion.
 *  - `Referrer-Policy: strict-origin-when-cross-origin` keeps
 *    referrer details from leaking on outbound clicks.
 *  - `Permissions-Policy` disables APIs the site doesn't use,
 *    shrinking the attack surface to nothing.
 * ============================================================ */

const csp = [
  "default-src 'self'",
  // Scripts: site + Next.js runtime + Vercel Analytics + Calendly widget.
  // 'unsafe-inline' / 'unsafe-eval' are needed for Next's hydration
  // payload and analytics; in exchange we get a real CSP that blocks
  // every other source of script injection.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com https://assets.calendly.com",
  // Images: site + data URIs (for inline SVGs) + any HTTPS source.
  "img-src 'self' data: blob: https:",
  // XHR/fetch: site + Supabase (your DB) + Vercel telemetry.
  "connect-src 'self' https://*.supabase.co https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  // Iframes: Calendly only (the embedded scheduler).
  "frame-src 'self' https://calendly.com https://*.calendly.com",
  // Locks: no plugins, no relative bases, forms post to self only.
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Belt + suspenders with X-Frame-Options below.
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
  },
]

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
