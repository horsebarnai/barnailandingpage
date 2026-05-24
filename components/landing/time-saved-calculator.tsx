"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Clock } from "lucide-react"

const HOURS_PER_HORSE_PER_WEEK = 1.5

export function TimeSavedCalculator() {
  const [count, setCount] = useState<number[]>([25])

  const value = count[0] ?? 1
  const displayValue = value >= 100 ? "100+" : String(value)
  const hoursSaved = Math.round(value * HOURS_PER_HORSE_PER_WEEK * 10) / 10

  return (
    <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative max-w-2xl mx-auto"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400">
              Calculator
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              The Hours You{" "}
            </span>
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              Get Back.
            </span>
          </h3>
        </div>

        <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 backdrop-blur-md p-6 sm:p-10 shadow-[0_0_80px_-20px_rgba(16,185,129,0.25)]">
          {/* Slider input */}
          <div className="mb-10">
            <div className="flex items-baseline justify-between mb-4">
              <label
                htmlFor="horse-count"
                className="text-sm sm:text-base text-zinc-400"
              >
                How many horses or syndicates does your house manage?
              </label>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
                {displayValue}
              </span>
            </div>
            <Slider
              id="horse-count"
              min={1}
              max={100}
              step={1}
              value={count}
              onValueChange={setCount}
              aria-label="Number of horses or syndicates managed"
              className="[&_[data-slot=slider-track]]:bg-zinc-800 [&_[data-slot=slider-range]]:bg-emerald-500 [&_[data-slot=slider-thumb]]:border-emerald-400 [&_[data-slot=slider-thumb]]:bg-emerald-400 [&_[data-slot=slider-thumb]]:shadow-[0_0_20px_rgba(74,222,128,0.6)] [&_[data-slot=slider-thumb]]:size-5"
            />
            <div className="flex justify-between text-xs text-zinc-600 mt-2 font-mono">
              <span>1</span>
              <span>100+</span>
            </div>
          </div>

          {/* Result */}
          <div className="text-center border-t border-zinc-800/70 pt-8">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">
              Hours returned to the work you came in for.
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent tabular-nums">
                {hoursSaved}
              </span>
              <span className="text-xl sm:text-2xl text-zinc-400 font-medium">hrs</span>
            </div>
            <p className="mt-6 text-sm sm:text-base text-zinc-500 italic max-w-md mx-auto">
              The administrative friction of the business does not disappear. It moves below the surface.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
