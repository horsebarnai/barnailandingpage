"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Check,
  type LucideIcon,
} from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section, SectionHeader } from "@/components/layout/section"
import { PageHero } from "@/components/layout/page-hero"
import type { Crumb } from "@/components/layout/breadcrumbs"

/* ============================================================
 * Reusable Solution Page Template
 *
 * One config object → a complete premium solution page. Pages
 * pass `SolutionContent` and the template handles layout, motion,
 * typography, and visual hierarchy.
 *
 * Sections (all but hero/summary are optional):
 *   1. Hero               — eyebrow / title / kicker / CTAs
 *   2. Summary            — "what it does" in one short paragraph
 *   3. Feature blocks     — 3–5 cards with icon / title / body
 *   4. Workflow           — numbered steps showing the agent at work
 *   5. Output example     — a sample of what the agent produces
 *   6. Related tools      — cross-links to adjacent modules
 *   7. CTA                — Book a demo / Contact
 * ============================================================ */

export type FeatureBlock = {
  icon: LucideIcon
  title: string
  body: string
}

export type WorkflowStep = {
  num: string // "01", "02"...
  title: string
  body: string
}

export type OutputRow = {
  label: string
  value: string
  emphasis?: boolean
}

export type RelatedTool = {
  name: string
  href: string
  blurb: string
}

export type SolutionContent = {
  // Hero
  eyebrow: string
  title: string
  titleAccent?: string
  kicker?: string
  crumbs: Crumb[]

  // Summary
  summary: {
    headline: string
    body: string
    bullets: string[]
  }

  // Feature blocks
  features: {
    eyebrow: string
    title: string
    titleAccent?: string
    items: FeatureBlock[]
  }

  // Workflow
  workflow: {
    eyebrow: string
    title: string
    titleAccent?: string
    steps: WorkflowStep[]
  }

  // Output example
  output: {
    eyebrow: string
    title: string
    titleAccent?: string
    kicker?: string
    sampleLabel: string
    sampleTitle: string
    sampleSubtitle?: string
    rows: OutputRow[]
  }

  // Related tools
  related: {
    title: string
    titleAccent?: string
    items: RelatedTool[]
  }

  // CTA
  cta: {
    title: string
    titleAccent?: string
    kicker?: string
  }
}

/* ─── Section: Summary ─────────────────────────────────────── */

function SummarySection({ summary }: { summary: SolutionContent["summary"] }) {
  return (
    <Section rhythm="default" className="border-t border-white/[0.04]">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/90 mb-4">
              What it does
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-medium leading-tight tracking-tight text-white">
              {summary.headline}
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-zinc-300 mb-8">
              {summary.body}
            </p>
            <ul className="space-y-3 border-t border-zinc-800/60 pt-6">
              {summary.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/[0.08]">
                    <Check className="h-3 w-3 text-emerald-400" strokeWidth={3} />
                  </span>
                  <span className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ─── Section: Features ────────────────────────────────────── */

function FeaturesSection({
  features,
}: {
  features: SolutionContent["features"]
}) {
  return (
    <Section rhythm="default" className="border-t border-white/[0.04]">
      <Container>
        <SectionHeader
          eyebrow={features.eyebrow}
          title={features.title}
          titleAccent={features.titleAccent}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-7 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_60px_-20px_rgba(16,185,129,0.4)]"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/70 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/[0.06]">
                    <Icon
                      className="h-5 w-5 text-emerald-400"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mb-3 text-lg font-semibold leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-zinc-400">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ─── Section: Workflow ────────────────────────────────────── */

function WorkflowSection({
  workflow,
}: {
  workflow: SolutionContent["workflow"]
}) {
  return (
    <Section rhythm="default" className="border-t border-white/[0.04]">
      <Container>
        <SectionHeader
          eyebrow={workflow.eyebrow}
          title={workflow.title}
          titleAccent={workflow.titleAccent}
        />

        <div className="mt-14">
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-800/40 md:grid-cols-2 lg:grid-cols-4">
            {workflow.steps.map((step, i) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative bg-zinc-950/90 p-7 lg:p-8"
              >
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/[0.08] font-mono text-[11px] font-semibold text-emerald-400 tabular-nums">
                    {step.num}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400/70">
                    Step {step.num}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-semibold leading-tight text-white">
                  {step.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-zinc-400">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}

/* ─── Section: Output sample ───────────────────────────────── */

function OutputSection({ output }: { output: SolutionContent["output"] }) {
  return (
    <Section rhythm="default" className="border-t border-white/[0.04]">
      <Container>
        <SectionHeader
          eyebrow={output.eyebrow}
          title={output.title}
          titleAccent={output.titleAccent}
          kicker={output.kicker}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 mx-auto max-w-3xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-md shadow-[0_40px_100px_-30px_rgba(16,185,129,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]">
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-zinc-900/80 bg-zinc-950/80 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                {output.sampleLabel}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400/80">
                  Live
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 lg:p-8">
              <div className="mb-6 border-b border-zinc-800/60 pb-5">
                <div className="font-display text-2xl font-medium leading-tight text-white lg:text-3xl">
                  {output.sampleTitle}
                </div>
                {output.sampleSubtitle && (
                  <div className="mt-1.5 text-sm text-zinc-500">
                    {output.sampleSubtitle}
                  </div>
                )}
              </div>

              <dl className="space-y-0">
                {output.rows.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-baseline justify-between gap-4 py-3 ${
                      i > 0 ? "border-t border-zinc-800/50" : ""
                    } ${
                      row.emphasis
                        ? "mt-4 -mx-4 rounded-md border border-emerald-500/30 bg-emerald-500/[0.04] px-4 shadow-[0_0_28px_-10px_rgba(16,185,129,0.45)]"
                        : ""
                    }`}
                  >
                    <dt
                      className={`flex-1 text-sm ${
                        row.emphasis
                          ? "font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400/80"
                          : "text-zinc-400"
                      }`}
                    >
                      {row.label}
                    </dt>
                    <dd
                      className={`flex-shrink-0 text-right font-mono tabular-nums ${
                        row.emphasis
                          ? "text-xl font-bold text-emerald-300"
                          : "text-sm font-semibold text-zinc-100"
                      }`}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

/* ─── Section: Related tools ───────────────────────────────── */

function RelatedSection({
  related,
}: {
  related: SolutionContent["related"]
}) {
  return (
    <Section rhythm="default" className="border-t border-white/[0.04]">
      <Container>
        <SectionHeader
          eyebrow="Related"
          title={related.title}
          titleAccent={related.titleAccent}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {related.items.map((tool, i) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={tool.href}
                className="group relative block overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-950/50 p-6 transition-all duration-300 hover:border-emerald-500/40 hover:bg-zinc-950/80"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-[13.5px] leading-relaxed text-zinc-400">
                      {tool.blurb}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 flex-shrink-0 text-zinc-600 transition-all group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ─── Section: CTA ─────────────────────────────────────────── */

export function TemplateCTA({
  cta,
}: {
  cta: SolutionContent["cta"]
}) {
  return (
    <Section rhythm="loose" className="border-t border-white/[0.04]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[820px] rounded-full bg-emerald-500/[0.10] blur-[140px]" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative text-center mx-auto max-w-3xl"
        >
          <h2 className="font-display text-3xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-white">
            {cta.title}{" "}
            {cta.titleAccent && (
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
                {cta.titleAccent}
              </span>
            )}
          </h2>
          {cta.kicker && (
            <p className="mt-6 text-base lg:text-lg text-zinc-400 leading-relaxed">
              {cta.kicker}
            </p>
          )}

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/book-a-demo"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_32px_-6px_rgba(74,222,128,0.65)] transition-all hover:bg-emerald-400 hover:shadow-[0_0_48px_-2px_rgba(74,222,128,0.85)]"
            >
              Book a Demo
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/40 px-7 py-3.5 text-sm font-semibold text-zinc-200 transition-all hover:border-zinc-500 hover:text-white"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

/* ─── The full template ────────────────────────────────────── */

export type SolutionTemplateOptions = {
  intro?: React.ReactNode
  extra?: React.ReactNode
  hideFeatures?: boolean
  hideWorkflow?: boolean
  hideRelated?: boolean
}

export function SolutionPageTemplate({
  content,
  intro,
  extra,
  hideFeatures = false,
  hideWorkflow = false,
  hideRelated = false,
}: {
  content: SolutionContent
} & SolutionTemplateOptions) {
  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        titleAccent={content.titleAccent}
        kicker={content.kicker}
        crumbs={content.crumbs}
        primaryCta={{ name: "Book a Demo", href: "/book-a-demo" }}
        secondaryCta={{ name: "Contact Sales", href: "/contact" }}
      />
      {intro}
      {!hideFeatures && <FeaturesSection features={content.features} />}
      {!hideWorkflow && <WorkflowSection workflow={content.workflow} />}
      <OutputSection output={content.output} />
      {extra}
      {!hideRelated && <RelatedSection related={content.related} />}
      <TemplateCTA cta={content.cta} />
    </>
  )
}
