import {
	Award,
	Check,
	Cloud,
	Database,
	Globe,
	Lock,
	type LucideIcon,
	Plug,
	Server,
	Shield,
	Zap,
} from "lucide-react"
import type React from "react"

import type { TrustColumnsBlock as TrustColumnsBlockProps } from "@/payload-types"

const iconMap: Record<string, LucideIcon> = {
	check: Check,
	shield: Shield,
	lock: Lock,
	globe: Globe,
	zap: Zap,
	server: Server,
	cloud: Cloud,
	database: Database,
	plug: Plug,
	award: Award,
}

export const TrustColumnsBlock: React.FC<TrustColumnsBlockProps> = ({ columns }) => {
	if (!Array.isArray(columns) || columns.length === 0) {
		return null
	}

	return (
		<section className="py-20 md:py-28 bg-muted/30">
			<div className="container">
				<div className="grid md:grid-cols-2 gap-12 lg:gap-20">
					{columns.map((column, columnIndex) => (
						<div key={columnIndex}>
							{/* Label */}
							{column.label && (
								<span className="inline-block text-sm font-medium text-secondary mb-3 tracking-wide">
									{column.label}
								</span>
							)}

							{/* Heading */}
							{column.heading && (
								<h2 className="text-2xl md:text-3xl font-bold mb-4">{column.heading}</h2>
							)}

							{/* Description */}
							{column.description && (
								<p className="text-muted-foreground mb-6">{column.description}</p>
							)}

							{/* Feature Items */}
							{Array.isArray(column.items) && column.items.length > 0 && (
								<ul className="space-y-4">
									{column.items.map((item, itemIndex) => {
										const iconKey = item.icon || "check"
										const Icon = iconMap[iconKey] || Check

										return (
											<li key={itemIndex} className="flex items-center gap-3">
												<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
													<Icon className="w-4 h-4 text-primary" />
												</div>
												<span className="text-foreground font-medium">{item.text}</span>
											</li>
										)
									})}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
