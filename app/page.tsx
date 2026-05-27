import { PageShell } from "@/components/layout/page-shell"
import { Hero } from "@/components/landing/hero"
import { PaperTaxScroll } from "@/components/landing/paper-tax-scroll"
import { HiddenTax } from "@/components/landing/hidden-tax"
import { SolutionsTriptych } from "@/components/landing/solutions-triptych"
import { ValuePillars } from "@/components/landing/value-pillars"
import { OldVsNew } from "@/components/landing/old-vs-new"
import { TrustAndDiscretion } from "@/components/landing/trust-discretion"
import { TimeSavedCalculator } from "@/components/landing/time-saved-calculator"
import { HomeCTA } from "@/components/landing/home-cta"

/* Landing page composition — a tightened narrative arc:
 *   Hero            → who we are + reach us
 *   PaperTaxScroll  → scroll-pinned counter: what every op leaks
 *   HiddenTax       → the problem, named without flinching
 *   SolutionsTrip   → what we do — three lanes, three diagrams
 *   ValuePillars    → the four standards the platform holds itself to
 *   OldVsNew        → before / after, in concrete pain
 *   Trust           → editorial close on privacy + stewardship
 *   TimeSaved       → tangible math
 *   HomeCTA         → convert
 *
 * Note on PaperTaxScroll: it's a 220vh section with internal sticky
 * pinning. Keep it a direct sibling of Hero and HiddenTax — no
 * overflow/transform/filter wrappers, or sticky breaks silently.
 */

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <PaperTaxScroll />
      <HiddenTax />
      <SolutionsTriptych />
      <ValuePillars />
      <OldVsNew />
      <TrustAndDiscretion />
      <TimeSavedCalculator />
      <HomeCTA />
    </PageShell>
  )
}
