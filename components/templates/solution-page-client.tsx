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

import { BarnOperatingSystem } from "@/components/landing/barn-operating-system"
import { GeneticSandbox } from "@/components/landing/genetic-sandbox"
import { HeritageDepth } from "@/components/landing/heritage-depth"
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

  /* The BarnOS editorial block — moved off the landing page and onto
     Stable & Syndicate Management, where the "back office that runs
     itself" message lands hardest. */
  const intro =
    source.kind === "farm-management" ? <BarnOperatingSystem /> : undefined

  /* Category pages act as directories — the mega menu + workflow-agents
     hub already enumerate the sub-modules, so we suppress the
     duplicate Features + Related grids here. Agent and platform-topic
     pages keep them since that's where the depth belongs. */
  const isCategory =
    source.kind === "farm-management" || source.kind === "analysis"

  return (
    <SolutionPageTemplate
      content={content}
      intro={intro}
      extra={extra}
      hideFeatures={isCategory}
      hideRelated={isCategory}
    />
  )
}
