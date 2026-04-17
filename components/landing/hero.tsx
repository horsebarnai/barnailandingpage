"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import createGlobe from "cobe"

const upcomingEvents = [
  { name: "Keeneland September Sale", location: "Kentucky", date: "Sep 9-22", live: true },
  { name: "Royal Ascot G1", location: "London", date: "Jun 18-22", live: false },
  { name: "Fasig-Tipton Fall Mixed", location: "Kentucky", date: "Oct 7-8", live: false },
  { name: "Japan Cup G1", location: "Tokyo", date: "Nov 24", live: false },
  { name: "Dubai World Cup", location: "Dubai", date: "Mar 29", live: false },
]

// Major racing locations with lat/lng
const markers = [
  { location: [38.0498, -84.4583], size: 0.08 }, // Kentucky (Lexington)
  { location: [51.5074, -0.1278], size: 0.06 }, // London
  { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
  { location: [25.2048, 55.2708], size: 0.06 }, // Dubai
  { location: [48.8566, 2.3522], size: 0.05 }, // Paris
  { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
  { location: [53.3498, -6.2603], size: 0.05 }, // Dublin
]

// Elegant running horse silhouette SVG path
function HorseSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M735 195c-15-25-35-45-60-55-20-8-45-5-65 5-15-30-40-55-70-70-25-12-55-15-82-8-10-20-25-38-45-50-25-15-55-18-82-10-20 5-38 15-52 30-15-10-32-15-50-15-25 0-48 10-65 28-10-5-22-8-35-8-35 0-65 25-72 58-30 10-52 38-55 70-2 20 3 40 15 58-20 15-35 38-40 62-8 35 5 72 32 95l-35 75c-5 10-2 22 8 28 10 5 22 2 28-8l45-95h50l-25 90c-3 10 3 22 13 25 10 3 22-3 25-13l35-120c20 5 42 2 60-8l30 95c3 10 15 18 25 15 12-3 18-15 15-25l-40-125c15-18 25-40 28-62 25-5 48-18 65-38 12 10 28 15 45 15 30 0 58-18 70-45 20-5 38-15 52-30 18-20 28-45 25-72zm-520 40c-15 0-28-12-28-28s12-28 28-28 28 12 28 28-12 28-28 28z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const phiRef = useRef(0)

  // Scroll-based transforms for the horse
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Horse runs off to the right as you scroll
  const horseX = useTransform(scrollYProgress, [0, 1], ["0%", "120%"])
  const horseOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0.06, 0.1, 0])
  const horseScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2])
  const horseRotate = useTransform(scrollYProgress, [0, 1], [0, -5])

  useEffect(() => {
    let phi = 0
    let width = 0

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }
    window.addEventListener("resize", onResize)
    onResize()

    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 4,
      baseColor: [0.15, 0.15, 0.15],
      markerColor: [0.1, 0.8, 0.5],
      glowColor: [0.1, 0.8, 0.5],
      markers: markers,
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phi += 0.003
        }
        state.phi = phi + pointerInteractionMovement.current
        phiRef.current = phi
        state.width = width * 2
        state.height = width * 2
      },
    })

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Horse Silhouette Background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          x: horseX,
          opacity: horseOpacity,
          scale: horseScale,
          rotate: horseRotate,
        }}
      >
        <HorseSilhouette className="w-[140%] max-w-[2000px] h-auto text-emerald-500" />
      </motion.div>

      {/* Secondary horse silhouette - smaller, offset, different timing */}
      <motion.div
        className="absolute inset-0 flex items-end justify-start pointer-events-none pb-20"
        style={{
          x: useTransform(scrollYProgress, [0, 1], ["0%", "150%"]),
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.6], [0.03, 0.06, 0]),
          scale: useTransform(scrollYProgress, [0, 1], [0.6, 0.8]),
        }}
      >
        <HorseSilhouette className="w-[60%] max-w-[800px] h-auto text-emerald-400" />
      </motion.div>

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
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-zinc-400">Now in Private Beta</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                The Ultimate Back Office
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                for the Equine Industry.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Institutional-grade pedigree analytics, syndicate asset management, and AI-powered breeding intelligence—all in one terminal.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-6 text-lg rounded-full shadow-[0_0_30px_rgba(74,222,128,0.5)] hover:shadow-[0_0_50px_rgba(74,222,128,0.7)] transition-all duration-300 group"
              >
                Request Early Access
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/80 text-white px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all duration-300 group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                View Live Demo
              </Button>
            </motion.div>
          </div>

          {/* Right: Globe + Calendar Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="relative flex items-center justify-center"
          >
            {/* Globe */}
            <div className="relative w-full max-w-lg aspect-square">
              {/* Glow behind globe */}
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl transform scale-75" />
              
              <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                  pointerInteracting.current = e.clientX - pointerInteractionMovement.current
                  canvasRef.current!.style.cursor = "grabbing"
                }}
                onPointerUp={() => {
                  pointerInteracting.current = null
                  canvasRef.current!.style.cursor = "grab"
                }}
                onPointerOut={() => {
                  pointerInteracting.current = null
                  canvasRef.current!.style.cursor = "grab"
                }}
                onMouseMove={(e) => {
                  if (pointerInteracting.current !== null) {
                    const delta = e.clientX - pointerInteracting.current
                    pointerInteractionMovement.current = delta / 200
                  }
                }}
                onTouchMove={(e) => {
                  if (pointerInteracting.current !== null && e.touches[0]) {
                    const delta = e.touches[0].clientX - pointerInteracting.current
                    pointerInteractionMovement.current = delta / 200
                  }
                }}
                className="w-full h-full cursor-grab"
                style={{
                  contain: "layout paint size",
                }}
              />

              {/* Floating Calendar Card */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="absolute -bottom-4 -right-4 sm:bottom-8 sm:right-0 lg:-right-8 w-72 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">Live Global Calendar</h3>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </div>
                
                <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                  {upcomingEvents.map((event, idx) => (
                    <motion.div
                      key={event.name}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 1 + idx * 0.1 }}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${event.live ? "bg-emerald-400 animate-pulse" : "bg-zinc-600"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium truncate">{event.name}</p>
                        <p className="text-xs text-zinc-500">{event.location} · {event.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
