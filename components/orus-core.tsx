"use client"

import { motion } from "framer-motion"

export type OrusState = "idle" | "listening" | "thinking" | "responding"

const STATE_CONFIG: Record<
  OrusState,
  {
    glowAnim: string
    glowBg: string
    ringSpeed: number
    waveSpeed: number
    eye: string
    label: string
    labelColor: string
  }
> = {
  idle: {
    glowAnim: "core-pulse 4s ease-in-out infinite",
    glowBg: "radial-gradient(circle, rgba(37,99,235,0.26), rgba(139,92,246,0.12) 42%, transparent 70%)",
    ringSpeed: 1,
    waveSpeed: 1.3,
    eye: "#60a5fa",
    label: "Standing By",
    labelColor: "#60a5fa",
  },
  listening: {
    glowAnim: "core-listen 2.2s ease-in-out infinite",
    glowBg: "radial-gradient(circle, rgba(6,182,212,0.32), rgba(37,99,235,0.14) 45%, transparent 72%)",
    ringSpeed: 0.85,
    waveSpeed: 0.7,
    eye: "#22d3ee",
    label: "Listening",
    labelColor: "#06b6d4",
  },
  thinking: {
    glowAnim: "core-think 1.1s ease-in-out infinite",
    glowBg: "radial-gradient(circle, rgba(139,92,246,0.34), rgba(96,165,250,0.16) 45%, transparent 72%)",
    ringSpeed: 0.35,
    waveSpeed: 0.45,
    eye: "#a78bfa",
    label: "Thinking",
    labelColor: "#8b5cf6",
  },
  responding: {
    glowAnim: "core-respond 1.6s ease-in-out infinite",
    glowBg: "radial-gradient(circle, rgba(34,197,94,0.3), rgba(37,99,235,0.16) 45%, transparent 72%)",
    ringSpeed: 0.6,
    waveSpeed: 0.55,
    eye: "#4ade80",
    label: "Responding",
    labelColor: "#22c55e",
  },
}

export function OrusCore({
  size = 420,
  showLabel = true,
  showStatus = true,
  state = "idle",
}: {
  size?: number
  showLabel?: boolean
  showStatus?: boolean
  state?: OrusState
}) {
  const ringSize = size * 0.81
  const faceSize = size * 0.48
  const cfg = STATE_CONFIG[state]
  const active = state !== "idle"

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: size }}
      aria-label={`ORUS holographic AI core — ${cfg.label}`}
    >
      {/* radial glow */}
      <motion.div
        className="absolute rounded-full"
        aria-hidden
        animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.05, 1] }}
        transition={{ duration: state === "thinking" ? 2 : 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{
          width: size,
          height: size,
          background: cfg.glowBg,
          filter: "blur(10px)",
        }}
      />

      {/* energy pulse rings that travel outward when responding */}
      {state === "responding" &&
        [0, 0.5, 1].map((delay) => (
          <span
            key={delay}
            className="absolute rounded-full border"
            aria-hidden
            style={{
              width: faceSize * 1.2,
              height: faceSize * 1.2,
              borderColor: "rgba(34,197,94,0.5)",
              animation: `energy-ring 1.6s ease-out ${delay}s infinite`,
            }}
          />
        ))}

      {/* rotating rings */}
      <div className="absolute" style={{ width: ringSize, height: ringSize }} aria-hidden>
        <div
          className="absolute inset-0 rounded-full border"
          style={{
            borderColor: active ? "rgba(96,165,250,0.35)" : "rgba(96,165,250,0.2)",
            animation: `spin ${20 * cfg.ringSpeed}s linear infinite`,
          }}
        />
        <div
          className="absolute rounded-full border border-dashed"
          style={{
            inset: ringSize * 0.09,
            borderColor: "rgba(139,92,246,0.18)",
            animation: `spin-rev ${15 * cfg.ringSpeed}s linear infinite`,
          }}
        />
        <div
          className="absolute rounded-full border"
          style={{
            inset: ringSize * 0.18,
            borderColor: "rgba(6,182,212,0.16)",
            animation: `spin ${25 * cfg.ringSpeed}s linear infinite`,
          }}
        />
        {/* orbiting nodes */}
        {[0, 120, 240].map((deg) => (
          <div
            key={deg}
            className="absolute inset-0"
            style={{ animation: `spin ${(18 + deg / 60) * cfg.ringSpeed}s linear infinite` }}
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

      {/* orbital audio-reactive waveform ring */}
      <div className="absolute" style={{ width: faceSize * 1.42, height: faceSize * 1.42 }} aria-hidden>
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i / 48) * 360
          const h = (active ? 8 : 6) + ((i * 7) % 13) * (active ? 1.3 : 1)
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg) translateY(-${faceSize * 0.62}px)`,
                transformOrigin: "center top",
              }}
            >
              <span
                className="block"
                style={{
                  width: 2,
                  height: h,
                  borderRadius: 2,
                  background: `linear-gradient(to top, rgba(37,99,235,0.1), ${cfg.eye})`,
                  transformOrigin: "center top",
                  animation: `wave ${(1 + (i % 5) * 0.12) * cfg.waveSpeed}s ease-in-out ${i * 0.03}s infinite`,
                }}
              />
            </span>
          )
        })}
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
          animation: cfg.glowAnim,
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

        {/* radar sweep beam */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          aria-hidden
          style={{
            background:
              "conic-gradient(from 0deg, rgba(96,165,250,0.22), transparent 55deg, transparent 360deg)",
            animation: `spin ${6 * cfg.ringSpeed}s linear infinite`,
            mixBlendMode: "screen",
          }}
        />

        {/* face mesh SVG with reactive glowing eyes */}
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
          </g>
          {/* glowing eyes react to state */}
          <circle cx="48" cy="52" r="2.4" fill={cfg.eye} stroke="none">
            <animate attributeName="r" values="2.4;3.2;2.4" dur={active ? "1.2s" : "3s"} repeatCount="indefinite" />
          </circle>
          <circle cx="72" cy="52" r="2.4" fill={cfg.eye} stroke="none">
            <animate attributeName="r" values="2.4;3.2;2.4" dur={active ? "1.2s" : "3s"} repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="66" r="1.6" fill="#06b6d4" stroke="none" />
        </svg>

        {/* core voice waveform */}
        <div className="z-10 flex items-end gap-[3px]" style={{ height: faceSize * 0.16 }}>
          {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.45].map((h, i) => (
            <span
              key={i}
              className="wbar"
              style={{
                height: `${h * faceSize * 0.16}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${1.2 * cfg.waveSpeed}s`,
              }}
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
          <div className="mt-1 flex items-center justify-center gap-1.5 text-[9px]" style={{ color: cfg.labelColor }}>
            <span className="h-1.5 w-1.5 rounded-full dot-pulse" style={{ background: cfg.labelColor }} />
            {state === "idle" ? "Live Revenue Intelligence Online" : cfg.label}
          </div>
        </motion.div>
      )}
    </div>
  )
}
