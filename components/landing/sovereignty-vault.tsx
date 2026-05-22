"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

/* ============================================================
 * SOVEREIGNTY VAULT (Security & Privacy)
 *
 * - Outer 3D wireframe cube (CSS 3D, stationary with imperceptible
 *   1° breathe). All face borders, transparent fills.
 * - Inner grid-textured monolith nested inside the cube, also CSS 3D
 *   so it composites correctly with the outer cube's transform.
 * - Surrounding hex code "shield": multiple columns of slowly
 *   drifting hex strings, radial-gradient masked so they hug the
 *   cube perimeter (visible at edges, transparent at center).
 * ============================================================ */

const PRIMARY = "#1ea866"

/* Stable hex generator — pseudo-random but deterministic per seed
   so the shield doesn't re-randomize between renders. */
function genHex(length: number, seed: number): string {
  let s = ""
  for (let i = 0; i < length; i++) {
    const v = ((seed + i * 31) * 9301 + 49297) % 256
    s += v.toString(16).padStart(2, "0").toUpperCase() + " "
  }
  return s.trim()
}

const FACE_NAMES = ["front", "back", "left", "right", "top", "bottom"] as const

function HexShield() {
  // 16 columns spread across the section. Each column has 40 hex
  // strings, duplicated so the upward scroll animation loops seamlessly.
  const columns = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const lines = Array.from({ length: 40 }, (_, j) =>
          genHex(6, i * 1009 + j * 17)
        )
        return {
          left: (i * 6.4 + 1.2) % 95,
          duration: 38 + ((i * 7) % 26),
          delay: -((i * 5 + 2) % 36),
          lines: [...lines, ...lines], // duplicate for seamless loop
        }
      }),
    []
  )

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        // Cuts a transparent hole at center so hex hugs the perimeter —
        // the "shield surrounding the vault" effect.
        WebkitMaskImage:
          "radial-gradient(ellipse 38% 42% at 50% 50%, transparent 32%, rgba(0,0,0,0.5) 60%, black 80%)",
        maskImage:
          "radial-gradient(ellipse 38% 42% at 50% 50%, transparent 32%, rgba(0,0,0,0.5) 60%, black 80%)",
      }}
    >
      {columns.map((col, i) => (
        <div
          key={i}
          className="hex-column absolute top-0 font-tech whitespace-pre"
          style={{
            left: `${col.left}%`,
            color: "rgba(30, 168, 102, 0.55)",
            fontSize: "10px",
            letterSpacing: "0.1em",
            lineHeight: "1.55",
            animationDuration: `${col.duration}s`,
            animationDelay: `${col.delay}s`,
          }}
        >
          {col.lines.map((line, j) => (
            <div key={j}>{line}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

function VaultCube() {
  return (
    <div className="vault-stage">
      <div className="vault-3d">
        {/* Outer wireframe cube */}
        <div className="vault-outer">
          {FACE_NAMES.map((f) => (
            <div key={f} className={`vault-face ${f}`} />
          ))}
        </div>
        {/* Inner grid-textured monolith */}
        <div className="vault-monolith">
          {FACE_NAMES.map((f) => (
            <div key={f} className={`vault-mface ${f}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SovereigntyVault() {
  return (
    <section
      id="sovereignty-vault"
      className="relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8 lg:py-36"
      style={{ backgroundColor: "#0a0f0c" }}
    >
      {/* Subtle terminal grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1ea866 1px, transparent 1px), linear-gradient(to bottom, #1ea866 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Section-top fade so it transitions cleanly from Heritage */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{
          background: "linear-gradient(to bottom, #0a0f0c 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center lg:mb-20"
        >
          <div className="mb-5 font-tech text-[10px] uppercase tracking-[0.35em] text-slate-500">
            <span style={{ color: PRIMARY }}>◆</span>{" "}
            <span className="ml-2">SECURITY · PRIVACY</span>
          </div>
          <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Institutional <span className="italic text-slate-400">Sovereignty</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-tech text-base leading-relaxed text-slate-400 lg:text-lg">
            Your data is air-gapped, encrypted, and yours. Always.
          </p>
        </motion.div>

        {/* The Vault */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="relative mx-auto flex h-[520px] max-w-3xl items-center justify-center sm:h-[560px] lg:h-[620px]"
        >
          {/* Hex shield (perimeter) */}
          <HexShield />

          {/* Soft ambient halo behind cube */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[420px] w-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(30,168,102,0.10) 0%, rgba(30,168,102,0.02) 45%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />

          {/* The cube */}
          <VaultCube />

          {/* Status chips floating at corners */}
          <div className="pointer-events-none absolute left-2 top-4 font-tech text-[10px] uppercase tracking-[0.3em] text-slate-600 sm:left-6 sm:top-8">
            <span style={{ color: PRIMARY }}>●</span>{" "}
            <span className="ml-1">AIR-GAPPED</span>
          </div>
          <div className="pointer-events-none absolute right-2 top-4 font-tech text-[10px] uppercase tracking-[0.3em] text-slate-600 sm:right-6 sm:top-8">
            <span>AES-256 · ED25519</span>
          </div>
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-tech text-[10px] uppercase tracking-[0.3em] text-slate-600 sm:bottom-8">
            <span>VAULT · 0x</span>
            <span style={{ color: PRIMARY }}>4A2F</span>
            <span>...{`E91C`}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
