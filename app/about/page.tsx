import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Compass, Mountain, Telescope } from "lucide-react"

import { PageShell } from "@/components/layout/page-shell"
import { PageHero } from "@/components/layout/page-hero"
import { Container } from "@/components/layout/container"
import { Section, SectionHeader } from "@/components/layout/section"
import { TemplateCTA } from "@/components/templates/solution-page"
import { DataMoat } from "@/components/landing/data-moat"
import { VALUE_PILLARS } from "@/lib/site-content/value-pillars"

export const metadata: Metadata = {
  title: "About · Barn AI",
  description:
    "The team, the principles, and the four standards Barn AI holds itself to.",
}

const PRINCIPLES = [
  {
    icon: Mountain,
    title: "Institutional rigor",
    body: "Money, compliance, and decisions in this industry deserve the same rigor capital markets take for granted.",
  },
  {
    icon: Compass,
    title: "Operator-led",
    body: "Built with the people who actually run barns, syndicates, and bloodstock practices — not for them, but with them.",
  },
  {
    icon: Telescope,
    title: "Long view",
    body: "Five hundred generations behind. Decades of outcomes ahead. We build for the operator who's still here in twenty years.",
  },
] as const

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title="The equine industry"
        titleAccent="deserves its own operating system."
        kicker="Barn AI exists to give breeding operations, syndicates, and bloodstock practices the institutional tooling capital markets have had for decades — without compromising the privacy or sovereignty operators expect."
        crumbs={[{ name: "About" }]}
        primaryCta={{ name: "Meet the Leadership", href: "/about/leadership" }}
        secondaryCta={{ name: "Contact Us", href: "/contact" }}
      />

      {/* Four Pillars — the standards the operating system holds itself to.
          Moved here from the retired /platform overview. */}
      <Section rhythm="default" className="border-t border-white/[0.04]">
        <Container>
          <SectionHeader
            eyebrow="The Four Pillars"
            title="What we hold"
            titleAccent="ourselves to."
            kicker="Every line of work on Barn AI sits under one of these four standards — and we measure ourselves against the outcome, not the technique."
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

      {/* Architectural anchor */}
      <DataMoat />

      {/* Principles — distinct from the pillars: these are how we BUILD,
          not what we deliver. */}
      <Section rhythm="default" className="border-t border-white/[0.04]">
        <Container>
          <SectionHeader eyebrow="Principles" title="How we work." />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map((p) => {
              const Icon = p.icon
              return (
                <div
                  key={p.title}
                  className="relative overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-7 backdrop-blur-sm"
                >
                  <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/70">
                    <Icon
                      className="h-5 w-5 text-emerald-400"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-zinc-400">
                    {p.body}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Leadership preview */}
      <Section rhythm="default" className="border-t border-white/[0.04]">
        <Container>
          <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-8 lg:p-12 backdrop-blur-sm">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/90 mb-4">
                  Leadership
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-medium leading-tight tracking-tight text-white max-w-2xl">
                  A team that has run barns,{" "}
                  <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
                    built companies, and closed deals.
                  </span>
                </h2>
                <p className="mt-5 text-base lg:text-lg text-zinc-400 leading-relaxed max-w-2xl">
                  Multi-generational equine knowledge meets technical
                  builders, attorneys, and finance veterans. Meet the team
                  behind Barn AI.
                </p>
              </div>
              <Link
                href="/about/leadership"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_28px_-6px_rgba(74,222,128,0.6)] transition-all hover:bg-emerald-400"
              >
                Meet the Team
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <TemplateCTA
        cta={{
          title: "We work with a few operators",
          titleAccent: "at a time.",
          kicker:
            "Private beta is invite-only and intentionally narrow. If you run at the institutional level, tell us about your operation — no pitch, just a working session.",
        }}
      />
    </PageShell>
  )
}
