"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Sparkles, Share2, TrendingUp, Calendar } from "lucide-react"

const features = [
  {
    id: "syndicate-portfolio",
    name: "Syndicate Portfolio",
    icon: TrendingUp,
    headline: "Real-Time Asset Management.",
    description: "Track your barn value with live market data. Monitor equity positions, breeding fees, and projected returns across your entire portfolio in one unified dashboard.",
    image: "/screenshots/barn.png",
  },
  {
    id: "ai-matcher",
    name: "AI Matcher",
    icon: Sparkles,
    headline: "Multi-Factor Match Engine.",
    description: "Score potential crosses using our proprietary matching engine. Get compatibility analysis, trait predictions, and confidence scores for every pairing — grounded in decades of pedigree and performance data.",
    image: "/screenshots/ai-match.png",
  },
  {
    id: "race-calendar",
    name: "Race Calendar",
    icon: Calendar,
    headline: "Global Events Dashboard.",
    description: "Never miss a race, sale, or breeding deadline. Our intelligent calendar aggregates global events with personalized alerts for your watchlist and barn.",
    image: "/screenshots/home.png",
  },
]

export function ShowcaseTabs() {
  const [activeTab, setActiveTab] = useState(features[0].id)
  const activeFeature = features.find(f => f.id === activeTab) || features[0]

  return (
    <section id="platform" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 lg:mb-20">
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

      {/* Apple Pro Layout: Vertical Tabs Left, Screenshot Right */}
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-16 items-start">
          {/* Left: Vertical Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 lg:sticky lg:top-32"
          >
            {features.map((feature) => {
              const Icon = feature.icon
              const isActive = activeTab === feature.id
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`
                    relative flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all duration-300 min-w-max lg:min-w-0 lg:w-full
                    ${isActive 
                      ? "bg-zinc-900 border border-emerald-500/30 shadow-[0_0_20px_rgba(74,222,128,0.15)]" 
                      : "bg-transparent hover:bg-zinc-900/50 border border-transparent"
                    }
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300
                    ${isActive ? "bg-emerald-500/20" : "bg-zinc-800"}
                  `}>
                    <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? "text-emerald-400" : "text-zinc-500"}`} />
                  </div>
                  <div>
                    <p className={`font-medium transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-400"}`}>
                      {feature.name}
                    </p>
                    <p className="text-xs text-zinc-600 hidden lg:block">
                      {feature.headline.replace(".", "")}
                    </p>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-400 rounded-r-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </motion.div>

          {/* Right: Screenshot + Description */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-8"
              >
                {/* Feature Description */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    {activeFeature.headline}
                  </h3>
                  <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
                    {activeFeature.description}
                  </p>
                </div>

                {/* Device Mockup */}
                <div className="relative">
                  {/* Glow */}
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-3xl transform scale-95" />
                  
                  {/* Tablet/Large Phone Frame */}
                  <div className="relative bg-zinc-950 rounded-[2rem] p-3 border border-zinc-800 shadow-2xl max-w-md mx-auto lg:mx-0">
                    {/* Inner screen bezel */}
                    <div className="relative overflow-hidden rounded-[1.5rem] bg-black">
                      {/* Status bar */}
                      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/50 to-transparent z-10" />
                      
                      <Image
                        src={activeFeature.image}
                        alt={activeFeature.headline}
                        width={400}
                        height={800}
                        className="w-full h-auto"
                        priority
                      />
                    </div>
                    
                    {/* Home indicator */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-zinc-700 rounded-full" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
