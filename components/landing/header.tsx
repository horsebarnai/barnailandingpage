"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Sparkles, LineChart, Users, Database, Shield, Calendar, Trophy, Building2, BookOpen, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const platformItems = [
  { name: "AI Matcher", description: "Multi-factor breeding intelligence", icon: Sparkles, href: "#ai-matcher" },
  { name: "Pedigree Web", description: "Interactive lineage visualization", icon: LineChart, href: "#pedigree" },
  { name: "Race Calendar", description: "Global events & sales tracker", icon: Calendar, href: "#calendar" },
  { name: "Syndicate Tools", description: "Portfolio & cap table management", icon: Users, href: "#syndicates" },
]

const dataEdgeItems = [
  { name: "Proprietary Dataset", description: "Two decades of pedigree intelligence", icon: Database, href: "#data" },
  { name: "Partner Network", description: "Direct breeder relationships", icon: Shield, href: "#network" },
  { name: "Performance Analytics", description: "Race results & progeny tracking", icon: Trophy, href: "#analytics" },
]

const companyItems = [
  { name: "About Us", description: "Our mission & founding team", icon: Building2, href: "#about" },
  { name: "Blog", description: "Industry insights & updates", icon: BookOpen, href: "#", comingSoon: true },
  { name: "Contact", description: "Get in touch with our team", icon: Mail, href: "#contact" },
]

type DropdownKey = "platform" | "data" | "company" | null

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/5"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect x="4" y="20" width="24" height="10" rx="3" fill="#4ADE80" />
                <rect x="6" y="14" width="20" height="4" rx="1" fill="#4ADE80" opacity="0.8" />
                <rect x="8" y="10" width="16" height="3" rx="1" fill="#4ADE80" opacity="0.6" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">barn ai</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Platform Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("platform")}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200">
                Platform
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "platform" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === "platform" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2">
                      {platformItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{item.name}</div>
                            <div className="text-xs text-zinc-500">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Data Edge Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("data")}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200">
                Data Edge
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "data" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === "data" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2">
                      {dataEdgeItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{item.name}</div>
                            <div className="text-xs text-zinc-500">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Syndicates Link */}
            <Link
              href="#syndicates"
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
              onMouseEnter={() => setActiveDropdown(null)}
            >
              Syndicates
            </Link>

            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("company")}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200">
                Company
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "company" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === "company" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-72 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2">
                      {companyItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-start gap-3 p-3 rounded-lg transition-colors group ${item.comingSoon ? "opacity-50 cursor-not-allowed" : "hover:bg-white/5"}`}
                          onClick={(e) => item.comingSoon && e.preventDefault()}
                        >
                          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white flex items-center gap-2">
                              {item.name}
                              {item.comingSoon && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-400">Soon</span>
                              )}
                            </div>
                            <div className="text-xs text-zinc-500">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="bg-zinc-800 text-zinc-400 font-medium px-6 py-2 rounded-full cursor-default">
              App Coming Soon
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-b border-white/5"
          >
            <div className="px-4 py-6 space-y-6">
              {/* Platform Section */}
              <div>
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Platform</div>
                <div className="space-y-2">
                  {platformItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm text-zinc-300">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Data Edge Section */}
              <div>
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Data Edge</div>
                <div className="space-y-2">
                  {dataEdgeItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm text-zinc-300">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Company Section */}
              <div>
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Company</div>
                <div className="space-y-2">
                  {companyItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => !item.comingSoon && setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${item.comingSoon ? "opacity-50" : "hover:bg-white/5"}`}
                    >
                      <item.icon className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm text-zinc-300">{item.name}</span>
                      {item.comingSoon && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-400 ml-auto">Soon</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
                <span className="w-full text-center bg-zinc-800 text-zinc-400 font-medium py-3 rounded-full cursor-default">
                  App Coming Soon
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
