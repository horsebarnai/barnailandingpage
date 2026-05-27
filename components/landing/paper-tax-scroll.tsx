"use client"

import { useRef, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion"

/* ============================================================
 * Paper Tax Scroll
 *
 * Scroll-pinned hero motion section that drops in between the
 * main Hero and the HiddenTax editorial on the landing page.
 *
 * As the user scrolls through 120vh of internal travel, paperwork
 * "cost chips" drift onto a black stage and a $-counter climbs
 * from 0 to FINAL_VALUE — visualising the leaked hours and dollars
 * every operation pays before adopting Barn AI.
 *
 * IMPLEMENTATION NOTES
 *   - 220vh section height with a sticky 100vh stage.
 *   - DO NOT wrap this in a parent that sets `overflow: hidden`
 *     or `transform` — sticky positioning will silently break.
 *   - Colors and fonts are inlined so the component is portable;
 *     fonts reference our next/font CSS variables with sensible
 *     web-safe fallbacks.
 * ============================================================ */

const BG = "#000000"
const EMERALD = "oklch(0.72 0.16 160)"
const COST_RED = "oklch(0.70 0.22 25)"
const FONT_SERIF =
  "var(--font-playfair), Playfair Display, Georgia, serif"
const FONT_SANS =
  "var(--font-inter), Inter, system-ui, -apple-system, sans-serif"
const FONT_MONO =
  "var(--font-space-grotesk), Space Grotesk, ui-monospace, monospace"

type Chip = {
  label: string
  cost: string
  /* -0.5..0.5 horizontal offset from stage center */
  x: number
  /* -0.5..0.5 vertical offset from stage center */
  y: number
  /* 0 = sharp/front, 0.6 = blurred/back — parallax depth */
  depth: number
  /* scrollYProgress at which the chip begins fading in */
  in: number
}

const CHIPS: Chip[] = [
  { label: "Coggins reupload",       cost: "18 min",   x: -0.34, y: -0.30, depth: 0.5, in: 0.04 },
  { label: "Stakes nom missed",      cost: "$4,200",   x:  0.32, y: -0.34, depth: 0.0, in: 0.06 },
  { label: "Vet PDF lost",           cost: "2h chase", x: -0.40, y:  0.06, depth: 0.3, in: 0.10 },
  { label: "Foal cert delayed",      cost: "$1,400",   x:  0.18, y:  0.20, depth: 0.2, in: 0.14 },
  { label: "Lasix declaration late", cost: "$300",     x: -0.30, y:  0.28, depth: 0.4, in: 0.18 },
  { label: "HISA filing redo",       cost: "45 min",   x:  0.36, y:  0.04, depth: 0.5, in: 0.22 },
  { label: "Settlement chase",       cost: "6 emails", x: -0.20, y: -0.18, depth: 0.2, in: 0.26 },
  { label: "Insurance binder lapse", cost: "$800",     x:  0.28, y:  0.32, depth: 0.6, in: 0.30 },
  { label: "Sale entry deadline",    cost: "$9,800",   x: -0.36, y: -0.10, depth: 0.0, in: 0.34 },
  { label: "Bloodstock report typo", cost: "1h",       x:  0.22, y: -0.22, depth: 0.4, in: 0.38 },
  { label: "Stallion ad missed",     cost: "1 cycle",  x: -0.16, y:  0.34, depth: 0.5, in: 0.42 },
  { label: "1099 reconcile",         cost: "4h",       x:  0.40, y: -0.10, depth: 0.3, in: 0.46 },
  { label: "Mare vet history merge", cost: "$2,100",   x: -0.12, y: -0.32, depth: 0.6, in: 0.50 },
  { label: "Stud fee invoice",       cost: "2 weeks",  x:  0.14, y: -0.04, depth: 0.5, in: 0.54 },
]

/* Twin stats. Both derived from the same napkin math the
   TimeSavedCalculator uses elsewhere on the site:
     1.5 hrs/week × 52 weeks × 8-year operational lifetime ≈ 625 hrs
     625 hrs × $50/hr fully-loaded labor                  ≈ $31,200
   Numbers an operator can verify in their head — no methodology
   footnote required. */
const FINAL_DOLLARS = 31_200
const FINAL_HOURS = 625

export function PaperTaxScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  /* Shared eased ramp — both counters climb in lockstep. */
  const ramp = (p: number, target: number) => {
    const cP = Math.max(0, Math.min(1, (p - 0.06) / 0.86))
    const eased = 1 - Math.pow(1 - cP, 2.4)
    return Math.round(eased * target)
  }
  const dollarsMV = useTransform(scrollYProgress, (p) =>
    ramp(p, FINAL_DOLLARS),
  )
  const hoursMV = useTransform(scrollYProgress, (p) => ramp(p, FINAL_HOURS))
  const [dollars, setDollars] = useState(0)
  const [hours, setHours] = useState(0)
  useMotionValueEvent(dollarsMV, "change", (v) => setDollars(v as number))
  useMotionValueEvent(hoursMV, "change", (v) => setHours(v as number))

  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1])
  const finaleOpacity = useTransform(scrollYProgress, [0.8, 0.98], [0, 1])
  const counterShadow = useTransform(scrollYProgress, (p) => {
    const t = Math.max(0, Math.min(1, (p - 0.06) / 0.86))
    return `0 0 ${(40 + t * 60).toFixed(0)}px oklch(0.70 0.22 25 / ${(0.05 + t * 0.25).toFixed(3)})`
  })

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
        {/* Top/bottom fades so the stage edge blends into neighbors */}
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

        {/* Cost chips */}
        {CHIPS.map((chip, i) => (
          <ChipNode key={i} chip={chip} progress={scrollYProgress} />
        ))}

        {/* Center stack */}
        <div className="pointer-events-none relative z-[5] flex flex-col items-center px-6 text-center">
          <motion.div
            style={{
              opacity: subtitleOpacity,
              color: EMERALD,
              fontFamily: FONT_SANS,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.35)" }}>The</span> Hidden
            Tax{" "}
            <span style={{ color: "rgba(255,255,255,0.35)" }}>
              / per horse / lifetime
            </span>
          </motion.div>

          <motion.div
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 700,
              fontSize: "clamp(64px, 10.5vw, 144px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "#fff",
              textShadow: counterShadow,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.18em",
            }}
          >
            {/* Dollars — labour cost leaked per horse, lifetime */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: "0.04em",
              }}
            >
              <span
                style={{
                  color: COST_RED,
                  opacity: 0.85,
                  fontSize: "0.62em",
                  marginRight: "0.04em",
                  alignSelf: "center",
                }}
              >
                −
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.5em",
                  alignSelf: "flex-start",
                  marginTop: "0.3em",
                }}
              >
                $
              </span>
              <span>{dollars.toLocaleString()}</span>
            </span>

            {/* Thin emerald rule between the two leaks */}
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: "clamp(48px, 8vw, 96px)",
                height: 1,
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)",
                marginTop: "0.1em",
                marginBottom: "0.1em",
              }}
            />

            {/* Hours — operator time leaked per horse, lifetime */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: "0.06em",
              }}
            >
              <span
                style={{
                  color: COST_RED,
                  opacity: 0.85,
                  fontSize: "0.62em",
                  marginRight: "0.04em",
                  alignSelf: "center",
                }}
              >
                −
              </span>
              <span>{hours.toLocaleString()}</span>
              <span
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: FONT_MONO,
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "0.32em",
                  letterSpacing: "0.12em",
                  textTransform: "lowercase",
                  marginLeft: "0.18em",
                  alignSelf: "flex-end",
                  marginBottom: "0.55em",
                }}
              >
                hrs
              </span>
            </span>
          </motion.div>

          <motion.div
            style={{
              opacity: finaleOpacity,
              fontFamily: FONT_SERIF,
              fontStyle: "italic",
              fontSize: "clamp(18px, 2vw, 26px)",
              color: "rgba(255,255,255,0.7)",
              marginTop: 24,
              maxWidth: 540,
              lineHeight: 1.4,
            }}
          >
            this is what every operation leaks —{" "}
            <span style={{ color: EMERALD }}>before Barn AI.</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ChipNode({
  chip,
  progress,
}: {
  chip: Chip
  progress: MotionValue<number>
}) {
  /* Opacity: fade in over 8% after `in`, hold, fade out near end. */
  const opacity = useTransform(progress, (p) => {
    const life = Math.max(0, (p - chip.in) / 0.85)
    if (life <= 0) return 0
    const fadeIn = Math.min(1, life / 0.08)
    const fadeOut = p > 0.92 ? Math.max(0, (1 - p) / 0.08) : 1
    return fadeIn * fadeOut * (1 - chip.depth * 0.45)
  })

  /* Drift upward 18px over the chip's lifetime. */
  const drift = useTransform(progress, (p) => {
    const life = Math.max(0, (p - chip.in) / 0.85)
    return -life * 18
  })

  const scale = 1 - chip.depth * 0.28
  const blur = chip.depth * 1.6

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: `${50 + chip.x * 100}%`,
        top: `${50 + chip.y * 100}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        style={{
          opacity,
          y: drift,
          scale,
          filter: blur > 0 ? `blur(${blur.toFixed(2)}px)` : undefined,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 14px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 999,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontFamily: FONT_SANS,
              fontSize: 11,
              fontWeight: 500,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            {chip.label}
          </span>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              fontWeight: 700,
              color: COST_RED,
            }}
          >
            −{chip.cost}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
