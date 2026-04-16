"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Sparkles, Share2, TrendingUp, Trophy } from "lucide-react"

const features = [
  {
    id: "ai-matcher",
    name: "AI Matcher",
    icon: Sparkles,
    headline: "Billion-Variable Match Engine.",
    description: "Instantly score crosses with our proprietary genetic algorithm. Get real-time compatibility analysis, trait predictions, and confidence scores for every potential pairing.",
    image: "/screenshots/ai-match.png",
    stats: [
      { label: "Variables Analyzed", value: "2.1B+" },
      { label: "Match Accuracy", value: "94%" },
    ]
  },
  {
    id: "pedigree-web",
    name: "Pedigree Web",
    icon: Share2,
    headline: "Interactive Bloodline Explorer.",
    description: "Navigate complex pedigree relationships with our beautiful, interactive visualization. Trace lineage, identify nicks, and discover hidden connections across generations.",
    image: "/screenshots/menu.png",
    stats: [
      { label: "Horses Indexed", value: "8M+" },
      { label: "Generations Deep", value: "12" },
    ]
  },
  {
    id: "syndicate-portfolio",
    name: "Syndicate Portfolio",
    icon: TrendingUp,
    headline: "Real-Time Asset Management.",
    description: "Track your barn value with live market data. Monitor equity positions, breeding fees, and projected returns across your entire portfolio in one unified dashboard.",
    image: "/screenshots/barn.png",
    stats: [
      { label: "AUM Tracked", value: "$2.1B" },
      { label: "Live Pricing", value: "24/7" },
    ]
  },
  {
    id: "race-analytics",
    name: "Race Analytics",
    icon: Trophy,
    headline: "Performance Intelligence Hub.",
    description: "Comprehensive race history and performance metrics. Analyze speed figures, track preferences, and career trajectories to make data-driven breeding and buying decisions.",
    image: "/screenshots/home.png",
    stats: [
      { label: "Races Indexed", value: "12M+" },
      { label: "Tracks Covered", value: "850+" },
    ]
  },
]

export function ShowcaseTabs() {
  const [activeTab, setActiveTab] = useState(features[0].id)
  const activeFeature = features.find(f => f.id === activeTab) || features[0]

  return (
    <section id="platform" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
            Platform
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Every Tool You Need.{" "}
            <span className="text-zinc-500">One Terminal.</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Purpose-built modules designed for institutional equine operations.
          </p>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-12"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {features.map((feature) => {
            const Icon = feature.icon
            const isActive = activeTab === feature.id
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`
                  relative flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(74,222,128,0.4)]" 
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {feature.name}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${activeFeature.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                  <activeFeature.icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400 font-medium">{activeFeature.name}</span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
                  {activeFeature.headline}
                </h3>
                
                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                  {activeFeature.description}
                </p>

                {/* Stats */}
                <div className="flex gap-8">
                  {activeFeature.stats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-zinc-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Screenshot - Strictly Constrained */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-xs">
              {/* Glow */}
              <div className="absolute inset-0 bg-emerald-500/20 rounded-3xl blur-2xl transform scale-95" />
              
              {/* Phone Frame */}
              <div className="relative bg-zinc-900 rounded-[2.5rem] p-2 border border-white/10 shadow-2xl overflow-hidden">
                <div className="relative overflow-hidden rounded-[2rem] bg-black aspect-[9/19]">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-2xl z-10" />
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`image-${activeFeature.id}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="w-full h-full"
                    >
                      <Image
                        src={activeFeature.image}
                        alt={activeFeature.headline}
                        width={320}
                        height={680}
                        className="w-full h-full object-cover object-top"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
