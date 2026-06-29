"use client"

import { Cpu } from "lucide-react"

const COLUMNS = [
  {
    title: "Platform",
    links: ["ORUS Engine", "Voice Agents", "Workflow Builder", "Command Center", "Integrations"],
  },
  {
    title: "Industries",
    links: ["Healthcare", "Real Estate", "Automotive", "Legal", "Financial Services", "Home Services"],
  },
  {
    title: "Company",
    links: ["About MANOLOGICS", "Careers", "Press", "Contact", "Book a Demo"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Case Studies", "ROI Calculator", "Privacy Policy", "Terms of Service"],
  },
]

export function SiteFooter() {
  return (
    <footer id="footer" className="relative z-10 border-t border-border2 bg-bg2/40">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue to-purple">
                <Cpu className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-foreground">MANOLOGICS</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              The AI workforce platform powered by ORUS. We answer, qualify, book, and follow up — so your business never
              misses another opportunity.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="dot-pulse block h-2 w-2 rounded-full bg-green" />
              <span className="text-xs text-muted">All systems operational</span>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-foreground">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted transition-colors hover:text-blue-light">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border2 pt-6 sm:flex-row">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} MANOLOGICS. All rights reserved. Powered by ORUS.
          </p>
          <p className="text-xs text-faint">Built for businesses that refuse to miss a call.</p>
        </div>
      </div>
    </footer>
  )
}
