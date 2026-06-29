import { AmbientBackground } from "@/components/ambient-background"
import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { LiveSandbox } from "@/components/live-sandbox"

export default function Page() {
  return (
    <main className="relative">
      <AmbientBackground />
      <div className="relative z-10">
        <SiteNav />
        <Hero />
        <LiveSandbox />
      </div>
    </main>
  )
}
