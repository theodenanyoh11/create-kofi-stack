"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface FinalCTALink {
  label: string
  href: string
  variant: "default" | "outline"
}

interface FinalCTAProps {
  headline?: string
  subheading?: string
  links?: FinalCTALink[]
  style?: "dark" | "light" | "gradient"
}

export function FinalCTA({
  headline = "Ready to transform how your team works?",
  subheading = "Join thousands of teams who chose the smarter way to work. Start free, upgrade as you grow.",
  links = [
    { label: "Start free trial", href: "/sign-up", variant: "outline" },
    { label: "Book a demo", href: "/contact", variant: "default" },
  ],
  style = "dark",
}: FinalCTAProps) {
  const bgClasses = {
    dark: "bg-primary text-primary-foreground",
    light: "bg-muted text-foreground",
    gradient: "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
  }

  const buttonClasses = {
    dark: {
      default: "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
      outline: "border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
    },
    light: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-border hover:bg-background",
    },
    gradient: {
      default: "bg-background text-foreground hover:bg-background/90",
      outline: "border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
    },
  }

  return (
    <section className={cn("py-16 md:py-24", bgClasses[style])}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {headline}
          </h2>
          {subheading && (
            <p
              className={cn(
                "text-lg md:text-xl mb-8",
                style === "dark"
                  ? "text-primary-foreground/80"
                  : style === "gradient"
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
              )}
            >
              {subheading}
            </p>
          )}

          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md transition-colors",
                    buttonClasses[style][link.variant]
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
