"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

// SVG Horse silhouette - minimal, high-quality racing horse
function HorseSilhouette({ rotation = 0 }: { rotation?: number }) {
  return (
    <svg
      viewBox="0 0 64 48"
      className="w-16 h-12 drop-shadow-[0_0_20px_rgba(74,222,128,0.8)]"
      style={{ transform: `rotate(${rotation}deg)` }}
      fill="none"
    >
      {/* Horse body */}
      <path
        d="M8 32 L12 28 L16 24 L24 22 L32 20 L40 18 L44 16 L48 14 L52 12 L54 14 L52 18 L50 22 L48 24 L44 26 L40 28 L36 30 L32 32 L28 34 L24 36 L20 38 L16 38 L12 36 L8 32Z"
        fill="#4ADE80"
        stroke="#22C55E"
        strokeWidth="1"
      />
      {/* Head */}
      <path
        d="M52 12 L56 8 L60 6 L62 8 L60 12 L56 14 L54 14"
        fill="#4ADE80"
        stroke="#22C55E"
        strokeWidth="1"
      />
      {/* Front legs */}
      <path
        d="M40 28 L42 36 L44 42 L42 44 L38 44 L38 40 L36 32"
        fill="#4ADE80"
        stroke="#22C55E"
        strokeWidth="1"
      />
      <path
        d="M32 30 L30 38 L28 44 L30 46 L34 46 L34 42 L34 34"
        fill="#4ADE80"
        stroke="#22C55E"
        strokeWidth="1"
      />
      {/* Back legs */}
      <path
        d="M20 36 L18 42 L16 46 L18 48 L22 48 L22 44 L22 38"
        fill="#4ADE80"
        stroke="#22C55E"
        strokeWidth="1"
      />
      <path
        d="M14 34 L10 40 L8 44 L10 46 L14 46 L16 42 L16 36"
        fill="#4ADE80"
        stroke="#22C55E"
        strokeWidth="1"
      />
      {/* Tail */}
      <path
        d="M8 32 L4 34 L2 38 L4 40 L8 38 L10 34"
        fill="#4ADE80"
        stroke="#22C55E"
        strokeWidth="1"
      />
      {/* Mane */}
      <path
        d="M48 14 L46 10 L44 12 L42 8 L40 12 L38 10 L36 14 L34 12 L32 16"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Eye */}
      <circle cx="58" cy="9" r="1.5" fill="#000" />
    </svg>
  )
}

// The main track path that spans the entire page
export function ScrollTrack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)
  const [horsePosition, setHorsePosition] = useState({ x: 0, y: 0, rotation: 0 })

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Track stroke animation
  const strokeDashoffset = useTransform(smoothProgress, [0, 1], [pathLength, 0])

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength()
      setPathLength(length)
    }
  }, [])

  // Update horse position along the path
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (value) => {
      if (pathRef.current && pathLength > 0) {
        const point = pathRef.current.getPointAtLength(value * pathLength)
        
        // Calculate rotation based on path tangent
        const nextPoint = pathRef.current.getPointAtLength(
          Math.min(value * pathLength + 5, pathLength)
        )
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI)
        
        setHorsePosition({ x: point.x, y: point.y, rotation: angle })
      }
    })
    return () => unsubscribe()
  }, [smoothProgress, pathLength])

  // The snaking path from hero to footer
  // Designed to pass through each section with elegant curves
  const trackPath = `
    M 100 100
    C 150 100, 200 150, 300 200
    S 450 250, 500 350
    C 550 450, 400 500, 350 600
    S 200 700, 250 800
    C 300 900, 450 950, 500 1050
    S 600 1150, 550 1250
    C 500 1350, 350 1400, 300 1500
    S 200 1600, 250 1700
    C 300 1800, 450 1850, 500 1950
    S 550 2050, 500 2150
    C 450 2250, 350 2300, 300 2400
    S 200 2500, 250 2600
    C 300 2700, 400 2750, 450 2850
    L 500 3000
  `

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 3000"
        preserveAspectRatio="xMidYMin slice"
        style={{ height: '300vh' }}
      >
        <defs>
          {/* Glow filter for the track */}
          <filter id="trackGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Gradient for the track */}
          <linearGradient id="trackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#22C55E" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Background track (dim) */}
        <path
          d={trackPath}
          fill="none"
          stroke="rgba(74, 222, 128, 0.1)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Animated lit-up track */}
        <motion.path
          ref={pathRef}
          d={trackPath}
          fill="none"
          stroke="url(#trackGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#trackGlow)"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset,
          }}
        />

        {/* Track dots/markers at key points */}
        {[200, 600, 1050, 1500, 1950, 2400, 2850].map((y, i) => (
          <motion.circle
            key={i}
            cx={i % 2 === 0 ? 350 : 250}
            cy={y}
            r="8"
            fill="rgba(74, 222, 128, 0.2)"
            stroke="#4ADE80"
            strokeWidth="2"
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </svg>

      {/* Animated Horse */}
      <motion.div
        className="absolute"
        style={{
          left: `${(horsePosition.x / 600) * 100}%`,
          top: `${(horsePosition.y / 3000) * 300}vh`,
          transform: `translate(-50%, -50%)`,
        }}
      >
        <HorseSilhouette rotation={horsePosition.rotation} />
      </motion.div>
    </div>
  )
}

// Mobile-optimized version with straighter track
export function ScrollTrackMobile() {
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)
  const [horsePosition, setHorsePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const strokeDashoffset = useTransform(smoothProgress, [0, 1], [pathLength, 0])

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [])

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (value) => {
      if (pathRef.current && pathLength > 0) {
        const point = pathRef.current.getPointAtLength(value * pathLength)
        setHorsePosition({ x: point.x, y: point.y })
      }
    })
    return () => unsubscribe()
  }, [smoothProgress, pathLength])

  // Straighter path for mobile
  const mobilePath = `
    M 50 50
    L 50 500
    L 50 1000
    L 50 1500
    L 50 2000
    L 50 2500
    L 50 3000
  `

  return (
    <div className="fixed left-4 top-0 bottom-0 pointer-events-none z-10 w-16">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 3000"
        preserveAspectRatio="xMidYMin slice"
        style={{ height: '300vh' }}
      >
        <defs>
          <filter id="mobileGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <path
          d={mobilePath}
          fill="none"
          stroke="rgba(74, 222, 128, 0.1)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Animated track */}
        <motion.path
          ref={pathRef}
          d={mobilePath}
          fill="none"
          stroke="#4ADE80"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#mobileGlow)"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset,
          }}
        />
      </svg>

      {/* Centered horse on mobile */}
      <motion.div
        className="absolute left-1/2"
        style={{
          top: `${(horsePosition.y / 3000) * 300}vh`,
          transform: 'translateX(-50%)',
        }}
      >
        <div className="w-8 h-8 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(74,222,128,0.8)]" />
      </motion.div>
    </div>
  )
}
