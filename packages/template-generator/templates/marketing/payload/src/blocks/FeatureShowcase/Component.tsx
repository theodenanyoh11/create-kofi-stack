import { CheckCircle2 } from "lucide-react"
import type React from "react"

import type { FeatureShowcaseBlock as FeatureShowcaseBlockProps } from "@/payload-types"

import { CMSLink } from "@/components/Link"
import { Media } from "@/components/Media"
import RichText from "@/components/RichText"
import { cn } from "@/utilities/ui"

export const FeatureShowcaseBlock: React.FC<FeatureShowcaseBlockProps> = ({
	label,
	headline,
	description,
	link,
	media,
	imagePosition = "right",
	features,
}) => {
	const isImageLeft = imagePosition === "left"

	return (
		<section className="py-16 md:py-24">
			<div className="container">
				<div
					className={cn(
						"grid gap-12 lg:gap-16 items-center",
						"lg:grid-cols-2",
						isImageLeft && "lg:[direction:rtl]",
					)}
				>
					{/* Content Side */}
					<div className={cn("lg:[direction:ltr]", "max-w-xl")}>
						{label && (
							<span className="inline-block text-sm font-medium text-secondary mb-4 tracking-wide">
								{label}
							</span>
						)}

						{headline && (
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
								{headline}
							</h2>
						)}

						{description && (
							<div className="text-lg text-muted-foreground mb-6">
								<RichText data={description} enableGutter={false} />
							</div>
						)}

						{/* Feature Bullets */}
						{Array.isArray(features) && features.length > 0 && (
							<ul className="space-y-3 mb-8">
								{features.map((feature, index) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: CMS items don't have stable IDs
									<li key={index} className="flex items-start gap-3">
										<CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
										<span className="text-muted-foreground">{feature.text}</span>
									</li>
								))}
							</ul>
						)}

						{link?.label && <CMSLink {...link} size="lg" />}
					</div>

					{/* Image Side */}
					<div className={cn("lg:[direction:ltr]", "relative")}>
						{media && typeof media === "object" ? (
							<div className="relative rounded-xl overflow-hidden bg-muted">
								<Media
									resource={media}
									imgClassName="w-full h-auto object-cover"
									size="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
								/>
							</div>
						) : (
							/* Placeholder when no image */
							<div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-muted to-accent aspect-[4/3] flex items-center justify-center">
								<div className="text-center p-8">
									<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
										<svg
											className="w-8 h-8 text-primary"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={1.5}
												d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
											/>
										</svg>
									</div>
									<p className="text-sm text-muted-foreground">Feature image placeholder</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
