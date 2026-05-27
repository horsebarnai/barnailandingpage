"use client"

import { motion } from "framer-motion"
import { FileStack, MessagesSquare, ScrollText } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

/* ============================================================
 * The Hidden Tax of Horse Management
 *
 * Editorial problem statement. No agent names, no methodology —
 * just a recognition of the quiet, expensive administrative
 * infrastructure every elite operation already runs on.
 * ============================================================ */

const TAX_FACETS = [
  {
    icon: FileStack,
    eyebrow: "The Paper Tax",
    body:
      "Binders that move with the foals. Vet reports that arrive by fax. Sale receipts in three drawers across two offices. Records that exist — somewhere — but never when you need them.",
  },
  {
    icon: MessagesSquare,
    eyebrow: "The Coordination Tax",
    body:
      "Twenty owners across twenty text threads. Bills, decisions, and questions that ricochet between trainers, vets, and accountants. The operation runs — but only because everyone is exhausted.",
  },
  {
    icon: ScrollText,
    eyebrow: "The Reconciliation Tax",
    body:
      "Four legacy databases for one pedigree. Spreadsheets that disagree at the decimal. Settlements that take weeks. Disputes that strain relationships even when the math eventually works out.",
  },
] as const

export function HiddenTax() {
  return (
    <Section rhythm="default" className="border-t border-white/[0.04]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute top-1/4 left-1/3 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-500/[0.05] blur-[140px]" />
      </div>

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* Anchor — editorial headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <h2 className="font-display text-3xl lg:text-5xl font-medium leading-[1.05] tracking-tight text-white">
              The hidden tax of{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
                horse management.
              </span>
            </h2>
            <p className="mt-6 text-base lg:text-lg text-zinc-400 leading-relaxed">
              Every elite operation runs on a quiet, expensive infrastructure
              of binders, spreadsheets, text threads, and mismatched software.
              The cost compounds, invisibly — paid in hours, in attention, and
              in the decisions you never had time to make.
            </p>
            <p className="mt-5 font-display italic text-base lg:text-lg text-zinc-500 leading-relaxed border-l-2 border-emerald-500/40 pl-5">
              You command an asset class that moves the world. Until now, you
              have run it with the tools of a hobbyist.
            </p>
          </motion.div>

          {/* Facet stack */}
          <div className="space-y-4">
            {TAX_FACETS.map((facet, i) => {
              const Icon = facet.icon
              return (
                <motion.div
                  key={facet.eyebrow}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-7 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_0_60px_-20px_rgba(16,185,129,0.3)] lg:p-8"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative grid grid-cols-[auto_1fr] gap-5 items-start">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/70 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/[0.06]">
                      <Icon
                        className="h-5 w-5 text-emerald-400"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400/80 mb-2">
                        {facet.eyebrow}
                      </div>
                      <p className="text-[15px] lg:text-base leading-relaxed text-zinc-300">
                        {facet.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
