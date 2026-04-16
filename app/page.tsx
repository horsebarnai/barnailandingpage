"use client"

import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { ShowcaseTabs } from "@/components/landing/showcase-tabs"
import { DataMoat } from "@/components/landing/data-moat"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero />
      <ShowcaseTabs />
      <DataMoat />
      <CTASection />
      <Footer />
    </main>
  )
}
