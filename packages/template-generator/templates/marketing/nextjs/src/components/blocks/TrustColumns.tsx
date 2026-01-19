"use client"

import {
  Award,
  Cloud,
  Database,
  Globe,
  Lock,
  Plug,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TrustItem {
  icon: string
  text: string
}

interface TrustColumn {
  label: string
  heading: string
  description: string
  items: TrustItem[]
}

interface TrustColumnsProps {
  columns?: TrustColumn[]
}

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  plug: Plug,
  database: Database,
  cloud: Cloud,
  shield: Shield,
  lock: Lock,
  award: Award,
  globe: Globe,
}

const defaultColumns: TrustColumn[] = [
  {
    label: "Integrations",
    heading: "Connect anywhere",
    description:
      "Plug in and get started immediately with pre-built connectors for every major platform.",
    items: [
      { icon: "zap", text: "Go live in minutes" },
      { icon: "plug", text: "Pre-built connectors" },
      { icon: "database", text: "Complete data sync" },
      { icon: "cloud", text: "Cloud-native infrastructure" },
    ],
  },
  {
    label: "Security & Compliance",
    heading: "Enterprise-level security",
    description:
      "Keep your data safe with encryption, granular access control, and compliance-ready infrastructure.",
    items: [
      { icon: "shield", text: "SOC 2 Type II certified" },
      { icon: "lock", text: "End-to-end encryption" },
      { icon: "award", text: "Complete audit trails" },
      { icon: "globe", text: "GDPR compliant" },
    ],
  },
]

export function TrustColumns({ columns = defaultColumns }: TrustColumnsProps) {
  const displayColumns = columns.length > 0 ? columns : defaultColumns

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {displayColumns.map((column) => (
            <div key={column.label}>
              <span className="inline-block text-sm font-medium text-primary mb-4">
                {column.label}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                {column.heading}
              </h2>
              <p className="text-muted-foreground mb-8">
                {column.description}
              </p>

              <ul className="space-y-4">
                {column.items.map((item) => {
                  const Icon = iconMap[item.icon] || Shield
                  return (
                    <li key={item.text} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">
                        {item.text}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
