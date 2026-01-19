"use client"

import {
  BarChart3,
  Globe,
  Layers,
  type LucideIcon,
  Rocket,
  Settings,
  Shield,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Feature {
  size?: "small" | "tall"
  style?: "default" | "primary" | "accent" | "gradient"
  icon?: string
  stat?: string
  title: string
  description: string
}

interface BentoFeaturesProps {
  heading?: string
  subheading?: string
  features?: Feature[]
}

const iconMap: Record<string, LucideIcon> = {
  rocket: Rocket,
  zap: Zap,
  layers: Layers,
  shield: Shield,
  globe: Globe,
  settings: Settings,
  barChart: BarChart3,
}

const gridPositions = [
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
]

const styleClasses: Record<string, { bg: string; text: string; icon: string; statText: string }> = {
  default: {
    bg: "bg-card border border-border/50 hover:border-border",
    text: "text-foreground",
    icon: "bg-primary/10 text-primary",
    statText: "text-primary",
  },
  primary: {
    bg: "bg-primary hover:bg-primary/95",
    text: "text-primary-foreground",
    icon: "bg-white/20 text-white",
    statText: "text-white",
  },
  accent: {
    bg: "bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-500/95 hover:to-teal-600/95",
    text: "text-white",
    icon: "bg-white/20 text-white",
    statText: "text-white",
  },
  gradient: {
    bg: "bg-gradient-to-br from-primary via-primary/90 to-secondary hover:from-primary/95",
    text: "text-white",
    icon: "bg-white/20 text-white",
    statText: "text-white",
  },
}

const defaultFeatures: Feature[] = [
  {
    size: "small",
    style: "gradient",
    icon: "zap",
    stat: "5x",
    title: "Faster onboarding",
    description: "Get your team up and running in hours, not weeks.",
  },
  {
    size: "small",
    style: "accent",
    icon: "rocket",
    title: "Quick setup",
    description: "Configure your workspace, invite your team, and start collaborating.",
  },
  {
    size: "small",
    style: "default",
    icon: "layers",
    title: "Powerful integrations",
    description: "Connect with 100+ tools you already use.",
  },
  {
    size: "tall",
    style: "primary",
    icon: "shield",
    title: "Enterprise security",
    description: "SOC 2 compliant with end-to-end encryption and complete audit trails for peace of mind.",
  },
  {
    size: "small",
    style: "default",
    icon: "globe",
    stat: "99.9%",
    title: "Uptime",
    description: "Reliable infrastructure you can count on.",
  },
  {
    size: "small",
    style: "default",
    icon: "globe",
    title: "Global scale",
    description: "Multi-region with custom domains.",
  },
  {
    size: "small",
    style: "default",
    icon: "settings",
    title: "Smart automation",
    description: "Automate repetitive tasks and workflows.",
  },
  {
    size: "small",
    style: "default",
    icon: "layers",
    title: "Flexible workflows",
    description: "Build custom processes for any use case.",
  },
]

export function BentoFeatures({
  heading = "Discover what SaaSify can do",
  subheading = "Everything you need to work smarter and scale faster",
  features = defaultFeatures,
}: BentoFeaturesProps) {
  const displayFeatures = features.length > 0 ? features : defaultFeatures

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(heading || subheading) && (
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            {heading && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-xl md:text-2xl text-muted-foreground">{subheading}</p>
            )}
          </div>
        )}

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 md:grid-rows-[repeat(3,minmax(140px,160px))]">
          {displayFeatures.map((feature, index) => {
            const style = feature.style || "default"
            const iconKey = feature.icon
            const Icon = iconKey && iconKey in iconMap ? iconMap[iconKey] : null
            const styleConfig = styleClasses[style] || styleClasses.default
            const gridPosition = gridPositions[index] || "md:col-span-1 md:row-span-1"
            const isLarge =
              gridPosition.includes("col-span-2") && gridPosition.includes("row-span-2")

            return (
              <div
                key={feature.title}
                className={cn(
                  "relative rounded-2xl overflow-hidden p-5 md:p-6 flex flex-col transition-all duration-300 group",
                  "hover:shadow-lg hover:-translate-y-0.5",
                  "col-span-1 row-span-1",
                  gridPosition,
                  styleConfig.bg
                )}
              >
                {/* Decorative elements */}
                {!isLarge && feature.size === "tall" && (
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 blur-xl" />
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  {Icon && (
                    <div
                      className={cn(
                        "w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center mb-auto",
                        styleConfig.icon
                      )}
                    >
                      <Icon className="w-5 h-5 md:w-5 md:h-5" />
                    </div>
                  )}

                  {/* Spacer */}
                  <div className="flex-1 min-h-2" />

                  {/* Stat */}
                  {feature.stat && (
                    <div
                      className={cn(
                        "font-bold mb-0.5 leading-none",
                        isLarge ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl",
                        styleConfig.statText
                      )}
                    >
                      {feature.stat}
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    className={cn(
                      "font-semibold mb-1",
                      isLarge ? "text-lg md:text-xl" : "text-base md:text-lg",
                      styleConfig.text
                    )}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={cn(
                      "leading-snug",
                      isLarge ? "text-sm md:text-base" : "text-xs md:text-sm",
                      style === "default" ? "text-muted-foreground" : "text-white/80"
                    )}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
