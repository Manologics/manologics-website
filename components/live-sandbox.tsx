"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Mic, Check, Activity, Radio } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { INDUSTRIES, INDUSTRY_ORDER, type IndustryKey } from "@/lib/data"

function Waveform({ active }: { active: boolean }) {
  const bars = [8, 16, 24, 28, 18, 24, 14, 8, 20, 12]
  return (
    <div className="flex h-8 items-center justify-center gap-[3px]">
      {bars.map((h, i) => (
        <span
          key={i}
          className="wbar"
          style={{
            height: `${h}px`,
            animationDelay: `${i * 0.1}s`,
            animationPlayState: active ? "running" : "paused",
            opacity: active ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  )
}

export function LiveSandbox() {
  const [active, setActive] = useState<IndustryKey>("automotive")
  const [tab, setTab] = useState<"sandbox" | "diagnostics">("sandbox")
  const [timer, setTimer] = useState(0)
  const data = INDUSTRIES[active]

  useEffect(() => {
    setTimer(0)
    const id = setInterval(() => setTimer((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [active])

  const mm = String(Math.floor(timer / 60)).padStart(2, "0")
  const ss = String(timer % 60).padStart(2, "0")
  const Icon = data.icon

  return (
    <section id="demo" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Live Voice Agent Sandbox"
          title="Hear ORUS Work — In Real Time"
          sub="Select an industry. Watch the agent qualify, score, and convert a live caller — exactly what closes the deal in your demo."
        />

        {/* industry selector */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {INDUSTRY_ORDER.map((key) => {
            const ind = INDUSTRIES[key]
            const IndIcon = ind.icon
            const isActive = key === active
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className="flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all"
                style={
                  isActive
                    ? {
                        background: "linear-gradient(135deg, #2563eb, #8b5cf6)",
                        borderColor: "transparent",
                        color: "#fff",
                        boxShadow: "0 0 20px rgba(37,99,235,0.4)",
                      }
                    : { borderColor: "rgba(96,165,250,0.12)", color: "#94a3b8" }
                }
              >
                <IndIcon className="h-3.5 w-3.5" /> {ind.label}
              </button>
            )
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.3fr_0.9fr]">
          {/* agent / mic */}
          <div className="glass rounded-2xl p-6">
            <div className="text-center">
              <div
                className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border"
                style={{
                  background: `linear-gradient(135deg, ${data.accent}26, rgba(139,92,246,0.12))`,
                  borderColor: "rgba(96,165,250,0.22)",
                }}
              >
                <Icon className="h-6 w-6" style={{ color: data.accent }} />
              </div>
              <div className="text-[15px] font-bold">{data.agent}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted">{data.type}</div>
            </div>
            <div className="my-4">
              <Waveform active />
            </div>
            <button
              type="button"
              className="mic-pulse mx-auto flex h-14 w-14 items-center justify-center rounded-full text-white"
              style={{ background: "linear-gradient(135deg, #2563eb, #8b5cf6)" }}
              aria-label="Tap to speak with ORUS"
            >
              <Mic className="h-5 w-5" />
            </button>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-green">
              <span className="h-1.5 w-1.5 rounded-full bg-green dot-pulse" />
              Simulation in Progress · {mm}:{ss}
            </div>
          </div>

          {/* transcript / diagnostics with tabs */}
          <div className="glass flex flex-col rounded-2xl p-6">
            <div className="mb-4 flex gap-2">
              {(["sandbox", "diagnostics"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
                  style={
                    tab === t
                      ? { background: "rgba(37,99,235,0.14)", color: "#60a5fa" }
                      : { color: "#94a3b8" }
                  }
                >
                  {t === "sandbox" ? <Radio className="h-3.5 w-3.5" /> : <Activity className="h-3.5 w-3.5" />}
                  {t === "sandbox" ? "Live Sandbox" : "Diagnostics"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {tab === "sandbox" ? (
                <motion.div
                  key={`t-${active}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[320px] space-y-3 overflow-y-auto pr-1"
                >
                  {data.convo.map((m, i) => (
                    <div key={i}>
                      <div
                        className={`mb-1 text-[9px] font-bold uppercase tracking-[0.12em] ${
                          m.who === "ai" ? "text-blue-light" : "text-cyan"
                        }`}
                      >
                        {m.who === "ai" ? data.agent : "Caller"}
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
                </motion.div>
              ) : (
                <motion.div
                  key={`d-${active}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1"
                >
                  {[
                    ["ASR Engine", "Whisper-Large v3"],
                    ["Voice Model", "ORUS Neural TTS"],
                    ["Round-trip Latency", "742ms"],
                    ["Language", active === "automotive" ? "EN / ES auto" : "EN"],
                    ["Turn Detection", "Semantic VAD"],
                    ["Tokens / s", "186"],
                    ["Function Calls", `${data.crm.length} executed`],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between border-b py-2 text-[13px] last:border-0"
                      style={{ borderColor: "rgba(96,165,250,0.12)" }}
                    >
                      <span className="text-muted">{k}</span>
                      <span className="font-mono">{v}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* insights + CRM */}
          <div className="glass rounded-2xl p-6">
            <div className="mb-3.5 text-[11px] uppercase tracking-wider text-muted">AI Insights</div>
            {[
              ["Sentiment", data.sentiment, "#22c55e"],
              ["Confidence", data.confidence, "#22c55e"],
              ["Intent", data.intent, "#f1f5f9"],
              ["Status", "Qualified Lead", "#60a5fa"],
            ].map(([label, val, color]) => (
              <div
                key={label}
                className="flex justify-between border-b py-2 text-xs last:border-0"
                style={{ borderColor: "rgba(96,165,250,0.12)" }}
              >
                <span className="text-muted">{label}</span>
                <span className="font-semibold" style={{ color }}>
                  {val}
                </span>
              </div>
            ))}
            <div className="mb-2.5 mt-4 text-[10px] uppercase tracking-wider text-muted">CRM Actions</div>
            <div className="space-y-1">
              <AnimatePresence mode="popLayout">
                {data.crm.map((a, i) => (
                  <motion.div
                    key={`${active}-${a}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2 py-1 text-xs"
                  >
                    <span
                      className="flex h-4 w-4 items-center justify-center rounded-[5px] border"
                      style={{
                        background: "rgba(34,197,94,0.15)",
                        borderColor: "rgba(34,197,94,0.4)",
                      }}
                    >
                      <Check className="h-2.5 w-2.5 text-green" />
                    </span>
                    {a}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
