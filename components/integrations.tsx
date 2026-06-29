"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "./section-heading"
import { INTEGRATIONS } from "@/lib/data"

export function Integrations() {
  return (
    <section id="integrations" className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Integrations"
        title={
          <>
            Plugs into the tools you <span className="grad-text">already run on</span>
          </>
        }
        sub="ORUS connects to your phone system, CRM, calendar, and automation stack out of the box — no rip-and-replace required."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {INTEGRATIONS.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              whileHover={{ y: -4 }}
              className="glass flex flex-col items-center justify-center gap-2.5 rounded-xl p-5 text-center"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(96,165,250,0.1)]">
                <Icon className="h-5 w-5 text-blue-light" />
              </span>
              <span className="text-xs font-medium text-foreground">{item.name}</span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
