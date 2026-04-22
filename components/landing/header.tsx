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
          <Link href="/" className="flex items-center gap-2.5">
            <svg viewBox="0 0 32 24" className="w-7 h-5" fill="none">
              <path
                d="M16 2C10 2 4 8 4 16V22H8V16C8 12 11 8 16 8C21 8 24 12 24 16V22H28V16C28 8 22 2 16 2Z"
                fill="#4ADE80"
              />
              <path
                d="M12 22V16C12 14 13.5 12 16 12C18.5 12 20 14 20 16V22H12Z"
                fill="#4ADE80"
              />
            </svg>
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
