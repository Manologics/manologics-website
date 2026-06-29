import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MANOLOGICS — Autonomous Revenue Infrastructure",
  description:
    "Human-like Agentic AI Voice Agents that answer calls, qualify leads, book appointments, send SMS follow-ups, update CRMs, and recover missed revenue 24/7.",
  keywords: [
    "AI voice agents",
    "agentic AI",
    "automotive BDC AI",
    "revenue recovery",
    "AI receptionist alternative",
    "MANOLOGICS",
  ],
  openGraph: {
    title: "MANOLOGICS — Autonomous Revenue Infrastructure",
    description:
      "Multi-agent AI workforce that answers every call, recovers lost revenue, and automates your business 24/7.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
