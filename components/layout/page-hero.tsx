"use client"

import { motion } from "framer-motion"
import Link from "next/link"

import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs"
import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"

/* Reusable interior page hero. Establishes hierarchy + breadcrumb +
   optional CTA. Background is consistent across the site so deep
   pages feel like one platform, not nine separate landing pages. */

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  kicker,
  crumbs,
  primaryCta,
  secondaryCta,
  size = "default",
}: {
  eyebrow?: string
  title: string
  titleAccent?: string
  kicker?: string
  crumbs?: Crumb[]
  primaryCta?: { name: string; href: string }
  secondaryCta?: { name: string; href: string }
  size?: "default" | "compact"
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        size === "default" ? "pt-16 pb-20 lg:pt-24 lg:pb-28" : "pt-12 pb-12 lg:pt-16 lg:pb-16",
      )}
    >
      {/* Background glow + grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-32 left-1/3 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-emerald-500/[0.08] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <Container className="relative z-10">
        {crumbs && (
          <div className="mb-8">
            <Breadcrumbs items={crumbs} />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {eyebrow && (
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-400/90">
              {eyebrow}
            </div>
          )}

          <h1
            className={cn(
              "font-display font-medium leading-[1.05] tracking-tight text-white",
              size === "default"
                ? "text-4xl sm:text-5xl lg:text-6xl max-w-4xl"
                : "text-3xl sm:text-4xl lg:text-5xl max-w-3xl",
            )}
          >
            {title}{" "}
            {titleAccent && (
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
                {titleAccent}
              </span>
            )}
          </h1>

          {kicker && (
            <p className="mt-6 text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-2xl">
              {kicker}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-3">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_28px_-6px_rgba(74,222,128,0.6)] transition-all hover:bg-emerald-400 hover:shadow-[0_0_44px_-4px_rgba(74,222,128,0.8)]"
                >
                  {primaryCta.name}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/40 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all hover:border-zinc-500 hover:bg-zinc-900/70 hover:text-white"
                >
                  {secondaryCta.name}
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
