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
      className="mx-auto mb-11 max-w-3xl text-center"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-light">{eyebrow}</p>
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {sub && <p className="mx-auto mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted">{sub}</p>}
    </motion.div>
  )
}
