"use client"

import { Media } from "@/components/Media"
import { cn } from "@/utilities/ui"
import type React from "react"

import type { LogoBannerBlock as LogoBannerBlockProps } from "@/payload-types"

// Placeholder logos for initial setup (before real logos are added)
const placeholderLogos = [
	{ name: "TechCorp", initials: "TC" },
	{ name: "StartupX", initials: "SX" },
	{ name: "GrowthCo", initials: "GC" },
	{ name: "InnovateLab", initials: "IL" },
	{ name: "ScaleUp", initials: "SU" },
	{ name: "VenturePro", initials: "VP" },
]

export const LogoBannerBlock: React.FC<LogoBannerBlockProps> = ({
	heading,
	logos,
	style = "scroll",
}) => {
	const hasLogos = Array.isArray(logos) && logos.length > 0
	const displayLogos = hasLogos ? logos : placeholderLogos

	return (
		<section className="py-12 md:py-16 border-y border-border/50">
			<div className="container">
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
								// biome-ignore lint/suspicious/noArrayIndexKey: Logos are duplicated for animation, index is required
								<LogoItem key={index} logo={logo} hasLogos={hasLogos} />
							))}
						</div>
					</div>
				) : (
					<div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
						{displayLogos.map((logo, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: Logo order is static
							<LogoItem key={index} logo={logo} hasLogos={hasLogos} />
						))}
					</div>
				)}
			</div>
		</section>
	)
}

interface LogoItemProps {
	logo: {
		name?: string | null
		initials?: string
		logo?: unknown
	}
	hasLogos: boolean
}

const LogoItem: React.FC<LogoItemProps> = ({ logo, hasLogos }) => {
	const hasImage = hasLogos && logo.logo && typeof logo.logo === "object"

	return (
		<div
			className={cn(
				"logo-item flex items-center justify-center px-6 md:px-8",
				"grayscale hover:grayscale-0 transition-all duration-300",
			)}
		>
			{hasImage ? (
				<Media
					resource={logo.logo as Parameters<typeof Media>[0]["resource"]}
					imgClassName="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
				/>
			) : (
				<div className="flex items-center gap-2">
					<span className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-bold text-foreground">
						{"initials" in logo ? logo.initials : logo.name?.slice(0, 2).toUpperCase()}
					</span>
					<span className="text-sm font-medium text-muted-foreground hidden md:block">
						{logo.name}
					</span>
				</div>
			)}
		</div>
	)
}
