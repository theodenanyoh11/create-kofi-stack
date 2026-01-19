"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Tab {
  name: string
  stat: string
  statLabel: string
  description: string
  link?: {
    label: string
    href: string
  }
}

interface IndustryTabsProps {
  heading?: string
  subheading?: string
  tabs?: Tab[]
}

const defaultTabs: Tab[] = [
  {
    name: "Sales Teams",
    stat: "40%",
    statLabel: "Faster deal cycles with smart pipeline tools",
    description:
      "Close deals faster with intelligent pipeline management, automated follow-ups, and real-time insights that help your team hit quota every quarter.",
    link: { label: "Solutions for sales", href: "/use-cases/sales" },
  },
  {
    name: "Marketing Teams",
    stat: "3x",
    statLabel: "Campaign velocity with streamlined workflows",
    description:
      "Launch campaigns that convert with collaborative planning, asset management, and performance analytics all in one place.",
    link: { label: "Solutions for marketing", href: "/use-cases/marketing" },
  },
  {
    name: "Product Teams",
    stat: "50%",
    statLabel: "Faster shipping with better prioritization",
    description:
      "Ship features users love with roadmap planning, feedback collection, and release management that keeps everyone aligned.",
    link: { label: "Solutions for product", href: "/use-cases/product" },
  },
  {
    name: "Operations",
    stat: "60%",
    statLabel: "Time saved with process automation",
    description:
      "Scale your operations without the chaos. Automate processes, manage resources, and get visibility across your entire organization.",
    link: { label: "Solutions for ops", href: "/use-cases/operations" },
  },
]

export function IndustryTabs({
  heading = "Solutions that deliver real results",
  subheading = "Whether you're in sales, marketing, or product, SaaSify adapts to how your team works.",
  tabs = defaultTabs,
}: IndustryTabsProps) {
  const [activeTab, setActiveTab] = useState(0)
  const displayTabs = tabs.length > 0 ? tabs : defaultTabs
  const activeContent = displayTabs[activeTab]

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(heading || subheading) && (
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-lg md:text-xl text-muted-foreground">
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {displayTabs.map((tab, index) => (
            <button
              key={tab.name}
              type="button"
              onClick={() => setActiveTab(index)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                activeTab === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border hover:bg-muted"
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Stats side */}
          <div className="text-center md:text-left">
            <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-primary mb-2">
              {activeContent.stat}
            </div>
            <p className="text-xl md:text-2xl font-medium text-foreground">
              {activeContent.statLabel}
            </p>
          </div>

          {/* Description side */}
          <div>
            <p className="text-lg text-muted-foreground mb-6">
              {activeContent.description}
            </p>
            {activeContent.link && (
              <Link
                href={activeContent.link.href}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {activeContent.link.label}
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
