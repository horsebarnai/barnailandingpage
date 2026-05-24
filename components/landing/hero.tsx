"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

/* ============================================================
 * HERO — institutional headline + constellation data-sphere
 *
 * The right-column "globe" is now a scroll-linked SVG constellation
 * (relocated from Genetic Sandbox). As the user scrolls down the
 * hero, the constellation executes a spring-smoothed 3D spin on the
 * Y and Z axes, with a back layer rotating at 55% of the front rate
 * for spherical parallax depth.
 * ============================================================ */

const GLOBE_PRIMARY = "#1ea866"
const GLOBE_BRIGHT = "#52d18d"

/* Constellation node positions in viewBox 0..320.
   Mix of latitude/longitude crossings + free interior "stars." */
const CONSTELLATION_NODES: { x: number; y: number; bright?: boolean }[] = [
  // Poles
  { x: 160, y: 12, bright: true },
  { x: 160, y: 308, bright: true },
  // Equator endpoints
  { x: 12, y: 160, bright: true },
  { x: 308, y: 160, bright: true },
  // Upper-latitude crossings
  { x: 40, y: 92 },
  { x: 95, y: 78, bright: true },
  { x: 160, y: 72 },
  { x: 225, y: 78, bright: true },
  { x: 280, y: 92 },
  // Lower-latitude crossings
  { x: 40, y: 228 },
  { x: 95, y: 242 },
  { x: 160, y: 248, bright: true },
  { x: 225, y: 242 },
  { x: 280, y: 228 },
  // Equator longitude crossings
  { x: 85, y: 160 },
  { x: 235, y: 160 },
  // Free interior stars
  { x: 138, y: 128 },
  { x: 192, y: 142 },
  { x: 128, y: 188 },
  { x: 204, y: 196 },
]

function ConstellationSphere() {
  return (
    <svg
      viewBox="0 0 320 320"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="cs-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GLOBE_PRIMARY} stopOpacity="0.10" />
          <stop offset="65%" stopColor={GLOBE_PRIMARY} stopOpacity="0.025" />
          <stop offset="100%" stopColor={GLOBE_PRIMARY} stopOpacity="0" />
        </radialGradient>
        <filter id="cs-nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>

      {/* Interior halo */}
      <circle cx="160" cy="160" r="150" fill="url(#cs-halo)" />

      {/* Outer ring + soft outer glow ring */}
      <circle
        cx="160" cy="160" r="148"
        fill="none"
        stroke={GLOBE_PRIMARY}
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      <circle
        cx="160" cy="160" r="148"
        fill="none"
        stroke={GLOBE_PRIMARY}
        strokeOpacity="0.12"
        strokeWidth="4"
      />

      {/* Latitudes */}
      <ellipse cx="160" cy="90"  rx="120" ry="18" stroke={GLOBE_PRIMARY} strokeOpacity="0.36" strokeWidth="1" fill="none" />
      <ellipse cx="160" cy="160" rx="148" ry="28" stroke={GLOBE_PRIMARY} strokeOpacity="0.42" strokeWidth="1" fill="none" />
      <ellipse cx="160" cy="230" rx="120" ry="18" stroke={GLOBE_PRIMARY} strokeOpacity="0.36" strokeWidth="1" fill="none" />

      {/* Longitudes */}
      <ellipse cx="160" cy="160" rx="30"  ry="148" stroke={GLOBE_PRIMARY} strokeOpacity="0.36" strokeWidth="1" fill="none" />
      <ellipse cx="160" cy="160" rx="75"  ry="148" stroke={GLOBE_PRIMARY} strokeOpacity="0.30" strokeWidth="1" fill="none" />
      <ellipse cx="160" cy="160" rx="120" ry="148" stroke={GLOBE_PRIMARY} strokeOpacity="0.24" strokeWidth="1" fill="none" />

      {/* Decorative constellation arcs */}
      <path d="M 40 110 Q 160 60 280 110"  stroke={GLOBE_PRIMARY} strokeOpacity="0.22" strokeWidth="1" fill="none" />
      <path d="M 40 210 Q 160 260 280 210" stroke={GLOBE_PRIMARY} strokeOpacity="0.22" strokeWidth="1" fill="none" />
      <path d="M 90 30  Q 50 160 90 290"   stroke={GLOBE_PRIMARY} strokeOpacity="0.18" strokeWidth="1" fill="none" />
      <path d="M 230 30 Q 270 160 230 290" stroke={GLOBE_PRIMARY} strokeOpacity="0.18" strokeWidth="1" fill="none" />

      {/* Nodes */}
      {CONSTELLATION_NODES.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.bright ? 3.2 : 2.4}
            fill={GLOBE_PRIMARY}
            filter="url(#cs-nodeGlow)"
            opacity={n.bright ? 0.95 : 0.6}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={n.bright ? 1.5 : 1.0}
            fill={n.bright ? GLOBE_BRIGHT : GLOBE_PRIMARY}
          />
        </g>
      ))}
    </svg>
  )
}

function GlobeSphere({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
  // Tie scroll progress to the HERO section specifically:
  //   0 → hero's top at viewport top (page load)
  //   1 → hero's bottom at viewport top (user has scrolled past it)
  // So the spin plays out over the user's first viewport of scroll.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const rotateYRaw = useTransform(scrollYProgress, [0, 1], [-30, 330])
  const rotateZRaw = useTransform(scrollYProgress, [0, 1], [0, 60])

  // Spring physics — heavy/premium feel per spec
  const rotateY = useSpring(rotateYRaw, { stiffness: 100, damping: 30 })
  const rotateZ = useSpring(rotateZRaw, { stiffness: 100, damping: 30 })

  // Back layer rotates at 55% of the smoothed front → spherical parallax
  const rotateYBack = useTransform(rotateY, (v) => v * 0.55) as MotionValue<number>
  const rotateZBack = useTransform(rotateZ, (v) => v * 0.55) as MotionValue<number>

  return (
    <div className="relative h-full w-full" style={{ perspective: 1100 }}>
      {/* Static ambient halo behind constellation */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(30,168,102,0.14) 0%, rgba(30,168,102,0.05) 50%, transparent 72%)",
        }}
      />

      {/* Back layer (depth) */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotateY: rotateYBack,
          rotateZ: rotateZBack,
          scale: 0.86,
          opacity: 0.35,
        }}
      >
        <ConstellationSphere />
      </motion.div>

      {/* Front layer */}
      <motion.div
        className="absolute inset-0"
        style={{ rotateY, rotateZ }}
      >
        <ConstellationSphere />
      </motion.div>

      {/* Static perimeter ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-1 rounded-full border"
        style={{ borderColor: "rgba(30, 168, 102, 0.20)" }}
      />
    </div>
  )
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05] mb-6"
            >
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                The AI Operating System
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent italic">
                of the Equine Industry.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              The back-office terminal built to simplify your equine operations.
              Streamline your syndicate management, run instant pedigree analytics,
              and automate your deal flow — less paperwork, more time at the racetrack.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-6 text-lg rounded-full shadow-[0_0_30px_rgba(74,222,128,0.5)] hover:shadow-[0_0_50px_rgba(74,222,128,0.7)] transition-all duration-300 group"
              >
                <a href="#contact">
                  Request Early Access
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                disabled
                className="border-zinc-700 bg-zinc-900/50 text-zinc-500 px-8 py-6 text-lg rounded-full backdrop-blur-sm opacity-50 cursor-not-allowed"
              >
                <Play className="mr-2 w-5 h-5" />
                View Live Demo (Coming Soon)
              </Button>
            </motion.div>
          </div>

          {/* Right: Constellation data-sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              {/* Background bloom behind the sphere */}
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl transform scale-75" />

              {/* The constellation itself */}
              <GlobeSphere targetRef={heroRef} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
