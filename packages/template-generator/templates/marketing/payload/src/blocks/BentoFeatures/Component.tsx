import {
	BarChart3,
	Building,
	Database,
	DollarSign,
	Globe,
	Layers,
	Layout,
	type LucideIcon,
	Rocket,
	Search,
	Settings,
	Shield,
	Star,
	Target,
	Users,
	Zap,
} from "lucide-react"
import type React from "react"

import type { BentoFeaturesBlock as BentoFeaturesBlockProps } from "@/payload-types"

import { FeatureSectionTracker } from "@/components/Analytics"
import { Media } from "@/components/Media"
import RichText from "@/components/RichText"
import { cn } from "@/utilities/ui"

const iconMap: Record<string, LucideIcon> = {
	rocket: Rocket,
	zap: Zap,
	building: Building,
	target: Target,
	layout: Layout,
	star: Star,
	dollarSign: DollarSign,
	search: Search,
	users: Users,
	globe: Globe,
	shield: Shield,
	settings: Settings,
	database: Database,
	barChart: BarChart3,
	layers: Layers,
}

// Creative grid positions for asymmetric bento layout (8 cards)
const gridPositions = [
	"md:col-span-1 md:row-span-1", // Small card (top-left)
	"md:col-span-1 md:row-span-1", // Small card (top-middle)
	"md:col-span-1 md:row-span-1", // Small card (top-right)
	"md:col-span-1 md:row-span-2", // Tall card (left side, rows 2-3)
	"md:col-span-1 md:row-span-1", // Small card (row 2, middle)
	"md:col-span-1 md:row-span-1", // Small card (row 2, right)
	"md:col-span-1 md:row-span-1", // Small card (row 3, middle)
	"md:col-span-1 md:row-span-1", // Small card (row 3, right)
]

const styleClasses: Record<string, { bg: string; text: string; icon: string; statText: string }> = {
	default: {
		bg: "bg-card border border-border/50 hover:border-border",
		text: "text-foreground",
		icon: "bg-primary/10 text-primary",
		statText: "text-primary",
	},
	primary: {
		bg: "bg-primary hover:bg-primary/95",
		text: "text-primary-foreground",
		icon: "bg-white/20 text-white",
		statText: "text-white",
	},
	accent: {
		bg: "bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-500/95 hover:to-teal-600/95",
		text: "text-white",
		icon: "bg-white/20 text-white",
		statText: "text-white",
	},
	gradient: {
		bg: "bg-gradient-to-br from-primary via-primary/90 to-secondary hover:from-primary/95",
		text: "text-white",
		icon: "bg-white/20 text-white",
		statText: "text-white",
	},
	warm: {
		bg: "bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400",
		text: "text-white",
		icon: "bg-white/20 text-white",
		statText: "text-white",
	},
	cool: {
		bg: "bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500",
		text: "text-white",
		icon: "bg-white/20 text-white",
		statText: "text-white",
	},
}

export const BentoFeaturesBlock: React.FC<BentoFeaturesBlockProps> = ({
	heading,
	subheading,
	features,
}) => {
	if (!Array.isArray(features) || features.length === 0) {
		return null
	}

	return (
		<FeatureSectionTracker featureName={heading || "bento-features"}>
			<section className="py-16 md:py-24">
				<div className="container">
					{/* Header */}
					{(heading || subheading) && (
						<div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
							{heading && (
								<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
									{heading}
								</h2>
							)}
							{subheading && (
								<p className="text-xl md:text-2xl text-muted-foreground">{subheading}</p>
							)}
						</div>
					)}

					{/* Creative Bento Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 md:grid-rows-[repeat(3,minmax(140px,160px))]">
						{features.map((feature, index) => {
							const style = feature.style || "default"
							const iconKey = feature.icon
							const Icon =
								iconKey && iconKey !== "none" && iconKey in iconMap
									? iconMap[iconKey as keyof typeof iconMap]
									: null
							const styleConfig = styleClasses[style] || styleClasses.default
							const gridPosition = gridPositions[index] || "md:col-span-1 md:row-span-1"
							const isLarge =
								gridPosition.includes("col-span-2") && gridPosition.includes("row-span-2")
							const featureKey = feature.id || feature.title || `bento-feature-${index}`

							return (
								<div
									key={featureKey}
									className={cn(
										"relative rounded-2xl overflow-hidden p-5 md:p-6 flex flex-col transition-all duration-300 group",
										"hover:shadow-lg hover:-translate-y-0.5",
										"col-span-1 row-span-1",
										gridPosition,
										styleConfig.bg,
									)}
								>
									{/* Background Image */}
									{feature.image && typeof feature.image === "object" && (
										<>
											<div className="absolute inset-0">
												<Media
													resource={feature.image}
													imgClassName="w-full h-full object-cover"
													fill
													size="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
												/>
											</div>
											<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
										</>
									)}

									{/* Decorative elements for visual interest */}
									{!feature.image && isLarge && (
										<div className="absolute -right-6 -bottom-6 w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 blur-xl" />
									)}

									{/* Content */}
									<div
										className={cn(
											"relative z-10 flex flex-col h-full",
											feature.image && "text-white",
										)}
									>
										{/* Icon */}
										{Icon && (
											<div
												className={cn(
													"w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center mb-auto",
													feature.image ? "bg-white/20 backdrop-blur-sm" : styleConfig.icon,
												)}
											>
												<Icon className={cn("w-5 h-5 md:w-5 md:h-5", isLarge && "md:w-6 md:h-6")} />
											</div>
										)}

										{/* Spacer for better vertical distribution */}
										<div className="flex-1 min-h-2" />

										{/* Stat - only show on larger cards or when explicitly set */}
										{feature.stat && (
											<div
												className={cn(
													"font-bold mb-0.5 leading-none",
													isLarge ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl",
													feature.image ? "text-white" : styleConfig.statText,
												)}
											>
												{feature.stat}
											</div>
										)}

										{/* Title */}
										{feature.title && (
											<h3
												className={cn(
													"font-semibold mb-1",
													isLarge ? "text-lg md:text-xl" : "text-base md:text-lg",
													feature.image ? "text-white" : styleConfig.text,
												)}
											>
												{feature.title}
											</h3>
										)}

										{/* Description */}
										{feature.description && (
											<div
												className={cn(
													"leading-snug",
													isLarge ? "text-sm md:text-base" : "text-xs md:text-sm",
													feature.image
														? "text-white/80"
														: style === "default"
															? "text-muted-foreground"
															: "text-white/80",
												)}
											>
												<RichText data={feature.description} enableGutter={false} />
											</div>
										)}
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</section>
		</FeatureSectionTracker>
	)
}
