"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Brain, Database, EyeOff, Lock, Network, ShieldCheck } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section, SectionHeader } from "@/components/layout/section"

/* The "operating system" anchor — explains what Barn AI *is* beyond
   any single workflow. Drops the user into the Platform IA. */

const PILLARS = [
  {
    icon: Brain,
    name: "Intelligence Network",
    href: "/platform/intelligence-network",
    body: "Proprietary models on fifty years of bloodstock and race history.",
  },
  {
    icon: Database,
    name: "Data Infrastructure",
    href: "/platform/data-infrastructure",
    body: "Registries, clinics, and auctions kept continuously in sync.",
  },
  {
    icon: ShieldCheck,
    name: "Compliance Engine",
    href: "/platform/compliance-engine",
    body: "Continuous alignment with national medication and safety protocols.",
  },
  {
    icon: Lock,
    name: "Security",
    href: "/platform/security",
    body: "AES-256 at rest. ED25519 signed. Audit-ready by default.",
  },
  {
    icon: EyeOff,
    name: "Privacy",
    href: "/platform/privacy",
    body: "Per-operation isolation. Your data trains your model only.",
  },
  {
    icon: Network,
    name: "Platform Overview",
    href: "/platform",
    body: "How the layers fit together — the operating system as a whole.",
  },
] as const

export function PlatformSummary() {
  return (
    <Section rhythm="default" className="border-t border-white/[0.04]">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              eyebrow="The Operating System"
              title="An operating system,"
              titleAccent="not a tool."
              kicker="Barn AI is six platform layers working as one — the foundation underneath every workflow on this site."
            />
            <Link
              href="/platform"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors"
            >
              <span>Explore the platform</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Link
                    href={p.href}
                    className="group relative block overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-950/50 p-5 transition-all duration-300 hover:border-emerald-500/40 hover:bg-zinc-950/80"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/70 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/[0.06]">
                        <Icon
                          className="h-4 w-4 text-emerald-400"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </div>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 text-zinc-600 transition-all group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1.5 group-hover:text-emerald-200 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-zinc-500">
                      {p.body}
                    </p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
