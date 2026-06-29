"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Activity, Gauge, Clock, Sparkles, PhoneCall } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { OrusCore, type OrusState } from "./orus-core"
import { INDUSTRIES, INDUSTRY_ORDER, AUTOMATION_STEPS, type IndustryKey } from "@/lib/data"

function MiniWave({ active, color = "#06b6d4" }: { active: boolean; color?: string }) {
  const bars = [10, 18, 26, 16, 22, 12, 20, 14, 24, 10]
  return (
    <div className="flex h-7 items-center justify-center gap-[3px]" aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          style={{
            width: 3,
            borderRadius: 2,
            height: `${h}px`,
            background: `linear-gradient(to top, rgba(37,99,235,0.2), ${color})`,
            animation: "wave 1s ease-in-out infinite",
            animationDelay: `${i * 0.08}s`,
            animationPlayState: active ? "running" : "paused",
            opacity: active ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  )
}

export function LiveSandbox() {
  const [active, setActive] = useState<IndustryKey>("automotive")
  const [revealed, setRevealed] = useState(0)
  const [steps, setSteps] = useState(0)
  const [typing, setTyping] = useState(false)
  const [orus, setOrus] = useState<OrusState>("idle")
  const [timer, setTimer] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const data = INDUSTRIES[active]
  const Icon = data.icon

  // call duration timer
  useEffect(() => {
    setTimer(0)
    const id = setInterval(() => setTimer((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [active])

  // self-playing demonstration engine
  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) =>
      new Promise<void>((res) => {
        const t = setTimeout(res, ms)
        timers.push(t)
      })
    const convo = data.convo

    async function run() {
      while (!cancelled) {
        setRevealed(0)
        setSteps(0)
        setTyping(false)
        setOrus("idle")
        await wait(900)
        for (let i = 0; i < convo.length && !cancelled; i++) {
          const m = convo[i]
          if (m.who === "cust") {
            setOrus("listening")
            setRevealed(i + 1)
            await wait(2200)
          } else {
            setOrus("thinking")
            setTyping(true)
            await wait(1150)
            if (cancelled) break
            setTyping(false)
            setOrus("responding")
            setRevealed(i + 1)
            await wait(2500)
          }
          setSteps(Math.round(((i + 1) / convo.length) * AUTOMATION_STEPS.length))
        }
        if (cancelled) break
        setSteps(AUTOMATION_STEPS.length)
        setOrus("idle")
        await wait(3000)
      }
    }
    run()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [active, data.convo])

  // auto-scroll transcript
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [revealed, typing])

  const mm = String(Math.floor(timer / 60)).padStart(2, "0")
  const ss = String(timer % 60).padStart(2, "0")
  const latency = orus === "thinking" ? "612ms" : orus === "responding" ? "488ms" : "742ms"

  return (
    <section id="demo" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Live AI Demonstration"
          title={
            <>
              Watch your business being <span className="grad-text">automated in real time</span>
            </>
          }
          sub="This is not a screenshot. Select an industry and watch ORUS qualify a live caller, book the appointment, update the CRM, and capture revenue — automatically."
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

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1fr_1fr]">
          {/* LEFT — customer / live transcript */}
          <div className="glass flex flex-col rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl border"
                  style={{ background: "rgba(6,182,212,0.12)", borderColor: "rgba(6,182,212,0.25)" }}
                >
                  <PhoneCall className="h-4 w-4 text-cyan" />
                </span>
                <div>
                  <div className="text-[13px] font-bold text-foreground">Live Caller</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted">{data.label} · Inbound</div>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-green">
                <span className="h-1.5 w-1.5 rounded-full bg-green dot-pulse" />
                {mm}:{ss}
              </span>
            </div>

            <div ref={scrollRef} className="max-h-[300px] min-h-[240px] flex-1 space-y-3 overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {data.convo.slice(0, revealed).map((m, i) => (
                  <motion.div
                    key={`${active}-${i}`}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div
                      className={`mb-1 text-[9px] font-bold uppercase tracking-[0.12em] ${
                        m.who === "ai" ? "text-blue-light" : "text-cyan"
                      }`}
                    >
                      {m.who === "ai" ? data.agent : "Caller"}
                    </div>
                    <div
                      className="rounded-[12px] border px-3.5 py-2.5 text-[13px] leading-relaxed"
                      style={
                        m.who === "ai"
                          ? { background: "rgba(37,99,235,0.1)", borderColor: "rgba(37,99,235,0.22)" }
                          : { background: "rgba(6,182,212,0.07)", borderColor: "rgba(6,182,212,0.16)" }
                      }
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.12em] text-blue-light">
                    {data.agent}
                  </div>
                  <div
                    className="inline-flex items-center gap-1.5 rounded-[12px] border px-4 py-3"
                    style={{ background: "rgba(37,99,235,0.1)", borderColor: "rgba(37,99,235,0.22)" }}
                  >
                    <span className="typing-dot" />
                    <span className="typing-dot" style={{ animationDelay: "0.2s" }} />
                    <span className="typing-dot" style={{ animationDelay: "0.4s" }} />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="mt-4 border-t border-border2 pt-3">
              <MiniWave active={orus === "listening"} />
              <div className="mt-1 text-center text-[10px] uppercase tracking-wider text-muted">
                {orus === "listening" ? "Caller speaking" : "Caller listening"}
              </div>
            </div>
          </div>

          {/* CENTER — ORUS */}
          <div className="glass flex flex-col items-center rounded-2xl p-5">
            <OrusCore size={272} showLabel showStatus={false} state={orus} />
            <div
              className="mt-3 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
              style={{
                color:
                  orus === "listening"
                    ? "#06b6d4"
                    : orus === "thinking"
                      ? "#8b5cf6"
                      : orus === "responding"
                        ? "#22c55e"
                        : "#60a5fa",
                borderColor: "rgba(96,165,250,0.2)",
                background: "rgba(8,13,24,0.6)",
              }}
            >
              {orus === "listening"
                ? "Listening to caller"
                : orus === "thinking"
                  ? "Processing intent"
                  : orus === "responding"
                    ? "Responding live"
                    : "Standing by"}
            </div>

            {/* live call meta */}
            <div className="mt-4 grid w-full grid-cols-2 gap-2.5">
              {[
                { icon: Gauge, label: "Confidence", value: data.confidence, color: "#22c55e" },
                { icon: Sparkles, label: "Sentiment", value: data.sentiment, color: "#06b6d4" },
                { icon: Activity, label: "Intent", value: data.intent, color: "#60a5fa" },
                { icon: Clock, label: "Latency", value: latency, color: "#8b5cf6" },
              ].map((m) => {
                const M = m.icon
                return (
                  <div key={m.label} className="rounded-xl border border-border2 bg-bg2/40 p-3">
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-faint">
                      <M className="h-3 w-3" style={{ color: m.color }} />
                      {m.label}
                    </div>
                    <div className="font-mono text-sm font-bold" style={{ color: m.color }}>
                      {m.value}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT — automation pipeline */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                Automation Pipeline
              </h3>
              <span className="font-mono text-[11px] text-green">
                {steps}/{AUTOMATION_STEPS.length}
              </span>
            </div>

            <div className="relative">
              {AUTOMATION_STEPS.map((step, i) => {
                const StepIcon = step.icon
                const done = i < steps
                const isActive = i === steps
                const last = i === AUTOMATION_STEPS.length - 1
                return (
                  <div key={step.label} className="relative flex gap-3 pb-3 last:pb-0">
                    {/* connector */}
                    {!last && (
                      <span
                        className="absolute left-[15px] top-8 w-[2px]"
                        style={{
                          height: "calc(100% - 1.5rem)",
                          background: done
                            ? "linear-gradient(to bottom, rgba(34,197,94,0.7), rgba(34,197,94,0.2))"
                            : "rgba(96,165,250,0.12)",
                        }}
                        aria-hidden
                      />
                    )}
                    {/* node */}
                    <span
                      className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-500"
                      style={{
                        background: done
                          ? "rgba(34,197,94,0.16)"
                          : isActive
                            ? "rgba(37,99,235,0.18)"
                            : "rgba(15,23,42,0.6)",
                        borderColor: done
                          ? "rgba(34,197,94,0.5)"
                          : isActive
                            ? "rgba(96,165,250,0.5)"
                            : "rgba(96,165,250,0.12)",
                        boxShadow: isActive ? "0 0 16px rgba(37,99,235,0.5)" : "none",
                      }}
                    >
                      {done ? (
                        <Check className="h-4 w-4 text-green" />
                      ) : (
                        <StepIcon
                          className="h-4 w-4"
                          style={{ color: isActive ? "#60a5fa" : "#475569" }}
                        />
                      )}
                      {isActive && (
                        <span
                          className="absolute inset-0 rounded-lg border"
                          style={{ borderColor: "rgba(96,165,250,0.5)", animation: "energy-ring 1.6s ease-out infinite" }}
                          aria-hidden
                        />
                      )}
                    </span>
                    {/* label */}
                    <div className="pt-0.5">
                      <div
                        className="text-[13px] font-semibold transition-colors duration-500"
                        style={{ color: done || isActive ? "#f1f5f9" : "#64748b" }}
                      >
                        {step.label}
                      </div>
                      <div
                        className="text-[11px] transition-colors duration-500"
                        style={{ color: done ? "#22c55e" : isActive ? "#94a3b8" : "#475569" }}
                      >
                        {done ? step.detail : isActive ? "Processing…" : "Pending"}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
