"use client"

import Link from "next/link"

import { footerLinks } from "@/lib/site-content/nav"

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        {/* Top row: brand on left, links on right */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/barn-ai-shard.svg"
                alt=""
                width={28}
                height={32}
                className="block h-8 w-auto"
                style={{
                  filter:
                    "drop-shadow(0 0 4px rgba(255, 255, 255, 0.10)) drop-shadow(0 0 10px rgba(167, 243, 208, 0.08))",
                }}
              />
              <span className="text-lg font-bold text-white">barn ai</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-5">
              The institutional back-office of the equine industry.
            </p>
            <Link
              href="/book-a-demo"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-300 transition-all hover:border-emerald-400/70 hover:bg-emerald-500/[0.12]"
            >
              Book a Demo
            </Link>
          </div>

          {/* Single Company nav row */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3 md:justify-end">
              {footerLinks.map((item) => (
                <li key={item.href + item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-7 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Barn AI, Inc. All rights reserved.
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
            Private Beta · 2026
          </span>
        </div>
      </div>
    </footer>
  )
}
