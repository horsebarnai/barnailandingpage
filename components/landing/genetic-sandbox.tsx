"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

/* ============================================================
 * Module 1 — The Genetic Sandbox
 *
 * Sub-hero interactive demo. Bloomberg-terminal styling:
 *   - [SELECT SIRE] × [SELECT DAM] input row (display-only)
 *   - Constrained geometric network graph in background; pulses
 *     activate when user hovers the demo panel
 *   - Glassmorphic Match Report with most rows redacted, except
 *     Nicking Grade: A+ which lights up in turf green when active
 * ============================================================ */

/* Constrained 6x4 grid of nodes — geometric, not random.
   Coordinates are in viewBox 0..100 so the SVG scales freely. */
const NODES: { x: number; y: number }[] = [
  { x: 8, y: 14 },  { x: 26, y: 18 },  { x: 44, y: 12 },  { x: 56, y: 22 },  { x: 74, y: 10 },  { x: 92, y: 18 },
  { x: 14, y: 38 }, { x: 32, y: 42 },  { x: 50, y: 34 },  { x: 64, y: 44 },  { x: 80, y: 36 },  { x: 96, y: 44 },
  { x: 6, y: 62 },  { x: 24, y: 68 },  { x: 42, y: 58 },  { x: 58, y: 70 },  { x: 76, y: 60 },  { x: 90, y: 68 },
  { x: 12, y: 88 }, { x: 30, y: 92 },  { x: 48, y: 84 },  { x: 62, y: 92 },  { x: 78, y: 86 },  { x: 94, y: 92 },
]

/* Manually curated edges so the graph reads as deliberate
   (latticework + cross-row connections), not noise. */
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11],
  [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
  [6, 12], [7, 13], [8, 14], [9, 15], [10, 16], [11, 17],
  [12, 13], [13, 14], [14, 15], [15, 16], [16, 17],
  [12, 18], [13, 19], [14, 20], [15, 21], [16, 22], [17, 23],
  [18, 19], [19, 20], [20, 21], [21, 22], [22, 23],
  // diagonal cross-links — adds the "computed" feel
  [1, 8], [3, 8], [7, 14], [9, 14], [13, 20], [15, 20],
]

function NetworkGraph({ active }: { active: boolean }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Edges */}
      {EDGES.map(([a, b], i) => {
        const n1 = NODES[a]
        const n2 = NODES[b]
        return (
          <line
            key={`e-${i}`}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke="rgb(74, 222, 128)"
            strokeWidth={0.08}
            strokeOpacity={active ? 0.4 : 0.07}
            className="transition-[stroke-opacity] duration-700"
            style={{ transitionDelay: `${(i * 31) % 480}ms` }}
          />
        )
      })}
      {/* Nodes + active pulse rings */}
      {NODES.map((n, i) => (
        <g key={`n-${i}`}>
          <circle
            cx={n.x}
            cy={n.y}
            r={active ? 0.55 : 0.35}
            fill="rgb(74, 222, 128)"
            fillOpacity={active ? 0.95 : 0.32}
            className="transition-all duration-500"
            style={{ transitionDelay: `${(i * 71) % 600}ms` }}
          />
          {active && (
            <circle
              cx={n.x}
              cy={n.y}
              r={0.4}
              fill="none"
              stroke="rgb(74, 222, 128)"
              strokeWidth={0.05}
              strokeOpacity={0.45}
              className="animate-ping"
              style={{
                animationDelay: `${(i * 137) % 1800}ms`,
                animationDuration: "2.4s",
              }}
            />
          )}
        </g>
      ))}
    </svg>
  )
}

function SelectField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <div className="mb-1.5 font-mono text-[10px] tracking-[0.25em] text-zinc-600">
        {label}
      </div>
      <div className="group flex cursor-pointer items-center justify-between border border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm transition-colors hover:border-emerald-500/30">
        <span className="font-mono text-sm text-zinc-400">{placeholder}</span>
        <ChevronDown className="h-3.5 w-3.5 text-zinc-600 transition-transform group-hover:translate-y-0.5" />
      </div>
    </div>
  )
}

function TerminalQuery({ active }: { active: boolean }) {
  return (
    <div>
      {/* Status row */}
      <div className="mb-4 flex items-center gap-3">
        <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500">
          PEDIGREE QUERY
        </div>
        <div className="h-px flex-1 bg-zinc-800" />
        <div
          className={`font-mono text-[10px] tracking-[0.25em] transition-colors ${
            active ? "text-emerald-400" : "text-zinc-600"
          }`}
        >
          {active ? "PROCESSING" : "READY"}
        </div>
      </div>

      {/* SIRE × DAM */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
        <SelectField label="SIRE" placeholder="[SELECT SIRE]" />
        <span className="pb-3 font-light text-2xl text-zinc-600">×</span>
        <SelectField label="DAM" placeholder="[SELECT DAM]" />
      </div>

      {/* Hint / processing indicator */}
      <div className="mt-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-zinc-500">
        <div
          className={`h-1.5 w-1.5 rounded-full transition-colors ${
            active ? "animate-pulse bg-emerald-400" : "bg-zinc-700"
          }`}
        />
        <span>{active ? "ANALYZING NICK..." : "HOVER TO PROCESS"}</span>
      </div>

      {/* Pseudo-output ticker, only when active */}
      <div
        className={`mt-4 space-y-1 font-mono text-[10px] leading-relaxed text-zinc-600 transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        <div>&gt; resolving sire lineage..............ok</div>
        <div>&gt; resolving dam lineage...............ok</div>
        <div>&gt; computing cross-affinity matrix.....ok</div>
        <div className="text-emerald-400">&gt; nicking score returned</div>
      </div>
    </div>
  )
}

const REDACTED_ROWS = [
  "Conformation Score",
  "Speed Coefficient",
  "Stamina Index",
  "Sire-Line Affinity",
  "Mare Quality Adj.",
]

function MatchReport({ active }: { active: boolean }) {
  return (
    <div className="relative">
      {/* Aura behind card when active */}
      <div
        className="pointer-events-none absolute -inset-2 rounded-xl bg-gradient-to-br from-emerald-500/15 to-transparent blur-2xl transition-opacity duration-700"
        style={{ opacity: active ? 1 : 0 }}
      />

      <div className="relative rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md lg:p-7">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500">
            MATCH REPORT
          </div>
          <div
            className={`font-mono text-[10px] tracking-[0.25em] transition-colors ${
              active ? "text-emerald-400" : "text-zinc-600"
            }`}
          >
            [{active ? "RESOLVED" : "PENDING"}]
          </div>
        </div>

        {/* Sire × Dam label */}
        <div className="mb-5 font-mono text-xs tracking-wider text-zinc-500">
          SIRE ××××× × DAM ×××××
        </div>

        {/* Redacted rows */}
        <div className="mb-6 space-y-3">
          {REDACTED_ROWS.map((label) => (
            <div key={label} className="flex items-center justify-between text-xs">
              <span className="font-mono tracking-wider text-zinc-500/80">{label}</span>
              <div className="relative h-2.5 w-24 overflow-hidden rounded-sm bg-zinc-800/60">
                <div className="absolute inset-y-0 left-0 w-2/3 bg-zinc-700/70 blur-[1px]" />
              </div>
            </div>
          ))}
        </div>

        {/* The hero metric */}
        <div className="border-t border-zinc-800 pt-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="mb-1 font-mono text-[10px] tracking-[0.25em] text-zinc-500">
                NICKING GRADE
              </div>
              <div className="font-mono text-[10px] tracking-wider text-zinc-600">
                CONFIDENCE 0.94
              </div>
            </div>
            <div
              className={`tabular-nums font-bold leading-none transition-all duration-700 ${
                active
                  ? "text-emerald-400 drop-shadow-[0_0_24px_rgba(74,222,128,0.55)] text-5xl lg:text-6xl"
                  : "text-zinc-700 text-5xl lg:text-6xl"
              }`}
            >
              A+
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function GeneticSandbox() {
  const [active, setActive] = useState(false)

  return (
    <section
      id="genetic-sandbox"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      {/* Subtle dark-to-darker gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-zinc-950/40 to-black" />

      {/* Background network graph — always present, brighter on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.7]">
        <NetworkGraph active={active} />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Eyebrow + headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center lg:mb-16"
        >
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
            Genetic Sandbox
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            The Question <span className="text-zinc-500">Every</span> Breeder Asks.
          </h2>
          <p className="mx-auto max-w-xl text-base text-zinc-400 lg:text-lg">
            Sire × Dam compatibility, answered by the only model trained on fifty years of outcomes.
          </p>
        </motion.div>

        {/* The interactive panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          className="relative grid items-start gap-8 rounded-xl border border-zinc-900 bg-zinc-950/40 p-6 backdrop-blur-md lg:grid-cols-2 lg:gap-12 lg:p-10"
        >
          <TerminalQuery active={active} />
          <MatchReport active={active} />
        </motion.div>

        {/* Footer hint */}
        <div className="mt-6 text-center font-mono text-[10px] tracking-[0.25em] text-zinc-600">
          DEMO MODE · FULL REPORT GATED TO LICENSED OPERATORS
        </div>
      </div>
    </section>
  )
}
