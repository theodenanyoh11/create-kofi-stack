"use client"

import Link from "next/link"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingFeature {
  feature: string
  included: boolean
}

interface PricingPlan {
  name: string
  price: string
  description: string
  featured?: boolean
  features: PricingFeature[]
  link: {
    label: string
    href: string
    variant: "default" | "outline"
  }
}

interface PricingTableProps {
  heading?: string
  subheading?: string
  plans?: PricingPlan[]
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0/mo",
    description: "Perfect for trying SaaSify.",
    features: [
      { feature: "Up to 3 users", included: true },
      { feature: "Basic features", included: true },
      { feature: "Community support", included: true },
    ],
    link: { label: "Get started free", href: "/sign-up", variant: "outline" },
  },
  {
    name: "Pro",
    price: "$29/mo",
    description: "For small teams getting started.",
    featured: true,
    features: [
      { feature: "Up to 10 users", included: true },
      { feature: "Advanced features", included: true },
      { feature: "Integrations", included: true },
      { feature: "Priority support", included: true },
    ],
    link: { label: "Get Pro", href: "/sign-up", variant: "default" },
  },
  {
    name: "Business",
    price: "$99/mo",
    description: "For teams ready to scale.",
    features: [
      { feature: "Unlimited users", included: true },
      { feature: "All features", included: true },
      { feature: "API access", included: true },
      { feature: "Dedicated support", included: true },
    ],
    link: { label: "Get Business", href: "/sign-up", variant: "outline" },
  },
]

export function PricingTable({
  heading = "Simple, transparent pricing",
  subheading = "Start free, upgrade as your team grows. No hidden fees.",
  plans = defaultPlans,
}: PricingTableProps) {
  const displayPlans = plans.length > 0 ? plans : defaultPlans

  return (
    <section className="py-16 md:py-24">
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

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {displayPlans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl p-6 md:p-8 flex flex-col",
                plan.featured
                  ? "bg-primary text-primary-foreground border-2 border-primary"
                  : "bg-card border border-border"
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium rounded-full bg-background text-foreground">
                  Most Popular
                </span>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3
                  className={cn(
                    "text-lg font-semibold mb-2",
                    plan.featured ? "text-primary-foreground" : "text-foreground"
                  )}
                >
                  {plan.name}
                </h3>
                <div
                  className={cn(
                    "text-4xl font-bold mb-2",
                    plan.featured ? "text-primary-foreground" : "text-foreground"
                  )}
                >
                  {plan.price}
                </div>
                <p
                  className={cn(
                    "text-sm",
                    plan.featured ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}
                >
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature.feature} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check
                        className={cn(
                          "h-4 w-4",
                          plan.featured ? "text-primary-foreground" : "text-primary"
                        )}
                      />
                    ) : (
                      <X
                        className={cn(
                          "h-4 w-4",
                          plan.featured ? "text-primary-foreground/50" : "text-muted-foreground"
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        plan.featured
                          ? feature.included
                            ? "text-primary-foreground"
                            : "text-primary-foreground/50"
                          : feature.included
                            ? "text-foreground"
                            : "text-muted-foreground"
                      )}
                    >
                      {feature.feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.link.href}
                className={cn(
                  "w-full inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md transition-colors",
                  plan.featured
                    ? "bg-background text-foreground hover:bg-background/90"
                    : plan.link.variant === "default"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border bg-background hover:bg-muted"
                )}
              >
                {plan.link.label}
              </Link>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-8">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View full comparison
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
