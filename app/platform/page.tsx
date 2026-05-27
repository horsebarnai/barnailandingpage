import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { PageShell } from "@/components/layout/page-shell"
import { PageHero } from "@/components/layout/page-hero"
import { Container } from "@/components/layout/container"
import { Section, SectionHeader } from "@/components/layout/section"
import { TemplateCTA } from "@/components/templates/solution-page"
import { DataMoat } from "@/components/landing/data-moat"
import { VALUE_PILLARS } from "@/lib/site-content/value-pillars"

export const metadata: Metadata = {
  title: "Platform · Barn AI",
  description:
    "Four standards. One operating system. The institutional foundation underneath every Barn AI workflow.",
}

export default function PlatformOverviewPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="The Platform"
        title="Four standards."
        titleAccent="One operating system."
        kicker="Barn AI answers to four outcomes — compliance, operational lift, frictionless onboarding, and multi-generational legacy. Everything we build sits underneath one of these standards."
        crumbs={[{ name: "Platform" }]}
        primaryCta={{ name: "Book a Demo", href: "/book-a-demo" }}
        secondaryCta={{ name: "Talk to Sales", href: "/contact" }}
      />

      {/* Four Pillars — static grid view (distinct from the home accordion) */}
      <Section rhythm="default" className="border-t border-white/[0.04]">
        <Container>
          <SectionHeader
            eyebrow="The Four Pillars"
            title="What the platform"
            titleAccent="holds itself to."
            kicker="The standards we measure against — and the outcomes you should hold us to."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {VALUE_PILLARS.map((p, i) => {
              const Icon = p.icon
              return (
                <Link
                  key={p.key}
                  href={p.href}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-7 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_60px_-20px_rgba(16,185,129,0.4)] lg:p-9"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex h-full flex-col">
                    <div className="mb-6 flex items-start justify-between">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/70 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/[0.06]">
                        <Icon
                          className="h-5 w-5 text-emerald-400"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-700 tabular-nums">
                        Pillar / {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mb-2 font-display text-2xl font-medium leading-snug text-white">
                      {p.name}
                    </h3>
                    <p className="mb-5 text-[13.5px] leading-snug text-emerald-300/80 italic">
                      {p.tagline}
                    </p>

                    <p className="text-[14.5px] leading-relaxed text-zinc-400 flex-grow">
                      {p.body}
                    </p>

                    <div className="mt-7 pt-5 border-t border-zinc-800/60 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400/70">
                        Go deeper
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-zinc-600 transition-all group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Under the hood — DataMoat triptych as the architectural anchor */}
      <DataMoat />

      <TemplateCTA
        cta={{
          title: "Walk through the architecture",
          titleAccent: "with our team.",
          kicker:
            "Bring your hardest questions — security, privacy, integration, scale. We answer every one.",
        }}
      />
    </PageShell>
  )
}
