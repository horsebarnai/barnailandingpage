"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

const OLD_WAY = [
  "Texting 20 owners individually with race updates.",
  "Manually chasing breeding certificates and vet records.",
  "Hunting down pedigree stats across outdated legacy sites.",
  "Manual contract drafting and slow legal turnarounds.",
]

const NEW_WAY = [
  "One-click syndicate updates pushed to all co-owners.",
  "Auto-generated digital agreements and secure storage.",
  "Instant, AI-driven pedigree matchup and analysis reports.",
  "A unified dashboard tracking your entire stable's operations.",
]

export function OldVsNew() {
  return (
    <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[420px] bg-emerald-500/10 rounded-full blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative max-w-5xl mx-auto"
      >
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-zinc-400">Why Barn AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              A different way to{" "}
            </span>
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              run the barn.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto">
            Same job. Modern tooling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Old Way */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 backdrop-blur-md p-6 sm:p-8"
          >
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-600 mb-2">
              Before
            </h3>
            <p className="text-xl sm:text-2xl font-semibold text-zinc-400 mb-6">
              The Old Way
            </p>
            <ul className="space-y-4">
              {OLD_WAY.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <X className="w-3 h-3 text-zinc-600" />
                  </span>
                  <span className="text-sm sm:text-base text-zinc-500 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Barn AI Way */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-emerald-500/30 bg-zinc-950/60 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_80px_-20px_rgba(16,185,129,0.35)]"
          >
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-emerald-500 text-black text-xs font-semibold tracking-wide">
              BARN AI
            </div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 mb-2">
              After
            </h3>
            <p className="text-xl sm:text-2xl font-semibold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                The Barn AI Way
              </span>
            </p>
            <ul className="space-y-4">
              {NEW_WAY.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-400" strokeWidth={3} />
                  </span>
                  <span className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
