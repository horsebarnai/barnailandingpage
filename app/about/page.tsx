import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Compass, Mountain, Telescope } from "lucide-react"

import { PageShell } from "@/components/layout/page-shell"
import { PageHero } from "@/components/layout/page-hero"
import { Container } from "@/components/layout/container"
import { Section, SectionHeader } from "@/components/layout/section"
import { TemplateCTA } from "@/components/templates/solution-page"

export const metadata: Metadata = {
  title: "About · Barn AI",
  description:
    "The story behind Barn AI — and why the equine industry deserves an institutional-grade operating system of its own.",
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

      {/* Mission */}
      <Section rhythm="default" className="border-t border-white/[0.04]">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/90 mb-4">
                Mission
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-medium leading-tight tracking-tight text-white">
                Build the back office the equine industry has always needed.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
              <p>
                You command an asset class that moves the world. Until recently,
                you have run it with the tools of a hobbyist — twenty owners
                across twenty text threads, breeding certificates hunted by
                phone, settlements that take weeks, disputes that strain
                relationships.
              </p>
              <p>
                That is over. Barn AI brings together every recurring workflow
                in the operation of a modern barn — settlement, syndicate
                reporting, compliance, vet records, race fit, breeding
                analytics — and turns each one into a continuous, auditable,
                premium experience.
              </p>
              <p className="text-zinc-400 italic">
                The administrative friction of the business does not disappear.
                It moves below the surface.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Principles */}
      <Section rhythm="default" className="border-t border-white/[0.04]">
        <Container>
          <SectionHeader
            eyebrow="Principles"
            title="What we build for."
          />

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
          title: "Build with us.",
          titleAccent: "Run on us.",
          kicker:
            "We're working with a small set of partners as we move out of private beta. If you operate at the institutional level, we'd like to talk.",
        }}
      />
    </PageShell>
  )
}
