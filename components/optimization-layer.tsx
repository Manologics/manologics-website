"use client"

import { motion } from "framer-motion"
import { Layers } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { SERVICETITAN_POINTS } from "@/lib/data"

export function OptimizationLayer() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="The AI Revenue Optimization Layer"
          title={
            <>
              We enhance ServiceTitan — <span className="grad-text">not replace it</span>
            </>
          }
          sub="MANOLOGICS sits on top of the tools you already run, turning missed activity into booked revenue without disrupting your existing operations."
        />

        <div className="mb-8 flex items-center justify-center gap-3 text-sm">
          <span className="rounded-full border border-border2 px-4 py-2 font-semibold text-muted">ServiceTitan</span>
          <Layers className="h-4 w-4 text-blue-light" />
          <span
            className="rounded-full px-4 py-2 font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #2563eb, #8b5cf6)" }}
          >
            MANOLOGICS Revenue Layer
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICETITAN_POINTS.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="glass glass-hover rounded-2xl p-6"
              >
                <span
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "rgba(37,99,235,0.12)" }}
                >
                  <Icon className="h-5 w-5 text-blue-light" />
                </span>
                <h3 className="font-display text-base font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
