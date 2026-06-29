"use client"

import { useEffect, useState } from "react"
import { Menu, X, Zap } from "lucide-react"
import { NAV_LINKS } from "@/lib/data"

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className="sticky top-0 z-50 border-b transition-colors duration-300"
      style={{
        background: scrolled ? "rgba(5,7,13,0.85)" : "rgba(5,7,13,0.55)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(96,165,250,0.12)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-[9px] font-display text-xl font-black text-white"
            style={{
              background: "linear-gradient(135deg, #2563eb, #8b5cf6)",
              boxShadow: "0 0 20px rgba(37,99,235,0.5)",
            }}
          >
            M
          </span>
          <span className="font-display text-lg font-extrabold tracking-[0.15em]">MANOLOGICS</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#dashboard"
            className="rounded-[10px] border px-4 py-2 text-[13px] font-semibold text-muted transition-colors hover:text-foreground"
            style={{ borderColor: "rgba(96,165,250,0.22)" }}
          >
            Login
          </a>
          <a
            href="#demo"
            className="flex items-center gap-1.5 rounded-[10px] px-4 py-2 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #2563eb, #8b5cf6)",
              boxShadow: "0 0 25px rgba(37,99,235,0.4)",
            }}
          >
            <Zap className="h-3.5 w-3.5" /> Launch Demo
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border text-foreground md:hidden"
          style={{ borderColor: "rgba(96,165,250,0.22)" }}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          className="border-t px-6 py-4 md:hidden"
          style={{ borderColor: "rgba(96,165,250,0.12)", background: "rgba(5,7,13,0.95)" }}
        >
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#demo"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-[10px] px-4 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #2563eb, #8b5cf6)" }}
            >
              <Zap className="h-4 w-4" /> Launch Demo
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
