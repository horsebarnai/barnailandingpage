"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Brain, ClockFading, Layers3 } from "lucide-react"

import { PageShell } from "@/components/layout/page-shell"
import { PageHero } from "@/components/layout/page-hero"
import { Container } from "@/components/layout/container"
import { Section, SectionHeader } from "@/components/layout/section"
import { TemplateCTA } from "@/components/templates/solution-page"
import { RegulatoryCompliance } from "@/components/landing/regulatory-compliance"
import { UntangleScroll } from "@/components/landing/untangle-scroll"

const TRAITS = [
  {
    icon: ClockFading,
    title: "Always on.",
    body: "The roster runs continuously. Work that used to consume your afternoons happens beneath the surface — before you arrive, after you leave, on weekends.",
  },
  {
    icon: Brain,
    title: "Specialized.",
    body: "Each worker is tuned to one recurring task in the operation. Narrow enough to be uncannily good. Numerous enough that the back office runs itself.",
  },
  {
    icon: Layers3,
    title: "Composed.",
    body: "Workers compose. What one captures, another reconciles, another reports. You see one operation, working as one.",
  },
] as const

export default function WorkflowAgentsHubPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Solutions · Workflow Agents"
        title="Specialized workers,"
        titleAccent="always on."
        kicker="A roster of AI workers, each tuned to a recurring task in your operation. They show up before you ask. They finish before you notice. They never ask for credit."
        crumbs={[
          { name: "Solutions" },
          { name: "Workflow Agents" },
        ]}
        primaryCta={{ name: "Book a Demo", href: "/book-a-demo" }}
        secondaryCta={{ name: "Talk to Sales", href: "/contact" }}
      />

      {/* Chaos → clarity: scroll-pinned visual showing eight operational
          surfaces resolving from a tangle into a clean grid. */}
      <UntangleScroll />

      {/* Three traits — what makes the roster different */}
      <Section rhythm="default" className="border-t border-white/[0.04]">
        <Container>
          <SectionHeader
            eyebrow="The roster"
            title="Three things they"
            titleAccent="all have in common."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TRAITS.map((t, i) => {
              const Icon = t.icon
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="relative overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-7 backdrop-blur-sm lg:p-8"
                >
                  <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/70">
                    <Icon
                      className="h-5 w-5 text-emerald-400"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mb-3 font-display text-xl font-medium leading-tight text-white">
                    {t.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-zinc-400">
                    {t.body}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* The diagram — RegulatoryCompliance as the centerpiece visual */}
      <RegulatoryCompliance />

      {/* Soft pivot to demo — no agent enumeration */}
      <Section rhythm="default" className="border-t border-white/[0.04]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/90">
              The Roster
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-medium leading-tight tracking-tight text-white">
              We don't put the roster{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
                on the front page.
              </span>
            </h2>
            <p className="mt-6 text-base lg:text-lg text-zinc-400 leading-relaxed">
              The specific workers, the tasks they handle, the integrations
              behind them — that's what we show the operators we work with
              directly. Book a working session and we'll walk you through the
              roster that maps to your operation.
            </p>
            <Link
              href="/book-a-demo"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_28px_-4px_rgba(74,222,128,0.6)] transition-all hover:bg-emerald-400 hover:shadow-[0_0_44px_-2px_rgba(74,222,128,0.8)]"
            >
              See the roster
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </Container>
      </Section>

      <TemplateCTA
        cta={{
          title: "Bring the work",
          titleAccent: "you'd rather not do.",
          kicker:
            "Walk us through your week. We'll show you which workers earn their place on day one.",
        }}
      />
    </PageShell>
  )
}
