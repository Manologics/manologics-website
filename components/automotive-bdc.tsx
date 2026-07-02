"use client"

import { motion } from "framer-motion"
import { ChevronRight, Car } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { AnimatedCounter } from "./animated-counter"
import { BDC_FEATURES, BDC_FLOW, BDC_METRICS } from "@/lib/data"

export function AutomotiveBdc() {
  return (
    <section id="automotive" className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Automotive BDC"
        title={
          <>
            A full <span className="grad-text">AI Business Development Center</span> for dealerships
          </>
        }
        sub="MANO runs your service and sales BDC 24/7 — answering, qualifying, booking, and following up so no lead falls through the cracks."
      />

      {/* feature grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {BDC_FEATURES.map((f, i) => {
          const Icon = f.icon
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="glass flex items-center gap-3 rounded-xl p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(37,99,235,0.14)]">
                <Icon className="h-5 w-5 text-blue-light" />
              </span>
              <span className="text-sm font-medium leading-tight text-foreground">{f.title}</span>
            </motion.div>
          )
        })}
      </div>

      {/* flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass mt-6 rounded-2xl p-5 sm:p-6"
      >
        <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
          <Car className="h-4 w-4 text-blue-light" />
          Live BDC Pipeline
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {BDC_FLOW.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="rounded-lg border border-border2 bg-bg2/60 px-3 py-2 text-xs font-medium text-foreground"
              >
                {step}
              </motion.span>
              {i < BDC_FLOW.length - 1 && <ChevronRight className="h-4 w-4 text-faint" />}
            </div>
          ))}
        </div>
      </motion.div>

      {/* metrics */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {BDC_METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="glass glass-hover rounded-2xl p-5 text-center"
          >
            <div className="font-display text-2xl font-extrabold grad-text">
              <AnimatedCounter value={m.value} prefix={m.prefix} />
            </div>
            <p className="mt-1.5 text-xs font-medium leading-snug text-muted">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
