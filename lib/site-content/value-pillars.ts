/* ============================================================
 * Value Pillars — the four outcome-driven frames that anchor the
 * landing page narrative and the Solutions mega menu. All public
 * surfaces speak in these terms; specific agent names live below
 * the fold, behind /solutions/workflow-agents and /book-a-demo.
 *
 * Editing rules:
 *   - Tagline: one line, mega menu + card subtitle.
 *   - Body: 1–2 paragraphs of editorial outcome copy, no methodology.
 *   - Bullets: three outcomes max, lead with verbs of impact.
 * ============================================================ */

import { ShieldCheck, Sparkles, Compass, Telescope, type LucideIcon } from "lucide-react"

export type ValuePillar = {
  key: "compliance-security" | "operations-restored" | "onboarding" | "legacy"
  name: string
  tagline: string
  href: string
  icon: LucideIcon
  body: string
  bullets: string[]
}

export const VALUE_PILLARS: ValuePillar[] = [
  {
    key: "compliance-security",
    name: "Elite Compliance & Security",
    tagline: "Risk mitigation and audit posture, continuously aligned.",
    href: "/platform/compliance-engine",
    icon: ShieldCheck,
    body:
      "Your operation moves capital, bloodlines, and reputation. The penalty for a missed protocol, a misfiled treatment log, or a misplaced record isn't measured in dollars — it's measured in seasons. We keep your compliance, security, and audit posture continuously aligned with the standards that govern the industry. The world sees what you choose to show it. Nothing more.",
    bullets: [
      "Continuously aligned with the protocols that move the industry.",
      "Institutional-grade encryption and per-operation isolation.",
      "Audit-ready records, on demand, from any seat in the operation.",
    ],
  },
  {
    key: "operations-restored",
    name: "Operations Restored",
    tagline: "Reclaim the hours your team loses to paperwork.",
    href: "/platform/data-infrastructure",
    icon: Sparkles,
    body:
      "Every elite operation runs on a quiet, expensive infrastructure of binders, spreadsheets, text threads, and mismatched tools. We move that infrastructure below the surface. Routine work — settlements, scheduling, reconciliation, records — happens continuously, accurately, and silently. Your team gets the hours back. Your operation feels lighter.",
    bullets: [
      "Hundreds of administrative hours, returned to the work you came in for.",
      "Manual error and reconciliation drift — eliminated.",
      "Owners, partners, and your team — on the same page, in real time.",
    ],
  },
  {
    key: "onboarding",
    name: "Frictionless Onboarding",
    tagline: "From kickoff to live operation, measured in days.",
    href: "/book-a-demo",
    icon: Compass,
    body:
      "We handle the setup. The migration. The integration with the registries, vets, and accounting stacks you already use. You focus on the horsemanship. Onboarding is white-glove, measured in days — not quarters — and you are never the one explaining your operation to a system.",
    bullets: [
      "White-glove migration of your existing records and systems.",
      "Native integration with the partners and stacks you already trust.",
      "Live in days. Not quarters. Not seasons.",
    ],
  },
  {
    key: "legacy",
    name: "Strategic Legacy",
    tagline: "An ironclad record that compounds across generations.",
    href: "/platform/intelligence-network",
    icon: Telescope,
    body:
      "Five hundred generations behind. Decades of outcomes ahead. The institutional record of an elite operation should appreciate — across owners, across heirs, across centuries of breeding. We build that record continuously, in your hands, sovereign to you. Staff turnover, ownership transitions, and the passage of time do not erase what you have built.",
    bullets: [
      "A structured, digital history of your operation — yours, in perpetuity.",
      "Decisions grounded in outcomes, not in memory.",
      "A legacy that outlives staff turnover, ownership transitions, and time.",
    ],
  },
]
