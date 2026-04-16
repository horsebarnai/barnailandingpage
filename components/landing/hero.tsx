"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

const screens = [
  { src: "/screenshots/home.png", alt: "Barn AI Home Dashboard" },
  { src: "/screenshots/barn.png", alt: "Barn AI Portfolio View" },
  { src: "/screenshots/ai-match.png", alt: "Barn AI Match Results" },
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Map scroll progress (0-1) to active screen index (0, 1, 2)
  const activeIndex = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 0, 1, 2])

  return (
    <div ref={containerRef} className="relative" style={{ height: "250vh" }}>
      <section className="sticky top-0 min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] glow-pulse" />
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-emerald-400/10 rounded-full blur-[80px]" />
        </div>

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
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
            className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Institutional-grade pedigree analytics, syndicate asset management, and AI-powered breeding intelligence—all in one terminal.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
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

        {/* Device Mockup with Cover Flow Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="relative z-10 mt-16 sm:mt-20 w-full max-w-4xl mx-auto"
        >
          {/* Glow behind mockup */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/30 via-emerald-500/10 to-transparent rounded-3xl blur-3xl transform scale-110" />
          
          {/* Browser Frame */}
          <div className="relative">
            {/* Screen */}
            <div className="relative bg-black rounded-t-xl lg:rounded-t-2xl overflow-hidden border border-zinc-800 shadow-2xl">
              {/* Toolbar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950 border-b border-zinc-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-zinc-800 rounded-md text-xs text-zinc-500">
                    horsebarn.ai
                  </div>
                </div>
              </div>
              
              {/* Cover Flow Carousel */}
              <div className="relative h-[420px] bg-black flex items-center justify-center overflow-hidden">
                {screens.map((screen, index) => (
                  <ScreenCard
                    key={screen.src}
                    screen={screen}
                    index={index}
                    activeIndex={activeIndex}
                    scrollProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
            
            {/* Laptop Base */}
            <div className="relative h-4 lg:h-6 bg-zinc-800 rounded-b-lg">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1/4 h-1 bg-zinc-700 rounded-b-lg" />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

function ScreenCard({
  screen,
  index,
  activeIndex,
  scrollProgress,
}: {
  screen: { src: string; alt: string }
  index: number
  activeIndex: ReturnType<typeof useTransform<number>>
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  // Calculate the position offset based on scroll
  // Each screen slides from right -> center -> left as user scrolls
  const xOffset = useTransform(scrollProgress, [0, 0.5, 1], [
    index * 100,           // Start position
    (index - 1) * 100,     // Middle position  
    (index - 2) * 100,     // End position
  ])

  // Scale: center screen is 1, others are 0.85
  const scale = useTransform(scrollProgress, (progress) => {
    const currentActive = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2
    return currentActive === index ? 1 : 0.85
  })

  // Opacity: center screen is 1, others are 0.4
  const opacity = useTransform(scrollProgress, (progress) => {
    const currentActive = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2
    return currentActive === index ? 1 : 0.4
  })

  // Blur: center screen is 0, others are 4px
  const blur = useTransform(scrollProgress, (progress) => {
    const currentActive = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2
    return currentActive === index ? 0 : 4
  })

  // Z-index for proper layering
  const zIndex = useTransform(scrollProgress, (progress) => {
    const currentActive = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2
    return currentActive === index ? 10 : 1
  })

  // Glow shadow for active screen
  const boxShadow = useTransform(scrollProgress, (progress) => {
    const currentActive = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2
    return currentActive === index 
      ? "0 0 60px rgba(16, 185, 129, 0.3), 0 0 120px rgba(16, 185, 129, 0.15)" 
      : "0 0 0px rgba(0, 0, 0, 0)"
  })

  return (
    <motion.div
      className="absolute"
      style={{
        x: useTransform(xOffset, (v) => `${v}%`),
        scale,
        opacity,
        zIndex,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        boxShadow,
      }}
    >
      <div className="w-[220px] sm:w-[260px] rounded-2xl overflow-hidden border border-white/10 bg-black">
        <Image
          src={screen.src}
          alt={screen.alt}
          width={260}
          height={500}
          className="w-full h-auto"
          priority
        />
      </div>
    </motion.div>
  )
}
