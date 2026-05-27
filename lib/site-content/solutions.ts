/* ============================================================
 * Solution page content — one entry per route. Add a new agent
 * by appending to WORKFLOW_AGENT_SLUGS and adding its content
 * object; the route and IA pick it up automatically.
 * ============================================================ */

import {
  Banknote,
  Beaker,
  CalendarClock,
  ClipboardCheck,
  Dna,
  FileCheck2,
  FileSpreadsheet,
  FlaskConical,
  Gauge,
  HeartPulse,
  Layers,
  LineChart,
  Network,
  Scale,
  Scan,
  ShieldCheck,
  Sigma,
  Stethoscope,
  Trophy,
  Wallet,
  Workflow,
} from "lucide-react"

import type { SolutionContent } from "@/components/templates/solution-page"

/* ─── Workflow agent slugs (drives static params + IA) ─────── */

export const WORKFLOW_AGENT_SLUGS = [
  "settlement-agent",
  "breeding-sheet-optimizer",
  "hisa-compliance-optimizer",
  "vet-records-organizer",
  "race-qualification-scanner",
  "repro-cycle-predictor",
  "accounting-sync",
] as const

export type WorkflowAgentSlug = (typeof WORKFLOW_AGENT_SLUGS)[number]

/* ─── Shared crumb prefix for workflow agents ──────────────── */

function agentCrumbs(name: string) {
  return [
    { name: "Solutions", href: "/solutions" },
    { name: "Workflow Agents", href: "/solutions/workflow-agents" },
    { name },
  ]
}

/* ============================================================
 * Settlement Agent
 * ============================================================ */

const settlementAgent: SolutionContent = {
  eyebrow: "Workflow Agent · Money",
  title: "Every dollar accounted for,",
  titleAccent: "the moment it lands.",
  kicker:
    "One inflow. Five streams. Every partner's share computed, recorded, and distributed before the wire confirmation hits your inbox.",
  crumbs: agentCrumbs("Settlement Agent"),

  summary: {
    headline: "Automated waterfall settlement for purses, sales, and stallion fees.",
    body:
      "Settlement Agent ingests every inflow your operation receives, applies your predefined contract splits, and pushes the resulting distributions to partners in minutes — not weeks. No more chasing twenty owners through twenty text threads. No more disputes that strain relationships.",
    bullets: [
      "Pro-rata, foal share, management fee, and insurance premium computed in one pass.",
      "Net settlement posted to every partner's ledger position automatically.",
      "Every entry timestamped and immutable — a legible audit trail for owners and heirs alike.",
    ],
  },

  features: {
    eyebrow: "Capabilities",
    title: "Built for operators who run",
    titleAccent: "real money.",
    items: [
      {
        icon: Wallet,
        title: "Automated Inflow Capture",
        body: "Track funds land. Auction funds land. Stallion fees land. Settlement Agent sees them all and starts the waterfall immediately.",
      },
      {
        icon: Layers,
        title: "Contract-Aware Splits",
        body: "Your syndicate agreements drive the math. Pro-rata, foal share, manager fee, insurance — encoded once, applied forever.",
      },
      {
        icon: LineChart,
        title: "Real-Time Owner Positions",
        body: "Every partner sees their net position, contributions, and distributions on a single dashboard updated as money moves.",
      },
      {
        icon: ShieldCheck,
        title: "Auditable Ledger",
        body: "Entry numbers. Timestamps. Counterparties. Disputes resolved by record, not memory.",
      },
      {
        icon: Sigma,
        title: "Scenario Modeling",
        body: "Model a $1.2M purse before it runs. Model an $8M sale before you sign. See exactly what flows to whom.",
      },
      {
        icon: Workflow,
        title: "Manager-Free Distribution",
        body: "Funds bypass the manual wire queue. Partners receive their share without your team touching a spreadsheet.",
      },
    ],
  },

  workflow: {
    eyebrow: "How it works",
    title: "From inflow to settlement",
    titleAccent: "in four steps.",
    steps: [
      {
        num: "01",
        title: "Inflow received",
        body: "Track payments, auction proceeds, or stallion fees post to the operating account.",
      },
      {
        num: "02",
        title: "Contract resolved",
        body: "The agent pulls the relevant syndicate agreement and resolves every applicable split.",
      },
      {
        num: "03",
        title: "Waterfall computed",
        body: "Pro-rata, foal share, management fee, insurance, and net settlement compute in a single pass.",
      },
      {
        num: "04",
        title: "Partners settled",
        body: "Each partner's ledger updates and distributions queue for release.",
      },
    ],
  },

  output: {
    eyebrow: "Sample output",
    title: "What lands in your inbox.",
    sampleLabel: "Settlement Ledger · Entry No. 0042",
    sampleTitle: "$1.2M Race Purse",
    sampleSubtitle: "Resolved · Allocated · Settled in 47 seconds",
    rows: [
      { label: "Pro-Rata Share", value: "$420K · 35%" },
      { label: "Foal Share", value: "$120K · 10%" },
      { label: "Management Fee", value: "$96K · 8%" },
      { label: "Insurance Premium", value: "$60K · 5%" },
      { label: "Net Settlement", value: "$504K · 42%", emphasis: true },
    ],
  },

  related: {
    title: "Adjacent",
    titleAccent: "tools.",
    items: [
      {
        name: "Accounting Sync",
        href: "/solutions/workflow-agents/accounting-sync",
        blurb: "Settlement entries flow into your accounting stack without a second touch.",
      },
      {
        name: "Vet Records Organizer",
        href: "/solutions/workflow-agents/vet-records-organizer",
        blurb: "Care costs and treatment expenses reconcile against partner positions.",
      },
      {
        name: "Farm Management",
        href: "/solutions/farm-management",
        blurb: "The category — money, settlement, syndicate, and back-office workflows.",
      },
    ],
  },

  cta: {
    title: "Run your next purse",
    titleAccent: "through Settlement Agent.",
    kicker:
      "See your waterfall, your owner positions, and your net distribution in a live demo with your own scenario.",
  },
}

/* ============================================================
 * Breeding Sheet Optimizer
 * ============================================================ */

const breedingSheetOptimizer: SolutionContent = {
  eyebrow: "Workflow Agent · Pedigree",
  title: "Sire × Dam shortlists,",
  titleAccent: "ranked by outcome.",
  kicker:
    "The only model trained on fifty years of bloodstock outcomes turns your shortlist into a ranked, defensible decision in seconds.",
  crumbs: agentCrumbs("Breeding Sheet Optimizer"),

  summary: {
    headline: "Nicking, conformation, and outcome modeling on every cross.",
    body:
      "Breeding Sheet Optimizer reads your mare book, your shortlist of sires, and your operational constraints, then returns a ranked breeding sheet with nicking grade, confidence, and the reasoning behind every cross. Decisions backed by a model that knows what happened next.",
    bullets: [
      "Nicking analysis on every sire × dam pairing in your shortlist.",
      "Conformation, speed, and stamina indices for every candidate.",
      "Confidence scores so you know which crosses to defend in the boardroom.",
    ],
  },

  features: {
    eyebrow: "Capabilities",
    title: "A breeding sheet that",
    titleAccent: "thinks ahead.",
    items: [
      {
        icon: Dna,
        title: "Cross-Affinity Matrix",
        body: "Every sire × dam pairing scored on the model's full historical corpus.",
      },
      {
        icon: Sigma,
        title: "Nicking Grade",
        body: "A clean A+ through C-grade scale with confidence bounds — defensible at every level.",
      },
      {
        icon: Gauge,
        title: "Performance Indices",
        body: "Speed coefficient, stamina index, and conformation scoring on the resulting foal.",
      },
      {
        icon: Beaker,
        title: "Scenario Sandbox",
        body: "Test 'what if' crosses without booking a single appointment.",
      },
      {
        icon: Trophy,
        title: "Outcome Forecasts",
        body: "Race-class and earnings forecasts grounded in five decades of comparable crosses.",
      },
    ],
  },

  workflow: {
    eyebrow: "How it works",
    title: "Shortlist to signed",
    titleAccent: "breeding sheet.",
    steps: [
      {
        num: "01",
        title: "Mares uploaded",
        body: "Import your mare book, or sync from your existing breeding records.",
      },
      {
        num: "02",
        title: "Sires considered",
        body: "Add the sires you're considering — or let the model surface candidates.",
      },
      {
        num: "03",
        title: "Crosses computed",
        body: "Every pairing scored across nicking, performance, and outcome bands.",
      },
      {
        num: "04",
        title: "Sheet exported",
        body: "Download the ranked breeding sheet, share with partners, or sign and book.",
      },
    ],
  },

  output: {
    eyebrow: "Sample report",
    title: "What you get back.",
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
    titleAccent: "tools.",
    items: [
      {
        name: "Repro Cycle Predictor",
        href: "/solutions/workflow-agents/repro-cycle-predictor",
        blurb: "Once you've picked the cross, schedule the cover with predictive precision.",
      },
      {
        name: "Race Qualification Scanner",
        href: "/solutions/workflow-agents/race-qualification-scanner",
        blurb: "Forecast race-class fit on the resulting foal years in advance.",
      },
      {
        name: "Analysis",
        href: "/solutions/analysis",
        blurb: "The category — pedigree intelligence and decision support.",
      },
    ],
  },

  cta: {
    title: "Run your shortlist",
    titleAccent: "through the model.",
    kicker:
      "Bring your mare book and your candidate sires. We'll show you what fifty years of outcomes have to say.",
  },
}

/* ============================================================
 * HISA Compliance Optimizer
 * ============================================================ */

const hisaComplianceOptimizer: SolutionContent = {
  eyebrow: "Workflow Agent · Compliance",
  title: "Continuous alignment",
  titleAccent: "with covered-horse protocols.",
  kicker:
    "Automate every workflow under the latest national medication and track-safety standards. One terminal to keep your stable clear, verified, and racing.",
  crumbs: agentCrumbs("HISA Compliance Optimizer"),

  summary: {
    headline: "Anti-doping, registry, treatment, and Vet's List monitoring — in one pipeline.",
    body:
      "HISA Compliance Optimizer reconciles your day-to-day operations against the federal framework continuously. Covered Horse registration, ADMC medication guidelines, daily treatment logs, 60-day transfer rules, and active Vet's List status all flow through a single, audited pipeline.",
    bullets: [
      "Real-time monitoring of controlled substance limits and daily medication logs.",
      "Automated registration and chain-of-custody tracking for all Covered Horses.",
      "Direct pipeline tracking for entry clearance and workout compliance.",
    ],
  },

  features: {
    eyebrow: "Capabilities",
    title: "The compliance backbone,",
    titleAccent: "always on.",
    items: [
      {
        icon: ShieldCheck,
        title: "Anti-Doping & Medication Control",
        body: "Real-time monitoring of controlled substance administration limits and daily medication logs.",
      },
      {
        icon: ClipboardCheck,
        title: "Responsible Person Registry",
        body: "Automated registration and chain-of-custody tracking for every Covered Horse in your stable.",
      },
      {
        icon: Stethoscope,
        title: "Treatment Ledger Sync",
        body: "Seamless upload of daily health records, vaccinations, and 60-day transfer logs for claimed horses.",
      },
      {
        icon: Scan,
        title: "Active Vet's List Monitoring",
        body: "Direct pipeline tracking for automated entry clearance and workout compliance.",
      },
      {
        icon: FileCheck2,
        title: "Audit-Ready Reporting",
        body: "Every check, every alert, every override — exportable at the click of a button.",
      },
    ],
  },

  workflow: {
    eyebrow: "How it works",
    title: "Compliance as a",
    titleAccent: "live pipeline.",
    steps: [
      {
        num: "01",
        title: "Registries sync",
        body: "Covered Horse registry, ADMC guidelines, and Vet's List data ingest continuously.",
      },
      {
        num: "02",
        title: "Logs reconcile",
        body: "Daily treatment logs and medication records match against active protocols.",
      },
      {
        num: "03",
        title: "Alerts surface",
        body: "Any drift from compliance — a missed log, a claimed-horse transfer — surfaces immediately.",
      },
      {
        num: "04",
        title: "Records archive",
        body: "Every check is audit-ready and exportable on demand.",
      },
    ],
  },

  output: {
    eyebrow: "Sample pipeline",
    title: "The compliance terminal,",
    titleAccent: "live.",
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
    titleAccent: "tools.",
    items: [
      {
        name: "Vet Records Organizer",
        href: "/solutions/workflow-agents/vet-records-organizer",
        blurb: "The treatment ledger that feeds your compliance pipeline.",
      },
      {
        name: "Race Qualification Scanner",
        href: "/solutions/workflow-agents/race-qualification-scanner",
        blurb: "Entry clearance reads directly off your active Vet's List status.",
      },
      {
        name: "Compliance Engine",
        href: "/platform/compliance-engine",
        blurb: "The platform layer underneath every compliance workflow.",
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
 * Vet Records Organizer
 * ============================================================ */

const vetRecordsOrganizer: SolutionContent = {
  eyebrow: "Workflow Agent · Records",
  title: "The treatment ledger",
  titleAccent: "that organizes itself.",
  kicker:
    "Every treatment, vaccination, transfer, and Vet's List entry — captured, structured, and queryable across your entire operation.",
  crumbs: agentCrumbs("Vet Records Organizer"),

  summary: {
    headline: "One ledger for every horse, every treatment, every transfer.",
    body:
      "Vet Records Organizer ingests records from every clinic, vet, and stable hand in your network and builds a single, structured ledger per horse. Hunt down breeding certificates and vet records by phone, never again.",
    bullets: [
      "Treatments, vaccinations, and procedures captured the moment they happen.",
      "60-day transfer logs and claimed-horse history kept in a single audit trail.",
      "Records that find themselves — searchable across barns, vets, and years.",
    ],
  },

  features: {
    eyebrow: "Capabilities",
    title: "Records that work",
    titleAccent: "for you.",
    items: [
      {
        icon: Stethoscope,
        title: "Multi-Clinic Ingest",
        body: "Records flow in from every vet you work with — no manual reconciliation required.",
      },
      {
        icon: FileCheck2,
        title: "Structured Per-Horse Ledger",
        body: "One profile per horse. Every treatment, every transfer, every note.",
      },
      {
        icon: HeartPulse,
        title: "Vaccination & Procedure Timeline",
        body: "A clean chronology of medical events — for compliance, for sale, for insurance.",
      },
      {
        icon: ClipboardCheck,
        title: "Transfer & Custody Tracking",
        body: "60-day claimed-horse logs and chain-of-custody records, always current.",
      },
      {
        icon: Scan,
        title: "Universal Search",
        body: "Find any treatment, on any horse, on any day — in a single query.",
      },
    ],
  },

  workflow: {
    eyebrow: "How it works",
    title: "From phone call",
    titleAccent: "to live ledger.",
    steps: [
      {
        num: "01",
        title: "Clinic submits",
        body: "Vets submit records through the channels they already use — fax, portal, email.",
      },
      {
        num: "02",
        title: "Agent structures",
        body: "Records are parsed, dated, and attached to the correct horse profile.",
      },
      {
        num: "03",
        title: "Compliance checks",
        body: "Treatments are cross-referenced against medication protocols automatically.",
      },
      {
        num: "04",
        title: "Ledger updates",
        body: "Every record posts to the horse's timeline — searchable, exportable, audit-ready.",
      },
    ],
  },

  output: {
    eyebrow: "Sample record",
    title: "What every horse",
    titleAccent: "carries with it.",
    sampleLabel: "Horse Ledger · ID #BARN-2026-0184",
    sampleTitle: "Treatment & Custody Timeline",
    sampleSubtitle: "Last 30 days · 7 entries across 3 clinics",
    rows: [
      { label: "Routine Vaccination · EHV-1", value: "May 18 · OK" },
      { label: "Claimed Horse Transfer", value: "May 14 · LOGGED" },
      { label: "Vet's List Entry · Workout", value: "May 09 · ACTIVE" },
      { label: "Medication Log · Furosemide", value: "May 05 · WITHIN LIMITS" },
      { label: "Compliance Status", value: "100% VERIFIED", emphasis: true },
    ],
  },

  related: {
    title: "Adjacent",
    titleAccent: "tools.",
    items: [
      {
        name: "HISA Compliance Optimizer",
        href: "/solutions/workflow-agents/hisa-compliance-optimizer",
        blurb: "Your treatment ledger feeds the compliance pipeline directly.",
      },
      {
        name: "Race Qualification Scanner",
        href: "/solutions/workflow-agents/race-qualification-scanner",
        blurb: "Entry clearance reads the horse's most recent vet record.",
      },
      {
        name: "Repro Cycle Predictor",
        href: "/solutions/workflow-agents/repro-cycle-predictor",
        blurb: "Breeding records integrate seamlessly with the horse's full medical history.",
      },
    ],
  },

  cta: {
    title: "Find any record,",
    titleAccent: "any horse, any day.",
    kicker:
      "Bring a single horse's history and watch us reconstruct it in front of you.",
  },
}

/* ============================================================
 * Race Qualification Scanner
 * ============================================================ */

const raceQualificationScanner: SolutionContent = {
  eyebrow: "Workflow Agent · Decision Support",
  title: "Eligibility, entry,",
  titleAccent: "and condition-book fit — instantly.",
  kicker:
    "Stop reading condition books one race at a time. Race Qualification Scanner surfaces the best fits for every horse in your barn before you finish your coffee.",
  crumbs: agentCrumbs("Race Qualification Scanner"),

  summary: {
    headline: "Match horses to races, not the other way around.",
    body:
      "Race Qualification Scanner reads every active condition book, evaluates every horse in your barn against every race, and ranks fit by purse, class, distance, surface, and current eligibility — accounting for active Vet's List status and ADMC compliance.",
    bullets: [
      "Condition books read continuously across every track you race.",
      "Per-horse eligibility scored on workout, age, earnings, and weight conditions.",
      "Compliance status verified before every recommended entry.",
    ],
  },

  features: {
    eyebrow: "Capabilities",
    title: "Race entries,",
    titleAccent: "computed.",
    items: [
      {
        icon: Scan,
        title: "Continuous Book Reading",
        body: "Every track's active condition book parsed and indexed the moment it publishes.",
      },
      {
        icon: Trophy,
        title: "Per-Horse Fit Scoring",
        body: "Each horse scored against each race on age, earnings, distance, surface, and class.",
      },
      {
        icon: ShieldCheck,
        title: "Eligibility & Compliance",
        body: "Recommended entries cross-checked against active Vet's List and ADMC status.",
      },
      {
        icon: Gauge,
        title: "Purse-Per-Mile Optimization",
        body: "Surface the races that maximize expected return against current condition.",
      },
      {
        icon: CalendarClock,
        title: "Entry Deadlines",
        body: "Deadlines, scratch windows, and post positions tracked across every track.",
      },
    ],
  },

  workflow: {
    eyebrow: "How it works",
    title: "From condition book",
    titleAccent: "to ranked entries.",
    steps: [
      {
        num: "01",
        title: "Books ingest",
        body: "Active condition books across every track are parsed continuously.",
      },
      {
        num: "02",
        title: "Barn evaluated",
        body: "Every horse's profile, workouts, and earnings are scored against every race.",
      },
      {
        num: "03",
        title: "Compliance verified",
        body: "Vet's List, ADMC, and trainer liability status are confirmed.",
      },
      {
        num: "04",
        title: "Entries ranked",
        body: "The best fits surface — by purse, by class, by confidence — every morning.",
      },
    ],
  },

  output: {
    eyebrow: "Sample ranking",
    title: "What's on your desk",
    titleAccent: "tomorrow morning.",
    sampleLabel: "Daily Fit Report · 2026.05.27",
    sampleTitle: "Top Race Fits · This Week",
    sampleSubtitle: "32 horses evaluated against 184 races across 11 tracks",
    rows: [
      { label: "Keeneland · G3 Allowance · 1 1/16m turf", value: "FIT 0.94 · $150K" },
      { label: "Churchill Downs · Open Claimer · 6f dirt", value: "FIT 0.88 · $42K" },
      { label: "Saratoga · MSW · 1m dirt", value: "FIT 0.81 · $85K" },
      { label: "Belmont · Starter Allowance · 7f dirt", value: "FIT 0.77 · $65K" },
      { label: "Recommended Entries Today", value: "9 OF 32", emphasis: true },
    ],
  },

  related: {
    title: "Adjacent",
    titleAccent: "tools.",
    items: [
      {
        name: "HISA Compliance Optimizer",
        href: "/solutions/workflow-agents/hisa-compliance-optimizer",
        blurb: "Entry clearance reads directly off your active Vet's List status.",
      },
      {
        name: "Vet Records Organizer",
        href: "/solutions/workflow-agents/vet-records-organizer",
        blurb: "Workout and treatment history flow into every fit calculation.",
      },
      {
        name: "Analysis",
        href: "/solutions/analysis",
        blurb: "The category — decision support, pedigree intelligence, and forecasting.",
      },
    ],
  },

  cta: {
    title: "See your barn,",
    titleAccent: "ranked against the condition book.",
    kicker:
      "Bring tomorrow's morning lineup. We'll show you the entries you'd otherwise miss.",
  },
}

/* ============================================================
 * Repro Cycle Predictor
 * ============================================================ */

const reproCyclePredictor: SolutionContent = {
  eyebrow: "Workflow Agent · Reproduction",
  title: "Cycle, cover, and check-in",
  titleAccent: "windows predicted in advance.",
  kicker:
    "The repro calendar a stallion manager actually wants — predictive windows on every mare in your book, surfaced before the vet calls.",
  crumbs: agentCrumbs("Repro Cycle Predictor"),

  summary: {
    headline: "Predictive cycle windows for every mare in your book.",
    body:
      "Repro Cycle Predictor reads each mare's history, cycle records, and prior cover dates, then forecasts upcoming heat windows, optimal cover days, and check-in dates — so your stallion calendar and vet schedule align without guesswork.",
    bullets: [
      "Heat-cycle windows predicted across the entire mare book.",
      "Optimal cover dates ranked against stallion availability.",
      "Check-in and confirmation appointments scheduled before they're needed.",
    ],
  },

  features: {
    eyebrow: "Capabilities",
    title: "A repro calendar",
    titleAccent: "that thinks ahead.",
    items: [
      {
        icon: CalendarClock,
        title: "Cycle Window Forecasts",
        body: "Per-mare cycle modeling on prior records — windows surface days in advance.",
      },
      {
        icon: Network,
        title: "Stallion Availability Sync",
        body: "Cover dates rank against the active stallion calendar in real time.",
      },
      {
        icon: HeartPulse,
        title: "Repro Health Tracking",
        body: "Cycle outcomes, pregnancy confirmations, and barren mare flags in one record.",
      },
      {
        icon: ClipboardCheck,
        title: "Check-In Scheduling",
        body: "Vet visits queued automatically against predicted ovulation windows.",
      },
      {
        icon: FlaskConical,
        title: "Outcome Learning",
        body: "Every cycle outcome refines the model — your book gets more accurate over time.",
      },
    ],
  },

  workflow: {
    eyebrow: "How it works",
    title: "From cycle history",
    titleAccent: "to predicted cover.",
    steps: [
      {
        num: "01",
        title: "History ingested",
        body: "Per-mare cycle history, prior covers, and repro outcomes load in.",
      },
      {
        num: "02",
        title: "Windows modeled",
        body: "Upcoming heat windows are predicted across the full mare book.",
      },
      {
        num: "03",
        title: "Covers ranked",
        body: "Optimal cover dates rank against stallion availability and farm logistics.",
      },
      {
        num: "04",
        title: "Vet aligned",
        body: "Check-in appointments queue automatically — no missed windows.",
      },
    ],
  },

  output: {
    eyebrow: "Sample forecast",
    title: "The repro calendar,",
    titleAccent: "next 14 days.",
    sampleLabel: "Repro Forecast · 2026.05.27",
    sampleTitle: "Mare Book · 12 Active",
    sampleSubtitle: "Predicted windows ranked by stallion fit and farm logistics",
    rows: [
      { label: "MARE-0042 · Predicted heat May 31", value: "WINDOW 0.91" },
      { label: "MARE-0017 · Predicted heat Jun 02", value: "WINDOW 0.87" },
      { label: "MARE-0028 · Check-in Jun 04", value: "QUEUED" },
      { label: "MARE-0061 · Pregnancy confirm", value: "Jun 07" },
      { label: "Recommended Covers This Week", value: "4 OF 12", emphasis: true },
    ],
  },

  related: {
    title: "Adjacent",
    titleAccent: "tools.",
    items: [
      {
        name: "Breeding Sheet Optimizer",
        href: "/solutions/workflow-agents/breeding-sheet-optimizer",
        blurb: "Pair the right sire with the right mare on the right day.",
      },
      {
        name: "Vet Records Organizer",
        href: "/solutions/workflow-agents/vet-records-organizer",
        blurb: "Cycle history reads directly from each mare's medical ledger.",
      },
      {
        name: "Analysis",
        href: "/solutions/analysis",
        blurb: "The category — pedigree intelligence, decision support, and forecasting.",
      },
    ],
  },

  cta: {
    title: "Predict your next cycle,",
    titleAccent: "not chase it.",
    kicker:
      "Bring your mare book. We'll show you the windows you'd otherwise discover too late.",
  },
}

/* ============================================================
 * Accounting Sync
 * ============================================================ */

const accountingSync: SolutionContent = {
  eyebrow: "Workflow Agent · Money",
  title: "Your stable books,",
  titleAccent: "reconciled overnight.",
  kicker:
    "Accounting Sync turns every transaction across your stable — settlements, training fees, vet costs, board — into clean entries in your accounting stack.",
  crumbs: agentCrumbs("Accounting Sync"),

  summary: {
    headline: "Stable books that close themselves.",
    body:
      "Accounting Sync watches every inflow and outflow across the platform, classifies each transaction by horse, partner, and category, and posts clean entries to your accounting stack — QuickBooks, Xero, NetSuite, or anywhere your CFO lives.",
    bullets: [
      "Settlements, training fees, vet bills, and board all classified automatically.",
      "Per-horse, per-partner, and per-syndicate cost centers maintained continuously.",
      "Month-end close shrinks from weeks to a single review pass.",
    ],
  },

  features: {
    eyebrow: "Capabilities",
    title: "From operational",
    titleAccent: "to accounted.",
    items: [
      {
        icon: Banknote,
        title: "Universal Transaction Capture",
        body: "Every inflow and outflow across the platform feeds the sync — no missed entries.",
      },
      {
        icon: FileSpreadsheet,
        title: "Multi-Stack Compatibility",
        body: "Native sync to QuickBooks, Xero, NetSuite, and most enterprise GL stacks.",
      },
      {
        icon: Layers,
        title: "Cost-Center Discipline",
        body: "Per-horse, per-partner, per-syndicate classifications kept continuously current.",
      },
      {
        icon: ClipboardCheck,
        title: "Reconciliation On Demand",
        body: "Bank-to-book reconciliation runs continuously — discrepancies surface immediately.",
      },
      {
        icon: FileCheck2,
        title: "Audit-Ready Exports",
        body: "Pull a fully reconciled month, quarter, or year for tax, audit, or partner review.",
      },
    ],
  },

  workflow: {
    eyebrow: "How it works",
    title: "From transaction",
    titleAccent: "to GL entry.",
    steps: [
      {
        num: "01",
        title: "Transaction occurs",
        body: "A settlement posts, a vet bill clears, a training invoice generates.",
      },
      {
        num: "02",
        title: "Agent classifies",
        body: "Each transaction is tagged by horse, partner, category, and cost center.",
      },
      {
        num: "03",
        title: "Entry posts",
        body: "Clean GL entries push to your accounting stack — no manual data entry.",
      },
      {
        num: "04",
        title: "Books reconcile",
        body: "Bank-to-book reconciliation runs continuously, flagging anything off.",
      },
    ],
  },

  output: {
    eyebrow: "Sample sync",
    title: "What lands in",
    titleAccent: "your books.",
    sampleLabel: "Accounting Sync · 2026.05.27",
    sampleTitle: "Daily Reconciliation Pass",
    sampleSubtitle: "47 transactions classified across 4 cost centers",
    rows: [
      { label: "Settlement · $1.2M Race Purse", value: "POSTED · 4040-RACE" },
      { label: "Vet · Routine Vaccination", value: "POSTED · 5210-VET" },
      { label: "Training Fee · Bay Filly", value: "POSTED · 5100-TRAIN" },
      { label: "Bank Reconciliation", value: "47 OF 47 · BALANCED" },
      { label: "Books Status", value: "100% CURRENT", emphasis: true },
    ],
  },

  related: {
    title: "Adjacent",
    titleAccent: "tools.",
    items: [
      {
        name: "Settlement Agent",
        href: "/solutions/workflow-agents/settlement-agent",
        blurb: "Settlement entries flow into your books without a second touch.",
      },
      {
        name: "Vet Records Organizer",
        href: "/solutions/workflow-agents/vet-records-organizer",
        blurb: "Vet costs reconcile against the right horse and partner ledger.",
      },
      {
        name: "Farm Management",
        href: "/solutions/farm-management",
        blurb: "The category — money, settlement, syndicate, and back-office.",
      },
    ],
  },

  cta: {
    title: "Close your books",
    titleAccent: "in a single pass.",
    kicker:
      "Bring last month's transactions. We'll show you what your close looks like once the sync runs.",
  },
}

/* ─── Workflow agent registry ──────────────────────────────── */

export const WORKFLOW_AGENT_CONTENT: Record<WorkflowAgentSlug, SolutionContent> = {
  "settlement-agent": settlementAgent,
  "breeding-sheet-optimizer": breedingSheetOptimizer,
  "hisa-compliance-optimizer": hisaComplianceOptimizer,
  "vet-records-organizer": vetRecordsOrganizer,
  "race-qualification-scanner": raceQualificationScanner,
  "repro-cycle-predictor": reproCyclePredictor,
  "accounting-sync": accountingSync,
}

/* ============================================================
 * Category page content: Farm Management
 * ============================================================ */

export const farmManagement: SolutionContent = {
  eyebrow: "Solutions · Stable & Syndicate Management",
  title: "The back office of an",
  titleAccent: "institutional operation.",
  kicker:
    "Every dollar accounted for. Every partner on the same page. Records that arrive before you ask for them — the operating discipline of a private bank, applied to the work of a serious barn.",
  crumbs: [
    { name: "Solutions", href: "/solutions" },
    { name: "Stable & Syndicate Management" },
  ],

  summary: {
    headline: "Everything money touches, in one ledger.",
    body:
      "An institutional back-office layer for the way elite operations actually run. Capital moves. Partners settle. Records hold themselves current. The work that used to consume your afternoons happens beneath the surface — accurately, continuously, and without the drama.",
    bullets: [
      "Every dollar accounted for, the moment it lands.",
      "Owner positions, calls, and reporting on a single continuously-current view.",
      "Compliance and stewardship reconciled to one source of truth.",
    ],
  },

  features: {
    eyebrow: "Modules",
    title: "What lives",
    titleAccent: "inside Farm Management.",
    items: [
      {
        icon: Wallet,
        title: "Settlement & Distribution",
        body: "Automated waterfall settlement on every inflow, with audit-ready ledger entries.",
      },
      {
        icon: Layers,
        title: "Syndicate Management",
        body: "Owner positions, capital calls, and partner reporting in one continuously-current view.",
      },
      {
        icon: Scale,
        title: "Back-Office Workflows",
        body: "Agreements that draft themselves. Records that find themselves. Paperwork below the surface.",
      },
      {
        icon: ShieldCheck,
        title: "Compliance Pipeline",
        body: "HISA, ADMC, and Vet's List monitoring wired into every operational workflow.",
      },
      {
        icon: Stethoscope,
        title: "Vet Records Ledger",
        body: "Structured per-horse medical history that feeds both compliance and accounting.",
      },
      {
        icon: Banknote,
        title: "Accounting Sync",
        body: "Stable books reconciled overnight against the GL stack your CFO already uses.",
      },
    ],
  },

  workflow: {
    eyebrow: "Four loops, always running",
    title: "One source of truth,",
    titleAccent: "four loops in motion.",
    steps: [
      {
        num: "01",
        title: "Capital",
        body: "Money lands. The right share moves to the right partner. The books close themselves.",
      },
      {
        num: "02",
        title: "Care",
        body: "What happens in the barn finds its way to the record. Searchable. Sortable. Yours.",
      },
      {
        num: "03",
        title: "Compliance",
        body: "The protocols that govern the industry — held current without anyone holding them.",
      },
      {
        num: "04",
        title: "Reporting",
        body: "Owners, partners, and auditors see what they need. When they need it. Not before.",
      },
    ],
  },

  output: {
    eyebrow: "What every owner sees",
    title: "An operation,",
    titleAccent: "in one view.",
    sampleLabel: "Owner View · Syndicate #042",
    sampleTitle: "Position & Distribution Summary",
    sampleSubtitle: "Live reconciliation, continuously updated",
    rows: [
      { label: "Capital Contributed YTD", value: "$2.40M" },
      { label: "Distributions YTD", value: "$1.08M" },
      { label: "Open Position", value: "12.5% · 2 horses" },
      { label: "Next Settlement", value: "Jun 03 · est. $94K" },
      { label: "Year-to-Date Net", value: "+$432K", emphasis: true },
    ],
  },

  related: {
    title: "Adjacent",
    titleAccent: "surfaces.",
    items: [],
  },

  cta: {
    title: "See your operation,",
    titleAccent: "running itself.",
    kicker:
      "Bring one syndicate, one month, one set of partners. We'll show you what the back office looks like when it actually works for you.",
  },
}

/* ============================================================
 * Category page content: Analysis
 * ============================================================ */

export const analysis: SolutionContent = {
  eyebrow: "Solutions · AI Nicking Analysis",
  title: "Sire × Dam,",
  titleAccent: "answered.",
  kicker:
    "The question every breeder asks — answered defensibly by the only model trained on fifty years of comparable outcomes. Bring a shortlist. Leave with a ranked, signed decision.",
  crumbs: [
    { name: "Solutions", href: "/solutions" },
    { name: "AI Nicking Analysis" },
  ],

  summary: {
    headline: "Decisions you can defend in the boardroom.",
    body:
      "An institutional analytical layer for the decisions that move your operation. Every recommendation arrives with confidence bands, matched historical grounding, and the kind of reasoning trail that holds up across owners, heirs, and outside scrutiny.",
    bullets: [
      "Sire × Dam compatibility, grounded in fifty years of comparable outcomes.",
      "Pedigree depth that goes back further than any operator's memory.",
      "Decisions documented, signed, and exportable — defensible whenever asked.",
    ],
  },

  features: {
    eyebrow: "Modules",
    title: "What lives",
    titleAccent: "inside Analysis.",
    items: [
      {
        icon: Dna,
        title: "Nicking Analysis",
        body: "Sire × dam compatibility scoring with full historical grounding and confidence bands.",
      },
      {
        icon: Network,
        title: "Pedigree Intelligence",
        body: "Five hundred generations mapped, indexed, and queryable — yours to interrogate.",
      },
      {
        icon: Gauge,
        title: "Performance Indices",
        body: "Speed coefficient, stamina index, and conformation scoring on every candidate.",
      },
      {
        icon: Trophy,
        title: "Race-Fit Modeling",
        body: "Per-horse, per-race fit scored on age, distance, surface, and class history.",
      },
      {
        icon: Sigma,
        title: "Outcome Forecasts",
        body: "Earnings, class progression, and career arc forecasts on matched cohorts.",
      },
      {
        icon: Beaker,
        title: "Scenario Sandbox",
        body: "Run 'what if' crosses, entries, and seasons without booking a single appointment.",
      },
    ],
  },

  workflow: {
    eyebrow: "Question to defensible answer",
    title: "Bring the question.",
    titleAccent: "Leave with the answer.",
    steps: [
      {
        num: "01",
        title: "Question",
        body: "A cross. A shortlist. A season. The sandbox accepts whatever you bring.",
      },
      {
        num: "02",
        title: "Resolve",
        body: "Fifty years of comparable outcomes return in seconds — with confidence bounds attached.",
      },
      {
        num: "03",
        title: "Rank",
        body: "Performance, fit, and outcome bands for every candidate. Defensible at every level.",
      },
      {
        num: "04",
        title: "Archive",
        body: "Signed, stored, and exportable. Decisions that hold up across owners, heirs, and time.",
      },
    ],
  },

  output: {
    eyebrow: "What the model returns",
    title: "A reading on",
    titleAccent: "the cross.",
    sampleLabel: "Match Report · Confidence 0.94",
    sampleTitle: "Sire ××××× × Dam ×××××",
    sampleSubtitle: "Resolved against fifty years of comparable outcomes",
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
    titleAccent: "surfaces.",
    items: [],
  },

  cta: {
    title: "Bring your question.",
    titleAccent: "See the answer.",
    kicker:
      "A pedigree decision, a race-fit question, a season-long forecast — bring it. We'll show you what the model has to say.",
  },
}
