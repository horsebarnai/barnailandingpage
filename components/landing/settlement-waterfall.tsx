"use client"

import { useState } from "react"
import { motion } from "framer-motion"

/* ============================================================
 * Module 2 — Settlement Waterfall
 *
 * Interactive Sankey-style flow:
 *   - 3 scenario chips swap the inflow + per-stream values
 *   - Single $ inflow at top, branches into 5 streams
 *   - Streams: Pro-Rata Share, Foal Share, Management Fee,
 *     Insurance Premium, Net Settlement
 *   - Thin emerald strokes with traveling "liquid" pulses
 *     (CSS keyframe drives stroke-dashoffset on overlay paths)
 *
 * SVG viewBox: 0..800 x 0..500
 *   - Inflow at (400, 70), trunk to (400, 180)
 *   - Branch point: (400, 180)
 *   - Endpoints at y=420, x ∈ {80, 240, 400, 560, 720}
 *     (10%, 30%, 50%, 70%, 90% — aligns with grid-cols-5 label row)
 * ============================================================ */

type Scenario = {
  id: string
  label: string
  inflow: number
  inflowDisplay: string
  splits: readonly [number, number, number, number, number] // percents → 1.0
}

const SCENARIOS: readonly Scenario[] = [
  {
    id: "fee",
    label: "$500K Stallion Fee",
    inflow: 500_000,
    inflowDisplay: "$500K",
    // Pro-Rata, Foal, Mgmt, Insurance, Net
    splits: [0.40, 0.25, 0.10, 0.05, 0.20],
  },
  {
    id: "purse",
    label: "$1.2M Race Purse",
    inflow: 1_200_000,
    inflowDisplay: "$1.2M",
    splits: [0.35, 0.10, 0.08, 0.05, 0.42],
  },
  {
    id: "sale",
    label: "$8M Horse Sale",
    inflow: 8_000_000,
    inflowDisplay: "$8M",
    splits: [0.50, 0.15, 0.07, 0.03, 0.25],
  },
] as const

const STREAMS = [
  { label: "Pro-Rata Share",    caption: "Co-owners by share %", x: 80 },
  { label: "Foal Share",        caption: "Breeding stake",       x: 240 },
  { label: "Management Fee",    caption: "Operator fee",         x: 400 },
  { label: "Insurance Premium", caption: "Mortality / care",     x: 560 },
  { label: "Net Settlement",    caption: "Final distribution",   x: 720 },
] as const

const ORIGIN_X = 400
const ORIGIN_Y = 180
const END_Y = 420

function streamPath(endX: number): string {
  const c1y = ORIGIN_Y + 90
  const c2y = END_Y - 70
  return `M ${ORIGIN_X} ${ORIGIN_Y} C ${ORIGIN_X} ${c1y}, ${endX} ${c2y}, ${endX} ${END_Y}`
}

/** Compact currency formatter: $420K, $1.2M, $4M, $560K. */
function fmtCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000
    return m % 1 === 0 ? `$${m}M` : `$${m.toFixed(1)}M`
  }
  return `$${Math.round(amount / 1000)}K`
}

export function SettlementWaterfall() {
  const [scenarioId, setScenarioId] = useState<string>("purse")
  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[1]

  return (
    <section
      id="settlement-waterfall"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-zinc-950/30 to-black" />

      <div className="relative mx-auto max-w-7xl">
        {/* Eyebrow + headline */}
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
            The Settlement <span className="text-zinc-500">Waterfall.</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-zinc-500 sm:text-base">
            One inflow, five auditable streams. Pick a scenario.
          </p>
        </motion.div>

        {/* Scenario chip row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
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
                className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-200 sm:px-4 sm:py-2 sm:text-xs ${
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

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto w-full max-w-3xl"
        >
          <svg
            viewBox="0 0 800 500"
            className="h-auto w-full"
            aria-hidden="true"
          >
            <defs>
              <filter id="sw-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.9" />
              </filter>
              <filter id="sw-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" />
              </filter>
            </defs>

            {/* Inflow: dynamic dollar amount */}
            <motion.text
              key={`inflow-bloom-${scenario.id}`}
              x={ORIGIN_X}
              y={70}
              textAnchor="middle"
              fill="rgb(74, 222, 128)"
              fontSize={44}
              fontFamily="var(--font-mono), ui-monospace, monospace"
              fontWeight={400}
              opacity={0.9}
              filter="url(#sw-glow-strong)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              {scenario.inflowDisplay}
            </motion.text>
            <motion.text
              key={`inflow-sharp-${scenario.id}`}
              x={ORIGIN_X}
              y={70}
              textAnchor="middle"
              fill="rgb(74, 222, 128)"
              fontSize={44}
              fontFamily="var(--font-mono), ui-monospace, monospace"
              fontWeight={400}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {scenario.inflowDisplay}
            </motion.text>
            <text
              x={ORIGIN_X}
              y={92}
              textAnchor="middle"
              fill="rgb(161, 161, 170)"
              fontSize={9}
              fontFamily="var(--font-mono), ui-monospace, monospace"
              letterSpacing="2"
            >
              INFLOW
            </text>

            {/* Trunk */}
            <line
              x1={ORIGIN_X} y1={108} x2={ORIGIN_X} y2={ORIGIN_Y}
              stroke="rgba(74, 222, 128, 0.55)" strokeWidth={1.5}
            />
            <line
              x1={ORIGIN_X} y1={108} x2={ORIGIN_X} y2={ORIGIN_Y}
              stroke="rgb(74, 222, 128)" strokeWidth={1.8}
              strokeDasharray="4 36" className="settlement-flow"
              filter="url(#sw-glow)"
            />

            {/* Branch point */}
            <circle cx={ORIGIN_X} cy={ORIGIN_Y} r={9} fill="none" stroke="rgba(74, 222, 128, 0.25)" strokeWidth={0.7} />
            <circle cx={ORIGIN_X} cy={ORIGIN_Y} r={4} fill="rgb(74, 222, 128)" opacity={0.9} />

            {/* 5 streams */}
            {STREAMS.map((s, i) => {
              const d = streamPath(s.x)
              return (
                <g key={s.label}>
                  <path
                    d={d}
                    stroke="rgba(74, 222, 128, 0.22)"
                    strokeWidth={1.5}
                    fill="none" strokeLinecap="round"
                  />
                  <path
                    d={d}
                    stroke="rgb(74, 222, 128)" strokeWidth={1.8}
                    fill="none" strokeLinecap="round"
                    strokeDasharray="4 36" className="settlement-flow"
                    style={{
                      animationDelay: `${i * 0.28}s`,
                      animationDuration: `${3.4 + (i % 2) * 0.5}s`,
                    }}
                    filter="url(#sw-glow)"
                  />
                  <circle cx={s.x} cy={END_Y} r={3} fill="rgb(74, 222, 128)" />
                  <circle cx={s.x} cy={END_Y} r={6} fill="none" stroke="rgba(74, 222, 128, 0.35)" strokeWidth={0.7} />
                </g>
              )
            })}
          </svg>

          {/* Label row — dynamic % + $ per stream. Mobile collapses to
              label + % only to fit under each SVG endpoint without clipping. */}
          <div className="mt-2 grid -translate-y-2 grid-cols-5 gap-1 sm:gap-2 lg:gap-3">
            {STREAMS.map((s, i) => {
              const pct = scenario.splits[i] ?? 0
              const amount = scenario.inflow * pct
              const isNetSettlement = s.label === "Net Settlement"
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  className={`rounded-md border px-1 py-2 text-center backdrop-blur-sm sm:px-2 sm:py-3 ${
                    isNetSettlement
                      ? "border-emerald-500/40 bg-emerald-500/[0.04] shadow-[0_0_24px_-8px_rgba(16,185,129,0.5)]"
                      : "border-emerald-500/20 bg-zinc-950/70"
                  }`}
                >
                  <div className="font-mono text-[8px] uppercase leading-tight tracking-[0.12em] text-zinc-300 sm:text-[9px] sm:tracking-[0.15em]">
                    {s.label}
                  </div>
                  {/* Dynamic numbers — key forces fade on scenario swap */}
                  <motion.div
                    key={`${s.label}-${scenario.id}-pct`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className={`mt-1 font-mono text-[11px] font-semibold tabular-nums sm:mt-1.5 sm:text-sm ${
                      isNetSettlement ? "text-emerald-300" : "text-emerald-400"
                    }`}
                  >
                    {Math.round(pct * 100)}%
                  </motion.div>
                  {/* $ amount + caption are hidden on mobile to keep 5-col layout uncramped */}
                  <motion.div
                    key={`${s.label}-${scenario.id}-amt`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.05 + i * 0.03 }}
                    className="hidden font-mono text-[10px] tabular-nums text-zinc-400 sm:block sm:text-xs"
                  >
                    {fmtCurrency(amount)}
                  </motion.div>
                  <div className="mt-1.5 hidden text-[9px] leading-tight text-zinc-500 sm:block">
                    {s.caption}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
