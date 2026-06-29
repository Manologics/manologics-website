import { AmbientBackground } from "@/components/ambient-background"
import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { LiveSandbox } from "@/components/live-sandbox"
import { IndustryCards } from "@/components/industry-cards"
import { Workforce } from "@/components/workforce"
import { WorkflowBuilder } from "@/components/workflow-builder"
import { TalkPanel } from "@/components/talk-panel"
import { RevenueRecovery } from "@/components/revenue-recovery"
import { DashboardPreview } from "@/components/dashboard-preview"
import { AutomotiveBdc } from "@/components/automotive-bdc"
import { Bilingual } from "@/components/bilingual"
import { RoiCalculator } from "@/components/roi-calculator"
import { Integrations } from "@/components/integrations"
import { SharkTankCta } from "@/components/shark-tank-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="relative">
      <AmbientBackground />
      <div className="relative z-10">
        <SiteNav />
        <Hero />
        <LiveSandbox />
        <IndustryCards />
        <Workforce />
        <WorkflowBuilder />
        <TalkPanel />
        <RevenueRecovery />
        <DashboardPreview />
        <AutomotiveBdc />
        <Bilingual />
        <RoiCalculator />
        <Integrations />
        <SharkTankCta />
        <SiteFooter />
      </div>
    </main>
  )
}
