"use client"

import { motion } from "framer-motion"

// Abstract geometric node visualization component
function AbstractVisualization() {
  return (
    <div className="relative w-full aspect-[4/3] bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-600/10" />
      
      {/* Glowing nodes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        {/* Connection lines */}
        <g stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1">
          <line x1="80" y1="80" x2="200" y2="120" />
          <line x1="200" y1="120" x2="320" y2="90" />
          <line x1="200" y1="120" x2="180" y2="200" />
          <line x1="180" y1="200" x2="100" y2="220" />
          <line x1="180" y1="200" x2="280" y2="210" />
          <line x1="320" y1="90" x2="350" y2="160" />
          <line x1="280" y1="210" x2="350" y2="160" />
          <line x1="100" y1="220" x2="60" y2="180" />
          <line x1="60" y1="180" x2="80" y2="80" />
        </g>
        
        {/* Animated nodes */}
        <g>
          <circle cx="80" cy="80" r="8" fill="rgba(16, 185, 129, 0.3)">
            <animate attributeName="r" values="8;10;8" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="80" cy="80" r="4" fill="#10b981" />
          
          <circle cx="200" cy="120" r="12" fill="rgba(16, 185, 129, 0.3)">
            <animate attributeName="r" values="12;15;12" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="120" r="6" fill="#10b981" />
          
          <circle cx="320" cy="90" r="8" fill="rgba(16, 185, 129, 0.3)">
            <animate attributeName="r" values="8;11;8" dur="2.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="320" cy="90" r="4" fill="#10b981" />
          
          <circle cx="180" cy="200" r="10" fill="rgba(16, 185, 129, 0.3)">
            <animate attributeName="r" values="10;13;10" dur="3.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="180" cy="200" r="5" fill="#10b981" />
          
          <circle cx="100" cy="220" r="6" fill="rgba(16, 185, 129, 0.2)">
            <animate attributeName="r" values="6;8;6" dur="2.7s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="220" r="3" fill="#10b981" />
          
          <circle cx="280" cy="210" r="7" fill="rgba(16, 185, 129, 0.25)">
            <animate attributeName="r" values="7;9;7" dur="3.1s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="210" r="3.5" fill="#10b981" />
          
          <circle cx="350" cy="160" r="9" fill="rgba(16, 185, 129, 0.3)">
            <animate attributeName="r" values="9;12;9" dur="2.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="350" cy="160" r="4.5" fill="#10b981" />
          
          <circle cx="60" cy="180" r="5" fill="rgba(16, 185, 129, 0.2)">
            <animate attributeName="r" values="5;7;5" dur="2.9s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="180" r="2.5" fill="#10b981" />
        </g>
      </svg>
      
      {/* Glassmorphism card overlay */}
      <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 mb-1">Intelligence Network</p>
            <p className="text-sm font-medium text-white">Real-time data processing</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function ShowcaseTabs() {
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
            Purpose-built modules designed for institutional operations.
          </p>
        </motion.div>
      </div>

      {/* Single Feature Display */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Description */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Secure Data Infrastructure.
            </h3>
            <p className="text-lg text-zinc-400 leading-relaxed mb-6">
              Monitor and manage your operations through a unified dashboard. 
              Our platform integrates seamlessly with your existing workflows 
              while providing institutional-grade security and compliance.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-sm text-emerald-400 font-medium">Enterprise Ready</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700">
                <span className="text-sm text-zinc-400 font-medium">SOC 2 Compliant</span>
              </div>
            </div>
          </div>

          {/* Right: Abstract Visualization */}
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-3xl transform scale-95" />
            <AbstractVisualization />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
