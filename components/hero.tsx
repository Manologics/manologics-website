"use client"

import { motion } from "framer-motion"
import { Zap, Phone, Check } from "lucide-react"
import { OrusCore } from "./orus-core"
import { HERO_STATS } from "@/lib/data"

const features = ["No credit card", "Live AI call", "English + Spanish", "Setup in minutes"]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-14 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-blue-light"
              style={{ background: "rgba(37,99,235,0.1)", borderColor: "rgba(96,165,250,0.22)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-light dot-pulse" />
              AI VOICE AGENTS THAT DRIVE REVENUE
            </div>
            <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
              Your Business Never Misses Another <span className="grad-text">Opportunity.</span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
              Human-like Agentic AI Voice Agents that answer calls, qualify leads, book appointments, send SMS
              follow-ups, update CRMs, recover missed revenue, and automate your business 24/7.
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <a
                href="#demo"
                className="flex items-center gap-2 rounded-[10px] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #8b5cf6)",
                  boxShadow: "0 0 30px rgba(37,99,235,0.45)",
                }}
              >
                <Zap className="h-4 w-4" /> Launch Live Demo
              </a>
              <a
                href="#talk"
                className="flex items-center gap-2 rounded-[10px] border px-5 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground"
                style={{ borderColor: "rgba(96,165,250,0.22)" }}
              >
                <Phone className="h-4 w-4" /> Call Our AI Now
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {features.map((f) => (
                <span key={f} className="flex items-center gap-1.5 text-xs text-muted">
                  <Check className="h-3.5 w-3.5 text-green" /> {f}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <OrusCore size={420} />
          </motion.div>
        </div>

        {/* live performance stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {HERO_STATS.map((s) => (
            <div
              key={s.label}
              className="glass rounded-2xl p-5 text-center"
              style={{ borderColor: "rgba(96,165,250,0.12)" }}
            >
              <div
                className={`font-mono text-3xl font-extrabold leading-none ${s.color === "grad" ? "grad-text" : ""}`}
                style={s.color !== "grad" ? { color: s.color } : undefined}
              >
                {s.value}
              </div>
              <div className="mt-2 text-[11px] text-muted">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
