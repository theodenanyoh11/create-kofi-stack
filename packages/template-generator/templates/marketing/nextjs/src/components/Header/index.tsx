"use client"

import Link from "next/link"
import { Logo } from "@/components/Logo"
import { MobileMenu } from "./MobileMenu"
import { MegaMenu } from "./MegaMenu"
import { cn } from "@/lib/utils"

// Features mega menu configuration
const featuresMenu = {
  label: "Features",
  columns: [
    {
      title: "Platform",
      items: [
        { label: "Dashboard", description: "Your command center", href: "/features/dashboard", icon: "layout" },
        { label: "Analytics", description: "Real-time insights", href: "/features/analytics", icon: "barChart" },
        { label: "Integrations", description: "Connect your tools", href: "/features/integrations", icon: "layers" },
      ],
    },
    {
      title: "Capabilities",
      items: [
        { label: "Automation", description: "Eliminate busywork", href: "/features/automation", icon: "zap" },
        { label: "Workflows", description: "Custom processes", href: "/features/workflows", icon: "settings" },
        { label: "Security", description: "Enterprise-grade", href: "/features/security", icon: "shield" },
      ],
    },
  ],
}

// Solutions mega menu configuration
const solutionsMenu = {
  label: "Solutions",
  columns: [
    {
      title: "By Team",
      items: [
        { label: "Sales Teams", description: "Close more deals", href: "/use-cases/sales", icon: "target" },
        { label: "Marketing Teams", description: "Launch campaigns", href: "/use-cases/marketing", icon: "rocket" },
        { label: "Product Teams", description: "Ship faster", href: "/use-cases/product", icon: "layers" },
        { label: "Operations", description: "Run efficiently", href: "/use-cases/operations", icon: "settings" },
      ],
    },
  ],
}

// Simple navigation links
const navLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
]

// For mobile menu - flat list of all links
const mobileNavLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
]

const ctaLinks = [
  { label: "Sign In", href: "/sign-in", variant: "ghost" as const },
  { label: "Get Started", href: "/pricing", variant: "default" as const },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        {/* Left section: Logo + Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-semibold hidden sm:inline">SaaSify</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <MegaMenu menu={featuresMenu} />
            <MegaMenu menu={solutionsMenu} />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right section: CTAs */}
        <div className="flex items-center gap-3">
          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {ctaLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  link.variant === "default"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile: Primary CTA + Hamburger */}
          <Link
            href="/pricing"
            className="lg:hidden px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Get Started
          </Link>

          <MobileMenu
            navLinks={mobileNavLinks}
            ctaLinks={ctaLinks}
          />
        </div>
      </div>
    </header>
  )
}
