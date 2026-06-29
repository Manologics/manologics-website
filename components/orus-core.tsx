"use client"

import { motion } from "framer-motion"

export function OrusCore({
  size = 420,
  showLabel = true,
  showStatus = true,
}: {
  size?: number
  showLabel?: boolean
  showStatus?: boolean
}) {
  const ringSize = size * 0.81
  const faceSize = size * 0.48

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: size }}
      aria-label="ORUS holographic AI core"
    >
      {/* radial glow */}
      <div
        className="absolute rounded-full"
        aria-hidden
        style={{
          width: size * 0.9,
          height: size * 0.9,
          background:
            "radial-gradient(circle, rgba(37,99,235,0.18), rgba(139,92,246,0.08) 45%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* rotating rings */}
      <div className="absolute" style={{ width: ringSize, height: ringSize }} aria-hidden>
        <div
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: "rgba(96,165,250,0.2)", animation: "spin 20s linear infinite" }}
        />
        <div
          className="absolute rounded-full border border-dashed"
          style={{
            inset: ringSize * 0.09,
            borderColor: "rgba(139,92,246,0.18)",
            animation: "spin-rev 15s linear infinite",
          }}
        />
        <div
          className="absolute rounded-full border"
          style={{
            inset: ringSize * 0.18,
            borderColor: "rgba(6,182,212,0.16)",
            animation: "spin 25s linear infinite",
          }}
        />
        {/* orbiting nodes */}
        {[0, 120, 240].map((deg) => (
          <div
            key={deg}
            className="absolute inset-0"
            style={{ animation: `spin ${18 + deg / 60}s linear infinite` }}
          >
            <span
              className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full"
              style={{
                background: deg === 120 ? "#8b5cf6" : deg === 240 ? "#06b6d4" : "#60a5fa",
                boxShadow: "0 0 12px currentColor",
                transform: `rotate(${deg}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* face */}
      <motion.div
        className="relative flex flex-col items-center justify-center overflow-hidden rounded-full border"
        style={{
          width: faceSize,
          height: faceSize,
          borderColor: "rgba(96,165,250,0.22)",
          background:
            "radial-gradient(circle at 50% 40%, rgba(37,99,235,0.32), rgba(139,92,246,0.2), rgba(5,7,13,0.92))",
          animation: "core-pulse 4s ease-in-out infinite",
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        {/* scanning lines */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          aria-hidden
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(96,165,250,0.06) 7px, transparent 8px)",
            animation: "scan 4s linear infinite",
          }}
        />

        {/* face mesh SVG */}
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full opacity-70" aria-hidden>
          <defs>
            <linearGradient id="meshGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <g stroke="url(#meshGrad)" strokeWidth="0.6" fill="none" opacity="0.85">
            <path d="M40 38 Q60 30 80 38" />
            <path d="M36 52 Q60 44 84 52" />
            <path d="M34 66 Q60 60 86 66" />
            <path d="M40 80 Q60 88 80 80" />
            <path d="M48 34 L48 86" />
            <path d="M60 30 L60 90" />
            <path d="M72 34 L72 86" />
            <circle cx="48" cy="52" r="2" fill="#60a5fa" stroke="none" />
            <circle cx="72" cy="52" r="2" fill="#60a5fa" stroke="none" />
            <circle cx="60" cy="66" r="1.6" fill="#06b6d4" stroke="none" />
          </g>
        </svg>

        {/* core voice waveform */}
        <div className="z-10 flex items-end gap-[3px]" style={{ height: faceSize * 0.16 }}>
          {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.45].map((h, i) => (
            <span
              key={i}
              className="wbar"
              style={{ height: `${h * faceSize * 0.16}px`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {showLabel && (
          <div className="z-10 mt-2 text-center">
            <div
              className="font-display text-xl font-extrabold tracking-[0.3em]"
              style={{
                background: "linear-gradient(135deg, #60a5fa, #06b6d4)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ORUS
            </div>
            <div className="text-[9px] uppercase tracking-[0.18em] text-muted">Core AI Operator</div>
          </div>
        )}
      </motion.div>

      {/* status card */}
      {showStatus && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="glass absolute bottom-0 rounded-xl px-5 py-3 text-center"
          style={{ borderColor: "rgba(96,165,250,0.22)" }}
        >
          <div className="font-display text-sm font-bold tracking-[0.2em]">ORUS</div>
          <div className="text-[9px] uppercase tracking-wider text-muted">Core AI Operator</div>
          <div className="mt-1 flex items-center justify-center gap-1.5 text-[9px] text-green">
            <span className="h-1.5 w-1.5 rounded-full bg-green dot-pulse" />
            Live Revenue Intelligence Online
          </div>
        </motion.div>
      )}
    </div>
  )
}
