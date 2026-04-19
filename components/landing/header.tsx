"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "AI Integrations", href: "#platform" },
  { name: "Data Edge", href: "#data-edge" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/5"
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

          {/* Desktop Navigation - Flat List */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
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
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-zinc-800">
                <span className="block w-full text-center bg-zinc-800 text-zinc-400 font-medium py-3 rounded-full cursor-default">
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
