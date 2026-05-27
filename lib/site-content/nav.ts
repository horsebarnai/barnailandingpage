/* ============================================================
 * Central IA — the only source of truth for navigation, footer,
 * mega menus, breadcrumbs, and the sitemap.
 *
 * Information architecture:
 *   Platform  = the WHY  → four value pillars (for investors,
 *                          partners, and the strategically-minded)
 *   Solutions = the WHAT → three solution categories (for the
 *                          horse people who actually use it)
 *
 * Copy intent: nav surfaces are intentionally high-level. They
 * describe outcomes, never methodology, and never name specific
 * agents. Specifics live below the fold, behind /book-a-demo.
 * ============================================================ */

import { VALUE_PILLARS } from "@/lib/site-content/value-pillars"

export type NavLink = {
  name: string
  href: string
  description?: string
}

export type NavGroup = {
  title: string
  href: string
  description: string
  items: NavLink[]
}

export type MegaMenu = {
  key: "platform" | "solutions"
  trigger: string
  href: string
  groups: NavGroup[]
}

/* ── Platform mega menu — the four pillars ──────────────────── */

export const platformMenu: MegaMenu = {
  key: "platform",
  trigger: "Platform",
  href: "/platform",
  groups: VALUE_PILLARS.map((p) => ({
    title: p.name,
    href: p.href,
    description: p.tagline,
    items: [],
  })),
}

/* ── Solutions mega menu — the three lanes ──────────────────── */

export const SOLUTIONS = [
  {
    title: "Workflow Agents",
    href: "/solutions/workflow-agents",
    description: "A roster of specialized AI workers that do the work nobody wants to do.",
  },
  {
    title: "Stable & Syndicate Management",
    href: "/solutions/farm-management",
    description: "The back office of an institutional operation — every dollar, every partner, in line.",
  },
  {
    title: "AI Nicking Analysis",
    href: "/solutions/analysis",
    description: "Sire × Dam, answered — by the only model trained on fifty years of outcomes.",
  },
] as const

export const solutionsMenu: MegaMenu = {
  key: "solutions",
  trigger: "Solutions",
  href: "/solutions",
  groups: SOLUTIONS.map((s) => ({
    title: s.title,
    href: s.href,
    description: s.description,
    items: [],
  })),
}

/* ── Workflow agent slug → public route. Kept for the deep
   /solutions/workflow-agents hub page, which still enumerates
   the agents for visitors who go that far down. */

export const WORKFLOW_AGENTS: NavLink[] = [
  { name: "Settlement Agent", href: "/solutions/workflow-agents/settlement-agent" },
  { name: "Breeding Sheet Optimizer", href: "/solutions/workflow-agents/breeding-sheet-optimizer" },
  { name: "HISA Compliance Optimizer", href: "/solutions/workflow-agents/hisa-compliance-optimizer" },
  { name: "Vet Records Organizer", href: "/solutions/workflow-agents/vet-records-organizer" },
  { name: "Race Qualification Scanner", href: "/solutions/workflow-agents/race-qualification-scanner" },
  { name: "Repro Cycle Predictor", href: "/solutions/workflow-agents/repro-cycle-predictor" },
  { name: "Accounting Sync", href: "/solutions/workflow-agents/accounting-sync" },
]

/* ── Primary nav ────────────────────────────────────────────── */

export type PrimaryNavItem =
  | { kind: "link"; name: string; href: string }
  | { kind: "menu"; menu: MegaMenu }

export const primaryNav: PrimaryNavItem[] = [
  { kind: "link", name: "Home", href: "/" },
  { kind: "menu", menu: platformMenu },
  { kind: "menu", menu: solutionsMenu },
  { kind: "link", name: "About", href: "/about" },
  { kind: "link", name: "Contact", href: "/contact" },
]

/* ── Footer IA — kept intentionally minimal ──────────────────
   Platform and Solutions live in the primary nav; we don't echo
   them in the footer. The footer carries Company links only. */

export const footerLinks: NavLink[] = [
  { name: "About", href: "/about" },
  { name: "Leadership", href: "/about/leadership" },
  { name: "Contact", href: "/contact" },
  { name: "Book a Demo", href: "/book-a-demo" },
]
