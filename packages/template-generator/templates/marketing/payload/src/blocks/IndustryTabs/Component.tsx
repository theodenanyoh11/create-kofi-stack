"use client"

import { useState } from "react"

import type { IndustryTabsBlock as IndustryTabsBlockProps } from "@/payload-types"

import { CMSLink } from "@/components/Link"
import { Media } from "@/components/Media"
import { cn } from "@/utilities/ui"

export const IndustryTabsBlock: React.FC<IndustryTabsBlockProps> = ({
	heading,
	subheading,
	tabs,
}) => {
	const [activeTab, setActiveTab] = useState(0)

	if (!Array.isArray(tabs) || tabs.length === 0) {
		return null
	}

	const activeTabData = tabs[activeTab]
	const hasMedia = activeTabData?.media && typeof activeTabData.media === "object"

	return (
		<section className="py-20 md:py-28">
			<div className="container">
				{/* Header */}
				{(heading || subheading) && (
					<div className="mb-12">
						{heading && (
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{heading}</h2>
						)}
						{subheading && <p className="text-lg text-muted-foreground max-w-2xl">{subheading}</p>}
					</div>
				)}

				{/* Tabs */}
				<div className="flex flex-wrap gap-2 mb-12 border-b border-border pb-4">
					{tabs.map((tab, index) => (
						<button
							type="button"
							// biome-ignore lint/suspicious/noArrayIndexKey: Tab order is static
							key={index}
							onClick={() => setActiveTab(index)}
							className={cn(
								"px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
								activeTab === index
									? "bg-primary text-primary-foreground"
									: "text-muted-foreground hover:text-foreground hover:bg-muted",
							)}
						>
							{tab.name}
						</button>
					))}
				</div>

				{/* Tab Content */}
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Stats Side */}
					<div className="industry-tab-content">
						{activeTabData?.stat && (
							<div className="mb-6">
								<span className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary leading-none">
									{activeTabData.stat}
								</span>
							</div>
						)}

						{activeTabData?.statLabel && (
							<h3 className="text-2xl md:text-3xl font-semibold mb-4">{activeTabData.statLabel}</h3>
						)}

						{activeTabData?.description && (
							<p className="text-lg text-muted-foreground mb-8">{activeTabData.description}</p>
						)}

						{activeTabData?.link?.label && <CMSLink {...activeTabData.link} />}
					</div>

					{/* Visual Side */}
					<div className="relative hidden lg:block">
						<div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-muted via-accent to-muted/50 overflow-hidden">
							{hasMedia ? (
								/* Uploaded Image */
								<Media
									resource={activeTabData.media}
									imgClassName="w-full h-full object-cover"
									size="(max-width: 1024px) 100vw, 50vw"
								/>
							) : (
								/* Decorative Placeholder */
								<>
									{/* Decorative grid pattern */}
									<div className="absolute inset-0 opacity-30">
										<div
											className="w-full h-full"
											style={{
												backgroundImage: `
                          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
                        `,
												backgroundSize: "40px 40px",
											}}
										/>
									</div>

									{/* Floating stat card */}
									<div className="absolute bottom-8 left-8 right-8">
										<div className="bg-card border border-border rounded-xl p-6 shadow-lg">
											<div className="flex items-center gap-4">
												<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
													<span className="text-xl font-bold text-primary">
														{activeTabData?.stat?.charAt(0)}
													</span>
												</div>
												<div>
													<p className="font-semibold">{activeTabData?.statLabel}</p>
													<p className="text-sm text-muted-foreground">{activeTabData?.name}</p>
												</div>
											</div>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
