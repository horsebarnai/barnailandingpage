"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

/* Home-page CTA — links into the dedicated conversion pages.
   The contact form moved to /contact; this section's job is
   just to push the user toward booking. */

export function HomeCTA() {
  return (
    <Section rhythm="loose" className="border-t border-white/[0.04]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[820px] rounded-full bg-emerald-500/[0.12] blur-[140px]" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative text-center mx-auto max-w-3xl"
        >
          <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-400/90">
            Get Started
          </div>
          <h2 className="font-display text-3xl lg:text-5xl font-medium leading-[1.05] tracking-tight text-white">
            Ready to run on{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
              Barn AI?
            </span>
          </h2>
          <p className="mt-6 text-base lg:text-lg text-zinc-400 leading-relaxed">
            Be among the first breeding operations, syndicates, and bloodstock
            agents to run on the operating system of the equine industry.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/book-a-demo"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_32px_-6px_rgba(74,222,128,0.65)] transition-all hover:bg-emerald-400 hover:shadow-[0_0_48px_-2px_rgba(74,222,128,0.85)]"
            >
              Book a Demo
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/40 px-7 py-3.5 text-sm font-semibold text-zinc-200 transition-all hover:border-zinc-500 hover:text-white"
            >
              Talk to Sales
            </Link>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
