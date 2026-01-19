"use client"

import { cn } from "@/lib/utils"

interface Logo {
  name: string
  initials?: string
}

interface LogoBannerProps {
  heading?: string
  logos?: Logo[]
  style?: "scroll" | "grid"
}

const defaultLogos: Logo[] = [
  { name: "TechFlow Inc", initials: "TF" },
  { name: "Acme Corp", initials: "AC" },
  { name: "Evergreen HQ", initials: "EH" },
  { name: "Atlas Network", initials: "AN" },
  { name: "Beacon Digital", initials: "BD" },
  { name: "Cascade Systems", initials: "CS" },
]

function LogoItem({ logo }: { logo: Logo }) {
  return (
    <div
      className={cn(
        "logo-item flex items-center justify-center px-6 md:px-8",
        "grayscale hover:grayscale-0 transition-all duration-300"
      )}
    >
      <div className="flex items-center gap-2">
        <span className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-bold text-foreground">
          {logo.initials || logo.name.slice(0, 2).toUpperCase()}
        </span>
        <span className="text-sm font-medium text-muted-foreground hidden md:block">
          {logo.name}
        </span>
      </div>
    </div>
  )
}

export function LogoBanner({
  heading = "Trusted by fast-growing companies everywhere",
  logos = defaultLogos,
  style = "scroll",
}: LogoBannerProps) {
  const displayLogos = logos.length > 0 ? logos : defaultLogos

  return (
    <section className="py-12 md:py-16 border-y border-border/50">
      <div className="container mx-auto px-4">
        {heading && (
          <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider">
            {heading}
          </p>
        )}

        {style === "scroll" ? (
          <div className="logo-scroll-container">
            <div className="logo-scroll-track">
              {/* Double the logos for seamless loop */}
              {[...displayLogos, ...displayLogos].map((logo, index) => (
                <LogoItem key={`${logo.name}-${index}`} logo={logo} />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            {displayLogos.map((logo) => (
              <LogoItem key={logo.name} logo={logo} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
