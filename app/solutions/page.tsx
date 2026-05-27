import type { Metadata } from "next"

import { PageShell } from "@/components/layout/page-shell"
import { PageHero } from "@/components/layout/page-hero"
import { Container } from "@/components/layout/container"
import { Section, SectionHeader } from "@/components/layout/section"
import { TemplateCTA } from "@/components/templates/solution-page"
import { SolutionsTriptych } from "@/components/landing/solutions-triptych"

export const metadata: Metadata = {
  title: "Solutions · Barn AI",
  description:
    "Three lanes. One operating system. The visible surface of Barn AI for the operators who run elite equine operations.",
}

export default function SolutionsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Solutions"
        title="Three lanes."
        titleAccent="One operating system."
        kicker="The visible surface of the platform — each lane backed by deeper machinery the curious can explore."
        crumbs={[{ name: "Solutions" }]}
        primaryCta={{ name: "Book a Demo", href: "/book-a-demo" }}
        secondaryCta={{ name: "Talk to Sales", href: "/contact" }}
      />

      <SolutionsTriptych />

      {/* Editorial closer — quiet positioning statement */}
      <Section rhythm="default" className="border-t border-white/[0.04]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeader
              eyebrow="Beneath the surface"
              title="More machinery than"
              titleAccent="we show on the front page."
              kicker="Each lane runs on a roster of specialized workers, a privacy-first data fabric, and a model trained on outcomes most operators have never seen. We show the rest of the stack to the operators we work with directly."
              align="center"
            />
          </div>
        </Container>
      </Section>

      <TemplateCTA
        cta={{
          title: "Walk through the platform",
          titleAccent: "with us.",
          kicker:
            "Bring a real scenario from your operation. We'll show you which lane it lives in — and what the back office looks like once we own it.",
        }}
      />
    </PageShell>
  )
}
