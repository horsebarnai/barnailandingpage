"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

/* ============================================================
 * The Barn Operating System
 *
 * Solution narrative — Barn AI as the silent chief of staff
 * running underneath the entire operation. No mention of specific
 * agents, modules, or methodology. Concept and tone only.
 * ============================================================ */

const PROOF_LINES = [
  "Records that find themselves.",
  "Settlements that compute themselves.",
  "Compliance that holds itself current.",
  "An operation that runs whether or not you're in the room.",
] as const

export function BarnOperatingSystem() {
  return (
    <Section rhythm="loose" className="border-t border-white/[0.04]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[1020px] rounded-full bg-emerald-500/[0.08] blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1ea866 1px, transparent 1px), linear-gradient(to bottom, #1ea866 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <h2 className="font-display text-4xl lg:text-6xl xl:text-7xl font-medium leading-[1.04] tracking-tight text-white">
            An operating system.{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
              Not another tool.
            </span>
          </h2>

          <p className="mt-8 mx-auto max-w-2xl text-lg lg:text-xl text-zinc-400 leading-relaxed">
            Barn AI is the quiet back-office layer your operation has always
            needed — running continuously beneath the work you actually
            signed up for. Imagine an elite administrative chief of staff
            who never sleeps, never forgets, and answers only to you.
          </p>

          <p className="mt-5 mx-auto max-w-2xl text-base lg:text-lg text-zinc-500 leading-relaxed">
            That's the brief we build to. Nothing flashy. Nothing in your
            way. The administrative friction of the business does not
            disappear — it moves below the surface.
          </p>
        </motion.div>

        {/* Quiet proof lines — typography-driven, no boxes. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-16 lg:mt-20"
        >
          <div className="mx-auto max-w-4xl border-y border-zinc-800/60">
            {PROOF_LINES.map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className={`flex items-baseline gap-5 py-5 lg:py-6 ${
                  i > 0 ? "border-t border-zinc-800/60" : ""
                }`}
              >
                <span className="font-mono text-[11px] tabular-nums text-emerald-400/70 tracking-[0.2em]">
                  / {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl lg:text-2xl xl:text-3xl font-medium leading-snug text-zinc-200">
                  {line}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing line + soft CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative mt-12 text-center"
        >
          <Link
            href="/book-a-demo"
            className="group inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-300 transition-colors"
          >
            <span className="font-mono uppercase tracking-[0.2em] text-[11px]">
              See it in motion
            </span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </Container>
    </Section>
  )
}
