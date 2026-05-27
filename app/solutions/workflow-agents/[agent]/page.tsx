import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PageShell } from "@/components/layout/page-shell"
import { SolutionPageClient } from "@/components/templates/solution-page-client"
import {
  WORKFLOW_AGENT_CONTENT,
  WORKFLOW_AGENT_SLUGS,
  type WorkflowAgentSlug,
} from "@/lib/site-content/solutions"

type Params = { agent: string }

function isAgentSlug(value: string): value is WorkflowAgentSlug {
  return (WORKFLOW_AGENT_SLUGS as readonly string[]).includes(value)
}

export function generateStaticParams(): Params[] {
  return WORKFLOW_AGENT_SLUGS.map((agent) => ({ agent }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { agent } = await params
  if (!isAgentSlug(agent)) return {}
  const content = WORKFLOW_AGENT_CONTENT[agent]
  return {
    title: `${content.title.replace(/[,.]$/, "")} ${content.titleAccent ?? ""} · Barn AI`.trim(),
    description: content.kicker,
  }
}

export default async function WorkflowAgentPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { agent } = await params
  if (!isAgentSlug(agent)) notFound()

  return (
    <PageShell>
      <SolutionPageClient source={{ kind: "agent", slug: agent }} />
    </PageShell>
  )
}
