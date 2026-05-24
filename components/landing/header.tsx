"use client"

import { useState } from "react"
import Link from "next/link"
import Script from "next/script"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const CALENDLY_URL = "https://calendly.com/om-horsebarn/30min"

// Type the Calendly global the widget script injects on window.
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void
    }
  }
}

const navItems = [
  { name: "AI Integrations", href: "#platform" },
  { name: "Data Edge", href: "#data-edge" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const openCalendly = () => {
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    } else {
      console.warn("[header] Calendly widget script hasn't finished loading yet.")
    }
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Calendly assets — React 19 hoists the <link> into <head>; next/script
          loads the widget JS after hydration so it doesn't block first paint. */}
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

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
              <motion.img
                src="/barn-ai-shard.svg"
                alt=""
                width={32}
                height={36}
                className="block h-9 w-auto"
                style={{
                  filter:
                    "drop-shadow(0 0 4px rgba(255, 255, 255, 0.12)) drop-shadow(0 0 10px rgba(167, 243, 208, 0.10))",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
              <span className="text-xl font-bold tracking-tight text-white">barn ai</span>
            </Link>

            {/* Desktop Navigation */}
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
            <div className="hidden lg:flex items-center gap-3">
              <span className="bg-zinc-900/80 border border-zinc-800 text-zinc-500 text-xs font-medium px-3 py-1.5 rounded-full cursor-default">
                App Coming Soon
              </span>
              <button
                type="button"
                onClick={openCalendly}
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-black shadow-[0_0_20px_-4px_rgba(74,222,128,0.55)] transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_30px_-2px_rgba(74,222,128,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Book a Demo
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white"
              aria-label="Toggle navigation menu"
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

                <div className="pt-4 space-y-3 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={openCalendly}
                    className="block w-full rounded-full bg-emerald-500 px-6 py-3 text-center text-base font-semibold text-black shadow-[0_0_24px_-6px_rgba(74,222,128,0.6)] transition hover:bg-emerald-400"
                  >
                    Book a Demo
                  </button>
                  <span className="block w-full text-center bg-zinc-900/80 border border-zinc-800 text-zinc-500 text-xs font-medium py-2 rounded-full cursor-default">
                    App Coming Soon
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
