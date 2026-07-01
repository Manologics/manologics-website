"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Languages, Volume2 } from "lucide-react"
import { SectionHeading } from "./section-heading"

type Lang = "en" | "es"

const SCRIPT: Record<Lang, { label: string; flag: string; convo: { who: "ai" | "cust"; text: string }[] }> = {
  en: {
    label: "English",
    flag: "EN",
    convo: [
      { who: "ai", text: "Thank you for calling Desert Auto Group, this is MANO. How can I help you today?" },
      { who: "cust", text: "Hi, I'd like to schedule an oil change for my truck." },
      { who: "ai", text: "Absolutely! I have an opening tomorrow at 9 AM or 2 PM. Which works best for you?" },
      { who: "cust", text: "9 AM is perfect." },
      { who: "ai", text: "Done — you're booked for 9 AM. I'll text you a confirmation right now. See you then!" },
    ],
  },
  es: {
    label: "Español",
    flag: "ES",
    convo: [
      { who: "ai", text: "Gracias por llamar a Desert Auto Group, habla MANO. ¿En qué puedo ayudarle hoy?" },
      { who: "cust", text: "Hola, quisiera agendar un cambio de aceite para mi camioneta." },
      { who: "ai", text: "¡Claro que sí! Tengo disponibilidad mañana a las 9 AM o a las 2 PM. ¿Cuál le conviene más?" },
      { who: "cust", text: "Las 9 AM está perfecto." },
      { who: "ai", text: "Listo — quedó agendado para las 9 AM. Le envío la confirmación por mensaje ahora mismo. ¡Nos vemos!" },
    ],
  },
}

export function Bilingual() {
  const [lang, setLang] = useState<Lang>("en")
  const active = SCRIPT[lang]

  return (
    <section id="bilingual" className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Bilingual Voice AI"
        title={
          <>
            Fluent in <span className="grad-text">English &amp; Spanish</span> — on every call
          </>
        }
        sub="MANO detects your caller's language instantly and responds naturally, capturing every lead no matter how they speak."
      />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* language toggle + info */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6"
        >
          <Languages className="h-8 w-8 text-blue-light" />
          <h3 className="mt-4 font-display text-xl font-bold text-foreground">Automatic language detection</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            No menus, no &quot;press 2 for Spanish.&quot; MANO listens, identifies the language, and switches seamlessly
            mid-conversation — delivering a native experience to every caller.
          </p>

          <div className="mt-6 flex gap-2 rounded-xl border border-border2 bg-bg2/50 p-1.5">
            {(Object.keys(SCRIPT) as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                  lang === l ? "bg-gradient-to-r from-blue to-purple text-white" : "text-muted hover:text-foreground"
                }`}
              >
                {SCRIPT[l].label}
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-xl border border-border2 bg-bg2/40 p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(6,182,212,0.14)]">
              <Volume2 className="h-5 w-5 text-cyan" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Natural neural voices</p>
              <p className="text-xs text-muted">Studio-grade MANOLOGICS neural TTS — indistinguishable from human</p>
            </div>
          </div>
        </motion.div>

        {/* live transcript */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6"
        >
          <div className="mb-4 flex items-center justify-between border-b border-border2 pb-3">
            <div className="flex items-center gap-2">
              <span className="dot-pulse block h-2 w-2 rounded-full bg-green" />
              <span className="text-sm font-semibold text-foreground">Live Call — {active.label}</span>
            </div>
            <span className="rounded-md border border-border2 px-2 py-0.5 font-mono text-xs text-blue-light">
              {active.flag}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={lang}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3"
              >
                {active.convo.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.18 }}
                    className={`flex ${m.who === "ai" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.who === "ai"
                          ? "rounded-tl-sm bg-[rgba(37,99,235,0.14)] text-foreground"
                          : "rounded-tr-sm bg-bg2/70 text-muted"
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
