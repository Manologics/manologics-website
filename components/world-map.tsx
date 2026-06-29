"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone } from "lucide-react"
import { CALL_CITIES } from "@/lib/data"

export function WorldMap() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border2 bg-bg2/50">
      <div
        className="relative aspect-[2/1] w-full bg-cover bg-center"
        style={{ backgroundImage: "url(/world-map.png)" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,7,13,0.7))]" />

        {CALL_CITIES.map((c, i) => (
          <button
            key={c.name}
            type="button"
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            aria-label={`Live call in ${c.name}`}
          >
            <span className="marker-pulse block h-2.5 w-2.5 rounded-full bg-cyan" style={{ animationDelay: `${i * 0.25}s` }} />
            <AnimatePresence>
              {active === i && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.9 }}
                  transition={{ duration: 0.18 }}
                  className="glass absolute bottom-5 left-1/2 z-10 w-44 -translate-x-1/2 rounded-xl p-3 text-left"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <Phone className="h-3 w-3 text-cyan" />
                    {c.name}
                  </div>
                  <p className="mt-1 text-[11px] text-muted">{c.type}</p>
                  <div className="mt-1.5 flex items-center justify-between text-[11px]">
                    <span className="text-blue-light">{c.agent}</span>
                    <span className="font-mono text-green">{c.duration}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        ))}

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-border2 bg-bg/70 px-3 py-1.5 backdrop-blur">
          <span className="dot-pulse block h-2 w-2 rounded-full bg-green" />
          <span className="text-xs font-medium text-muted">{CALL_CITIES.length} live calls worldwide</span>
        </div>
      </div>
    </div>
  )
}
