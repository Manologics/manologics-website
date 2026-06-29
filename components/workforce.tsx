"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { WORKFORCE } from "@/lib/data"

const statusColor: Record<string, string> = {
  Online: "#22c55e",
  Busy: "#f59e0b",
  Training: "#60a5fa",
}

export function Workforce() {
  return (
    <section id="agents" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Multi-Agent Workforce"
          title="Not One Bot. A Full AI Workforce."
          sub="MANOLOGICS deploys specialized AI agents that work together across voice, SMS, email, booking, CRM, reviews, and revenue intelligence."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WORKFORCE.map((agent, i) => {
            const Icon = agent.icon
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group glass relative overflow-hidden rounded-2xl p-6"
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ background: "linear-gradient(90deg, #2563eb, #8b5cf6, transparent)" }}
                />
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl border"
                    style={{
                      background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(139,92,246,0.1))",
                      borderColor: "rgba(96,165,250,0.22)",
                    }}
                  >
                    <Icon className="h-6 w-6 text-blue-light" />
                  </div>
                  <span
                    className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                    style={{ background: "rgba(15,23,42,0.6)", color: statusColor[agent.status] }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full dot-pulse"
                      style={{ background: statusColor[agent.status] }}
                    />
                    {agent.status}
                  </span>
                </div>
                <h3 className="mt-3.5 font-display text-base font-bold">{agent.name}</h3>
                <div className="text-[11px] uppercase tracking-wider text-blue-light">{agent.role}</div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{agent.desc}</p>
                <div
                  className="mt-4 flex items-center justify-between border-t pt-3"
                  style={{ borderColor: "rgba(96,165,250,0.12)" }}
                >
                  <span className="text-[11px] text-faint">
                    <span className="text-muted">Sample:</span> {agent.sample}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-blue-light opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
