import type { Metadata } from "next"

import { PageShell } from "@/components/layout/page-shell"
import { SolutionPageClient } from "@/components/templates/solution-page-client"

export const metadata: Metadata = {
  title: "Farm Management · Barn AI",
  description:
    "Settlement waterfalls, syndicate management, and back-office workflows for the modern equine operation.",
}

export default function FarmManagementPage() {
  return (
    <PageShell>
      <SolutionPageClient source={{ kind: "farm-management" }} />
    </PageShell>
  )
}
