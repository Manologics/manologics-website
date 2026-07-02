"use client"

import { motion } from "framer-motion"
import { Phone, Calendar, Check } from "lucide-react"
import { ManoOperator } from "./mano-operator"
import { AnimatedCounter } from "./animated-counter"
import { HERO_STATS, BOOK_DEMO_URL, MANO_PHONE_URL } from "@/lib/data"

const features = ["No credit card", "Live AI call", "English + Spanish", "Setup in minutes"]

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden pt-20 pb-14">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
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
            <h1 className="font-display text-[2.7rem] font-extrabold leading-[1.06] tracking-tight text-balance sm:text-5xl lg:text-[3.6rem]">
              Your Business Never Misses Another <span className="grad-text-live">Opportunity.</span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
              Human-like Agentic AI Voice Agents that answer calls, qualify leads, book appointments, send SMS
              follow-ups, update CRMs, recover missed revenue, and automate your business 24/7.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <a
                href={BOOK_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-os btn-primary light-sweep"
              >
                <Calendar className="h-4 w-4" /> Book a Live Demo
              </a>
              <a href={MANO_PHONE_URL} className="btn-os btn-ghost">
                <Phone className="h-4 w-4" /> Talk to MANO Now
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
            <ManoOperator size={420} />
          </motion.div>
        </div>

        {/* live performance stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {HERO_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              className="glass glass-hover rounded-2xl p-5 text-center"
            >
              <div className="mb-2 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-faint">
                <span className="h-1 w-1 rounded-full bg-green dot-pulse" /> Live
              </div>
              <div
                className={`font-mono text-3xl font-extrabold leading-none ${s.color === "grad" ? "grad-text" : ""}`}
                style={s.color !== "grad" ? { color: s.color } : undefined}
              >
                <AnimatedCounter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals ?? 0}
                />
              </div>
              <div className="mt-2 text-[11px] text-muted">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
