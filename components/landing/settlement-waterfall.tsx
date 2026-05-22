"use client"

import { motion } from "framer-motion"

/* ============================================================
 * Module 2 — Settlement Waterfall
 *
 * Vertical Sankey-style flow diagram:
 *   - Single $ inflow at top
 *   - Branches into 5 elegant streams: Pro-Rata Share, Foal Share,
 *     Management Fee, Insurance Premium, Net Settlement
 *   - Thin emerald strokes with traveling "liquid" pulses
 *     (CSS keyframe drives stroke-dashoffset on overlay paths)
 *
 * SVG viewBox: 0..800 x 0..500
 *   - Inflow $ at (400, 70)
 *   - Trunk: (400, 110) → (400, 180) — short vertical
 *   - Branch point: (400, 180)
 *   - Stream endpoints at y=420, evenly spread across x=80,240,400,560,720
 *     (10%, 30%, 50%, 70%, 90% of width — aligns with grid-cols-5 label row)
 * ============================================================ */

const STREAMS = [
  { label: "Pro-Rata Share", x: 80 },
  { label: "Foal Share", x: 240 },
  { label: "Management Fee", x: 400 },
  { label: "Insurance Premium", x: 560 },
  { label: "Net Settlement", x: 720 },
] as const

const ORIGIN_X = 400
const ORIGIN_Y = 180
const END_Y = 420

/** Cubic bezier from the branch point down to each stream endpoint.
 *  Control points keep the trunk vertical at the top, then ease out
 *  toward the endpoint x — gives the "spreading water" silhouette. */
function streamPath(endX: number): string {
  const c1y = ORIGIN_Y + 90
  const c2y = END_Y - 70
  return `M ${ORIGIN_X} ${ORIGIN_Y} C ${ORIGIN_X} ${c1y}, ${endX} ${c2y}, ${endX} ${END_Y}`
}

export function SettlementWaterfall() {
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
          className="mb-12 text-center lg:mb-16"
        >
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
            Operational Logic
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            The Settlement <span className="text-zinc-500">Waterfall.</span>
          </h2>
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
              {/* Soft bloom for the streams */}
              <filter id="sw-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.9" />
              </filter>

              {/* Brighter bloom just for the $ */}
              <filter id="sw-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" />
              </filter>
            </defs>

            {/* ----- Inflow: the $ symbol ----- */}
            <text
              x={ORIGIN_X}
              y={70}
              textAnchor="middle"
              fill="rgb(74, 222, 128)"
              fontSize={52}
              fontFamily="var(--font-mono), ui-monospace, monospace"
              fontWeight={300}
              opacity={0.95}
              filter="url(#sw-glow-strong)"
            >
              $
            </text>
            <text
              x={ORIGIN_X}
              y={70}
              textAnchor="middle"
              fill="rgb(74, 222, 128)"
              fontSize={52}
              fontFamily="var(--font-mono), ui-monospace, monospace"
              fontWeight={300}
            >
              $
            </text>
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

            {/* ----- Trunk: $ → branch point ----- */}
            <line
              x1={ORIGIN_X}
              y1={108}
              x2={ORIGIN_X}
              y2={ORIGIN_Y}
              stroke="rgba(74, 222, 128, 0.55)"
              strokeWidth={1.5}
            />
            {/* Trunk flow overlay */}
            <line
              x1={ORIGIN_X}
              y1={108}
              x2={ORIGIN_X}
              y2={ORIGIN_Y}
              stroke="rgb(74, 222, 128)"
              strokeWidth={1.8}
              strokeDasharray="4 36"
              className="settlement-flow"
              filter="url(#sw-glow)"
            />

            {/* ----- Branch point ----- */}
            <circle cx={ORIGIN_X} cy={ORIGIN_Y} r={9} fill="none" stroke="rgba(74, 222, 128, 0.25)" strokeWidth={0.7} />
            <circle cx={ORIGIN_X} cy={ORIGIN_Y} r={4} fill="rgb(74, 222, 128)" opacity={0.9} />

            {/* ----- 5 streams ----- */}
            {STREAMS.map((s, i) => {
              const d = streamPath(s.x)
              return (
                <g key={s.label}>
                  {/* Base (statically drawn) */}
                  <path
                    d={d}
                    stroke="rgba(74, 222, 128, 0.22)"
                    strokeWidth={1.5}
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Flow overlay — animated dashoffset = liquid traveling down */}
                  <path
                    d={d}
                    stroke="rgb(74, 222, 128)"
                    strokeWidth={1.8}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="4 36"
                    className="settlement-flow"
                    style={{
                      animationDelay: `${i * 0.28}s`,
                      animationDuration: `${3.4 + (i % 2) * 0.5}s`,
                    }}
                    filter="url(#sw-glow)"
                  />
                  {/* Endpoint marker */}
                  <circle cx={s.x} cy={END_Y} r={3} fill="rgb(74, 222, 128)" />
                  <circle
                    cx={s.x}
                    cy={END_Y}
                    r={6}
                    fill="none"
                    stroke="rgba(74, 222, 128, 0.35)"
                    strokeWidth={0.7}
                  />
                </g>
              )
            })}
          </svg>

          {/* ----- Label row (aligned to endpoints via 5-col grid) ----- */}
          <div className="mt-2 grid -translate-y-2 grid-cols-5 gap-2 lg:gap-3">
            {STREAMS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="rounded border border-emerald-500/20 bg-zinc-950/70 px-2 py-2 text-center backdrop-blur-sm"
              >
                <div className="font-mono text-[9px] uppercase leading-tight tracking-[0.15em] text-zinc-300">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
