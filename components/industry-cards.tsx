"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { INDUSTRY_CARDS } from "@/lib/data"

export function IndustryCards() {
  return (
    <section id="industries" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Industry Agents"
          title="Specialized AI Agents, Built For Your Industry"
          sub="Every agent is trained for the conversations your business actually has."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRY_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.a
                key={card.title}
                href="#demo"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group glass relative overflow-hidden rounded-2xl p-6 transition-shadow hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6),0_0_30px_rgba(37,99,235,0.12)]"
              >
                <div
                  className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-xl border"
                  style={{ background: "rgba(37,99,235,0.1)", borderColor: "rgba(96,165,250,0.22)" }}
                >
                  <Icon className="h-6 w-6 text-blue-light" />
                </div>
                <h3 className="font-display text-base font-bold">{card.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{card.desc}</p>
                <span className="mt-3.5 inline-flex items-center gap-1 text-xs font-semibold text-blue-light">
                  Try Demo
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
