import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PageShell } from "@/components/layout/page-shell"
import { SolutionPageClient } from "@/components/templates/solution-page-client"
import {
  PLATFORM_TOPIC_CONTENT,
  PLATFORM_TOPIC_SLUGS,
  type PlatformTopicSlug,
} from "@/lib/site-content/platform"

type Params = { topic: string }

function isTopicSlug(value: string): value is PlatformTopicSlug {
  return (PLATFORM_TOPIC_SLUGS as readonly string[]).includes(value)
}

export function generateStaticParams(): Params[] {
  return PLATFORM_TOPIC_SLUGS.map((topic) => ({ topic }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { topic } = await params
  if (!isTopicSlug(topic)) return {}
  const content = PLATFORM_TOPIC_CONTENT[topic]
  return {
    title: `${content.title.replace(/[,.]$/, "")} ${content.titleAccent ?? ""} · Barn AI`.trim(),
    description: content.kicker,
  }
}

export default async function PlatformTopicPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { topic } = await params
  if (!isTopicSlug(topic)) notFound()

  return (
    <PageShell>
      <SolutionPageClient source={{ kind: "platform", slug: topic }} />
    </PageShell>
  )
}
