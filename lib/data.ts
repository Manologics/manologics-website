import type { LucideIcon } from "lucide-react"
import {
  Stethoscope,
  Home,
  Car,
  Scale,
  Landmark,
  Wrench,
  Calendar,
  MessageSquare,
  Mail,
  BarChart3,
  Cpu,
  RefreshCw,
  CarFront,
  PhoneMissed,
  CreditCard,
  Star,
  Phone,
  Target,
  FileText,
  DollarSign,
  Mic,
  Volume2,
  Building2,
  Cloud,
  Zap,
  TrendingUp,
  Workflow,
  Bell,
  ClipboardList,
  UserCheck,
} from "lucide-react"

export type IndustryKey = "healthcare" | "realestate" | "automotive" | "legal" | "financial" | "home"

export interface IndustryData {
  key: IndustryKey
  label: string
  agent: string
  type: string
  icon: LucideIcon
  accent: string
  intent: string
  sentiment: string
  confidence: string
  convo: { who: "ai" | "cust"; text: string }[]
  crm: string[]
}

export const INDUSTRIES: Record<IndustryKey, IndustryData> = {
  healthcare: {
    key: "healthcare",
    label: "Healthcare",
    agent: "CARE DESK",
    type: "Healthcare Agent",
    icon: Stethoscope,
    accent: "#06b6d4",
    intent: "Appointment Booking",
    sentiment: "Reassured",
    confidence: "94%",
    convo: [
      { who: "cust", text: "Hi, I need to book a follow-up with Dr. Lee." },
      {
        who: "ai",
        text: "Of course. I can help you schedule that. May I have your name and date of birth to pull up your record?",
      },
      { who: "cust", text: "Sarah Miller, March 3rd 1985." },
      {
        who: "ai",
        text: "Thank you, Sarah. Dr. Lee has openings Thursday at 10 AM or Friday at 2 PM. Which works best?",
      },
    ],
    crm: ["Patient verified", "Appointment slot held", "Insurance check queued", "Reminder SMS scheduled"],
  },
  realestate: {
    key: "realestate",
    label: "Real Estate",
    agent: "ESTATE DESK",
    type: "Real Estate Agent",
    icon: Home,
    accent: "#22c55e",
    intent: "Buyer Qualification",
    sentiment: "Eager",
    confidence: "92%",
    convo: [
      { who: "cust", text: "I saw a listing on Camelback I want to check out." },
      {
        who: "ai",
        text: "Great choice! That property is $625K, 4 bed 3 bath. Are you pre-approved, and what's your timeline to buy?",
      },
      { who: "cust", text: "Pre-approved up to $700K, looking to move in 60 days." },
      {
        who: "ai",
        text: "Perfect — you're a strong fit. I can schedule a private showing this weekend. Saturday morning work?",
      },
    ],
    crm: ["Buyer qualified", "Pre-approval confirmed", "Showing requested", "Agent notified"],
  },
  automotive: {
    key: "automotive",
    label: "Automotive",
    agent: "AUTO DESK",
    type: "Automotive Agent",
    icon: Car,
    accent: "#2563eb",
    intent: "Trade-In / Appointment",
    sentiment: "Positive",
    confidence: "96%",
    convo: [
      {
        who: "ai",
        text: "Thanks for calling. Are you looking to schedule service, ask about a vehicle, or get trade-in information?",
      },
      { who: "cust", text: "I'm interested in trading my car and checking payment options." },
      {
        who: "ai",
        text: "Absolutely. What year, make, model, mileage, and condition is your vehicle?",
      },
      { who: "cust", text: "2019 Tahoe, 62k miles, excellent shape." },
      {
        who: "ai",
        text: "Great — that has strong trade value. I can get you a quote and finance options. When can you come in?",
      },
    ],
    crm: [
      "Lead captured",
      "Vehicle intake started",
      "Trade-in workflow opened",
      "BDC follow-up queued",
      "Appointment ready",
    ],
  },
  legal: {
    key: "legal",
    label: "Legal",
    agent: "LEGAL DESK",
    type: "Legal Intake Agent",
    icon: Scale,
    accent: "#8b5cf6",
    intent: "Case Intake",
    sentiment: "Supported",
    confidence: "93%",
    convo: [
      { who: "cust", text: "I was in a car accident last week and need a lawyer." },
      {
        who: "ai",
        text: "I'm sorry to hear that. I can help you start your case. Were you injured, and was a police report filed?",
      },
      { who: "cust", text: "Yes, minor injuries, report was filed." },
      {
        who: "ai",
        text: "Understood. This sounds like a strong case. I'll schedule a free consultation with our PI attorney. Tomorrow at 11 AM?",
      },
    ],
    crm: ["Case intake started", "Practice area: Personal Injury", "Consultation booked", "Documents requested"],
  },
  financial: {
    key: "financial",
    label: "Financial Services",
    agent: "FINANCE DESK",
    type: "Financial Services Agent",
    icon: Landmark,
    accent: "#f59e0b",
    intent: "Loan Qualification",
    sentiment: "Confident",
    confidence: "91%",
    convo: [
      { who: "cust", text: "I want to apply for a small business loan." },
      {
        who: "ai",
        text: "Happy to help. What's your business revenue and how much funding are you seeking?",
      },
      { who: "cust", text: "About $40k a month, need $150k." },
      {
        who: "ai",
        text: "You may qualify for several options. I'll route you to a loan specialist and pre-screen your application. Can I confirm your email?",
      },
    ],
    crm: ["Lead captured", "Loan inquiry logged", "Pre-screen started", "Specialist routed"],
  },
  home: {
    key: "home",
    label: "Home Services",
    agent: "HOME DESK",
    type: "Home Services Agent",
    icon: Wrench,
    accent: "#ef4444",
    intent: "Emergency Repair",
    sentiment: "Urgent",
    confidence: "97%",
    convo: [
      { who: "cust", text: "My AC died and it's 108 degrees out here." },
      {
        who: "ai",
        text: "That's an emergency — I'll get you handled fast. What's your address so I can check our nearest tech?",
      },
      { who: "cust", text: "4521 West Camelback, Phoenix." },
      {
        who: "ai",
        text: "I have a tech available at 1:30 PM today. Booking you now — you'll get a confirmation text in 60 seconds.",
      },
    ],
    crm: ["Lead captured", "HOT flag set", "Tech dispatched", "Confirmation SMS queued"],
  },
}

export const INDUSTRY_ORDER: IndustryKey[] = [
  "healthcare",
  "realestate",
  "automotive",
  "legal",
  "financial",
  "home",
]

export interface IndustryCard {
  icon: LucideIcon
  title: string
  desc: string
  key: IndustryKey
}

export const INDUSTRY_CARDS: IndustryCard[] = [
  {
    icon: Stethoscope,
    title: "Healthcare Agent",
    desc: "Patient inquiries, appointment scheduling, intake routing, office FAQs, reminders.",
    key: "healthcare",
  },
  {
    icon: Home,
    title: "Real Estate Agent",
    desc: "Property inquiries, buyer qualification, showing requests, seller lead capture.",
    key: "realestate",
  },
  {
    icon: Car,
    title: "Automotive Agent",
    desc: "Service booking, sales inquiries, trade-in intake, BDC follow-up, finance routing.",
    key: "automotive",
  },
  {
    icon: Scale,
    title: "Legal Agent",
    desc: "Case intake, consultation booking, practice-area routing, document collection.",
    key: "legal",
  },
  {
    icon: Landmark,
    title: "Financial Services Agent",
    desc: "Account inquiries, loan qualification, appointment routing, compliance-aware support.",
    key: "financial",
  },
  {
    icon: Wrench,
    title: "Home Services Agent",
    desc: "Emergency calls, quote requests, technician dispatch, missed-call recovery.",
    key: "home",
  },
]

export interface WorkforceAgent {
  icon: LucideIcon
  name: string
  role: string
  desc: string
  sample: string
  status: "Online" | "Busy" | "Training"
}

export const WORKFORCE: WorkforceAgent[] = [
  {
    icon: Mic,
    name: "MANO",
    role: "Executive Voice Operator",
    desc: "Answers calls, qualifies leads, captures details, and routes conversations with human-like precision.",
    sample: "Live call answered in 0.6s",
    status: "Online",
  },
  {
    icon: Calendar,
    name: "OPS BOOKER",
    role: "Scheduling + Dispatch",
    desc: "Books appointments, reschedules, checks availability, and routes urgent work instantly.",
    sample: "Calendar slot reserved",
    status: "Online",
  },
  {
    icon: MessageSquare,
    name: "SMS BOT",
    role: "Follow-Up Automation",
    desc: "Sends confirmations, reminders, review requests, and abandoned-lead follow-ups.",
    sample: "Reminder dispatched via Twilio",
    status: "Online",
  },
  {
    icon: Mail,
    name: "EMAIL TRIAGE",
    role: "Inbox Intelligence",
    desc: "Classifies emails, drafts replies, flags urgent opportunities, and routes tasks.",
    sample: "Urgent lead flagged",
    status: "Online",
  },
  {
    icon: BarChart3,
    name: "REVENUE INTELLIGENCE",
    role: "Growth + Analytics",
    desc: "Scores leads, detects missed revenue, tracks conversion, and calculates ROI in real time.",
    sample: "$12.4K opportunity recovered",
    status: "Online",
  },
  {
    icon: CarFront,
    name: "AUTO DESK",
    role: "Automotive BDC",
    desc: "Trade-ins, service booking, finance prep, vehicle intake, and CRM pipeline updates.",
    sample: "Trade-in workflow opened",
    status: "Training",
  },
]

export interface FlowNode {
  id: string
  label: string
  icon: LucideIcon
  status: string
  latency: string
  automation: string
  owner: string
  lastRun: string
}

export const FLOW_NODES: FlowNode[] = [
  {
    id: "incoming",
    label: "Incoming Call",
    icon: Phone,
    status: "Active",
    latency: "112ms",
    automation: "Twilio webhook received",
    owner: "MANO",
    lastRun: "00:02 ago",
  },
  {
    id: "mano",
    label: "MANO Voice Agent",
    icon: Mic,
    status: "Active",
    latency: "340ms",
    automation: "ORUS voice engine engaged",
    owner: "MANO",
    lastRun: "00:03 ago",
  },
  {
    id: "qualify",
    label: "Lead Qualification",
    icon: Target,
    status: "Active",
    latency: "210ms",
    automation: "Intent scored, HOT detected",
    owner: "REVENUE INTEL",
    lastRun: "00:05 ago",
  },
  {
    id: "booking",
    label: "Appointment Booking",
    icon: Calendar,
    status: "Active",
    latency: "184ms",
    automation: "Calendar slot reserved",
    owner: "OPS BOOKER",
    lastRun: "00:08 ago",
  },
  {
    id: "crm",
    label: "CRM Update",
    icon: FileText,
    status: "Active",
    latency: "96ms",
    automation: "Pipeline record created",
    owner: "MANO",
    lastRun: "00:14 ago",
  },
  {
    id: "sms",
    label: "SMS Confirmation",
    icon: MessageSquare,
    status: "Active",
    latency: "128ms",
    automation: "Twilio SMS dispatched",
    owner: "SMS BOT",
    lastRun: "00:16 ago",
  },
  {
    id: "review",
    label: "Review Follow-Up",
    icon: Star,
    status: "Queued",
    latency: "150ms",
    automation: "Google review request scheduled",
    owner: "SMS BOT",
    lastRun: "01:02 ago",
  },
  {
    id: "revenue",
    label: "Revenue Dashboard",
    icon: TrendingUp,
    status: "Active",
    latency: "74ms",
    automation: "Metrics updated live",
    owner: "REVENUE INTEL",
    lastRun: "00:01 ago",
  },
]

export interface RecoveryMetric {
  label: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export const RECOVERY_METRICS: RecoveryMetric[] = [
  { label: "Missed Calls Recovered", value: 2842 },
  { label: "Appointments Booked", value: 642 },
  { label: "Revenue Recovered", value: 124540, prefix: "$" },
  { label: "SMS Follow-Ups Sent", value: 8913 },
  { label: "Avg Response Time", value: 0.8, suffix: "s", decimals: 1 },
  { label: "Opportunities Recovered", value: 1248 },
]

export interface DashAgent {
  name: string
  role: string
  status: "Online" | "Busy" | "Training"
  calls: number
  bookings: number
  success: string
  rating: string
}

export const DASH_AGENTS: DashAgent[] = [
  { name: "Alex", role: "Healthcare Agent", status: "Online", calls: 412, bookings: 189, success: "94%", rating: "4.9" },
  {
    name: "Sophia",
    role: "Real Estate Agent",
    status: "Online",
    calls: 338,
    bookings: 142,
    success: "91%",
    rating: "4.8",
  },
  { name: "Mark", role: "Automotive Agent", status: "Busy", calls: 521, bookings: 203, success: "96%", rating: "5.0" },
  { name: "Luna", role: "Legal Intake Agent", status: "Online", calls: 287, bookings: 98, success: "89%", rating: "4.7" },
  {
    name: "MANO",
    role: "Core Voice Operator",
    status: "Online",
    calls: 847,
    bookings: 362,
    success: "96%",
    rating: "5.0",
  },
  {
    name: "OPS Booker",
    role: "Scheduling Agent",
    status: "Training",
    calls: 0,
    bookings: 0,
    success: "—",
    rating: "—",
  },
]

export interface CallCity {
  name: string
  x: number
  y: number
  agent: string
  duration: string
  type: string
}

export const CALL_CITIES: CallCity[] = [
  { name: "Scottsdale", x: 17, y: 44, agent: "Mark", duration: "02:14", type: "Trade-In" },
  { name: "Phoenix", x: 16, y: 48, agent: "MANO", duration: "01:08", type: "Service Booking" },
  { name: "Miami", x: 27, y: 52, agent: "Sophia", duration: "03:41", type: "Buyer Qualification" },
  { name: "New York", x: 30, y: 36, agent: "Alex", duration: "00:52", type: "Appointment" },
  { name: "Los Angeles", x: 9, y: 46, agent: "Luna", duration: "04:02", type: "Case Intake" },
  { name: "London", x: 49, y: 32, agent: "MANO", duration: "01:36", type: "Inbound Sales" },
  { name: "Dubai", x: 60, y: 48, agent: "OPS Booker", duration: "02:55", type: "Reschedule" },
  { name: "Sydney", x: 86, y: 76, agent: "Mark", duration: "00:44", type: "Finance Pre-Screen" },
]

export const DASH_NAV = [
  "Overview",
  "Agents",
  "Conversations",
  "Campaigns",
  "Knowledge Base",
  "Integrations",
  "Analytics",
  "Billing",
  "Settings",
]

export const KNOWLEDGE_SOURCES = [
  "PDFs",
  "SOPs",
  "Websites",
  "CRM Data",
  "Scripts",
  "Pricing Sheets",
  "Automotive Inventory",
  "Service Menus",
]

export interface BdcFeature {
  icon: LucideIcon
  title: string
}

export const BDC_FEATURES: BdcFeature[] = [
  { icon: Calendar, title: "Service Appointment Booking" },
  { icon: RefreshCw, title: "Trade-In Intake" },
  { icon: CarFront, title: "Vehicle Inquiry Handling" },
  { icon: PhoneMissed, title: "Missed Call Recovery" },
  { icon: CreditCard, title: "Finance Pre-Screening" },
  { icon: Workflow, title: "BDC Follow-Up Sequences" },
  { icon: Star, title: "Google Review Requests" },
  { icon: FileText, title: "Pipeline Updates" },
  { icon: ClipboardList, title: "Quote / Estimate Intake" },
  { icon: UserCheck, title: "Sales + Service Routing" },
  { icon: Cloud, title: "DMS / CRM Integration Layer" },
  { icon: Bell, title: "Manager Notifications" },
]

export const BDC_FLOW = [
  "Customer Calls",
  "MANO Answers",
  "Lead Scored",
  "Vehicle Data Captured",
  "Appointment Booked",
  "SMS Sent",
  "CRM Updated",
  "Manager Notified",
]

export interface BdcMetric {
  label: string
  value: number
  prefix?: string
}

export const BDC_METRICS: BdcMetric[] = [
  { label: "Service Calls Answered", value: 1842 },
  { label: "Trade-In Leads Captured", value: 386 },
  { label: "BDC Follow-Ups Sent", value: 5210 },
  { label: "Appointments Booked", value: 642 },
  { label: "Review Requests Sent", value: 1180 },
  { label: "Revenue Recovered", value: 88420, prefix: "$" },
]

export interface Integration {
  name: string
  icon: LucideIcon
}

export const INTEGRATIONS: Integration[] = [
  { name: "Vapi", icon: Mic },
  { name: "Retell AI", icon: Volume2 },
  { name: "ElevenLabs", icon: Volume2 },
  { name: "Twilio", icon: Phone },
  { name: "Telnyx", icon: Phone },
  { name: "Google Calendar", icon: Calendar },
  { name: "Gmail", icon: Mail },
  { name: "Google Business", icon: Building2 },
  { name: "HubSpot", icon: Target },
  { name: "Salesforce", icon: Cloud },
  { name: "ServiceTitan", icon: Wrench },
  { name: "GoHighLevel", icon: TrendingUp },
  { name: "Dealer CRM", icon: Car },
  { name: "Automotive DMS", icon: CarFront },
  { name: "Stripe", icon: CreditCard },
  { name: "Zapier", icon: Zap },
  { name: "Make", icon: Workflow },
  { name: "n8n", icon: Cpu },
]

export const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Voice Agents", href: "#agents" },
  { label: "Industries", href: "#industries" },
  { label: "Automations", href: "#workflow" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Pricing", href: "#pricing" },
  { label: "Company", href: "#footer" },
]

export const HERO_STATS = [
  { value: "< 0.8s", label: "Avg Response Time", color: "grad" },
  { value: "92%", label: "Lead Contact Rate", color: "#22c55e" },
  { value: "3.4x", label: "Booking Increase", color: "#06b6d4" },
  { value: "24/7", label: "Always Answering", color: "#8b5cf6" },
]
