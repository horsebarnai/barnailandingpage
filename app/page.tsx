"use client"

import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { GeneticSandbox } from "@/components/landing/genetic-sandbox"
import { HeritageDepth } from "@/components/landing/heritage-depth"
import { SovereigntyVault } from "@/components/landing/sovereignty-vault"
import { ShowcaseTabs } from "@/components/landing/showcase-tabs"
import { DataMoat } from "@/components/landing/data-moat"
import { OldVsNew } from "@/components/landing/old-vs-new"
import { TimeSavedCalculator } from "@/components/landing/time-saved-calculator"
import { RegulatoryCompliance } from "@/components/landing/regulatory-compliance"
import { SettlementWaterfall } from "@/components/landing/settlement-waterfall"
import { CTASection } from "@/components/landing/cta-section"
import { TeamSection } from "@/components/landing/team-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero />
      <ShowcaseTabs />
      <DataMoat />
      <OldVsNew />
      <TimeSavedCalculator />
      <RegulatoryCompliance />
      <GeneticSandbox />
      <HeritageDepth />
      <SovereigntyVault />
      <SettlementWaterfall />
      <TeamSection />
      <CTASection />
      <Footer />
    </main>
  )
}
