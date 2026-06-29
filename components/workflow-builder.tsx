"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Wrench } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { FLOW_NODES } from "@/lib/data"

export function WorkflowBuilder() {
  const [activeId, setActiveId] = useState(FLOW_NODES[4].id)
  const active = FLOW_NODES.find((n) => n.id === activeId)!

  return (
    <section id="workflow" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Autonomous Workflow Builder"
          title="Design Complex Voice Workflows. No Code."
          sub="Click any node to inspect the live automation behind it."
        />

        <div
          className="rounded-3xl border p-6 sm:p-8"
          style={{ background: "var(--color-bg2)", borderColor: "rgba(96,165,250,0.12)" }}
        >
          {/* nodes */}
          <div className="flex flex-wrap items-center justify-center gap-y-3">
            {FLOW_NODES.map((node, i) => {
              const Icon = node.icon
              const isActive = node.id === activeId
              return (
                <div key={node.id} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setActiveId(node.id)}
                    className="flex items-center gap-2 rounded-xl border px-3.5 py-3 text-[13px] font-semibold transition-all"
                    style={
                      isActive
                        ? {
                            borderColor: "#60a5fa",
                            background: "rgba(37,99,235,0.12)",
                            boxShadow: "0 0 22px rgba(37,99,235,0.25)",
                          }
                        : { borderColor: "rgba(96,165,250,0.12)", background: "rgba(15,23,42,0.6)" }
                    }
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-blue-light" : "text-muted"}`} />
                    <span className="whitespace-nowrap">{node.label}</span>
                  </button>
                  {i < FLOW_NODES.length - 1 && (
                    <ChevronRight
                      className="mx-1 h-4 w-4 shrink-0 text-blue-light"
                      style={{ animation: "flow-pulse 2s infinite", animationDelay: `${i * 0.2}s` }}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* animated data track */}
          <div className="relative my-6 h-1 overflow-hidden rounded-full" style={{ background: "rgba(96,165,250,0.08)" }}>
            <motion.span
              className="absolute top-0 h-full w-24 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #60a5fa, #8b5cf6, transparent)" }}
              animate={{ left: ["-10%", "100%"] }}
              transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>

          {/* diagnostics */}
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="glass rounded-2xl p-5"
            style={{ borderColor: "rgba(96,165,250,0.22)" }}
          >
            {[
              ["Selected Node", active.label],
              ["Status", active.status],
              ["Latency", active.latency],
              ["Automation", active.automation],
              ["Owner Agent", active.owner],
              ["Last Run", active.lastRun],
            ].map(([label, value], idx) => (
              <div
                key={label}
                className="flex items-center justify-between border-b py-2.5 text-[13px] last:border-0"
                style={{ borderColor: "rgba(96,165,250,0.12)" }}
              >
                <span className="text-muted">{label}</span>
                {label === "Status" ? (
                  <span className="flex items-center gap-1.5" style={{ color: active.status === "Active" ? "#22c55e" : "#f59e0b" }}>
                    <span
                      className="h-1.5 w-1.5 rounded-full dot-pulse"
                      style={{ background: active.status === "Active" ? "#22c55e" : "#f59e0b" }}
                    />
                    {value}
                  </span>
                ) : (
                  <span className={idx === 2 ? "font-mono" : "font-medium"}>{value}</span>
                )}
              </div>
            ))}
          </motion.div>

          <div className="mt-6 text-center">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #2563eb, #8b5cf6)",
                boxShadow: "0 0 25px rgba(37,99,235,0.4)",
              }}
            >
              <Wrench className="h-4 w-4" /> Build Your AI Workforce
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
