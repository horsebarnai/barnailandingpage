"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

/* ============================================================
 * Trust & Discretion
 *
 * Editorial closer on confidentiality, precision, and stewardship.
 * No agent names, no architectural detail — emotional + brand.
 * ============================================================ */

const COMMITMENTS = [
  {
    line: "Sovereign by default.",
    body: "Your operation's history is yours. We see what you choose to show. Nothing more.",
  },
  {
    line: "Private bank discipline.",
    body: "The encryption, isolation, and audit posture institutional capital takes for granted — applied to your stable.",
  },
  {
    line: "Multi-generational stewardship.",
    body: "We build for the operator who is still here in twenty years — and the heirs who will inherit the book.",
  },
] as const

export function TrustAndDiscretion() {
  return (
    <Section rhythm="loose" className="border-t border-white/[0.04]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: "#0a0f0c" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1ea866 1px, transparent 1px), linear-gradient(to bottom, #1ea866 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-1/4 left-1/2 h-[480px] w-[920px] -translate-x-1/2 rounded-full bg-emerald-500/[0.06] blur-[160px]" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl"
        >
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.32em] text-emerald-400/90">
            <span className="text-emerald-400">◆</span>
            <span className="ml-2">Trust · Discretion · Stewardship</span>
          </div>

          <h2 className="font-display text-3xl lg:text-5xl xl:text-6xl font-medium leading-[1.05] tracking-tight text-white">
            The privacy of{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
              a private bank.
            </span>
          </h2>

          <div className="mt-8 space-y-5 text-base lg:text-lg leading-relaxed text-zinc-300">
            <p>
              An elite operation is built on relationships, reputations, and
              records that cannot be replaced. The penalty for a leak — or a
              loss — is not measured in dollars. It is measured in trust.
            </p>
            <p className="text-zinc-400">
              We treat your operation's data with the discipline of a private
              bank handling a hundred-year client. Air-gapped boundaries.
              Customer-held keys. Audit trails immune to convenience. The
              world sees what you show. Nothing more.
            </p>
          </div>
        </motion.div>

        {/* Commitments — quietly impressive typography card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mt-16 mx-auto max-w-5xl"
        >
          <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-zinc-950/60 backdrop-blur-md shadow-[0_40px_120px_-30px_rgba(16,185,129,0.25),inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="grid grid-cols-1 divide-y divide-zinc-800/60 md:grid-cols-3 md:divide-x md:divide-y-0">
              {COMMITMENTS.map((c, i) => (
                <div
                  key={c.line}
                  className="relative p-7 lg:p-9"
                >
                  <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400/70 tabular-nums">
                    Commitment / {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl font-medium leading-snug text-white">
                    {c.line}
                  </h3>
                  <p className="mt-3 text-[13.5px] lg:text-sm leading-relaxed text-zinc-400">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quiet sign-off */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="relative mt-14 text-center"
        >
          <p className="font-display italic text-base lg:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Built for the operators whose work outlives them.
          </p>
          <Link
            href="/contact"
            className="group mt-7 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-200 transition-all hover:border-zinc-500 hover:text-white"
          >
            <span>Begin a conversation</span>
            <ArrowUpRight
              className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </Container>
    </Section>
  )
}
