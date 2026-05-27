"use client"

import Script from "next/script"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

import { PageShell } from "@/components/layout/page-shell"
import { PageHero } from "@/components/layout/page-hero"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

const CALENDLY_URL = "https://calendly.com/om-horsebarn/30min"

const EXPECTATIONS = [
  "A 30-minute working session with a member of the founding team.",
  "A live walkthrough of the modules most relevant to your operation.",
  "Honest answers on fit, scope, and onboarding timeline.",
  "No hard sell — we work with a small set of partners.",
] as const

export default function BookADemoPage() {
  return (
    <PageShell>
      {/* Calendly stylesheet — React 19 hoists into <head>. */}
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

      <PageHero
        eyebrow="Book a Demo"
        title="See Barn AI"
        titleAccent="run on your operation."
        kicker="A 30-minute working session with a member of the founding team. Bring a scenario from your operation — a syndicate, a breeding shortlist, a settlement. We'll show you what it looks like on Barn AI."
        crumbs={[{ name: "Book a Demo" }]}
        size="compact"
      />

      <Section rhythm="default" className="border-t border-white/[0.04]">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.7fr] gap-12 lg:gap-16 items-start">
            {/* What to expect */}
            <div className="lg:sticky lg:top-28">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/90 mb-4">
                What to expect
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-medium leading-tight tracking-tight text-white mb-6">
                Working session,{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
                  not a sales pitch.
                </span>
              </h2>
              <ul className="space-y-4">
                {EXPECTATIONS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    <span className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-zinc-800/60">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-2">
                  Prefer email
                </div>
                <a
                  href="mailto:om@horsebarn.ai"
                  className="font-mono text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  om@horsebarn.ai
                </a>
              </div>
            </div>

            {/* Calendly embed */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl border border-zinc-800/70 bg-zinc-950/60 backdrop-blur-md overflow-hidden shadow-[0_0_80px_-20px_rgba(16,185,129,0.25)]"
            >
              <div className="border-b border-white/5 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  schedule · 30 min
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400/80">
                    Live
                  </span>
                </div>
              </div>
              <div
                className="calendly-inline-widget"
                data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=10b981`}
                style={{ minWidth: "320px", height: "720px" }}
              />
            </motion.div>
          </div>
        </Container>
      </Section>
    </PageShell>
  )
}
