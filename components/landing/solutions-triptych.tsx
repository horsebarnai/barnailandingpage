"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section, SectionHeader } from "@/components/layout/section"

/* ============================================================
 * Solutions Triptych — the three lanes on the landing page.
 *
 * Each card carries a bespoke inline-SVG preview that hints at
 * the full diagram living on its category page. The previews are
 * intentionally abstract: we suggest the capability without
 * naming a single agent, model, or methodology.
 *
 * Cards map to:
 *   1. Workflow Agents              → streaming task lattice
 *   2. Stable & Syndicate Management → ledger waterfall
 *   3. AI Nicking Analysis          → Sire × Dam pairing
 * ============================================================ */

const PRIMARY = "#1ea866"

/* ─── Preview: Workflow Agents — pulsing agent lattice ─── */
function WorkflowPreview() {
  const NODES = [
    { x: 18, y: 22 }, { x: 60, y: 22 }, { x: 102, y: 22 },
    { x: 18, y: 60 }, { x: 60, y: 60 }, { x: 102, y: 60 }, { x: 144, y: 60 },
    { x: 60, y: 98 }, { x: 102, y: 98 }, { x: 144, y: 98 },
  ]
  const EDGES: [number, number][] = [
    [0,1],[1,2],[3,4],[4,5],[5,6],[7,8],[8,9],
    [0,3],[1,4],[2,5],[3,7],[4,7],[5,8],[6,9],
  ]
  return (
    <svg viewBox="0 0 168 120" className="h-full w-full" aria-hidden="true">
      {EDGES.map(([a,b], i) => (
        <line
          key={i}
          x1={NODES[a].x} y1={NODES[a].y}
          x2={NODES[b].x} y2={NODES[b].y}
          stroke={PRIMARY} strokeOpacity="0.22" strokeWidth="0.7"
        />
      ))}
      {NODES.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="3.5" fill={PRIMARY} fillOpacity="0.18">
            <animate
              attributeName="r"
              values="3.5;5;3.5"
              dur={`${2 + (i % 3) * 0.5}s`}
              repeatCount="indefinite"
              begin={`${i * 0.18}s`}
            />
          </circle>
          <circle cx={n.x} cy={n.y} r="1.8" fill={i % 3 === 0 ? "#52d18d" : PRIMARY} />
        </g>
      ))}
    </svg>
  )
}

/* ─── Preview: Stable & Syndicate — settlement waterfall ─── */
function StablePreview() {
  const BARS = [
    { y: 18, w: 142, label: "INFLOW", emphasis: true },
    { y: 38, w: 86, label: "" },
    { y: 54, w: 58, label: "" },
    { y: 70, w: 42, label: "" },
    { y: 86, w: 28, label: "" },
    { y: 102, w: 110, label: "NET", emphasis: true },
  ]
  return (
    <svg viewBox="0 0 168 120" className="h-full w-full" aria-hidden="true">
      {/* Ledger rule lines */}
      <line x1="14" y1="14" x2="14" y2="116" stroke={PRIMARY} strokeOpacity="0.2" strokeWidth="0.5" />
      <line x1="158" y1="14" x2="158" y2="116" stroke={PRIMARY} strokeOpacity="0.2" strokeWidth="0.5" />
      {/* Bars */}
      {BARS.map((b, i) => (
        <g key={i}>
          <rect
            x="14"
            y={b.y}
            width={b.w}
            height="6"
            rx="1"
            fill={b.emphasis ? PRIMARY : "rgba(30, 168, 102, 0.4)"}
            fillOpacity={b.emphasis ? 0.85 : 0.5}
          >
            <animate
              attributeName="width"
              from="0"
              to={String(b.w)}
              dur="1.4s"
              begin={`${i * 0.12}s`}
              fill="freeze"
            />
          </rect>
          {b.label && (
            <text
              x={14 + b.w + 4}
              y={b.y + 5}
              fill={PRIMARY}
              fontSize="6"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.18em"
              opacity="0.85"
            >
              {b.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  )
}

/* ─── Preview: AI Nicking — Sire × Dam pairing ─── */
function NickingPreview() {
  return (
    <svg viewBox="0 0 168 120" className="h-full w-full" aria-hidden="true">
      {/* Sire */}
      <g>
        <rect x="16" y="40" width="42" height="40" rx="4" fill="none" stroke={PRIMARY} strokeOpacity="0.45" strokeWidth="0.8" />
        <text x="37" y="58" textAnchor="middle" fill={PRIMARY} fillOpacity="0.8" fontSize="6.5" fontFamily="ui-monospace, monospace" letterSpacing="0.2em">SIRE</text>
        <line x1="22" y1="64" x2="52" y2="64" stroke={PRIMARY} strokeOpacity="0.3" strokeWidth="0.5" />
        <line x1="22" y1="69" x2="46" y2="69" stroke={PRIMARY} strokeOpacity="0.25" strokeWidth="0.5" />
        <line x1="22" y1="74" x2="48" y2="74" stroke={PRIMARY} strokeOpacity="0.2" strokeWidth="0.5" />
      </g>

      {/* × multiplier */}
      <text x="84" y="64" textAnchor="middle" fill={PRIMARY} fontSize="13" fontFamily="ui-monospace, monospace" opacity="0.6">×</text>

      {/* Dam */}
      <g>
        <rect x="110" y="40" width="42" height="40" rx="4" fill="none" stroke={PRIMARY} strokeOpacity="0.45" strokeWidth="0.8" />
        <text x="131" y="58" textAnchor="middle" fill={PRIMARY} fillOpacity="0.8" fontSize="6.5" fontFamily="ui-monospace, monospace" letterSpacing="0.2em">DAM</text>
        <line x1="116" y1="64" x2="146" y2="64" stroke={PRIMARY} strokeOpacity="0.3" strokeWidth="0.5" />
        <line x1="116" y1="69" x2="142" y2="69" stroke={PRIMARY} strokeOpacity="0.25" strokeWidth="0.5" />
        <line x1="116" y1="74" x2="144" y2="74" stroke={PRIMARY} strokeOpacity="0.2" strokeWidth="0.5" />
      </g>

      {/* Result badge */}
      <g>
        <rect x="64" y="92" width="40" height="20" rx="10" fill="rgba(30, 168, 102, 0.12)" stroke={PRIMARY} strokeOpacity="0.55" strokeWidth="0.8" />
        <text x="84" y="106" textAnchor="middle" fill="#52d18d" fontSize="10" fontFamily="ui-monospace, monospace" fontWeight="700">
          A+
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </text>
      </g>

      {/* Top label */}
      <text x="84" y="22" textAnchor="middle" fill={PRIMARY} fillOpacity="0.65" fontSize="6" fontFamily="ui-monospace, monospace" letterSpacing="0.25em">NICKING GRADE</text>
    </svg>
  )
}

/* ─── Triptych config ───────────────────────────────────────── */

const SOLUTIONS = [
  {
    eyebrow: "Lane 01",
    name: "Workflow Agents",
    title: "Specialized workers,",
    titleAccent: "always on.",
    body: "A roster of AI workers, each tuned to a recurring task in your operation. They show up before you ask. They finish before you notice. They never ask for credit.",
    href: "/solutions/workflow-agents",
    Preview: WorkflowPreview,
  },
  {
    eyebrow: "Lane 02",
    name: "Stable & Syndicate Management",
    title: "The back office",
    titleAccent: "of an institutional operation.",
    body: "Every dollar accounted for. Every partner on the same page. Records that arrive before you ask for them — the operating discipline of a private bank.",
    href: "/solutions/farm-management",
    Preview: StablePreview,
  },
  {
    eyebrow: "Lane 03",
    name: "AI Nicking Analysis",
    title: "Sire × Dam,",
    titleAccent: "answered.",
    body: "The question every breeder asks — answered defensibly. Bring a shortlist. Leave with a ranked, signed decision backed by fifty years of comparable outcomes.",
    href: "/solutions/analysis",
    Preview: NickingPreview,
  },
] as const

export function SolutionsTriptych() {
  return (
    <Section rhythm="default" className="border-t border-white/[0.04]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[420px] w-[920px] rounded-full bg-emerald-500/[0.06] blur-[140px]" />
      </div>

      <Container>
        <SectionHeader
          eyebrow="What we do"
          title="Three lanes."
          titleAccent="One operating system."
          kicker="The visible surface of the platform — each lane backed by deeper machinery the curious can explore."
          align="center"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {SOLUTIONS.map((s, i) => {
            const Preview = s.Preview
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link
                  href={s.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-950/60 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_80px_-20px_rgba(16,185,129,0.4)]"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Diagram pane */}
                  <div className="relative border-b border-zinc-800/60 bg-black/40 px-6 py-7">
                    <div className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-700">
                      / {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="h-32 lg:h-36">
                      <Preview />
                    </div>
                  </div>

                  {/* Copy pane */}
                  <div className="relative flex flex-col flex-grow px-6 py-7 lg:px-7 lg:py-8">
                    <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/90">
                      {s.eyebrow}
                    </div>
                    <h3 className="font-display text-xl lg:text-2xl font-medium leading-tight tracking-tight text-white mb-4">
                      {s.title}{" "}
                      <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
                        {s.titleAccent}
                      </span>
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-zinc-400 flex-grow">
                      {s.body}
                    </p>

                    <div className="mt-6 pt-5 border-t border-zinc-800/60 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400/80 group-hover:text-emerald-300 transition-colors">
                        {s.name}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-zinc-600 transition-all group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
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
