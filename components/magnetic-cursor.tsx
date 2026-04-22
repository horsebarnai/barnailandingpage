"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  life: number
  vx: number
  vy: number
}

export function MagneticCursor() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)
  const particleIdRef = useRef(0)
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number>()

  // Smooth cursor position with spring physics
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check if device has a fine pointer (mouse)
    const hasFineCursor = window.matchMedia("(pointer: fine)").matches
    if (!hasFineCursor) return

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Calculate movement speed for particle spawning
      const dx = e.clientX - lastPositionRef.current.x
      const dy = e.clientY - lastPositionRef.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)

      // Spawn particles based on movement speed
      if (speed > 3) {
        const numParticles = Math.min(Math.floor(speed / 8), 3)
        const newParticles: Particle[] = []

        for (let i = 0; i < numParticles; i++) {
          newParticles.push({
            id: particleIdRef.current++,
            x: e.clientX + (Math.random() - 0.5) * 20,
            y: e.clientY + (Math.random() - 0.5) * 20,
            size: Math.random() * 4 + 2,
            opacity: Math.random() * 0.5 + 0.3,
            life: 1,
            vx: (Math.random() - 0.5) * 2 - dx * 0.05,
            vy: (Math.random() - 0.5) * 2 - dy * 0.05,
          })
        }

        setParticles((prev) => [...prev, ...newParticles].slice(-50)) // Limit max particles
      }

      lastPositionRef.current = { x: e.clientX, y: e.clientY }
    }

    // Detect interactive elements for cursor scaling
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer")

      setIsHoveringInteractive(!!isInteractive)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [cursorX, cursorY])

  // Animate particles
  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
            opacity: p.opacity * 0.96,
            size: p.size * 0.98,
          }))
          .filter((p) => p.life > 0)
      )
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Particle trail */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-emerald-400"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 ${particle.size * 2}px ${particle.size}px rgba(52, 211, 153, ${particle.opacity * 0.5})`,
          }}
        />
      ))}

      {/* Main cursor dot */}
      <motion.div
        className="absolute rounded-full bg-emerald-400 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHoveringInteractive ? 48 : 12,
          height: isHoveringInteractive ? 48 : 12,
          marginLeft: isHoveringInteractive ? -24 : -6,
          marginTop: isHoveringInteractive ? -24 : -6,
        }}
        animate={{
          scale: isHoveringInteractive ? 1 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border border-emerald-400/30"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHoveringInteractive ? 64 : 36,
          height: isHoveringInteractive ? 64 : 36,
          marginLeft: isHoveringInteractive ? -32 : -18,
          marginTop: isHoveringInteractive ? -32 : -18,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}
