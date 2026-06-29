import type { Metadata, Viewport } from "next"
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-inter-tight",
  display: "swap",
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
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
  themeColor: "#03050a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
