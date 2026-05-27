"use client"

import { motion } from "framer-motion"

/* ============================================================
 * Morning Brief
 *
 * Editorial centerpiece for /solutions/farm-management — a
 * stylized "morning paper" preview of what your day on Barn AI
 * looks like. Color-matched to the rest of the site: black ground,
 * emerald accents, zinc body copy, display serif for the big
 * type. Card chrome mirrors the other dark sections.
 *
 * Everything in here is mocked editorial content (Halcyon,
 * Verity, etc. are fictional).
 * ============================================================ */

type Coat = "darkBay" | "chestnut" | "grey" | "bay"

const COAT_COLORS: Record<Coat, string> = {
  darkBay: "#3a2818",
  chestnut: "#9c3e1d",
  grey: "#8a8a8a",
  bay: "#4a2f1c",
}

const HORSES: {
  initials: string
  name: string
  coat: Coat
  details: string
  earnings: string
  wins: string
}[] = [
  {
    initials: "H",
    name: "Halcyon",
    coat: "darkBay",
    details: "Dark Bay · 4yo · Tapit × Sky Brigade",
    earnings: "$1.24M",
    wins: "3",
  },
  {
    initials: "NS",
    name: "Northern Star",
    coat: "chestnut",
    details: "Chestnut · 5yo · Curlin × Wind Chime",
    earnings: "$2.18M",
    wins: "5",
  },
  {
    initials: "V",
    name: "Verity",
    coat: "grey",
    details: "Grey · 3yo · Justify × Silver Moon",
    earnings: "$450K",
    wins: "1",
  },
  {
    initials: "LL",
    name: "Last Light",
    coat: "bay",
    details: "Bay · 6yo · Into Mischief × Soft Hour",
    earnings: "$4.31M",
    wins: "7",
  },
  {
    initials: "Fo",
    name: "Field of Roses",
    coat: "bay",
    details: "Bay · 4yo · Gun Runner × Wild Honey",
    earnings: "$980K",
    wins: "2",
  },
]

export function MorningBrief() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0a0f0c" }}
    >
      {/* Subtle terminal grid + halo backdrop, matching the rest
          of the dark sections (SovereigntyVault / HeritageDepth). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1ea866 1px, transparent 1px), linear-gradient(to bottom, #1ea866 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[360px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-500/[0.05] blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>Vol. III · Issue 21 · Wednesday, May 27</div>
          <div>Lexington, KY · 64°F · Clear</div>
        </motion.div>

        {/* Greeting block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 max-w-4xl lg:mt-12"
        >
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/90">
            Good Morning
          </div>
          <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[64px] xl:text-7xl">
            Today you have
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
              five horses in your barn.
            </span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Three are entered this weekend. Halcyon&apos;s mating window opens
            Tuesday. Last Light is cleared for review. Verity&apos;s settlement
            closes today —{" "}
            <span className="font-semibold text-emerald-400">$84,200</span>.
          </p>
        </motion.div>

        {/* Your Barn — section eyebrow + count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 lg:mt-16"
        >
          <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-400/90">
              Your Barn
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              {HORSES.length} horses · scroll →
            </div>
          </div>

          {/* Horse cards — horizontal scroll on narrow viewports. */}
          <div className="mt-5 -mx-6 sm:-mx-8 lg:-mx-12">
            <div className="flex gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:thin] snap-x snap-mandatory sm:px-8 lg:px-12">
              {HORSES.map((h, i) => (
                <motion.div
                  key={h.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.06 }}
                  className="group relative flex-shrink-0 snap-start overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-950/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_40px_-12px_rgba(16,185,129,0.4)]"
                  style={{
                    width: "min(260px, 78vw)",
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">
                    {/* Avatar — coat color provides natural visual ID */}
                    <div
                      className="mb-5 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ring-1 ring-white/10"
                      style={{ backgroundColor: COAT_COLORS[h.coat] }}
                    >
                      {h.initials}
                    </div>

                    {/* Name + details */}
                    <div className="font-display text-xl font-semibold leading-tight text-white">
                      {h.name}
                    </div>
                    <div className="mt-1.5 text-[11.5px] leading-snug text-zinc-500">
                      {h.details}
                    </div>

                    {/* Stats */}
                    <div className="mt-6 flex items-baseline gap-6 border-t border-zinc-800/60 pt-4">
                      <div>
                        <div className="font-display text-lg font-bold leading-none tabular-nums text-white">
                          {h.earnings}
                        </div>
                        <div className="mt-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          Earnings
                        </div>
                      </div>
                      <div>
                        <div className="font-display text-lg font-bold leading-none tabular-nums text-emerald-400">
                          {h.wins}
                        </div>
                        <div className="mt-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          G1 Wins
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
