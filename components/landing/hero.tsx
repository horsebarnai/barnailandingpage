"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { ContactForm } from "@/components/forms/contact-form"

/* ============================================================
 * HERO — split-pane front door.
 *
 * Left:  institutional value proposition + primary CTA to /book-a-demo
 * Right: embedded Contact form so the highest-intent visitor can
 *        reach the team without leaving the front page.
 * ============================================================ */

export function Hero() {
  return (
    <section
      className="relative flex items-center pt-12 pb-20 lg:pt-20 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Glow Effects */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: Value proposition */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/90"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
              Private Beta · 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight leading-[1.05] mb-6"
            >
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                The AI Operating System
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent italic">
                of the Equine Industry.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              An institutional back-office, running quietly beneath the work
              you came in for. Compliance, stewardship, and the discipline
              of a private bank — moved below the surface, where they belong.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
            >
              <Link
                href="/book-a-demo"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_28px_-4px_rgba(74,222,128,0.55)] transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_44px_-2px_rgba(74,222,128,0.8)]"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/platform"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/40 px-7 py-3.5 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-900/70 hover:text-white"
              >
                Explore the Platform
              </Link>
            </motion.div>
          </div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <ContactForm
              variant="panel"
              heading="Talk to us."
              kicker="Tell us about your operation. We respond to every message."
              ctaLabel="Request a Conversation"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
