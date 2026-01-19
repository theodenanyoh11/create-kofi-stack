"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface MockupState {
  id: number
  label: string
  sidebarActive: string
  previewTitle: string
  previewDescription: string
  previewCategory: string
  previewStatus: "draft" | "published" | "featured"
  previewUrl?: string
}

const mockupStates: MockupState[] = [
  {
    id: 1,
    label: "Setup & styling",
    sidebarActive: "templates",
    previewTitle: "Atlas Directory",
    previewDescription: "Apply your brand, typography, and layout in minutes.",
    previewCategory: "Design systems",
    previewStatus: "draft",
    previewUrl: "atlas.directory/home",
  },
  {
    id: 2,
    label: "Plans & pricing",
    sidebarActive: "billing",
    previewTitle: "Pro Listing Plan",
    previewDescription: "Recurring billing, featured placements, and add-ons configured.",
    previewCategory: "Monetization",
    previewStatus: "draft",
    previewUrl: "atlas.directory/billing",
  },
  {
    id: 3,
    label: "SEO & publishing",
    sidebarActive: "seo",
    previewTitle: "Atlas Directory",
    previewDescription: "Schema, sitemap, and custom domain are ready to publish.",
    previewCategory: "SEO & domains",
    previewStatus: "published",
    previewUrl: "atlas.directory/launch",
  },
  {
    id: 4,
    label: "Payouts live",
    sidebarActive: "overview",
    previewTitle: "Atlas Directory",
    previewDescription: "Subscribers active, payouts scheduled to Stripe, featured slots sold.",
    previewCategory: "Revenue",
    previewStatus: "featured",
    previewUrl: "atlas.directory/analytics",
  },
]

interface SidebarItemProps {
  icon: string
  label: string
  active?: boolean
  badge?: number
}

function SidebarItem({ icon, label, active, badge }: SidebarItemProps) {
  return (
    <div className={cn("sidebar-item", active && "sidebar-item--active")}>
      <span className="sidebar-icon">{icon}</span>
      <span className="sidebar-label">{label}</span>
      {badge && <span className="sidebar-badge">{badge}</span>}
    </div>
  )
}

export function AnimatedMockup() {
  const [currentState, setCurrentState] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentState((prev) => (prev + 1) % mockupStates.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused])

  const state = mockupStates[currentState]

  return (
    <div
      className="mockup-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Browser Chrome */}
      <div className="mockup-chrome">
        <div className="mockup-chrome-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="mockup-chrome-title">SaaSify</div>
        <div className="mockup-chrome-actions" />
      </div>

      {/* App Content */}
      <div className="mockup-content">
        {/* Sidebar */}
        <div className="mockup-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <span className="logo-icon">D</span>
              <span className="logo-text">My Directory</span>
            </div>
          </div>
          <nav className="sidebar-nav">
            <SidebarItem icon="📊" label="Overview" active={state.sidebarActive === "overview"} />
            <SidebarItem icon="🖼️" label="Templates" active={state.sidebarActive === "templates"} />
            <SidebarItem
              icon="📋"
              label="Listings"
              active={state.sidebarActive === "listings"}
              badge={24}
            />
            <SidebarItem
              icon="💳"
              label="Plans & Billing"
              active={state.sidebarActive === "billing"}
            />
            <SidebarItem
              icon="⚡"
              label="Automations"
              active={state.sidebarActive === "automations"}
            />
            <SidebarItem icon="🔎" label="SEO" active={state.sidebarActive === "seo"} />
            <SidebarItem icon="⚙️" label="Settings" active={state.sidebarActive === "settings"} />
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="mockup-main">
          {/* Header */}
          <div className="main-header">
            <div className="header-title">
              <h2>{state.label}</h2>
              <span className="header-breadcrumb">SaaSify / {state.previewTitle}</span>
            </div>
            <div className="header-actions">
              <button
                type="button"
                className={cn(
                  "action-btn",
                  state.previewStatus === "published" && "action-btn--success",
                  state.previewStatus === "featured" && "action-btn--featured"
                )}
              >
                {state.previewStatus === "draft" && "Save Draft"}
                {state.previewStatus === "published" && "✓ Published"}
                {state.previewStatus === "featured" && "⭐ Featured"}
              </button>
            </div>
          </div>

          {/* Split View: Editor + Preview */}
          <div className="main-split">
            {/* Editor Panel */}
            <div className="editor-panel">
              <div className="editor-section">
                <span className="editor-label">Listing Name</span>
                <div className="editor-input">
                  <span className="input-text">{state.previewTitle}</span>
                  <span className="input-cursor" />
                </div>
              </div>
              <div className="editor-section">
                <span className="editor-label">Category</span>
                <div className="editor-select">
                  <span>{state.previewCategory}</span>
                  <span className="select-arrow">▼</span>
                </div>
              </div>
              <div className="editor-section">
                <span className="editor-label">Description</span>
                <div className="editor-textarea">
                  <span className={cn("textarea-text", state.id >= 2 && "textarea-text--complete")}>
                    {state.previewDescription}
                  </span>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="preview-panel">
              <div className="preview-header">
                <span className="preview-label">Live Preview</span>
                <span className="preview-url">{state.previewUrl ?? "saasify.app/live"}</span>
              </div>
              <div className="preview-card">
                {state.previewStatus === "featured" && (
                  <div className="preview-badge">⭐ Featured</div>
                )}
                <div className="preview-image">
                  <div className="preview-image-placeholder">
                    <span>🏢</span>
                  </div>
                </div>
                <div className="preview-content">
                  <span className="preview-category-tag">{state.previewCategory}</span>
                  <h3 className="preview-title">{state.previewTitle}</h3>
                  <p className="preview-description">{state.previewDescription}</p>
                  <div className="preview-meta">
                    <span className="meta-rating">★★★★★</span>
                    <span className="meta-reviews">24 reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* State Indicator */}
      <div className="mockup-indicators">
        {mockupStates.map((s, i) => (
          <button
            type="button"
            key={s.id}
            onClick={() => setCurrentState(i)}
            className={cn("indicator", i === currentState && "indicator--active")}
          >
            <span className="indicator-dot" />
            <span className="indicator-label">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
