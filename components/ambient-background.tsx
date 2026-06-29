"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  left: number
  duration: number
  delay: number
}

interface Node {
  x: number
  y: number
  delay: number
}

// fixed seed positions so server/client markup matches
const NODES: Node[] = [
  { x: 12, y: 22, delay: 0 },
  { x: 28, y: 64, delay: 1.4 },
  { x: 44, y: 18, delay: 0.8 },
  { x: 58, y: 48, delay: 2.1 },
  { x: 72, y: 28, delay: 1.1 },
  { x: 86, y: 60, delay: 0.4 },
  { x: 20, y: 84, delay: 1.8 },
  { x: 64, y: 80, delay: 0.6 },
  { x: 90, y: 14, delay: 2.4 },
]
const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [1, 6],
  [3, 7],
  [4, 8],
  [7, 5],
]

export function AmbientBackground() {
  const auraRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 36 }, () => ({
        left: Math.random() * 100,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 10,
      })),
    )

    const handleMove = (e: MouseEvent) => {
      if (auraRef.current) {
        auraRef.current.style.left = `${e.clientX}px`
        auraRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <>
      <div className="ambient" aria-hidden />
      <div className="grid-bg" aria-hidden />

      {/* neural connection mesh */}
      <svg
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
        aria-hidden
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="ambient-link" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(96,165,250,0.0)" />
            <stop offset="50%" stopColor="rgba(96,165,250,0.18)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.0)" />
          </linearGradient>
        </defs>
        {LINKS.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="url(#ambient-link)"
            strokeWidth="0.12"
            style={{ animation: `flow-pulse ${5 + (i % 4)}s ease-in-out ${i * 0.3}s infinite` }}
          />
        ))}
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="0.4"
            fill="#60a5fa"
            style={{ animation: `node-pulse ${4 + (i % 3)}s ease-in-out ${n.delay}s infinite` }}
          />
        ))}
      </svg>
      <div
        ref={auraRef}
        aria-hidden
        className="pointer-events-none fixed z-[1] hidden h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen md:block"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.06), transparent 70%)",
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              bottom: "-10px",
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  )
}
