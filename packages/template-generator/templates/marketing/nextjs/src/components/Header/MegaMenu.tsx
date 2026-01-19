"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Layout, BarChart3, Shield, Zap, Layers, Target, Rocket, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuItem {
  label: string
  description: string
  href: string
  icon: string
}

interface MenuColumn {
  title: string
  items: MenuItem[]
}

interface MegaMenuProps {
  menu: {
    label: string
    columns: MenuColumn[]
  }
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  layout: Layout,
  barChart: BarChart3,
  shield: Shield,
  zap: Zap,
  layers: Layers,
  target: Target,
  rocket: Rocket,
  settings: Settings,
}

export function MegaMenu({ menu }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={cn(
          "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors",
          isOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {menu.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute left-0 top-full pt-2 transition-all",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="bg-background border border-border rounded-lg shadow-lg p-6 min-w-[480px]">
          <div className={cn(
            "grid gap-8",
            menu.columns.length === 1 ? "grid-cols-1" : "grid-cols-2"
          )}>
            {menu.columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-1">
                  {column.items.map((item) => {
                    const Icon = iconMap[item.icon] || Layout
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted group-hover:bg-background">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              {item.label}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
