"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "light" | "dark" | "auto"
}

export function Logo({ className, variant = "auto" }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine which variant to show
  const showDark =
    variant === "dark" ||
    (variant === "auto" && mounted && resolvedTheme === "dark")

  return (
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg",
        showDark ? "bg-white" : "bg-foreground",
        className
      )}
    >
      <svg
        className={cn("h-5 w-5", showDark ? "text-gray-900" : "text-background")}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    </div>
  )
}
