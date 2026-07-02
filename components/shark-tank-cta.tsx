"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowRight, PhoneCall } from "lucide-react"
import { BOOK_DEMO_URL } from "@/lib/data"

export function SharkTankCta() {
  return (
    <section id="contact" className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[rgba(37,99,235,0.16)] via-[rgba(15,23,42,0.6)] to-[rgba(139,92,246,0.16)] p-8 text-center sm:p-14"
      >
        {/* glow accents */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple/20 blur-3xl" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-light">
            <Sparkles className="h-3.5 w-3.5" />
            As seen pitching to the Sharks
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Stop losing customers to <span className="grad-text">missed calls</span>. Deploy your AI workforce today.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted">
            Join the businesses already recovering six figures in lost revenue with MANOLOGICS. Book a live demo and hear
            MANO answer your calls in under a minute.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={BOOK_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue to-purple px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] sm:w-auto"
            >
              Book a Live Demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#talk"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-bg/40 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-bg2/60 sm:w-auto"
            >
              <PhoneCall className="h-4 w-4 text-blue-light" />
              Talk to MANO Now
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
