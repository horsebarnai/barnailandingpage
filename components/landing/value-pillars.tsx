"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Minus, Plus } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section, SectionHeader } from "@/components/layout/section"
import { VALUE_PILLARS, type ValuePillar } from "@/lib/site-content/value-pillars"
import { cn } from "@/lib/utils"

/* ============================================================
 * Four Pillars — the outcome-driven accordion that anchors the
 * value story on the landing page. Mirrors the Solutions mega
 * menu so the nav and the page tell the same story.
 *
 * Implementation: custom controlled accordion with framer-motion
 * for premium expand/collapse feel. Built single-open so the
 * page has visual focus on one outcome at a time.
 * ============================================================ */

export function ValuePillars() {
  const [openKey, setOpenKey] = useState<ValuePillar["key"] | null>(
    VALUE_PILLARS[0].key,
  )

  return (
    <Section rhythm="default" className="border-t border-white/[0.04]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute bottom-1/3 right-1/4 h-[420px] w-[820px] translate-x-1/2 rounded-full bg-emerald-500/[0.06] blur-[140px]" />
      </div>

      <Container>
        <SectionHeader
          eyebrow="The Platform · Four Pillars"
          title="Four standards."
          titleAccent="The platform answers to all of them."
          kicker="We measure the operating system against four outcomes. Tap any pillar to see what it means in practice."
          align="center"
        />

        <div className="mt-14 mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-950/50 backdrop-blur-md">
            {VALUE_PILLARS.map((pillar, i) => {
              const Icon = pillar.icon
              const isOpen = openKey === pillar.key
              return (
                <div
                  key={pillar.key}
                  className={cn(
                    "relative",
                    i > 0 && "border-t border-zinc-800/60",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenKey(isOpen ? null : pillar.key)}
                    aria-expanded={isOpen}
                    aria-controls={`pillar-${pillar.key}`}
                    className="group flex w-full items-center gap-5 px-6 py-6 text-left transition-colors hover:bg-white/[0.02] lg:px-8 lg:py-7"
                  >
                    <span
                      className={cn(
                        "inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border bg-zinc-900/70 transition-all duration-300",
                        isOpen
                          ? "border-emerald-500/50 bg-emerald-500/[0.08] shadow-[0_0_24px_-8px_rgba(16,185,129,0.5)]"
                          : "border-zinc-800 group-hover:border-emerald-500/30",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 transition-colors duration-300",
                          isOpen ? "text-emerald-300" : "text-emerald-400/80",
                        )}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400/70 tabular-nums">
                        Pillar / {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="font-display text-xl lg:text-2xl font-medium leading-tight text-white">
                        {pillar.name}
                      </div>
                      <div
                        className={cn(
                          "mt-1 text-[13.5px] leading-snug transition-colors",
                          isOpen ? "text-zinc-300" : "text-zinc-500",
                        )}
                      >
                        {pillar.tagline}
                      </div>
                    </div>

                    <span
                      className={cn(
                        "inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        isOpen
                          ? "border-emerald-500/50 bg-emerald-500/[0.08] text-emerald-300"
                          : "border-zinc-800 bg-zinc-900/40 text-zinc-500 group-hover:border-zinc-700 group-hover:text-zinc-300",
                      )}
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" strokeWidth={1.8} />
                      ) : (
                        <Plus className="h-4 w-4" strokeWidth={1.8} />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        id={`pillar-${pillar.key}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-7 pt-2 lg:px-8 lg:pb-9">
                          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 pl-[64px] lg:pl-[80px]">
                            <p className="text-[15px] lg:text-base leading-relaxed text-zinc-300">
                              {pillar.body}
                            </p>
                            <ul className="space-y-3 border-l border-emerald-500/20 pl-5">
                              {pillar.bullets.map((b) => (
                                <li
                                  key={b}
                                  className="flex items-start gap-2.5"
                                >
                                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]" />
                                  <span className="text-[13.5px] leading-relaxed text-zinc-400">
                                    {b}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-7 pl-[64px] lg:pl-[80px]">
                            <Link
                              href="/contact"
                              className="group inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-300 transition-all hover:border-emerald-400/70 hover:bg-emerald-500/[0.12]"
                            >
                              <span>Talk to us about this</span>
                              <ArrowUpRight
                                className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                              />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
