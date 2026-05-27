"use client"

import { useRef, useState } from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"

/* ============================================================
 * Untangle Scroll
 *
 * Scroll-pinned section that visualises chaos → clarity. Eight
 * operational "nodes" (foals, mares, stallions, stakes, HISA,
 * compliance, vet records, settlements) begin in a tangled mesh
 * of spaghetti beziers; as the user scrolls they resolve into a
 * clean 4×2 emerald grid. SVG paths can't take MotionValues
 * directly so we subscribe via useMotionValueEvent and setState
 * per frame — cheap enough, only re-renders this subtree.
 *
 * IMPLEMENTATION NOTES
 *   - 220vh section height with a sticky 100vh stage.
 *   - DO NOT wrap this in a parent that sets `overflow: hidden`
 *     or `transform` — sticky positioning will silently break.
 * ============================================================ */

const BG = "#000000"
const EMERALD = "oklch(0.72 0.16 160)"
const FONT_SERIF =
  "var(--font-playfair), Playfair Display, Georgia, serif"
const FONT_SANS =
  "var(--font-inter), Inter, system-ui, -apple-system, sans-serif"
const FONT_MONO =
  "var(--font-space-grotesk), Space Grotesk, ui-monospace, monospace"

type Node = {
  label: string
  val: string
  /* Chaotic start position — fraction of stage from center */
  chaos: { x: number; y: number }
  /* Resolved grid destination — column / row in the 4×2 grid */
  grid: { c: number; r: number }
}

const NODES: Node[] = [
  { label: "Foals",       val: "12",    chaos: { x: -0.32, y: -0.28 }, grid: { c: 0, r: 0 } },
  { label: "Mares",       val: "24",    chaos: { x:  0.24, y: -0.36 }, grid: { c: 1, r: 0 } },
  { label: "Stallions",   val: "4",     chaos: { x:  0.38, y: -0.04 }, grid: { c: 2, r: 0 } },
  { label: "Stakes",      val: "8",     chaos: { x: -0.40, y:  0.10 }, grid: { c: 3, r: 0 } },
  { label: "HISA",        val: "OK",    chaos: { x: -0.10, y: -0.38 }, grid: { c: 0, r: 1 } },
  { label: "Compliance",  val: "CLEAR", chaos: { x:  0.06, y:  0.30 }, grid: { c: 1, r: 1 } },
  { label: "Vet records", val: "147",   chaos: { x:  0.32, y:  0.24 }, grid: { c: 2, r: 1 } },
  { label: "Settlements", val: "$1.2M", chaos: { x: -0.26, y:  0.30 }, grid: { c: 3, r: 1 } },
]

const EDGES: [number, number][] = [
  [0, 4], [4, 1], [1, 5], [5, 2], [2, 6], [6, 3], [3, 7], [7, 0],
  [0, 2], [4, 6], [1, 7], [5, 3],
]

const W = 1100
const H = 540

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
const remap = (
  v: number,
  iMin: number,
  iMax: number,
  oMin: number,
  oMax: number,
) => {
  const t = clamp((v - iMin) / Math.max(1e-6, iMax - iMin))
  return oMin + (oMax - oMin) * t
}

export function UntangleScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const [p, setP] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (v) => setP(v as number))

  const resolve = easeInOut(clamp((p - 0.2) / 0.55))
  const settle = clamp((p - 0.78) / 0.22)

  /* Layout constants */
  const cx = W / 2
  const cy = H / 2
  const gridStepX = 180
  const gridStepY = 130
  const gridLeft = cx - gridStepX * 1.5
  const gridTop = cy - gridStepY * 0.5

  /* Interpolated node positions: chaos → grid */
  const positions = NODES.map((node) => {
    const chaosX = cx + node.chaos.x * W * 0.95
    const chaosY = cy + node.chaos.y * H * 0.9
    const gridX = gridLeft + node.grid.c * gridStepX
    const gridY = gridTop + node.grid.r * gridStepY
    return {
      x: lerp(chaosX, gridX, resolve),
      y: lerp(chaosY, gridY, resolve),
    }
  })

  /* Bezier control points: chaotic at resolve=0, straight at 1 */
  const edgePath = (
    a: { x: number; y: number },
    b: { x: number; y: number },
  ) => {
    const dx = b.x - a.x
    const dy = b.y - a.y
    const seed = (a.x + a.y + b.x + b.y) * 0.013
    const chaosAmt = Math.sin(seed) * 220
    const t = resolve
    const c1x = a.x + dx * 0.33 + chaosAmt * (1 - t)
    const c1y = a.y + dy * 0.33 - chaosAmt * (1 - t) * 0.6
    const c2x = a.x + dx * 0.66 - chaosAmt * (1 - t)
    const c2y = a.y + dy * 0.66 + chaosAmt * (1 - t) * 0.4
    return `M ${a.x} ${a.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`
  }

  /* Color animates from cool gray (chaos) to emerald (clarity) */
  const edgeColor = `oklch(${lerp(0.45, 0.72, resolve)} ${lerp(0.01, 0.16, resolve)} ${lerp(220, 160, resolve)})`
  const edgeOpacity = lerp(0.45, 0.85, resolve)
  const labelOpacity = remap(resolve, 0.45, 0.85, 0, 1)
  const gridOpacity =
    resolve > 0.55 ? remap(resolve, 0.55, 0.9, 0, 0.18) : 0

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "220vh", background: BG }}
    >
      <div
        className="sticky top-0 flex items-center justify-center overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Top/bottom fades for clean handoff to neighbors */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10"
          style={{
            height: 120,
            background: `linear-gradient(to bottom, ${BG}, transparent)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
          style={{
            height: 120,
            background: `linear-gradient(to top, ${BG}, transparent)`,
          }}
        />

        {/* Heading */}
        <div
          className="pointer-events-none absolute inset-x-0 text-center"
          style={{ top: "14%" }}
        >
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: EMERALD,
            }}
          >
            {resolve < 0.5 ? "The Operation, Today" : "The Operating System"}
          </div>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="92%"
          height="78%"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: "visible" }}
        >
          {/* Edges */}
          {EDGES.map(([i, j], k) => (
            <path
              key={k}
              d={edgePath(positions[i], positions[j])}
              fill="none"
              stroke={edgeColor}
              strokeWidth={1 + resolve * 0.4}
              strokeLinecap="round"
              opacity={edgeOpacity}
            />
          ))}

          {/* Grid scaffolding (faint, fades in late) */}
          {resolve > 0.55 && (
            <g opacity={gridOpacity}>
              {[0, 1, 2, 3].map((c) => (
                <line
                  key={"gc" + c}
                  x1={gridLeft + c * gridStepX}
                  y1={gridTop - 60}
                  x2={gridLeft + c * gridStepX}
                  y2={gridTop + gridStepY + 60}
                  stroke={EMERALD}
                  strokeWidth="0.5"
                  strokeDasharray="3 6"
                />
              ))}
              {[0, 1].map((r) => (
                <line
                  key={"gr" + r}
                  x1={gridLeft - 60}
                  y1={gridTop + r * gridStepY}
                  x2={gridLeft + gridStepX * 3 + 60}
                  y2={gridTop + r * gridStepY}
                  stroke={EMERALD}
                  strokeWidth="0.5"
                  strokeDasharray="3 6"
                />
              ))}
            </g>
          )}

          {/* Nodes */}
          {positions.map((pos, i) => {
            const n = NODES[i]
            const r = lerp(5, 7, resolve)
            return (
              <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                <circle
                  r={r + 6}
                  fill={edgeColor}
                  opacity={0.08 + resolve * 0.06}
                />
                <circle
                  r={r}
                  fill={resolve > 0.5 ? EMERALD : "rgba(255,255,255,0.5)"}
                  stroke={
                    resolve > 0.5 ? EMERALD : "rgba(255,255,255,0.7)"
                  }
                  strokeWidth="1"
                />
                <g opacity={labelOpacity}>
                  <text
                    x="0"
                    y="-18"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    letterSpacing="1.4"
                    fill="rgba(255,255,255,0.55)"
                    style={{ fontFamily: FONT_SANS }}
                  >
                    {n.label.toUpperCase()}
                  </text>
                  <text
                    x="0"
                    y="28"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="700"
                    fill="#fff"
                    style={{ fontFamily: FONT_MONO }}
                  >
                    {n.val}
                  </text>
                </g>
              </g>
            )
          })}
        </svg>

        {/* Final caption */}
        <div
          className="pointer-events-none absolute inset-x-0 text-center"
          style={{ bottom: "12%", opacity: settle }}
        >
          <div
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: "italic",
              fontSize: "clamp(18px, 2vw, 26px)",
              color: "rgba(255,255,255,0.7)",
              maxWidth: 640,
              margin: "0 auto",
              lineHeight: 1.4,
            }}
          >
            eight surfaces, one system —{" "}
            <span style={{ color: EMERALD }}>quiet underneath the work.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
