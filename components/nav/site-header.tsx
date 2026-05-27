"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"

import {
  primaryNav,
  platformMenu,
  solutionsMenu,
  type MegaMenu as MegaMenuType,
} from "@/lib/site-content/nav"
import { MegaMenu } from "@/components/nav/mega-menu"
import { MobileDrawer } from "@/components/nav/mobile-drawer"

const MENU_BY_KEY: Record<MegaMenuType["key"], MegaMenuType> = {
  platform: platformMenu,
  solutions: solutionsMenu,
}

const HOVER_OPEN_DELAY = 80
const HOVER_CLOSE_DELAY = 140

export function SiteHeader() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<MegaMenuType["key"] | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [mobileOpen])

  // Close menus on route change
  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  function scheduleOpen(key: MegaMenuType["key"]) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    if (openTimer.current) clearTimeout(openTimer.current)
    openTimer.current = setTimeout(() => setOpenMenu(key), HOVER_OPEN_DELAY)
  }

  function scheduleClose() {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), HOVER_CLOSE_DELAY)
  }

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0"
              aria-label="Barn AI — home"
            >
              <img
                src="/barn-ai-shard.svg"
                alt=""
                width={32}
                height={36}
                className="block h-9 w-auto"
                style={{
                  filter:
                    "drop-shadow(0 0 4px rgba(255, 255, 255, 0.12)) drop-shadow(0 0 10px rgba(167, 243, 208, 0.10))",
                }}
              />
              <span className="text-xl font-bold tracking-tight text-white">barn ai</span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1"
              onMouseLeave={scheduleClose}
              aria-label="Primary"
            >
              {primaryNav.map((item) => {
                if (item.kind === "link") {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onMouseEnter={scheduleClose}
                      className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        active ? "text-white" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                }
                const menu = item.menu
                const active = pathname.startsWith(menu.href)
                const isOpen = openMenu === menu.key
                return (
                  <div
                    key={menu.key}
                    className="relative"
                    onMouseEnter={() => scheduleOpen(menu.key)}
                  >
                    <Link
                      href={menu.href}
                      onFocus={() => scheduleOpen(menu.key)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={`group inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        active || isOpen ? "text-white" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {menu.trigger}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-emerald-400" : "text-zinc-500"
                        }`}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                )
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/book-a-demo"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-black shadow-[0_0_20px_-4px_rgba(74,222,128,0.55)] transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_30px_-2px_rgba(74,222,128,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Book a Demo
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Open navigation"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mega menu panel — single overlay that switches content,
            keeps geometry stable so hover doesn't flicker. */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              key="mega"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onMouseEnter={() => {
                if (closeTimer.current) clearTimeout(closeTimer.current)
              }}
              onMouseLeave={scheduleClose}
              className="absolute left-0 right-0 top-full"
            >
              <MegaMenu menu={MENU_BY_KEY[openMenu]} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Spacer so fixed header doesn't overlap page content */}
      <div className="h-16 lg:h-20" aria-hidden="true" />
    </>
  )
}
