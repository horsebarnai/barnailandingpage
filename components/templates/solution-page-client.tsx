"use client"

/* ============================================================
 * Thin client-side wrapper around SolutionPageTemplate.
 *
 * Why: SolutionContent carries LucideIcon function references.
 * If a Server Component imports the content and passes it as a
 * prop, Next.js rejects the function references at the
 * server/client boundary. By doing the content lookup inside a
 * client component, every icon function stays in the client
 * bundle — never crosses the boundary as a prop.
 *
 * Visual centerpieces are also picked here so the existing
 * premium landing components show up on their natural pages.
 * ============================================================ */

import { SolutionPageTemplate } from "@/components/templates/solution-page"
import {
  WORKFLOW_AGENT_CONTENT,
  analysis,
  farmManagement,
  type WorkflowAgentSlug,
} from "@/lib/site-content/solutions"
import {
  PLATFORM_TOPIC_CONTENT,
  type PlatformTopicSlug,
} from "@/lib/site-content/platform"

import { GeneticSandbox } from "@/components/landing/genetic-sandbox"
import { HeritageDepth } from "@/components/landing/heritage-depth"
import { MorningBrief } from "@/components/landing/morning-brief"
import { RegulatoryCompliance } from "@/components/landing/regulatory-compliance"
import { SettlementWaterfall } from "@/components/landing/settlement-waterfall"
import { SovereigntyVault } from "@/components/landing/sovereignty-vault"

export type SolutionSource =
  | { kind: "agent"; slug: WorkflowAgentSlug }
  | { kind: "platform"; slug: PlatformTopicSlug }
  | { kind: "farm-management" }
  | { kind: "analysis" }

const AGENT_VISUALS: Partial<Record<WorkflowAgentSlug, React.ReactNode>> = {
  "settlement-agent": <SettlementWaterfall />,
  "hisa-compliance-optimizer": <RegulatoryCompliance />,
  "breeding-sheet-optimizer": <GeneticSandbox />,
}

const TOPIC_VISUALS: Partial<Record<PlatformTopicSlug, React.ReactNode>> = {
  "intelligence-network": <HeritageDepth />,
  "compliance-engine": <RegulatoryCompliance />,
  privacy: <SovereigntyVault />,
}

export function SolutionPageClient({ source }: { source: SolutionSource }) {
  const content = (() => {
    switch (source.kind) {
      case "agent":
        return WORKFLOW_AGENT_CONTENT[source.slug]
      case "platform":
        return PLATFORM_TOPIC_CONTENT[source.slug]
      case "farm-management":
        return farmManagement
      case "analysis":
        return analysis
    }
  })()

  const extra = (() => {
    switch (source.kind) {
      case "agent":
        return AGENT_VISUALS[source.slug]
      case "platform":
        return TOPIC_VISUALS[source.slug]
      case "farm-management":
        return <SettlementWaterfall />
      case "analysis":
        return <GeneticSandbox />
    }
  })()

  /* Editorial intro for Stable & Syndicate Management — a cream
     "morning brief" preview of what a day on Barn AI looks like.
     Intentionally inverts the dark palette so it lands like a
     beam of light mid-page. */
  const intro =
    source.kind === "farm-management" ? <MorningBrief /> : undefined

  /* Public-facing surfaces (categories + platform sub-pages) suppress
     the Features grid and the Related section. Both expose too much
     of the underlying methodology and pillar names, which we want to
     keep strategically vague. Only the deep workflow-agent pages —
     reached by direct URL — still carry that level of detail. */
  const hideDetails =
    source.kind === "farm-management" ||
    source.kind === "analysis" ||
    source.kind === "platform"

  /* Workflow steps on the category pages got too prescriptive — they
     telegraph the four operating loops we'd rather demo in person.
     Hide them on Stable & Syndicate and AI Nicking Analysis. Agent
     and platform pages keep workflow for now. */
  const hideWorkflow =
    source.kind === "farm-management" || source.kind === "analysis"

  return (
    <SolutionPageTemplate
      content={content}
      intro={intro}
      extra={extra}
      hideFeatures={hideDetails}
      hideWorkflow={hideWorkflow}
      hideRelated={hideDetails}
    />
  )
}
