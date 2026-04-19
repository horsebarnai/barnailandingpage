"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

const founders = [
  {
    name: "Om Kanmadikar",
    initials: "OK",
    role: "Co-Founder & CEO",
    bio: "Serial entrepreneur, technical builder, and
 attorney. Drives product, engineering, legal, and financial strategy across Barn AI. JD, University of Kentucky College of Law. BA Public Health, University of Louisville.",
    image: null,
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Bill Murphy",
    initials: "BM",
    role: "Co-Founder & Industry SME",
    bio: "Raised in Central Kentucky's thoroughbred industry with deep multi-generational relationships across Lexington's breeding farms, stallion stations, bloodstock agencies, and auction houses. BA Finance from Transylvania University, where he was a member of weof the Men's Basketball team.",
    image: null,
    linkedin: "#",
    twitter: "#",
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="text-sm text-emerald-400 font-medium">Meet the Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Built by Industry Insiders
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Our founding team combines deep expertise in equine breeding, institutional finance, and AI technology.
          </p>
        </motion.div>

        {/* Founders Grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-2xl mx-auto">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-zinc-900/50 border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                {/* Avatar */}
                <div className="relative w-24 h-24 mx-auto mb-5">
                  {founder.image ? (
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full rounded-full object-cover border-2 border-emerald-500/30"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-2 border-emerald-500/30 flex items-center justify-center">
                      <span className="text-2xl font-bold text-emerald-400">
                        {founder.initials}
                      </span>
                    </div>
                  )}
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-1">{founder.name}</h3>
                  <p className="text-sm text-emerald-400 font-medium mb-3">{founder.role}</p>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4">{founder.bio}</p>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      href={founder.linkedin}
                      className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Link>
                    <Link
                      href={founder.twitter}
                      className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 border border-white/5">
            <h3 className="text-xl font-semibold text-white mb-4">Our Mission</h3>
            <p className="text-zinc-400 leading-relaxed">
              We&apos;re building the institutional-grade infrastructure the equine industry deserves. 
              By combining decades of pedigree data with cutting-edge AI, we&apos;re empowering breeders, 
              syndicates, and bloodstock agents to make smarter decisions—faster.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
