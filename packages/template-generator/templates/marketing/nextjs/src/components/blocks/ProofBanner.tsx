"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProofBannerLink {
  label: string
  href: string
  variant: "default" | "outline"
}

interface ProofBannerProps {
  headline?: string
  subtext?: string
  links?: ProofBannerLink[]
  style?: "centered" | "left"
}

export function ProofBanner({
  headline = "Transform how your team works, collaborates, and grows",
  subtext = "Every interaction feeds into a powerful platform that powers personalized experiences, seamless collaboration, and intelligent automation across every touchpoint.",
  links = [
    { label: "Start free trial", href: "/sign-up", variant: "default" },
    { label: "Book a demo", href: "/contact", variant: "outline" },
  ],
  style = "centered",
}: ProofBannerProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "max-w-4xl",
            style === "centered" ? "mx-auto text-center" : ""
          )}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {headline}
          </h2>
          {subtext && (
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {subtext}
            </p>
          )}
          {links && links.length > 0 && (
            <div
              className={cn(
                "flex flex-wrap gap-4",
                style === "centered" ? "justify-center" : ""
              )}
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md transition-colors",
                    link.variant === "default"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border bg-background hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
