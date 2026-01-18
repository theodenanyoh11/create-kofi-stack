"use client"

import type React from "react"

import type { FinalCTABlock as FinalCTABlockProps } from "@/payload-types"

import { CTATracker } from "@/components/Analytics"
import { CMSLink } from "@/components/Link"
import { Media } from "@/components/Media"
import { cn } from "@/utilities/ui"

export const FinalCTABlock: React.FC<FinalCTABlockProps> = ({
	headline,
	subheading,
	links,
	backgroundImage,
	style = "dark",
}) => {
	const isDark = style === "dark"
	const isGradient = style === "gradient"

	return (
		<section className="relative overflow-hidden">
			{/* Background */}
			<div
				className={cn(
					"absolute inset-0",
					isDark && "bg-primary",
					isGradient && "bg-gradient-to-br from-primary via-primary/90 to-primary/80",
					!isDark && !isGradient && "bg-muted",
				)}
			>
				{/* Background Image */}
				{backgroundImage && typeof backgroundImage === "object" && (
					<>
						<Media
							resource={backgroundImage}
							imgClassName="w-full h-full object-cover"
							fill
							size="100vw"
						/>
						{/* Overlay for readability */}
						<div
							className={cn(
								"absolute inset-0",
								isDark || isGradient ? "bg-primary/80" : "bg-background/80",
							)}
						/>
					</>
				)}

				{/* Decorative elements */}
				<div className="absolute inset-0 opacity-10">
					<div
						className="w-full h-full"
						style={{
							backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)
              `,
						}}
					/>
				</div>
			</div>

			{/* Content */}
			<div className="container relative z-10 py-20 md:py-28 lg:py-32">
				<div className="max-w-3xl">
					{headline && (
						<h2
							className={cn(
								"text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight",
								isDark || isGradient ? "text-white" : "text-foreground",
							)}
						>
							{headline}
						</h2>
					)}

					{subheading && (
						<p
							className={cn(
								"text-lg md:text-xl mb-8 max-w-2xl",
								isDark || isGradient ? "text-white/80" : "text-muted-foreground",
							)}
						>
							{subheading}
						</p>
					)}

					{Array.isArray(links) && links.length > 0 && (
						<div className="flex flex-wrap gap-4">
							{links.map(({ link }, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: CMS links don't have stable IDs
								<CTATracker key={i} location="final_cta" variant={link?.label || `cta_${i}`}>
									<CMSLink
										{...link}
										size="lg"
										appearance={link?.appearance}
										className={cn(
											(isDark || isGradient) &&
												i === 0 &&
												"bg-white text-primary hover:bg-white/90 border-white",
											(isDark || isGradient) &&
												i !== 0 &&
												"bg-white/10 border-white text-white hover:bg-white/20",
										)}
									/>
								</CTATracker>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
