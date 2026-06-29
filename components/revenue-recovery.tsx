"use client"

import { motion } from "framer-motion"
import { TrendingUp, ArrowUpRight, RotateCcw } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { AnimatedCounter } from "./animated-counter"
import { RECOVERY_METRICS, RECOVERY_DIFFERENTIATORS } from "@/lib/data"

const BARS = [38, 52, 44, 67, 58, 81, 73, 92, 86, 100, 94, 112]

export function RevenueRecovery() {
  return (
    <section id="revenue" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Revenue Intelligence"
        title={
          <>
            Recover the revenue you&apos;re <span className="grad-text">already losing</span>
          </>
        }
        sub="Every missed call is a missed customer. ORUS answers, qualifies, books, and follows up — turning lost calls into booked revenue, tracked live."
      />

      {/* core market position */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="glass mb-8 rounded-3xl p-7 sm:p-9"
      >
        <p className="font-display text-xl font-bold text-foreground sm:text-2xl text-balance">
          We don&apos;t just answer phones. We <span className="grad-text">recover lost revenue</span> automatically.
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          MANOLOGICS is the autonomous revenue layer that captures the opportunities your business is silently losing
          every single day:
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {RECOVERY_DIFFERENTIATORS.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold text-foreground"
              style={{ borderColor: "rgba(34,197,94,0.28)", background: "rgba(34,197,94,0.08)" }}
            >
              <RotateCcw className="h-3 w-3 text-green" />
              Recover {item}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        {/* live metrics grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
        >
          {RECOVERY_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass rounded-2xl p-5"
            >
              <div className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                <AnimatedCounter
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals ?? 0}
                />
              </div>
              <p className="mt-1.5 text-xs font-medium leading-snug text-muted">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* growth chart card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass relative flex flex-col rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Recovered Revenue</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-foreground">
                <AnimatedCounter value={124540} prefix="$" />
              </p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-[rgba(34,197,94,0.12)] px-2.5 py-1 text-xs font-bold text-green">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +218%
            </span>
          </div>

          <div className="mt-6 flex flex-1 items-end gap-1.5" style={{ minHeight: 150 }}>
            {BARS.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${(h / 112) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 rounded-t-sm"
                style={{
                  background: "linear-gradient(to top, var(--color-blue), var(--color-cyan))",
                  opacity: 0.35 + (i / BARS.length) * 0.65,
                }}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-border2 pt-4 text-xs text-muted">
            <TrendingUp className="h-4 w-4 text-green" />
            <span>Trending up over the last 12 weeks of live operation</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
