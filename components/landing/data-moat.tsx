"use client"

import { motion } from "framer-motion"
import { Cpu, ShieldCheck, Network } from "lucide-react"

/* ============================================================
 * Module 02 — The AI Layer
 *
 * Modernized capability triptych. Each card carries:
 *   - Numeric index in mono (00 / 01 / 02)
 *   - Compact lucide icon with emerald ring
 *   - Title in font-display (Playfair)
 *   - Body in sans
 *   - A "data signature" at the bottom in font-mono — gives each
 *     capability a concrete technical proof point
 *
 * Typography rhymes with the Sovereignty Vault + Hero — same
 * font-display + font-tech pairing across all three.
 * ============================================================ */

const CAPABILITIES = [
  {
    index: "00",
    icon: Cpu,
    titlePrefix: "Institutional-Grade",
    titleAccent: "Intelligence",
    body: "Decision support powered by proprietary models trained on decades of bloodstock, race, and transactional history.",
    signature: "TRAINED ON · 50M+ EVENTS",
  },
  {
    index: "01",
    icon: ShieldCheck,
    titlePrefix: "Sovereign Data",
    titleAccent: "Infrastructure",
    body: "Your operation's data stays yours. End-to-end encryption, granular access controls, and per-operation isolation.",
    signature: "AES-256 · SOC-2 READY",
  },
  {
    index: "02",
    icon: Network,
    titlePrefix: "Seamless Stable",
    titleAccent: "Integration",
    body: "Your barn's operations sync directly with the registries, auction rings, and clinics you already work with.",
    signature: "REGISTRIES · AUCTIONS · CLINICS",
  },
] as const

export function DataMoat() {
  return (
    <section
      id="data-edge"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      {/* Background: layered halo + faint grid */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-zinc-950/40 to-black" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #1ea866 1px, transparent 1px), linear-gradient(to bottom, #1ea866 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[420px] w-[900px] rounded-full bg-emerald-500/[0.06] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* ─── Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center lg:mb-20"
        >
          <div className="mb-5 inline-flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.35em] text-emerald-400">
            <span className="h-px w-6 bg-emerald-400/60" />
            AI Infrastructure
            <span className="h-px w-6 bg-emerald-400/60" />
          </div>

          <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Built for the{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
              Modern Barn.
            </span>
          </h2>
        </motion.div>

        {/* ─── Capability triptych ────────────────────────────── */}
        <div className="grid gap-5 md:grid-cols-3 md:gap-6 lg:gap-7">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-7 backdrop-blur-md transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_60px_-20px_rgba(16,185,129,0.4)] sm:p-8"
              >
                {/* Numeric index — top right */}
                <div className="absolute right-5 top-5 font-mono text-[11px] tracking-[0.2em] text-zinc-700 transition-colors duration-500 group-hover:text-emerald-500/60 sm:right-6 sm:top-6">
                  / {cap.index}
                </div>

                {/* Soft hover glow background */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  {/* Icon with ringed plate */}
                  <div className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/70 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/[0.06]">
                    <Icon
                      className="h-5 w-5 text-emerald-400 transition-transform duration-500 group-hover:scale-110"
                      strokeWidth={1.6}
                    />
                  </div>

                  {/* Title — same italic-emerald accent pattern as the h2 */}
                  <h3 className="mb-3 font-display text-xl font-medium leading-tight text-white sm:text-2xl">
                    {cap.titlePrefix}{" "}
                    <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
                      {cap.titleAccent}
                    </span>
                  </h3>

                  {/* Body */}
                  <p className="text-[15px] leading-relaxed text-zinc-400">
                    {cap.body}
                  </p>

                  {/* Divider + data signature */}
                  <div className="mt-7 flex items-center gap-3 border-t border-zinc-800/60 pt-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 transition-colors duration-500 group-hover:text-emerald-400/80">
                      {cap.signature}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ─── Footer status line ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
            Private Beta
          </span>
          <span className="text-zinc-800">·</span>
          <span>Select Partners</span>
          <span className="text-zinc-800">·</span>
          <span>2026.05</span>
        </motion.div>
      </div>
    </section>
  )
}
