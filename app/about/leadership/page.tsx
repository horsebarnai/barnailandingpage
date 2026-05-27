import type { Metadata } from "next"

import { PageShell } from "@/components/layout/page-shell"
import { PageHero } from "@/components/layout/page-hero"
import { TeamSection } from "@/components/landing/team-section"
import { TemplateCTA } from "@/components/templates/solution-page"

export const metadata: Metadata = {
  title: "Leadership · Barn AI",
  description:
    "Meet the founders and leadership of Barn AI — multi-generational equine knowledge meets technical builders, attorneys, and finance veterans.",
}

export default function LeadershipPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About · Leadership"
        title="The team behind"
        titleAccent="Barn AI."
        kicker="Multi-generational equine knowledge meets technical builders, attorneys, and finance veterans — operating with the same rigor we bring to every workflow on this platform."
        crumbs={[
          { name: "About", href: "/about" },
          { name: "Leadership" },
        ]}
        primaryCta={{ name: "Book a Demo", href: "/book-a-demo" }}
        secondaryCta={{ name: "Contact Us", href: "/contact" }}
      />

      {/* Reuse the existing TeamSection — it's already on-brand */}
      <TeamSection />

      <TemplateCTA
        cta={{
          title: "Talk to the team",
          titleAccent: "directly."
        }}
      />
    </PageShell>
  )
}
