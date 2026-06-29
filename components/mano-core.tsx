"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "./section-heading"
import { MANO_RESPONSIBILITIES } from "@/lib/data"

export function ManoCore() {
  return (
    <section id="platform" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="MANO Core AI"
          title={
            <>
              Your Executive <span className="grad-text">AI Operations Manager</span>
            </>
          }
          sub="MANO is the reasoning core behind every agent. It thinks before responding, then executes the full revenue workflow — end to end, autonomously, 24/7."
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {MANO_RESPONSIBILITIES.map((r, i) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="glass flex items-center gap-3 rounded-2xl p-4 transition-colors hover:border-border"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "rgba(37,99,235,0.12)" }}
                >
                  <Icon className="h-4 w-4 text-blue-light" />
                </span>
                <span className="text-[13px] font-semibold leading-tight text-foreground">{r.label}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
