"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/50 p-1">
        <div className="h-7 w-7 rounded-full" />
        <div className="h-7 w-7 rounded-full" />
        <div className="h-7 w-7 rounded-full" />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-background/50 p-1">
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
          theme === "light"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
          theme === "dark"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
          theme === "system"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="System theme"
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  )
}
