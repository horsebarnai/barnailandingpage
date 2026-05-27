"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, X } from "lucide-react"

import {
  primaryNav,
  type MegaMenu as MegaMenuType,
} from "@/lib/site-content/nav"

export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [expanded, setExpanded] = useState<MegaMenuType["key"] | null>(null)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim */}
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-black border-l border-white/10 lg:hidden"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/5 px-5 h-16">
              <div className="flex items-center gap-3">
                <img
                  src="/barn-ai-shard.svg"
                  alt=""
                  width={28}
                  height={32}
                  className="block h-8 w-auto"
                />
                <span className="text-lg font-bold text-white">barn ai</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close navigation"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable nav body */}
            <nav className="flex-1 overflow-y-auto px-2 py-4">
              <ul className="space-y-1">
                {primaryNav.map((item) => {
                  if (item.kind === "link") {
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="block px-4 py-3 text-base font-medium text-zinc-200 hover:bg-white/[0.04] hover:text-white rounded-lg transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    )
                  }

                  const menu = item.menu
                  const isOpen = expanded === menu.key
                  return (
                    <li key={menu.key}>
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded(isOpen ? null : menu.key)
                        }
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between px-4 py-3 text-base font-medium text-zinc-200 hover:bg-white/[0.04] hover:text-white rounded-lg transition-colors"
                      >
                        <span>{menu.trigger}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-emerald-400" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="expand"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pt-2 pb-3 space-y-4">
                              {menu.groups.map((group) => (
                                <div key={group.title} className="space-y-1.5">
                                  <Link
                                    href={group.href}
                                    onClick={onClose}
                                    className="block py-1 group"
                                  >
                                    <span className="block text-sm font-semibold text-white group-hover:text-emerald-200 transition-colors">
                                      {group.title}
                                    </span>
                                    {group.description && (
                                      <span className="mt-0.5 block text-[12px] leading-snug text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                        {group.description}
                                      </span>
                                    )}
                                  </Link>
                                  {group.items.length > 0 && (
                                    <ul className="space-y-0.5 pl-3 border-l border-zinc-800/60">
                                      {group.items.map((sub) => (
                                        <li key={sub.href + sub.name}>
                                          <Link
                                            href={sub.href}
                                            onClick={onClose}
                                            className="block py-1.5 text-sm text-zinc-300 hover:text-white transition-colors"
                                          >
                                            {sub.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Footer CTA */}
            <div className="border-t border-white/5 p-5">
              <Link
                href="/book-a-demo"
                onClick={onClose}
                className="block w-full rounded-full bg-emerald-500 px-6 py-3 text-center text-base font-semibold text-black shadow-[0_0_24px_-6px_rgba(74,222,128,0.6)] transition hover:bg-emerald-400"
              >
                Book a Demo
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
