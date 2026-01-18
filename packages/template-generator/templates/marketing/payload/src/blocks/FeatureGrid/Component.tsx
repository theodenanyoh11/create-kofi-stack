import {
	Award,
	BarChart3,
	Briefcase,
	Building,
	Check,
	Cloud,
	Database,
	DollarSign,
	Globe,
	Layers,
	Layout,
	Lock,
	type LucideIcon,
	Plug,
	Rocket,
	Search,
	Server,
	Settings,
	Shield,
	Star,
	Target,
	TrendingUp,
	Users,
	Zap,
} from "lucide-react"
import type React from "react"

import type { FeatureGridBlock as FeatureGridBlockProps } from "@/payload-types"

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
	lock: Lock,
	cloud: Cloud,
	plug: Plug,
	award: Award,
	check: Check,
	server: Server,
	briefcase: Briefcase,
	trendingUp: TrendingUp,
}

export const FeatureGridBlock: React.FC<FeatureGridBlockProps> = ({
	heading,
	subheading,
	columns,
	features,
}) => {
	const gridCols: Record<string, string> = {
		"2": "md:grid-cols-2",
		"3": "md:grid-cols-2 lg:grid-cols-3",
		"4": "md:grid-cols-2 lg:grid-cols-4",
	}

	const columnClass = columns && columns in gridCols ? gridCols[columns] : gridCols["3"]

	return (
		<section className="py-20 md:py-28">
			<div className="container">
				{(heading || subheading) && (
					<div className="text-center mb-16 max-w-3xl mx-auto">
						{heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
						{subheading && <p className="text-lg text-muted-foreground">{subheading}</p>}
					</div>
				)}

				{Array.isArray(features) && features.length > 0 && (
					<div className={cn("grid gap-6 lg:gap-8", columnClass)}>
						{features.map((feature, index) => {
							const iconKey = feature.icon
							const Icon =
								iconKey && iconKey in iconMap ? iconMap[iconKey as keyof typeof iconMap] : null

							return (
								<div
									key={index}
									className="group relative p-6 lg:p-8 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
								>
									{/* Subtle gradient hover effect */}
									<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

									<div className="relative">
										{Icon && (
											<div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:scale-105 transition-all duration-300">
												<Icon className="w-7 h-7 text-primary" />
											</div>
										)}
										{feature.title && (
											<h3 className="text-lg lg:text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
												{feature.title}
											</h3>
										)}
										{feature.description && (
											<div className="text-muted-foreground text-sm lg:text-base leading-relaxed">
												<RichText data={feature.description} enableGutter={false} />
											</div>
										)}
									</div>
								</div>
							)
						})}
					</div>
				)}
			</div>
		</section>
	)
}
