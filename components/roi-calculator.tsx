"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Calculator } from "lucide-react"
import { SectionHeading } from "./section-heading"

function money(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US")
}

export function RoiCalculator() {
  const [calls, setCalls] = useState(600)
  const [missedPct, setMissedPct] = useState(32)
  const [dealValue, setDealValue] = useState(450)
  const [closeRate, setCloseRate] = useState(28)

  const result = useMemo(() => {
    const missed = (calls * missedPct) / 100
    const recovered = missed * 0.85 // ORUS recovers ~85% of missed calls
    const booked = (recovered * closeRate) / 100
    const monthly = booked * dealValue
    const annual = monthly * 12
    return { missed, recovered, booked, monthly, annual }
  }, [calls, missedPct, dealValue, closeRate])

  // build the projection curve (12 months ramp)
  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = []
    for (let i = 0; i <= 12; i++) {
      const ramp = 1 - Math.pow(1 - i / 12, 1.8)
      const val = result.monthly * ramp * (0.6 + i / 12)
      pts.push({ x: i, y: val })
    }
    return pts
  }, [result.monthly])

  const W = 520
  const H = 220
  const padX = 36
  const padY = 24
  const maxY = Math.max(...points.map((p) => p.y), 1)
  const sx = (x: number) => padX + (x / 12) * (W - padX * 2)
  const sy = (y: number) => H - padY - (y / maxY) * (H - padY * 2)

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.x)} ${sy(p.y)}`).join(" ")
  const areaPath = `${linePath} L ${sx(12)} ${H - padY} L ${sx(0)} ${H - padY} Z`

  const sliders = [
    { label: "Monthly inbound calls", value: calls, set: setCalls, min: 100, max: 3000, step: 50, fmt: (v: number) => v.toLocaleString() },
    { label: "Calls currently missed", value: missedPct, set: setMissedPct, min: 5, max: 70, step: 1, fmt: (v: number) => `${v}%` },
    { label: "Average deal value", value: dealValue, set: setDealValue, min: 100, max: 5000, step: 50, fmt: (v: number) => money(v) },
    { label: "Close rate on contacted leads", value: closeRate, set: setCloseRate, min: 5, max: 80, step: 1, fmt: (v: number) => `${v}%` },
  ]

  return (
    <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="ROI Calculator"
        title={
          <>
            See what ORUS recovers for <span className="grad-text">your business</span>
          </>
        }
        sub="Adjust the inputs to model your missed-call revenue. The projection updates instantly."
      />

      <div className="glass grid gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-2 lg:gap-10">
        {/* inputs */}
        <div className="flex flex-col gap-6">
          {sliders.map((s) => (
            <div key={s.label}>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-muted">{s.label}</label>
                <span className="font-mono text-sm font-bold text-blue-light">{s.fmt(s.value)}</span>
              </div>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={s.value}
                onChange={(e) => s.set(Number(e.target.value))}
                aria-label={s.label}
              />
            </div>
          ))}

          <div className="mt-2 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border2 bg-bg2/60 p-4">
              <p className="text-xs text-muted">Missed calls / mo</p>
              <p className="mt-1 font-display text-xl font-extrabold text-red">{Math.round(result.missed)}</p>
            </div>
            <div className="rounded-xl border border-border2 bg-bg2/60 p-4">
              <p className="text-xs text-muted">Recovered by ORUS</p>
              <p className="mt-1 font-display text-xl font-extrabold text-green">{Math.round(result.recovered)}</p>
            </div>
          </div>
        </div>

        {/* graph + result */}
        <div className="flex flex-col">
          <div className="rounded-2xl border border-border2 bg-bg2/40 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">12-Month Revenue Projection</p>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Revenue projection chart">
              <defs>
                <linearGradient id="roiArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(37,99,235,0.45)" />
                  <stop offset="100%" stopColor="rgba(37,99,235,0)" />
                </linearGradient>
                <linearGradient id="roiLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>

              {[0.25, 0.5, 0.75, 1].map((g) => (
                <line
                  key={g}
                  x1={padX}
                  x2={W - padX}
                  y1={H - padY - g * (H - padY * 2)}
                  y2={H - padY - g * (H - padY * 2)}
                  stroke="rgba(96,165,250,0.08)"
                  strokeWidth={1}
                />
              ))}

              <motion.path
                key={areaPath}
                d={areaPath}
                fill="url(#roiArea)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.path
                key={linePath}
                d={linePath}
                fill="none"
                stroke="url(#roiLine)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
              {points.map((p, i) =>
                i % 3 === 0 ? (
                  <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={3} fill="#60a5fa" stroke="#05070d" strokeWidth={1.5} />
                ) : null,
              )}
            </svg>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <motion.div
              key={result.monthly}
              initial={{ scale: 0.96, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-border bg-[rgba(37,99,235,0.08)] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Recovered / month</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                {money(result.monthly)}
              </p>
            </motion.div>
            <motion.div
              key={result.annual}
              initial={{ scale: 0.96, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-border bg-[rgba(139,92,246,0.08)] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Recovered / year</p>
              <p className="mt-1 font-display text-2xl font-extrabold grad-text sm:text-3xl">{money(result.annual)}</p>
            </motion.div>
          </div>

          <a
            href="#footer"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue to-purple px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            <Calculator className="h-4 w-4" />
            Claim this revenue with ORUS
          </a>
        </div>
      </div>
    </section>
  )
}
