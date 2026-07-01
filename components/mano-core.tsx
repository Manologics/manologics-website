"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { ManoOperator } from "./mano-operator"
import { CORE_TEAM } from "@/lib/data"

export function ManoCore() {
  return (
    <section id="platform" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Core Operations Team"
          title={
            <>
              One operator. One executor. <span className="grad-text">Mano &amp; Mila.</span>
            </>
          }
          sub="Mano is the voice — he answers, talks, qualifies, and closes. Mila is the execution — she books the appointment, fires the SMS confirmation, updates the CRM, and queues follow-up while Mano keeps talking. Together they run the entire revenue workflow in real time."
        />

        <div className="grid items-stretch gap-5 lg:grid-cols-2">
          {CORE_TEAM.map((member, i) => {
            return (
              <motion.div
                key={member.persona}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="glass relative flex flex-col items-center overflow-hidden rounded-3xl p-6 sm:p-8"
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${member.accent}, transparent)` }}
                  aria-hidden
                />

                {/* orb */}
                <div className="flex w-full justify-center">
                  <ManoOperator persona={member.persona} size={300} showLabel showStatus={false} />
                </div>

                {/* identity */}
                <div className="mt-2 text-center">
                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                    {member.name}
                  </h3>
                  <div
                    className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: member.accent }}
                  >
                    {member.role}
                  </div>
                  <p className="mx-auto mt-3 max-w-sm text-pretty text-sm leading-relaxed text-muted">
                    {member.tagline}
                  </p>
                </div>

                {/* duties */}
                <div className="mt-6 grid w-full grid-cols-2 gap-3">
                  {member.duties.map((duty) => {
                    const Icon = duty.icon
                    return (
                      <div
                        key={duty.label}
                        className="flex items-center gap-2.5 rounded-xl border p-3"
                        style={{ borderColor: "rgba(96,165,250,0.12)", background: "rgba(15,23,42,0.4)" }}
                      >
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: member.accentSoft }}
                        >
                          <Icon className="h-4 w-4" style={{ color: member.accent }} />
                        </span>
                        <span className="text-[12px] font-semibold leading-tight text-foreground">{duty.label}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* handoff strip — the real-time relationship between the two */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass mt-5 flex flex-col items-center justify-center gap-3 rounded-2xl p-5 text-center sm:flex-row sm:gap-4"
        >
          <span className="font-display text-sm font-bold" style={{ color: "#60a5fa" }}>
            Mano talks
          </span>
          <ArrowRight className="h-4 w-4 rotate-90 text-muted sm:rotate-0" aria-hidden />
          <span className="font-display text-sm font-bold" style={{ color: "#4ade80" }}>
            Mila executes
          </span>
          <span className="text-sm text-muted sm:ml-2">
            — the hand-off happens mid-conversation, so the caller never waits and nothing falls through the cracks.
          </span>
        </motion.div>
      </div>
    </section>
  )
}
