"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Circle,
  RefreshCw,
  Database,
  PhoneCall,
  DollarSign,
  CalendarCheck,
  Brain,
  Smile,
  Gauge,
} from "lucide-react"
import { SectionHeading } from "./section-heading"
import { WorldMap } from "./world-map"
import { AnimatedCounter } from "./animated-counter"
import { DASH_NAV, DASH_AGENTS, KNOWLEDGE_SOURCES, REVENUE_INTEL, AI_WORKFORCE } from "@/lib/data"

const STATUS_COLOR: Record<string, string> = {
  Online: "var(--color-green)",
  Busy: "var(--color-amber)",
  Training: "var(--color-blue-light)",
}

function RevenueIntelligence() {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-green dot-pulse" />
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
          Live Revenue Intelligence
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {REVENUE_INTEL.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="glass glass-hover relative overflow-hidden rounded-2xl p-4"
            >
              <span
                className="absolute right-0 top-0 h-16 w-16 rounded-full opacity-20 blur-2xl"
                style={{ background: card.color }}
                aria-hidden
              />
              <div className="mb-2 flex items-center justify-between">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg border"
                  style={{ background: `${card.color}1f`, borderColor: `${card.color}40` }}
                >
                  <Icon className="h-4 w-4" style={{ color: card.color }} />
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                  style={{ background: "rgba(34,197,94,0.14)", color: "#22c55e" }}
                >
                  {card.delta}
                </span>
              </div>
              <div className="font-mono text-xl font-extrabold leading-none text-foreground tabular-nums sm:text-2xl">
                <AnimatedCounter
                  value={card.value}
                  prefix={card.prefix}
                  suffix={card.suffix}
                  decimals={card.decimals ?? 0}
                />
              </div>
              <div className="mt-1.5 text-[11px] uppercase tracking-wider text-faint">{card.label}</div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function AiWorkforcePanel() {
  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">AI Workforce</h3>
        <span className="text-xs text-muted">6 agents · all systems operational</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {AI_WORKFORCE.map((emp, i) => {
          const Icon = emp.icon
          return (
            <motion.div
              key={emp.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="glass glass-hover rounded-2xl p-4"
            >
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="relative flex h-11 w-11 items-center justify-center rounded-xl border"
                  style={{ background: `${emp.accent}1f`, borderColor: `${emp.accent}40` }}
                >
                  <Icon className="h-5 w-5" style={{ color: emp.accent }} />
                  <span
                    className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2"
                    style={{
                      background: STATUS_COLOR[emp.status],
                      borderColor: "var(--color-bg)",
                    }}
                  />
                </span>
                <div className="min-w-0">
                  <div className="truncate font-display text-sm font-bold text-foreground">{emp.name}</div>
                  <div className="truncate text-[11px] text-muted">{emp.role}</div>
                </div>
              </div>
              <div className="mb-3 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider"
                style={{ color: STATUS_COLOR[emp.status] }}
              >
                <span className="h-1.5 w-1.5 rounded-full dot-pulse" style={{ background: STATUS_COLOR[emp.status] }} />
                {emp.status}
              </div>
              <div className="space-y-1.5">
                {emp.stats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-[12px]">
                    <span className="text-muted">{s.label}</span>
                    <span className="font-mono font-semibold text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const KPI_DEFS = [
  { key: "calls", icon: PhoneCall, label: "Live Calls", base: 47, fmt: (v: number) => `${v}`, color: "#60a5fa" },
  { key: "rev", icon: DollarSign, label: "Revenue Today", base: 48290, fmt: (v: number) => `$${(v / 1000).toFixed(1)}k`, color: "#22c55e" },
  { key: "appt", icon: CalendarCheck, label: "Appointments", base: 134, fmt: (v: number) => `${v}`, color: "#06b6d4" },
  { key: "ai", icon: Brain, label: "AI Decisions", base: 8421, fmt: (v: number) => v.toLocaleString(), color: "#8b5cf6" },
  { key: "sent", icon: Smile, label: "Sentiment", base: 94, fmt: (v: number) => `${v}%`, color: "#22c55e" },
  { key: "util", icon: Gauge, label: "Utilization", base: 88, fmt: (v: number) => `${v}%`, color: "#f59e0b" },
]

function DashboardKpis() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2600)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {KPI_DEFS.map((k, i) => {
        const Icon = k.icon
        // small deterministic-ish fluctuation around base for live feel
        const drift = Math.round(Math.sin(tick + i) * (k.base > 1000 ? k.base * 0.004 : 2))
        const val = Math.max(0, k.base + drift)
        return (
          <div
            key={k.key}
            className="rounded-xl border border-border2 bg-bg2/40 p-3.5 transition-colors hover:border-[rgba(96,165,250,0.32)]"
          >
            <div className="mb-2 flex items-center justify-between">
              <Icon className="h-3.5 w-3.5" style={{ color: k.color }} />
              <span className="h-1 w-1 rounded-full bg-green dot-pulse" />
            </div>
            <div className="font-mono text-lg font-extrabold leading-none text-foreground tabular-nums">
              {k.fmt(val)}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-wider text-faint">{k.label}</div>
          </div>
        )
      })}
    </div>
  )
}

export function DashboardPreview() {
  const [navActive, setNavActive] = useState("Overview")

  return (
    <section id="dashboard" className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Executive Command Center"
        title={
          <>
            Not a CRM. An <span className="grad-text">AI Operating System</span>
          </>
        }
        sub="Live revenue intelligence, a full AI workforce, and global call operations — every metric updating in real time, built for the people who run the business."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="glass overflow-hidden rounded-3xl"
      >
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-border2 bg-bg2/60 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red/70" />
          <span className="h-3 w-3 rounded-full bg-amber/70" />
          <span className="h-3 w-3 rounded-full bg-green/70" />
          <div className="ml-3 flex items-center gap-2 text-xs text-muted">
            <LayoutDashboard className="h-3.5 w-3.5 text-blue-light" />
            MANOLOGICS Command Center
          </div>
        </div>

        <div className="grid lg:grid-cols-[200px_1fr]">
          {/* sidebar */}
          <nav className="hidden flex-col gap-1 border-r border-border2 bg-bg2/40 p-3 lg:flex" aria-label="Dashboard">
            {DASH_NAV.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setNavActive(item)}
                className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  navActive === item
                    ? "bg-[rgba(37,99,235,0.16)] font-semibold text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* main */}
          <div className="p-5 sm:p-6">
            <DashboardKpis />
            <RevenueIntelligence />
            <WorldMap />
            <AiWorkforcePanel />

            {/* agents table */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                  Active AI Agents
                </h3>
                <span className="text-xs text-muted">Live performance</span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-border2">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border2 bg-bg2/50 text-xs uppercase tracking-wider text-faint">
                      <th className="px-4 py-3 font-semibold">Agent</th>
                      <th className="px-4 py-3 font-semibold">Role</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Calls</th>
                      <th className="px-4 py-3 font-semibold">Bookings</th>
                      <th className="px-4 py-3 font-semibold">Success</th>
                      <th className="px-4 py-3 font-semibold">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DASH_AGENTS.map((a, i) => (
                      <motion.tr
                        key={a.name}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="border-b border-border2/60 last:border-0 hover:bg-bg2/40"
                      >
                        <td className="px-4 py-3 font-semibold text-foreground">{a.name}</td>
                        <td className="px-4 py-3 text-muted">{a.role}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: STATUS_COLOR[a.status] }}>
                            <Circle className="h-2 w-2" fill="currentColor" strokeWidth={0} />
                            {a.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-muted">{a.calls}</td>
                        <td className="px-4 py-3 font-mono text-muted">{a.bookings}</td>
                        <td className="px-4 py-3 font-mono text-green">{a.success}</td>
                        <td className="px-4 py-3 font-mono text-amber">{a.rating}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* knowledge sync engine */}
            <div className="mt-6 rounded-2xl border border-border2 bg-bg2/40 p-5">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-foreground">
                  <Database className="h-4 w-4 text-blue-light" />
                  Knowledge Sync Engine
                </h3>
                <span className="flex items-center gap-1.5 text-xs font-medium text-green">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin [animation-duration:3s]" />
                  Syncing
                </span>
              </div>
              <p className="mt-2 text-xs text-muted">
                MANOLOGICS continuously ingests and learns from every connected source so your agents always speak with current information.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {KNOWLEDGE_SOURCES.map((k, i) => (
                  <motion.span
                    key={k}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="rounded-full border border-border2 bg-bg/60 px-3 py-1.5 text-xs font-medium text-muted"
                  >
                    {k}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
