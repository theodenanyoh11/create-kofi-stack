import type React from "react"

import type { HowItWorksBlock as HowItWorksBlockProps } from "@/payload-types"

import { Media } from "@/components/Media"
import RichText from "@/components/RichText"

export const HowItWorksBlock: React.FC<HowItWorksBlockProps> = ({ heading, subheading, steps }) => {
	return (
		<section className="py-20 md:py-28 bg-muted/30">
			<div className="container">
				{(heading || subheading) && (
					<div className="text-center mb-16 max-w-3xl mx-auto">
						{heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
						{subheading && <p className="text-lg text-muted-foreground">{subheading}</p>}
					</div>
				)}

				{Array.isArray(steps) && steps.length > 0 && (
					<div className="grid md:grid-cols-3 gap-8 lg:gap-12">
						{steps.map((step, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: CMS items don't have stable IDs
							<div key={index} className="relative">
								{/* Step number */}
								<div className="flex items-center gap-4 mb-4">
									<span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
										{index + 1}
									</span>
									{index < steps.length - 1 && (
										<div className="hidden md:block flex-1 h-px bg-border" />
									)}
								</div>

								{/* Step content */}
								<div>
									{step.title && <h3 className="text-xl font-semibold mb-3">{step.title}</h3>}
									{step.description && (
										<div className="text-muted-foreground">
											<RichText data={step.description} enableGutter={false} />
										</div>
									)}
									{step.media && typeof step.media === "object" && (
										<div className="mt-4 rounded-lg overflow-hidden">
											<Media
												resource={step.media}
												imgClassName="w-full"
												size="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
											/>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	)
}
