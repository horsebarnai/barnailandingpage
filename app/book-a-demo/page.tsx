"use client"

import Script from "next/script"
import { motion } from "framer-motion"

import { PageShell } from "@/components/layout/page-shell"
import { PageHero } from "@/components/layout/page-hero"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

const CALENDLY_URL = "https://calendly.com/om-horsebarn/30min"

const SCHEDULE = [
  {
    time: "0–5 min",
    title: "Your operation",
    detail:
      "Bring a real scenario — a syndicate, a breeding shortlist, a settlement. We start where you are.",
  },
  {
    time: "5–20 min",
    title: "Live walkthrough",
    detail:
      "A working demo of the modules most relevant to your operation, run on real data.",
  },
  {
    time: "20–27 min",
    title: "Fit & scope",
    detail:
      "Honest answers on fit, scope, and the onboarding timeline — including where we're not a fit.",
  },
  {
    time: "27–30 min",
    title: "Next steps",
    detail:
      "No hard sell. We work with a small set of partners, so we'll be straight about what's next.",
  },
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
                How the 30 minutes{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
                  actually go.
                </span>
              </h2>
              <ol className="relative space-y-7 border-l border-zinc-800/70 pl-7">
                {SCHEDULE.map((item) => (
                  <li key={item.time} className="relative">
                    <span
                      className="absolute -left-[calc(1.75rem+1px)] top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-emerald-400 bg-zinc-950 shadow-[0_0_10px_rgba(16,185,129,0.6)]"
                      aria-hidden="true"
                    />
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400/90">
                      {item.time}
                    </div>
                    <div className="mt-1 text-sm sm:text-base font-medium text-white">
                      {item.title}
                    </div>
                    <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ol>

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
