"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mic } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { INDUSTRIES, INDUSTRY_ORDER, type IndustryKey } from "@/lib/data"

const AGENT_NAMES: Record<IndustryKey, string> = {
  healthcare: "Alex",
  realestate: "Sophia",
  automotive: "Mark",
  legal: "Luna",
  financial: "Noah",
  home: "Diego",
}

export function TalkPanel() {
  const [active, setActive] = useState<IndustryKey>("healthcare")
  const data = INDUSTRIES[active]
  const Icon = data.icon
  const lastExchange = data.convo.slice(-2)

  return (
    <section id="talk" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Talk With Our AI Agent"
          title="Press Talk. Have A Real Conversation."
          sub="Pick an agent, tap to speak, and experience a human-like voice conversation handled end-to-end by MANOLOGICS."
        />

        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {INDUSTRY_ORDER.map((key) => {
              const ind = INDUSTRIES[key]
              const isActive = key === active
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActive(key)}
                  className="rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all"
                  style={
                    isActive
                      ? {
                          background: "linear-gradient(135deg, #2563eb, #8b5cf6)",
                          borderColor: "transparent",
                          color: "#fff",
                        }
                      : { borderColor: "rgba(96,165,250,0.12)", color: "#94a3b8" }
                  }
                >
                  {AGENT_NAMES[key]}
                </button>
              )
            })}
          </div>

          <div className="glass rounded-3xl p-7 sm:p-9">
            <div className="flex flex-col items-center text-center">
              {/* avatar */}
              <div className="relative flex h-28 w-28 items-center justify-center">
                <span
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: "rgba(96,165,250,0.25)", animation: "spin 16s linear infinite" }}
                />
                <span
                  className="absolute inset-2 rounded-full border border-dashed"
                  style={{ borderColor: "rgba(139,92,246,0.22)", animation: "spin-rev 12s linear infinite" }}
                />
                <motion.span
                  className="flex h-20 w-20 items-center justify-center rounded-full border"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${data.accent}40, rgba(5,7,13,0.92))`,
                    borderColor: "rgba(96,165,250,0.22)",
                    boxShadow: `0 0 40px ${data.accent}55`,
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Icon className="h-8 w-8" style={{ color: data.accent }} />
                </motion.span>
              </div>
              <div className="mt-4 font-display text-xl font-bold">{AGENT_NAMES[active]}</div>
              <div className="text-xs uppercase tracking-wider text-blue-light">{data.type}</div>
            </div>

            {/* transcript snippet */}
            <div className="mt-6 space-y-3">
              {lastExchange.map((m, i) => (
                <div key={i}>
                  <div
                    className={`mb-1 text-[9px] font-bold uppercase tracking-[0.12em] ${
                      m.who === "ai" ? "text-blue-light" : "text-cyan"
                    }`}
                  >
                    {m.who === "ai" ? AGENT_NAMES[active] : "You"}
                  </div>
                  <div
                    className="rounded-[10px] border px-3.5 py-2.5 text-[13px] leading-relaxed"
                    style={
                      m.who === "ai"
                        ? { background: "rgba(37,99,235,0.08)", borderColor: "rgba(37,99,235,0.18)" }
                        : { background: "rgba(6,182,212,0.06)", borderColor: "rgba(6,182,212,0.14)" }
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* metrics */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border p-3 text-center" style={{ borderColor: "rgba(96,165,250,0.12)" }}>
                <div className="text-[10px] uppercase tracking-wider text-muted">Live Sentiment</div>
                <div className="mt-1 text-sm font-bold text-green">{data.sentiment}</div>
              </div>
              <div className="rounded-xl border p-3 text-center" style={{ borderColor: "rgba(96,165,250,0.12)" }}>
                <div className="text-[10px] uppercase tracking-wider text-muted">Confidence</div>
                <div className="mt-1 font-mono text-sm font-bold text-blue-light">{data.confidence}</div>
              </div>
            </div>

            {/* waveform */}
            <div className="mt-6 flex h-8 items-center justify-center gap-[3px]">
              {[6, 12, 20, 28, 18, 26, 14, 22, 10, 16, 24, 8].map((h, i) => (
                <span key={i} className="wbar" style={{ height: `${h}px`, animationDelay: `${i * 0.08}s` }} />
              ))}
            </div>

            {/* tap to speak */}
            <div className="mt-6 flex flex-col items-center">
              <button
                type="button"
                className="mic-pulse flex h-16 w-16 items-center justify-center rounded-full text-white"
                style={{ background: "linear-gradient(135deg, #2563eb, #8b5cf6)" }}
                aria-label="Tap to speak"
              >
                <Mic className="h-6 w-6" />
              </button>
              <span className="mt-3 text-xs text-muted">Tap To Speak</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
