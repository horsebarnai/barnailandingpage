"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
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
  const browserRef = useRef<HTMLDivElement>(null)
  
  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring physics for tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })
  
  // Glare position - always call these hooks unconditionally
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 })
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 })
  
  // Pre-compute the glare background transform unconditionally
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`
  )
  
  const [isHovering, setIsHovering] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!browserRef.current) return
    
    const rect = browserRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Normalized position from -0.5 to 0.5
    const x = (e.clientX - centerX) / rect.width
    const y = (e.clientY - centerY) / rect.height
    
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: "280vh" }}>
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

        {/* Device Mockup with Z-Axis Depth Stack */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="relative z-10 mt-16 sm:mt-20 w-full max-w-4xl mx-auto"
          style={{ perspective: 1000 }}
        >
          {/* Glow behind mockup */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/30 via-emerald-500/10 to-transparent rounded-3xl blur-3xl transform scale-110" />
          
          {/* Browser Frame with 3D Tilt */}
          <motion.div
            ref={browserRef}
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              rotateX: isHovering ? rotateX : 0,
              rotateY: isHovering ? rotateY : 0,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
          >
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
              
              {/* Z-Axis Depth Stack */}
              <div className="relative h-[420px] bg-black flex items-center justify-center overflow-hidden">
                {/* Centered stack container */}
                <div className="relative w-[220px] sm:w-[260px] h-[400px]" style={{ perspective: 1000 }}>
                  {screens.map((screen, index) => (
                    <DepthStackCard
                      key={screen.src}
                      screen={screen}
                      index={index}
                      totalScreens={screens.length}
                      scrollProgress={scrollYProgress}
                    />
                  ))}
                </div>
              </div>
              
              {/* Glare Overlay - always render but control visibility with opacity */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  background: glareBackground,
                  mixBlendMode: "overlay",
                  opacity: isHovering ? 1 : 0,
                }}
              />
            </div>
            
            {/* Laptop Base */}
            <div className="relative h-4 lg:h-6 bg-zinc-800 rounded-b-lg">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1/4 h-1 bg-zinc-700 rounded-b-lg" />
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

function DepthStackCard({
  screen,
  index,
  totalScreens,
  scrollProgress,
}: {
  screen: { src: string; alt: string }
  index: number
  totalScreens: number
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  // Scroll-driven transforms for Z-axis depth effect
  // Each screen has its own scroll range where it's "active"
  const screenDuration = 1 / totalScreens
  const screenStart = index * screenDuration
  const screenEnd = (index + 1) * screenDuration
  
  // Scale: starts at initial position, grows to 1 when active, then grows past camera (1.5) and fades
  const scale = useTransform(scrollProgress, (progress) => {
    if (progress < screenStart) {
      // Before this screen's turn - tucked behind based on position
      const depth = index - Math.floor(progress * totalScreens)
      return Math.max(0.7, 1 - depth * 0.15)
    } else if (progress < screenEnd) {
      // This screen is active - scale from current to flying past
      const localProgress = (progress - screenStart) / screenDuration
      if (localProgress < 0.7) {
        // Coming into focus
        return 1
      } else {
        // Flying past the camera
        return 1 + (localProgress - 0.7) * 1.67 // scales to ~1.5
      }
    } else {
      // Already passed - fully scaled and gone
      return 1.5
    }
  })
  
  // Opacity: full when active center, faded when behind, invisible when flown past
  const opacity = useTransform(scrollProgress, (progress) => {
    if (progress < screenStart) {
      // Behind - calculate depth opacity
      const depth = index - Math.floor(progress * totalScreens)
      if (depth === 0) return 1
      if (depth === 1) return 0.4
      return 0.15
    } else if (progress < screenEnd) {
      // Active - fade out as it flies past
      const localProgress = (progress - screenStart) / screenDuration
      if (localProgress < 0.7) return 1
      return 1 - ((localProgress - 0.7) / 0.3) // fades from 1 to 0
    } else {
      return 0
    }
  })
  
  // Y position: stacked below when behind, moves up into view, then stays
  const y = useTransform(scrollProgress, (progress) => {
    if (progress < screenStart) {
      // Behind - calculate depth offset
      const depth = index - Math.floor(progress * totalScreens)
      return depth * 40
    } else if (progress < screenEnd) {
      // Active - float up then stay at 0
      const localProgress = (progress - screenStart) / screenDuration
      if (localProgress < 0.3) {
        return (1 - localProgress / 0.3) * 40
      }
      return 0
    } else {
      return 0
    }
  })
  
  // Z-index for proper stacking
  const zIndex = useTransform(scrollProgress, (progress) => {
    const currentActive = Math.min(Math.floor(progress * totalScreens), totalScreens - 1)
    if (index === currentActive) return 10
    if (index > currentActive) return totalScreens - index
    return 0 // Already passed
  })
  
  // Neon glow for active screen
  const boxShadow = useTransform(scrollProgress, (progress) => {
    const currentActive = Math.min(Math.floor(progress * totalScreens), totalScreens - 1)
    if (index === currentActive) {
      return "0 20px 50px rgba(16, 185, 129, 0.25), 0 0 80px rgba(16, 185, 129, 0.15)"
    }
    return "0 10px 30px rgba(0, 0, 0, 0.3)"
  })
  
  // Blur for depth perception
  const blur = useTransform(scrollProgress, (progress) => {
    if (progress < screenStart) {
      const depth = index - Math.floor(progress * totalScreens)
      return depth > 0 ? depth * 2 : 0
    }
    return 0
  })
  
  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`)

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        scale,
        opacity,
        y,
        zIndex,
        filter: filterBlur,
      }}
    >
      <motion.div
        className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black relative"
        style={{ boxShadow }}
      >
        <Image
          src={screen.src}
          alt={screen.alt}
          width={260}
          height={500}
          className="w-full h-auto"
          priority
        />
      </motion.div>
    </motion.div>
  )
}
