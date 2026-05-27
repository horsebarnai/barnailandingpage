"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Cpu, Dna, Wallet } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section, SectionHeader } from "@/components/layout/section"

const LANES = [
  {
    icon: Wallet,
    eyebrow: "Farm Management",
    title: "The back office,",
    titleAccent: "modernized.",
    body:
      "Money, settlement, and the operational discipline a serious barn needs — running quietly in the background.",
    href: "/solutions/farm-management",
  },
  {
    icon: Dna,
    eyebrow: "Analysis",
    title: "The model that knows",
    titleAccent: "what happened next.",
    body:
      "Institutional-grade analytics for the decisions that move your operation forward.",
    href: "/solutions/analysis",
  },
  {
    icon: Cpu,
    eyebrow: "Workflow Agents",
    title: "Single-purpose AI",
    titleAccent: "for recurring work.",
    body:
      "Specialized agents that take the recurring back-office work off your desk — quietly, continuously, accurately.",
    href: "/solutions/workflow-agents",
  },
] as const

export function ProductLanes() {
  return (
    <Section rhythm="default" id="product-lanes" className="border-t border-white/[0.04]">
      <Container>
        <SectionHeader
          eyebrow="The Platform"
          title="Three lanes."
          titleAccent="One operating system."
          kicker="Each lane is its own product surface — built independently, used together. Tap a lane to see what it does."
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {LANES.map((lane, i) => {
            const Icon = lane.icon
            return (
              <motion.div
                key={lane.eyebrow}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <Link
                  href={lane.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-7 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_80px_-20px_rgba(16,185,129,0.4)] lg:p-8"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex h-full flex-col">
                    {/* Icon + arrow */}
                    <div className="mb-6 flex items-start justify-between">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/70 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/[0.06]">
                        <Icon
                          className="h-5 w-5 text-emerald-400"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 text-zinc-600 transition-all group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/80">
                      {lane.eyebrow}
                    </div>

                    <h3 className="mb-4 font-display text-2xl font-medium leading-tight tracking-tight text-white lg:text-3xl">
                      {lane.title}{" "}
                      <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
                        {lane.titleAccent}
                      </span>
                    </h3>

                    <p className="text-[15px] leading-relaxed text-zinc-400 flex-grow">
                      {lane.body}
                    </p>

                    <div className="mt-7 pt-6 border-t border-zinc-800/60 flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400/80 group-hover:text-emerald-300 transition-colors">
                        Explore
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
