"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
          Ready to Transform{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
            Your Operation?
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
          Join the top breeding operations, syndicates, and bloodstock agents already using Barn AI.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
            className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/80 text-white px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all duration-300"
          >
            Schedule a Demo
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-col items-center">
          <p className="text-sm text-zinc-500 mb-6">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            <div className="text-zinc-400 font-semibold">Coolmore</div>
            <div className="text-zinc-400 font-semibold">Godolphin</div>
            <div className="text-zinc-400 font-semibold">Juddmonte</div>
            <div className="text-zinc-400 font-semibold">WinStar</div>
            <div className="text-zinc-400 font-semibold">Spendthrift</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
