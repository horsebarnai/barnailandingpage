"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

/* ============================================================
 * Regulatory Compliance · "Integrity Framework" Terminal
 *
 * macOS-style window frame with a polarized-privacy-glass body.
 * Three overlay layers create the privacy effect:
 *   1. Fine 45° diagonal stripes (always visible)
 *   2. Emerald micro-grid (revealed on hover)
 *   3. Vertical scanning beam (Framer Motion infinite loop)
 *
 * Copy references the federal HISA framework without naming it:
 * "Covered Horses", "ADMC", "Vet's List". Industry-standard
 * terminology a trainer or owner immediately recognizes.
 * ============================================================ */

const TERMINAL_LINES = [
  { task: "SYNCING COVERED HORSE REGISTRY", status: "OK [SECURE]" },
  { task: "RECONCILING ADMC MEDICATION GUIDELINES", status: "MATCHED" },
  { task: "COMPILING VET'S LIST DATASETS", status: "ACTIVE" },
  { task: "VERIFYING TRAINER LIABILITY PROTOCOLS", status: "VALIDATED" },
] as const

const COMPLIANCE_INDICATORS = [
  {
    label: "Anti-Doping & Medication Control",
    body: "Real-time monitoring of controlled substance administration limits and daily medication logs.",
  },
  {
    label: "Responsible Person Registry",
    body: "Automated registration and chain-of-custody tracking for all Covered Horses.",
  },
  {
    label: "Treatment Ledger Sync",
    body: "Seamless upload of daily health records, vaccinations, and 60-day transfer logs for claimed horses.",
  },
  {
    label: "Active Vet's List Monitoring",
    body: "Direct pipeline tracking for automated entry clearance and workout compliance.",
  },
] as const

export function RegulatoryCompliance() {
  return (
    <section
      id="regulatory-compliance"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-zinc-950/30 to-black" />

      <div className="relative mx-auto max-w-7xl">
        {/* ── Section header ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center lg:mb-16"
        >
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
            Regulatory Integrity Engine
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            The New Standard in{" "}
            <span className="text-zinc-500">Track Safety.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-zinc-400 lg:text-lg">
            Automate your compliance workflows under the latest national
            medication guidelines and track safety protocols. One terminal
            to keep your stable clear, verified, and racing.
          </p>
        </motion.div>

        {/* ── macOS Window Frame ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="group relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#030303] shadow-[0_40px_100px_-30px_rgba(16,185,129,0.30),inset_0_1px_0_rgba(255,255,255,0.04)]"
        >
          {/* ── Title bar ── */}
          <div className="relative z-10 flex items-center justify-between border-b border-zinc-900/80 bg-zinc-950/80 px-4 py-3 backdrop-blur">
            {/* Traffic lights */}
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56] shadow-[inset_0_1px_0_rgba(0,0,0,0.25)]" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-[inset_0_1px_0_rgba(0,0,0,0.25)]" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F] shadow-[inset_0_1px_0_rgba(0,0,0,0.25)]" />
            </div>

            {/* File tab */}
            <div className="hidden font-mono text-[11px] text-zinc-500 sm:block">
              integrity_framework.sh
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <motion.span
                className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.7)]"
                animate={{ opacity: [1, 0.45, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">
                System Aligned
              </span>
            </div>
          </div>

          {/* ── Body with Privacy Glass overlays ── */}
          <div className="relative p-5 sm:p-7 lg:p-10">
            {/* Layer 1: Polarized 45° stripes (fades on hover) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out group-hover:opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  rgba(0, 0, 0, 0.18) 0px,
                  rgba(0, 0, 0, 0.18) 5px,
                  transparent 5px,
                  transparent 11px,
                  rgba(16, 185, 129, 0.035) 11px,
                  rgba(16, 185, 129, 0.035) 12px
                )`,
              }}
            />

            {/* Layer 2: Emerald micro-grid (reveals on hover) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(16, 185, 129, 0.10) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(16, 185, 129, 0.10) 1px, transparent 1px)
                `,
                backgroundSize: "28px 28px",
              }}
            />

            {/* Layer 3: Vertical scanning beam */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 h-32"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(16, 185, 129, 0.10) 50%, transparent 100%)",
              }}
              initial={{ top: "-15%" }}
              animate={{ top: "115%" }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            {/* ── Content (above the overlays) ── */}
            <div className="relative z-10">
              {/* Two-column: terminal + shield */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-6">
                {/* LEFT — Terminal feedback */}
                <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/85 p-5 backdrop-blur-sm">
                  <div className="mb-4 flex items-center justify-between border-b border-zinc-900/80 pb-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      /pipeline · live
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400/80">
                        Streaming
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 font-mono text-[11px] leading-relaxed sm:text-[12px]">
                    {TERMINAL_LINES.map((line, i) => (
                      <motion.div
                        key={line.task}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.18 }}
                        className="flex items-baseline gap-2"
                      >
                        <span className="select-none text-zinc-600">&gt;</span>
                        <span className="flex-1 truncate text-zinc-400">
                          {line.task}
                        </span>
                        <span className="font-semibold text-emerald-400 tabular-nums">
                          {line.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* RIGHT — Shield + status card */}
                <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-800/80 bg-zinc-950/85 p-6 backdrop-blur-sm">
                  {/* Shield with breathing glow */}
                  <div className="relative mb-6">
                    <motion.div
                      className="absolute inset-0 -m-6 rounded-full bg-emerald-500/20 blur-2xl"
                      animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.95, 1.05, 0.95] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/[0.06] shadow-[inset_0_0_24px_rgba(16,185,129,0.10)]">
                      <ShieldCheck
                        className="h-11 w-11 text-emerald-400"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Status card */}
                  <div className="w-full max-w-[260px] rounded-md border border-emerald-500/30 bg-emerald-500/[0.04] px-4 py-3 text-center shadow-[0_0_24px_-8px_rgba(16,185,129,0.45)]">
                    <div className="mb-1 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
                      National Compliance Protocol
                    </div>
                    <div className="font-mono text-[12px] font-bold tracking-wide text-emerald-300">
                      // 100% UNIFORM ALIGNMENT
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom row — 4 compliance indicators */}
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                {COMPLIANCE_INDICATORS.map((ind, i) => (
                  <motion.div
                    key={ind.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                    className="rounded-md border border-zinc-800/80 bg-zinc-950/85 p-4 backdrop-blur-sm transition-colors duration-300 hover:border-emerald-500/40"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]" />
                      <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.15em] text-emerald-400/90">
                        {ind.label}
                      </span>
                    </div>
                    <p className="text-[12px] leading-relaxed text-zinc-400">
                      {ind.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
