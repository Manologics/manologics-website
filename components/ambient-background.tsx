"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  left: number
  duration: number
  delay: number
}

export function AmbientBackground() {
  const auraRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, () => ({
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
