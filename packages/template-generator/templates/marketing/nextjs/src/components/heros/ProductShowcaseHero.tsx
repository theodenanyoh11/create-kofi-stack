"use client"

import Link from "next/link"
import Image from "next/image"
import { AnimatedMockup } from "./AnimatedMockup"
import { cn } from "@/lib/utils"

interface HeroLink {
  label: string
  href: string
  variant: "default" | "outline"
}

interface ProductShowcaseHeroProps {
  headline: string
  description: string
  links?: HeroLink[]
}

export function ProductShowcaseHero({
  headline = "The modern platform for growing teams",
  description = "Streamline workflows, boost productivity, and scale your business with one powerful platform.",
  links = [
    { label: "Start free trial", href: "/sign-up", variant: "default" },
    { label: "Watch demo", href: "/demo", variant: "outline" },
  ],
}: ProductShowcaseHeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Content - Left Aligned */}
      <div className="container mx-auto px-4 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {headline}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            {description}
          </p>
          {links && links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
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

      {/* Product Mockup Section */}
      <div className="container mx-auto px-4">
        <div className="hero-showcase">
          {/* Background Image */}
          <div className="hero-bg-image">
            <Image
              src="/media/hero-bg.png"
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority
              quality={75}
            />
          </div>

          {/* Mockup - centered within background */}
          <div className="hero-mockup-centered">
            <AnimatedMockup />
          </div>
        </div>
      </div>
    </div>
  )
}
