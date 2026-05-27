import type { Metadata } from "next"

import { PageShell } from "@/components/layout/page-shell"
import { SolutionPageClient } from "@/components/templates/solution-page-client"

export const metadata: Metadata = {
  title: "Analysis · Barn AI",
  description:
    "Nicking analysis, pedigree intelligence, and decision support — the model that knows what happened next.",
}

export default function AnalysisPage() {
  return (
    <PageShell>
      <SolutionPageClient source={{ kind: "analysis" }} />
    </PageShell>
  )
}
