"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string
  title: ReactNode
  sub?: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-light"
        style={{ background: "rgba(37,99,235,0.08)", borderColor: "rgba(96,165,250,0.2)" }}
      >
        <span className="h-1 w-1 rounded-full bg-blue-light dot-pulse" />
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance sm:text-[2.6rem] sm:leading-[1.1]">
        {title}
      </h2>
      {sub && <p className="mx-auto mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted">{sub}</p>}
    </motion.div>
  )
}
