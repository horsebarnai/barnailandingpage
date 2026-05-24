"use client"

import { useMemo, useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"

/* ============================================================
 * HERITAGE DEPTH (Data Provenance)
 *
 * Tall vertical wireframe column — hundreds of thin 1px lines
 * stacked vertically with structured variation (markers, clusters,
 * background) so it reads as a server core / strata sample.
 *
 * Side labels [GEN 01..GEN 500] flicker on as the user scrolls
 * past their thresholds. Subtle parallax: column translates at a
 * different rate than the text — different "depth."
 * ============================================================ */

const PRIMARY = "#1ea866"

/* Stable PRNG so the strata pattern doesn't shuffle between renders. */
function prng(i: number): number {
  return ((i * 9301 + 49297) % 233280) / 233280
}

type StrataLine = {
  opacity: number
  width: number  // 0..100
  offset: number // 0..100, left margin %
  isMarker: boolean
}

const STRATA: StrataLine[] = Array.from({ length: 280 }, (_, i): StrataLine => {
  const r = prng(i)
  const isMarker = i % 47 === 0
  const isClusterStart = i % 23 === 0
  const isClusterMember = !isClusterStart && i % 23 < 4

  if (isMarker) {
    return { opacity: 0.72, width: 100, offset: 0, isMarker: true }
  }
  if (isClusterStart) {
    return { opacity: 0.5, width: 92, offset: 3, isMarker: false }
  }
  if (isClusterMember) {
    return { opacity: 0.32 + r * 0.1, width: 88 - r * 6, offset: 4 + r * 4, isMarker: false }
  }
  // background line — thin, faint, varied length & offset
  return {
    opacity: 0.07 + r * 0.13,
    width: 60 + r * 30,
    offset: r * 16,
    isMarker: false,
  }
})

const LABELS = [
  { text: "GEN 01",  topPct: 4,  threshold: 0.18 },
  { text: "GEN 50",  topPct: 26, threshold: 0.36 },
  { text: "GEN 150", topPct: 56, threshold: 0.56 },
  { text: "GEN 500", topPct: 88, threshold: 0.78 },
] as const

type LabelPhase = "idle" | "flicker" | "active"

function HeritageLabel({
  text,
  topPct,
  threshold,
  scrollProgress,
}: {
  text: string
  topPct: number
  threshold: number
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  const [phase, setPhase] = useState<LabelPhase>("idle")

  useMotionValueEvent(scrollProgress, "change", (v) => {
    if (phase === "idle" && v >= threshold) {
      setPhase("flicker")
      window.setTimeout(() => setPhase("active"), 900)
    } else if (phase !== "idle" && v < threshold - 0.04) {
      // scrolled back up far enough — reset so user can re-trigger
      setPhase("idle")
    }
  })

  const color =
    phase === "idle"
      ? "rgb(63, 63, 70)" // zinc-700 — dim
      : PRIMARY

  return (
    <div
      className={`absolute -translate-y-1/2 font-tech text-[10px] tracking-[0.3em] whitespace-nowrap ${
        phase === "flicker" ? "heritage-flicker" : ""
      }`}
      style={{
        top: `${topPct}%`,
        color,
        opacity: phase === "active" ? 0.95 : phase === "idle" ? 0.55 : undefined,
        textShadow: phase !== "idle" ? `0 0 12px rgba(30, 168, 102, 0.4)` : "none",
        transition: phase === "active" ? "color 240ms ease, opacity 240ms ease" : undefined,
      }}
    >
      <span className="mr-2 text-slate-600">┤</span>
      [{text}]
    </div>
  )
}

function WireframeColumn({ y }: { y: ReturnType<typeof useTransform> }) {
  // Pre-render the lines once; cheap to render hundreds of 1px divs.
  const lines = useMemo(
    () =>
      STRATA.map((s, i) => (
        <div
          key={i}
          className="h-px"
          style={{
            backgroundColor: PRIMARY,
            opacity: s.opacity,
            width: `${s.width}%`,
            marginLeft: `${s.offset}%`,
            boxShadow: s.isMarker ? `0 0 6px rgba(30, 168, 102, 0.5)` : "none",
          }}
        />
      )),
    []
  )

  return (
    <motion.div
      className="relative mx-auto flex flex-col"
      style={{ y, height: 720, width: 180, gap: "1.5px" }}
    >
      {/* Faint vertical guide lines on either side */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-slate-800/60" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-slate-800/60" />
      {lines}
    </motion.div>
  )
}

export function HeritageDepth() {
  const sectionRef = useRef<HTMLElement>(null)

  // Track scroll progress as the section traverses the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Subtle parallax: column drifts opposite-direction to text
  const columnY = useTransform(scrollYProgress, [0, 1], [-90, 90])
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section
      ref={sectionRef}
      id="heritage-depth"
      className="relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8 lg:py-40"
      style={{ backgroundColor: "#0a0f0c" }}
    >
      {/* Top + bottom subtle vignette so column emerges/recedes */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background: "linear-gradient(to bottom, #0a0f0c 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to top, #0a0f0c 0%, transparent 100%)",
        }}
      />

      {/* Background grid (very faint) — terminal aesthetic */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1ea866 1px, transparent 1px), linear-gradient(to bottom, #1ea866 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ---- LEFT: text block (parallax mild) ---- */}
          <motion.div style={{ y: textY }} className="relative">
            <div className="mb-5 font-tech text-[10px] uppercase tracking-[0.35em] text-slate-500">
              <span style={{ color: PRIMARY }}>◆</span>{" "}
              <span className="ml-2">DATA · PROVENANCE</span>
            </div>

            <h2
              className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Five Hundred Generations. <span className="italic text-slate-400">Mapped.</span>
            </h2>

            <p className="mt-6 max-w-lg font-tech text-base leading-relaxed text-slate-400 lg:text-lg">
              The complete thoroughbred record, from your foal back to the foundation sires. Continuous. Indexed. Yours to query.
            </p>

            <div className="mt-10 grid max-w-md grid-cols-2 gap-4 border-t border-slate-800/60 pt-6 font-tech">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-600">
                  Generations
                </div>
                <div className="mt-1 text-2xl text-white">500+</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-600">
                  Records
                </div>
                <div className="mt-1 text-2xl text-white">
                  2.4<span className="text-slate-500">M</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ---- RIGHT: column + side labels ---- */}
          <div className="relative">
            <div className="relative mx-auto h-[720px] w-[280px] sm:w-[340px]">
              <WireframeColumn y={columnY} />
              {/* Labels float on the right edge of the column */}
              <div
                className="pointer-events-none absolute inset-y-0"
                style={{ left: "calc(50% + 100px)" }}
              >
                {LABELS.map((l) => (
                  <HeritageLabel
                    key={l.text}
                    text={l.text}
                    topPct={l.topPct}
                    threshold={l.threshold}
                    scrollProgress={scrollYProgress}
                  />
                ))}
              </div>
              {/* Footer index tick */}
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-tech text-[9px] uppercase tracking-[0.3em] text-slate-600">
                ROOT · GEN 500
              </div>
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 font-tech text-[9px] uppercase tracking-[0.3em] text-slate-600">
                LIVE · GEN 01
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
