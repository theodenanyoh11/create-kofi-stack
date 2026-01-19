"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  navLinks: { label: string; href: string }[]
  ctaLinks: { label: string; href: string; variant: "default" | "ghost" }[]
}

export function MobileMenu({ navLinks, ctaLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="p-2 text-muted-foreground hover:text-foreground"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background">
          <nav className="overflow-y-auto max-h-[calc(100vh-4rem)]">
            {/* Navigation links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center px-4 py-3 text-sm font-medium border-b border-border hover:bg-muted"
                onClick={handleClose}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA links */}
            <div className="p-4 space-y-2">
              {ctaLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    link.variant === "default"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border hover:bg-muted"
                  )}
                  onClick={handleClose}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
