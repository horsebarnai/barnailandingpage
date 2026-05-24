"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

/* ============================================================
 * Module 2 — Settlement Waterfall · Smart Ledger
 *
 * Premium "ledger spread" metaphor (replaces the prior SVG
 * branching diagram entirely):
 *
 *   ┌─ LEFT PAGE ─────────┬─ RIGHT PAGE ────────┐
 *   │ Entry header        │ Distribution         │
 *   │ Scenario name       │ ─ Pro-Rata Share     │
 *   │ Inflow amount (lg)  │ ─ Foal Share         │
 *   │ Timestamp           │ ─ Management Fee     │
 *   │                     │ ─ Insurance Premium  │
 *   │ Status pills        │ ━━━━━━━━━━━━━━━━━━━ │
 *   │                     │ NET SETTLEMENT (hi)  │
 *   └─────────────────────┴──────────────────────┘
 *
 * On scenario change, the spread executes a 3D rotateY flip via
 * AnimatePresence (perspective on parent, transform-style on
 * child). Respects prefers-reduced-motion via useReducedMotion.
 *
 * Typography: Inter (font-sans) throughout, mono only for
 * numerics and short status codes. The previous all-caps mono
 * scaffold for prose is gone.
 * ============================================================ */

type Scenario = {
  id: string
  label: string
  inflow: number
  splits: readonly [number, number, number, number, number] // 1.0 across all five
}

const SCENARIOS: readonly Scenario[] = [
  {
    id: "fee",
    label: "$500K Stallion Fee",
    inflow: 500_000,
    splits: [0.40, 0.25, 0.10, 0.05, 0.20],
  },
  {
    id: "purse",
    label: "$1.2M Race Purse",
    inflow: 1_200_000,
    splits: [0.35, 0.10, 0.08, 0.05, 0.42],
  },
  {
    id: "sale",
    label: "$8M Horse Sale",
    inflow: 8_000_000,
    splits: [0.50, 0.15, 0.07, 0.03, 0.25],
  },
] as const

const STREAMS = [
  {
    label: "Pro-Rata Share",
    descriptor: "Co-owner Split",
  },
  {
    label: "Foal Share",
    descriptor: "Breeding Stake",
  },
  {
    label: "Management Fee",
    descriptor: "Operator Fee",
  },
  {
    label: "Insurance Premium",
    descriptor: "Mortality / Care",
  },
  {
    label: "Net Settlement",
    descriptor: "Final Distribution",
  },
] as const

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Automated Inflow",
    subtitle: "The moment track or sale funds are received.",
  },
  {
    num: "02",
    title: "Smart Contract Allocation",
    subtitle: "Predefined contract splits compute on receipt.",
  },
  {
    num: "03",
    title: "Instant Wallet Settlement",
    subtitle: "Funds bypass manual wires, landing in partner accounts.",
  },
] as const

/** Compact: $420K, $1.2M, $4M. */
function fmtCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000
    return m % 1 === 0 ? `$${m}M` : `$${m.toFixed(1)}M`
  }
  return `$${Math.round(amount / 1000)}K`
}

/** Full: $1,200,000. */
function fmtFull(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

/* ─── The 3D Ledger Spread ─────────────────────────────────── */

function LedgerSpread({ scenario }: { scenario: Scenario }) {
  const items = STREAMS.map((s, i) => ({
    ...s,
    pct: scenario.splits[i] ?? 0,
    amount: scenario.inflow * (scenario.splits[i] ?? 0),
  }))
  const distribution = items.slice(0, 4)
  const net = items[4]

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70 shadow-[0_40px_100px_-30px_rgba(16,185,129,0.30),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl lg:grid-cols-2">
      {/* ── LEFT PAGE · Transaction Summary ── */}
      <div className="relative border-b border-zinc-800/80 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
        {/* Ruled "ledger" line under eyebrow */}
        <div className="absolute inset-x-6 top-[3.25rem] h-px bg-zinc-800/60 sm:inset-x-8 lg:inset-x-10" />

        <div className="mb-7 text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-400/80">
          Settlement Ledger · Entry No. 0042
        </div>

        <h3 className="font-display text-3xl font-medium leading-tight tracking-tight text-white lg:text-4xl">
          {scenario.label}
        </h3>
        <div className="mt-2 text-sm text-zinc-500">
          May 24 · 2026 · 14:32 EST
        </div>

        <div className="mt-10">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Inflow Received
          </div>
          <div className="text-5xl font-semibold leading-none tracking-tight text-emerald-400 tabular-nums lg:text-6xl">
            {fmtFull(scenario.inflow)}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          {["Received", "Allocated", "Settled"].map((state) => (
            <span
              key={state}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-400/90"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]" />
              {state}
            </span>
          ))}
        </div>
      </div>

      {/* ── RIGHT PAGE · Distribution Breakdown ── */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="mb-7 text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-400/80">
          Distribution
        </div>

        <div className="space-y-0">
          {distribution.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-baseline justify-between gap-3 py-3.5 ${
                i > 0 ? "border-t border-zinc-800/50" : ""
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold leading-tight text-zinc-100">
                  {item.label}
                </div>
                <div className="mt-1 text-[11px] text-zinc-500">
                  {item.descriptor}
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-sm font-semibold leading-tight text-zinc-100 tabular-nums">
                  {fmtCurrency(item.amount)}
                </div>
                <div className="mt-1 text-[11px] font-semibold text-emerald-400/70 tabular-nums">
                  {Math.round(item.pct * 100)}%
                </div>
              </div>
            </div>
          ))}

          {/* Net Settlement — highlighted bottom line */}
          <div className="mt-4 flex items-baseline justify-between gap-3 rounded-md border border-emerald-500/30 bg-emerald-500/[0.04] px-4 py-4 shadow-[0_0_36px_-10px_rgba(16,185,129,0.5)]">
            <div className="min-w-0 flex-1">
              <div className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
                Net Settlement
              </div>
              <div className="text-base font-semibold leading-tight text-white">
                {net.label}
              </div>
              <div className="mt-0.5 text-[11px] text-emerald-400/70">
                {net.descriptor}
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-2xl font-bold leading-tight text-emerald-300 tabular-nums lg:text-3xl">
                {fmtCurrency(net.amount)}
              </div>
              <div className="mt-0.5 text-sm font-semibold text-emerald-400 tabular-nums">
                {Math.round(net.pct * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Section ──────────────────────────────────────────────── */

export function SettlementWaterfall() {
  const [scenarioId, setScenarioId] = useState<string>("purse")
  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[1]
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="settlement-waterfall"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-zinc-950/30 to-black" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center lg:mb-12"
        >
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
            Operational Logic
          </span>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Every Dollar <span className="text-zinc-500">Accounted For.</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-zinc-500 sm:text-base">
            One inflow. Five streams. Every partner's share, computed and recorded the moment the money lands.
          </p>
        </motion.div>

        {/* Process flow — Inter sans, not mono. Step titles are
            big, sentence-case, and legible. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-4xl"
        >
          <div className="grid grid-cols-1 divide-y divide-zinc-800/60 overflow-hidden rounded-lg border border-zinc-800/70 bg-zinc-950/50 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 font-mono text-[11px] font-semibold text-emerald-400 tabular-nums">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400/80">
                    Step {step.num}
                  </span>
                </div>
                <div className="text-base font-semibold leading-tight tracking-tight text-zinc-100">
                  {step.title}
                </div>
                <div className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
                  {step.subtitle}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scenario chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          role="tablist"
          aria-label="Settlement scenarios"
        >
          {SCENARIOS.map((s) => {
            const active = s.id === scenarioId
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setScenarioId(s.id)}
                className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 sm:text-xs ${
                  active
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 shadow-[0_0_20px_-4px_rgba(16,185,129,0.4)]"
                    : "border-zinc-800 bg-zinc-950/70 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                {s.label}
              </button>
            )
          })}
        </motion.div>

        {/* The 3D Ledger Flipbook */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto max-w-4xl"
          style={{ perspective: "1800px" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={scenario.id}
              initial={reduceMotion ? { opacity: 0 } : { rotateY: 80, opacity: 0 }}
              animate={reduceMotion ? { opacity: 1 } : { rotateY: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { rotateY: -80, opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0.2 : 0.55,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              <LedgerSpread scenario={scenario} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
