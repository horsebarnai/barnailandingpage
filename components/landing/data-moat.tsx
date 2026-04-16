"use client"

import { motion } from "framer-motion"
import { Database, Network, Shield } from "lucide-react"

const moatCards = [
  {
    icon: Database,
    title: "Proprietary Data",
    description: "Two decades of pedigree records, sale results, and performance metrics aggregated into a single institutional-grade dataset. Our data infrastructure is our moat.",
    highlight: "Two decades of pedigree data"
  },
  {
    icon: Network,
    title: "Direct Breeder Distribution",
    description: "Building direct relationships with leading breeding operations to surface inventory, pricing, and availability ahead of public listing.",
    highlight: "Partner network in development"
  },
  {
    icon: Shield,
    title: "Embedded Financial Services",
    description: "Future-ready tooling for syndication structuring and deal workflows — designed to integrate with the financial and insurance partners you already use.",
    highlight: "Launching 2026"
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export function DataMoat() {
  return (
    <section id="data-edge" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
            Our Edge
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            The Data Moat.{" "}
            <span className="text-zinc-500">Unforkable.</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Three pillars that make Barn AI impossible to replicate.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {moatCards.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.div
                key={idx}
                variants={item}
                className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800/50 hover:border-emerald-500/30 transition-all duration-500"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-emerald-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    {card.description}
                  </p>

                  {/* Highlight Stat */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm text-emerald-400 font-medium">{card.highlight}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
