"use client"

import { motion } from "framer-motion"
import { Brain, Lock, Zap } from "lucide-react"

const capabilities = [
  {
    icon: Brain,
    title: "Institutional-Grade Intelligence",
    description: "Advanced decision support powered by proprietary models trained on decades of industry data.",
  },
  {
    icon: Lock,
    title: "Secure Data Infrastructure", 
    description: "Enterprise-level security with end-to-end encryption and comprehensive access controls.",
  },
  {
    icon: Zap,
    title: "Seamless Integrations",
    description: "Connect with your existing tools and workflows through our flexible API architecture.",
  },
]

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
            AI Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            The AI Layer for Breeding.
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Institutional-grade intelligence, secure data infrastructure, and advanced decision support—built for the modern breeding operation.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {capabilities.map((capability, idx) => {
            const Icon = capability.icon
            return (
              <div
                key={idx}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-emerald-500/30 transition-all duration-500"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-zinc-800/80 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-emerald-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {capability.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-500 text-sm">
            Currently in private beta with select partners.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
