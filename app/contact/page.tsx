import type { Metadata } from "next"
import { Mail, MessageSquare, Users } from "lucide-react"

import { PageShell } from "@/components/layout/page-shell"
import { PageHero } from "@/components/layout/page-hero"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { ContactForm } from "@/components/forms/contact-form"

export const metadata: Metadata = {
  title: "Contact · Barn AI",
  description:
    "Talk to the Barn AI team. Sales, partnerships, and general inquiries — real humans, real responses.",
}

const PATHWAYS = [
  {
    icon: MessageSquare,
    title: "Sales",
    body: "For operators interested in onboarding to Barn AI.",
    contact: "om@horsebarn.ai",
  },
  {
    icon: Users,
    title: "Partnerships",
    body: "For registries, auction houses, clinics, and platforms.",
    contact: "om@horsebarn.ai",
  },
  {
    icon: Mail,
    title: "Press & General",
    body: "Press inquiries, speaking, and everything else.",
    contact: "om@horsebarn.ai",
  },
] as const

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Talk to the team."
        kicker="Whether you run a syndicate, a breeding operation, or a bloodstock practice — we'd like to hear what you're working on."
        crumbs={[{ name: "Contact" }]}
        size="compact"
      />

      <Section rhythm="default" className="border-t border-white/[0.04]">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
            {/* Pathways */}
            <div className="space-y-5 lg:sticky lg:top-28">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/90 mb-2">
                Pathways
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-medium leading-tight tracking-tight text-white mb-6">
                Three ways to reach us.
              </h2>

              {PATHWAYS.map((p) => {
                const Icon = p.icon
                return (
                  <div
                    key={p.title}
                    className="rounded-xl border border-zinc-800/70 bg-zinc-950/50 p-5 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/70">
                        <Icon
                          className="h-4 w-4 text-emerald-400"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-white mb-1">
                          {p.title}
                        </h3>
                        <p className="text-[13px] leading-relaxed text-zinc-400 mb-2">
                          {p.body}
                        </p>
                        <a
                          href={`mailto:${p.contact}`}
                          className="font-mono text-[11.5px] text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          {p.contact}
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Form */}
            <ContactForm
              variant="panel"
              heading="Tell us what you're working on."
              kicker="We respond to every message — usually within one business day."
            />
          </div>
        </Container>
      </Section>
    </PageShell>
  )
}
