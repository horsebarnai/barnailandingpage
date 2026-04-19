"use client"

import { motion } from "framer-motion"

const founders = [
  {
    name: "Om Kanmadikar",
    initials: "OK",
    role: "FOUNDER & CHIEF EXECUTIVE OFFICER",
    bio: "Serial entrepreneur, technical builder, and attorney. Leads product vision, engineering, and legal strategy. JD, University of Kentucky.",
  },
  {
    name: "Bill Murphy",
    initials: "BM",
    role: "CO-FOUNDER & CHIEF EQUINE OFFICER",
    bio: "Lifelong horseman. Raised in Central Kentucky's thoroughbred industry — multi-generational relationships across Lexington's farms, stallion stations, and auction houses. Background across equine and global equine transport. BA Finance, Transylvania University.",
  },
  {
    name: "Mukund Venkatakrishnan",
    initials: "MV",
    role: "CHIEF STRATEGY OFFICER",
    bio: "2x founder — sold first med-tech company within Schmidt Futures. CEO of Upfront. Harvard College, Math & Philosophy. Background across Box Group, crypto, and real-world assets.",
  },
  {
    name: "Dale Browning",
    initials: "DB",
    role: "CHIEF FINANCIAL OFFICER & INTERIM CHIEF OPERATIONS OFFICER",
    bio: "20+ years across finance, strategy, and AI. Executive leadership from startups to Fortune 500. University of Louisville, Deloitte, Humana.",
  },
]

export function TeamSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Leadership
          </h2>
        </motion.div>

        {/* Founders Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Dark Card */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 h-full">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center mb-6">
                  <span className="text-lg font-bold text-white">
                    {founder.initials}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{founder.name}</h3>
                  <p className="text-xs text-emerald-500 font-semibold tracking-wider mb-4">{founder.role}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{founder.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
