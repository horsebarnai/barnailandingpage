/* ============================================================
 * Platform sub-page content. Each pillar mirrors a SolutionContent
 * shape so it reuses the same template — every page on the site
 * reads with the same hierarchy.
 * ============================================================ */

import {
  Activity,
  Brain,
  Cpu,
  Database,
  EyeOff,
  Fingerprint,
  GitBranch,
  KeyRound,
  Lock,
  Network,
  Radar,
  ScanFace,
  ShieldCheck,
  Sigma,
  Stethoscope,
  Telescope,
  Trophy,
  Workflow,
  Zap,
} from "lucide-react"

import type { SolutionContent } from "@/components/templates/solution-page"

export const PLATFORM_TOPIC_SLUGS = [
  "security",
  "data-infrastructure",
  "compliance-engine",
  "intelligence-network",
  "privacy",
] as const

export type PlatformTopicSlug = (typeof PLATFORM_TOPIC_SLUGS)[number]

function topicCrumbs(name: string) {
  return [
    /* Platform is now a non-clickable nav dropdown — drop the href so
       the crumb renders as plain text, not a broken link. */
    { name: "Platform" },
    { name },
  ]
}

/* ============================================================
 * Security
 * ============================================================ */

const security: SolutionContent = {
  eyebrow: "Platform · Security",
  title: "End-to-end encryption,",
  titleAccent: "by default.",
  kicker:
    "Your operation's history is air-gapped, encrypted, and irrevocably yours. The world does not see what you do not show it.",
  crumbs: topicCrumbs("Security"),

  summary: {
    headline: "Institutional-grade security on every byte you store.",
    body:
      "Barn AI is built on the security posture institutional capital expects: AES-256 encryption at rest, ED25519 signatures, per-operation isolation, and a granular access control model that makes 'who can see what' a one-line audit, not a quarterly investigation.",
    bullets: [
      "AES-256 encryption at rest. TLS 1.3 in transit. ED25519 signing for every operational write.",
      "Per-operation isolation — your data never sits in a tenant pool with anyone else's.",
      "Audit-ready access logs on every read and every write.",
    ],
  },

  features: {
    eyebrow: "Capabilities",
    title: "The security posture",
    titleAccent: "underneath every workflow.",
    items: [
      {
        icon: Lock,
        title: "AES-256 At Rest",
        body: "Every byte encrypted at rest with key rotation handled in the background.",
      },
      {
        icon: KeyRound,
        title: "ED25519 Signatures",
        body: "Every operational write is cryptographically signed and tamper-evident.",
      },
      {
        icon: ShieldCheck,
        title: "Per-Operation Isolation",
        body: "Your data lives in its own logical boundary — never co-mingled with another operation's.",
      },
      {
        icon: Fingerprint,
        title: "Granular Access Control",
        body: "Role, scope, and operation-level permissions. Audit-ready, always.",
      },
      {
        icon: Activity,
        title: "Continuous Audit Logs",
        body: "Every read, write, and operation tracked — exportable on demand.",
      },
      {
        icon: ScanFace,
        title: "SSO & Identity",
        body: "SAML, OIDC, and SCIM integration with the identity stack your team already runs.",
      },
    ],
  },

  workflow: {
    eyebrow: "How it works",
    title: "Defense in depth,",
    titleAccent: "by construction.",
    steps: [
      {
        num: "01",
        title: "Encrypt at rest",
        body: "AES-256 with managed key rotation handles every byte before it touches disk.",
      },
      {
        num: "02",
        title: "Encrypt in transit",
        body: "TLS 1.3 + mTLS on every internal hop. Public endpoints terminate behind WAF.",
      },
      {
        num: "03",
        title: "Sign every write",
        body: "ED25519 signatures make every operational write tamper-evident.",
      },
      {
        num: "04",
        title: "Audit continuously",
        body: "Read and write logs flow into an immutable audit trail — exportable any time.",
      },
    ],
  },

  output: {
    eyebrow: "Security posture",
    title: "What you'd see",
    titleAccent: "in an audit.",
    sampleLabel: "Security Posture · 2026.05.27",
    sampleTitle: "Barn AI · Operation #042",
    sampleSubtitle: "Active controls and posture status",
    rows: [
      { label: "Encryption at Rest", value: "AES-256 · ACTIVE" },
      { label: "Encryption in Transit", value: "TLS 1.3 · ENFORCED" },
      { label: "Operational Signing", value: "ED25519 · ENFORCED" },
      { label: "Access Logs", value: "IMMUTABLE · 18M ENTRIES" },
      { label: "Posture Score", value: "100% ALIGNED", emphasis: true },
    ],
  },

  related: {
    title: "Adjacent",
    titleAccent: "platform layers.",
    items: [
      {
        name: "Privacy",
        href: "/platform/privacy",
        blurb: "Air-gapped operation history — yours, never the world's.",
      },
      {
        name: "Compliance Engine",
        href: "/platform/compliance-engine",
        blurb: "Continuous alignment with national protocols and registries.",
      },
      {
        name: "Data Infrastructure",
        href: "/platform/data-infrastructure",
        blurb: "The pipelines that keep registries, clinics, and auctions in sync.",
      },
    ],
  },

  cta: {
    title: "Run our security posture",
    titleAccent: "by your team.",
    kicker:
      "Bring your security questionnaire. We answer every line — and walk you through the architecture behind the answers.",
  },
}

/* ============================================================
 * Data Infrastructure
 * ============================================================ */

const dataInfrastructure: SolutionContent = {
  eyebrow: "Platform · Data Infrastructure",
  title: "Registries, clinics, and",
  titleAccent: "auctions — in sync.",
  kicker:
    "Your barn's operations sync directly with the registries, auction rings, and clinics you already work with. The infrastructure beneath every workflow.",
  crumbs: topicCrumbs("Data Infrastructure"),

  summary: {
    headline: "The pipelines that keep every external surface current.",
    body:
      "Data Infrastructure is the platform layer that connects your operation to the external world — Covered Horse registry, ADMC guidelines, sale catalogs, condition books, vet portals, and your accounting stack. Continuously synced. Continuously reconciled.",
    bullets: [
      "Registries, condition books, and sale catalogs ingested continuously.",
      "Clinic and vet portals integrated through the channels they already use.",
      "Your accounting stack syncs both directions — read and write.",
    ],
  },

  features: {
    eyebrow: "Capabilities",
    title: "Continuous sync,",
    titleAccent: "every surface.",
    items: [
      {
        icon: Database,
        title: "Registry Ingest",
        body: "Covered Horse registry, breed registries, and sale catalogs ingested continuously.",
      },
      {
        icon: Network,
        title: "Clinic & Vet Portals",
        body: "Integrations through the portals, faxes, and emails your vets already use.",
      },
      {
        icon: GitBranch,
        title: "Two-Way Accounting Sync",
        body: "QuickBooks, Xero, NetSuite — entries flow both ways, reconciled continuously.",
      },
      {
        icon: Workflow,
        title: "Condition-Book Pipelines",
        body: "Every track's active condition book parsed and indexed the moment it publishes.",
      },
      {
        icon: Zap,
        title: "Sub-Second Reconciliation",
        body: "Bank-to-book and operational-to-GL reconciliation runs continuously, not nightly.",
      },
    ],
  },

  workflow: {
    eyebrow: "How it works",
    title: "External surface to",
    titleAccent: "internal ledger.",
    steps: [
      {
        num: "01",
        title: "Surface watched",
        body: "Registries, books, catalogs, and portals monitored continuously for updates.",
      },
      {
        num: "02",
        title: "Records parsed",
        body: "Updates parsed, structured, and attached to the correct internal entity.",
      },
      {
        num: "03",
        title: "Reconciled",
        body: "Internal ledger reconciles against external state — discrepancies surface immediately.",
      },
      {
        num: "04",
        title: "Workflows triggered",
        body: "Downstream agents — settlement, compliance, race fit — fire automatically.",
      },
    ],
  },

  output: {
    eyebrow: "Sample sync state",
    title: "What's flowing,",
    titleAccent: "right now.",
    sampleLabel: "Data Pipeline · 2026.05.27 · 14:32 EST",
    sampleTitle: "External Sync Status",
    sampleSubtitle: "Continuous reconciliation across every connected surface",
    rows: [
      { label: "Covered Horse Registry", value: "SYNCED · 4s AGO" },
      { label: "Condition Books · 11 tracks", value: "SYNCED · 18s AGO" },
      { label: "Sale Catalogs · Active", value: "SYNCED · 32s AGO" },
      { label: "Vet Portal Ingest", value: "STREAMING" },
      { label: "Sync Posture", value: "100% CURRENT", emphasis: true },
    ],
  },

  related: {
    title: "Adjacent",
    titleAccent: "platform layers.",
    items: [
      {
        name: "Intelligence Network",
        href: "/platform/intelligence-network",
        blurb: "The model that turns the synced data into a defensible decision.",
      },
      {
        name: "Compliance Engine",
        href: "/platform/compliance-engine",
        blurb: "Continuous alignment with the registries the pipelines bring in.",
      },
      {
        name: "Security",
        href: "/platform/security",
        blurb: "Encryption, signing, and audit on every byte the pipelines touch.",
      },
    ],
  },

  cta: {
    title: "Connect your surfaces.",
    titleAccent: "Watch them sync.",
    kicker:
      "Bring the systems your operation already runs — registries, vets, accounting. We'll show you what sync looks like when it actually works.",
  },
}

/* ============================================================
 * Compliance Engine
 * ============================================================ */

const complianceEngine: SolutionContent = {
  eyebrow: "Platform · Compliance Engine",
  title: "The new standard",
  titleAccent: "in track safety.",
  kicker:
    "Continuous alignment with the latest national medication guidelines and track safety protocols. One terminal to keep your stable clear, verified, and racing.",
  crumbs: topicCrumbs("Compliance Engine"),

  summary: {
    headline: "Compliance as a continuous pipeline, not a quarterly fire drill.",
    body:
      "The Compliance Engine watches your operation against the federal framework continuously — Covered Horse status, ADMC medication limits, daily treatment logs, 60-day transfer rules, and active Vet's List standing. The system stays aligned without your team thinking about it.",
    bullets: [
      "Real-time monitoring of controlled substance limits and daily medication logs.",
      "Automated registration and chain-of-custody tracking for every Covered Horse.",
      "Direct pipeline tracking for entry clearance and workout compliance.",
    ],
  },

  features: {
    eyebrow: "Capabilities",
    title: "Continuous compliance,",
    titleAccent: "by construction.",
    items: [
      {
        icon: ShieldCheck,
        title: "Anti-Doping & Medication Control",
        body: "Real-time monitoring of controlled substance administration limits and daily medication logs.",
      },
      {
        icon: Stethoscope,
        title: "Responsible Person Registry",
        body: "Automated registration and chain-of-custody tracking for every Covered Horse.",
      },
      {
        icon: Activity,
        title: "Treatment Ledger Sync",
        body: "Seamless upload of daily health records, vaccinations, and 60-day transfer logs.",
      },
      {
        icon: Radar,
        title: "Active Vet's List Monitoring",
        body: "Direct pipeline tracking for automated entry clearance and workout compliance.",
      },
      {
        icon: Sigma,
        title: "Audit-Ready Reporting",
        body: "Every check, every alert, every override — exportable at the click of a button.",
      },
    ],
  },

  workflow: {
    eyebrow: "How it works",
    title: "From federal framework",
    titleAccent: "to live alignment.",
    steps: [
      {
        num: "01",
        title: "Protocols ingest",
        body: "ADMC guidelines, Covered Horse rules, and registry data load continuously.",
      },
      {
        num: "02",
        title: "Operations reconcile",
        body: "Daily treatment logs, medication records, and transfers reconcile against protocol.",
      },
      {
        num: "03",
        title: "Drift surfaces",
        body: "Anything off — a missed log, a transfer, a list entry — surfaces in real time.",
      },
      {
        num: "04",
        title: "Records archive",
        body: "Every check is audit-ready and exportable on demand.",
      },
    ],
  },

  output: {
    eyebrow: "Live pipeline",
    title: "The compliance terminal,",
    titleAccent: "right now.",
    sampleLabel: "/pipeline · live",
    sampleTitle: "Integrity Framework",
    sampleSubtitle: "Continuous reconciliation against active national protocols",
    rows: [
      { label: "Syncing Covered Horse Registry", value: "OK [SECURE]" },
      { label: "Reconciling ADMC Guidelines", value: "MATCHED" },
      { label: "Compiling Vet's List Datasets", value: "ACTIVE" },
      { label: "Verifying Trainer Liability", value: "VALIDATED" },
      { label: "National Compliance Protocol", value: "100% ALIGNED", emphasis: true },
    ],
  },

  related: {
    title: "Adjacent",
    titleAccent: "platform layers.",
    items: [
      {
        name: "Security",
        href: "/platform/security",
        blurb: "End-to-end encryption underneath every compliance workflow.",
      },
      {
        name: "Data Infrastructure",
        href: "/platform/data-infrastructure",
        blurb: "The pipelines that bring registries and Vet's List data continuously up to date.",
      },
      {
        name: "HISA Compliance Optimizer",
        href: "/solutions/workflow-agents/hisa-compliance-optimizer",
        blurb: "The workflow agent that lives on top of the Compliance Engine.",
      },
    ],
  },

  cta: {
    title: "Stay clear,",
    titleAccent: "verified, and racing.",
    kicker:
      "Walk through your stable's protocol stack with us and see exactly how compliance gets simpler.",
  },
}

/* ============================================================
 * Intelligence Network
 * ============================================================ */

const intelligenceNetwork: SolutionContent = {
  eyebrow: "Platform · Intelligence Network",
  title: "Decisions backed by",
  titleAccent: "fifty years of outcomes.",
  crumbs: topicCrumbs("Intelligence Network"),

  summary: {
    headline: "The institutional analytical layer for the equine industry.",
    body:
      "The Intelligence Network is the corpus and model layer underneath every analytical workflow Barn AI runs — nicking grades, race fit, outcome forecasting, and decision support. Continuously updated, defensibly explainable, and grounded in the only dataset that goes back fifty years.",
    bullets: [
      "Fifty years of bloodstock, race, and transactional history — structured and queryable.",
      "Proprietary models trained on the corpus and continuously refined against outcomes.",
      "Every recommendation arrives with a confidence band and a reasoning trail.",
    ],
  },

  features: {
    eyebrow: "Capabilities",
    title: "Intelligence with",
    titleAccent: "provenance.",
    items: [
      {
        icon: Brain,
        title: "Proprietary Models",
        body: "Trained on fifty years of bloodstock, race, and transactional history.",
      },
      {
        icon: Sigma,
        title: "Confidence Bands",
        body: "Every recommendation arrives with a confidence interval and reasoning trail.",
      },
      {
        icon: Cpu,
        title: "Real-Time Inference",
        body: "Sub-second response on every analytical query — sandbox or production.",
      },
      {
        icon: Telescope,
        title: "Pedigree Depth",
        body: "Five hundred generations mapped, indexed, and queryable.",
      },
      {
        icon: Trophy,
        title: "Outcome Learning",
        body: "Every race result, sale, and breeding outcome refines the model over time.",
      },
    ],
  },

  workflow: {
    eyebrow: "How it works",
    title: "Question to",
    titleAccent: "defensible answer.",
    steps: [
      {
        num: "01",
        title: "Corpus loaded",
        body: "Fifty years of structured outcomes ground every query the model runs.",
      },
      {
        num: "02",
        title: "Question received",
        body: "Cross, race, season, or scenario — the sandbox accepts any analytical question.",
      },
      {
        num: "03",
        title: "Inference computed",
        body: "Indices, confidence bands, and matched-cohort grounding return in seconds.",
      },
      {
        num: "04",
        title: "Decision archived",
        body: "Every analysis is signed, stored, and exportable — defensible whenever asked.",
      },
    ],
  },

  output: {
    eyebrow: "Sample inference",
    title: "What the model",
    titleAccent: "returns.",
    sampleLabel: "Match Report · Confidence 0.94",
    sampleTitle: "Sire ××××× × Dam ×××××",
    sampleSubtitle: "Pedigree query resolved against fifty years of comparable crosses",
    rows: [
      { label: "Conformation Score", value: "92 / 100" },
      { label: "Speed Coefficient", value: "+1.4 σ" },
      { label: "Stamina Index", value: "+0.8 σ" },
      { label: "Sire-Line Affinity", value: "Strong" },
      { label: "Nicking Grade", value: "A+", emphasis: true },
    ],
  },

  related: {
    title: "Adjacent",
    titleAccent: "platform layers.",
    items: [
      {
        name: "Data Infrastructure",
        href: "/platform/data-infrastructure",
        blurb: "The pipelines that keep the corpus current.",
      },
      {
        name: "Privacy",
        href: "/platform/privacy",
        blurb: "Your operation's data trains your model only — never anyone else's.",
      },
      {
        name: "Analysis",
        href: "/solutions/analysis",
        blurb: "The workflow category that sits on top of the Intelligence Network.",
      },
    ],
  },

  cta: {
    title: "Bring your hardest",
    titleAccent: "analytical question.",
    kicker:
      "A cross. A season. A horse you're considering. We'll show you what fifty years of outcomes have to say.",
  },
}

/* ============================================================
 * Privacy
 * ============================================================ */

const privacy: SolutionContent = {
  eyebrow: "Platform · Privacy",
  title: "The privacy of",
  titleAccent: "a private bank.",
  kicker:
    "Your operation's history is air-gapped, encrypted, and irrevocably yours. The world does not see what you do not show it.",
  crumbs: topicCrumbs("Privacy"),

  summary: {
    headline: "Your data trains your model. Never anyone else's.",
    body:
      "Privacy isn't a feature — it's the architecture. Every operation lives in its own logical boundary. Your queries, your records, and your outcomes train your model exclusively. Nothing leaks. Nothing is shared. Nothing is sold.",
    bullets: [
      "Per-operation isolation — your data never sits in a tenant pool with anyone else's.",
      "Your operation's queries and outcomes train your model only.",
      "Air-gapped operation history — nothing leaves your boundary without your signature.",
    ],
  },

  features: {
    eyebrow: "Principles",
    title: "Privacy",
    titleAccent: "by construction.",
    items: [
      {
        icon: EyeOff,
        title: "Operational Sovereignty",
        body: "Your operation's data is yours. We see nothing without your express consent.",
      },
      {
        icon: Lock,
        title: "Per-Operation Isolation",
        body: "Logical boundaries enforced at the database, model, and infrastructure layers.",
      },
      {
        icon: ShieldCheck,
        title: "No Training Cross-Contamination",
        body: "Your queries train your model only. Your outcomes refine your model only.",
      },
      {
        icon: Fingerprint,
        title: "Cryptographic Audit",
        body: "Every operational event signed — your record of who saw what, always.",
      },
      {
        icon: KeyRound,
        title: "Customer-Held Keys",
        body: "Bring your own KMS. Your data is encrypted against keys you control.",
      },
    ],
  },

  workflow: {
    eyebrow: "Architecture",
    title: "Sovereignty,",
    titleAccent: "implemented.",
    steps: [
      {
        num: "01",
        title: "Isolated at rest",
        body: "Each operation's data lives in its own logical boundary — never a shared pool.",
      },
      {
        num: "02",
        title: "Isolated in train",
        body: "Your model trains on your data. Other operations never see, query, or influence it.",
      },
      {
        num: "03",
        title: "Encrypted everywhere",
        body: "AES-256 at rest. TLS 1.3 in transit. ED25519 signed on every write.",
      },
      {
        num: "04",
        title: "Audited continuously",
        body: "Every read, write, and operation logged into your immutable audit trail.",
      },
    ],
  },

  output: {
    eyebrow: "Privacy posture",
    title: "What you control,",
    titleAccent: "always.",
    sampleLabel: "Vault · 0x4A2F...E91C",
    sampleTitle: "Privacy Posture · Operation #042",
    sampleSubtitle: "Active boundaries and isolation status",
    rows: [
      { label: "Operation Boundary", value: "AIR-GAPPED" },
      { label: "Model Training Cohort", value: "OPERATION-ONLY" },
      { label: "Customer-Held Keys", value: "BYOK · ACTIVE" },
      { label: "External Reads", value: "0 · CONSENT-GATED" },
      { label: "Privacy Posture", value: "SOVEREIGN", emphasis: true },
    ],
  },

  related: {
    title: "Adjacent",
    titleAccent: "platform layers.",
    items: [
      {
        name: "Security",
        href: "/platform/security",
        blurb: "Encryption, signing, and audit underneath every privacy boundary.",
      },
      {
        name: "Intelligence Network",
        href: "/platform/intelligence-network",
        blurb: "Your operation's queries train your model only.",
      },
      {
        name: "Compliance Engine",
        href: "/platform/compliance-engine",
        blurb: "Continuous alignment with national protocols — within your boundary.",
      },
    ],
  },

  cta: {
    title: "Run our privacy posture",
    titleAccent: "by your team.",
    kicker:
      "Bring your privacy questionnaire. We answer every line — and walk you through the architecture behind the answers.",
  },
}

/* ─── Registry ─────────────────────────────────────────────── */

export const PLATFORM_TOPIC_CONTENT: Record<PlatformTopicSlug, SolutionContent> = {
  security,
  "data-infrastructure": dataInfrastructure,
  "compliance-engine": complianceEngine,
  "intelligence-network": intelligenceNetwork,
  privacy,
}
