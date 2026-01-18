import type React from "react"

import type { ProofBannerBlock as ProofBannerBlockProps } from "@/payload-types"

import { CMSLink } from "@/components/Link"
import { cn } from "@/utilities/ui"

export const ProofBannerBlock: React.FC<ProofBannerBlockProps> = ({
	style = "centered",
	headline,
	subtext,
	links,
}) => {
	const isWithBackground = style === "withBackground"
	const isMinimal = style === "minimal"

	return (
		<section
			className={cn(
				"py-16 md:py-24",
				isWithBackground && "bg-primary text-primary-foreground",
				isMinimal && "py-12",
			)}
		>
			<div className="container">
				<div className="text-center max-w-4xl mx-auto">
					{headline && (
						<h2
							className={cn(
								"font-bold mb-4",
								isMinimal ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl lg:text-5xl",
							)}
						>
							{headline}
						</h2>
					)}

					{subtext && (
						<p
							className={cn(
								"text-lg md:text-xl mb-8",
								isWithBackground ? "text-primary-foreground/80" : "text-muted-foreground",
							)}
						>
							{subtext}
						</p>
					)}

					{Array.isArray(links) && links.length > 0 && (
						<div className="flex flex-wrap gap-4 justify-center">
							{links.map(({ link }, i) => (
								<CMSLink
									key={i}
									{...link}
									size="lg"
									appearance={isWithBackground && i === 0 ? "outline" : link.appearance}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
