"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureShowcaseProps {
  label?: string
  headline: string
  description: string
  features?: { text: string }[]
  link?: {
    label: string
    href: string
  }
  imagePosition?: "left" | "right"
}

export function FeatureShowcase({
  label,
  headline,
  description,
  features = [],
  link,
  imagePosition = "right",
}: FeatureShowcaseProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "grid md:grid-cols-2 gap-12 lg:gap-16 items-center",
            imagePosition === "left" && "md:grid-flow-dense"
          )}
        >
          {/* Content */}
          <div className={cn(imagePosition === "left" && "md:col-start-2")}>
            {label && (
              <span className="inline-block text-sm font-medium text-primary mb-4">
                {label}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {headline}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {description}
            </p>

            {features.length > 0 && (
              <ul className="space-y-3 mb-8">
                {features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {link && (
              <Link
                href={link.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                {link.label}
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>

          {/* Image Placeholder */}
          <div
            className={cn(
              "relative aspect-[4/3] rounded-2xl bg-muted overflow-hidden",
              imagePosition === "left" && "md:col-start-1 md:row-start-1"
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">
                  Feature illustration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
