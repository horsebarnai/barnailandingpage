import { PageShell } from "@/components/layout/page-shell"
import { Hero } from "@/components/landing/hero"
import { HiddenTax } from "@/components/landing/hidden-tax"
import { SolutionsTriptych } from "@/components/landing/solutions-triptych"
import { ValuePillars } from "@/components/landing/value-pillars"
import { OldVsNew } from "@/components/landing/old-vs-new"
import { TrustAndDiscretion } from "@/components/landing/trust-discretion"
import { TimeSavedCalculator } from "@/components/landing/time-saved-calculator"
import { HomeCTA } from "@/components/landing/home-cta"

/* Landing page composition — a tightened narrative arc:
 *   Hero            → who we are + reach us
 *   HiddenTax       → the problem
 *   SolutionsTrip   → what we do — three lanes, three diagrams
 *   ValuePillars    → the four standards the platform holds itself to
 *   OldVsNew        → before / after, in concrete pain
 *   Trust           → editorial close on privacy + stewardship
 *   TimeSaved       → tangible math
 *   HomeCTA         → convert
 *
 * The Barn Operating System editorial block moved to
 * /solutions/farm-management (Stable & Syndicate Management) —
 * its natural home now that Solutions = WHAT.
 */

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
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
