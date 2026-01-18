import {
	Award,
	Briefcase,
	Building,
	Code,
	Lightbulb,
	type LucideIcon,
	TrendingUp,
	User,
	Users,
} from "lucide-react"
import type React from "react"

import type { PersonasBlock as PersonasBlockProps } from "@/payload-types"

import RichText from "@/components/RichText"

const iconMap: Record<string, LucideIcon> = {
	user: User,
	briefcase: Briefcase,
	users: Users,
	award: Award,
	building: Building,
	lightbulb: Lightbulb,
	trendingUp: TrendingUp,
	code: Code,
}

export const PersonasBlock: React.FC<PersonasBlockProps> = ({ heading, subheading, personas }) => {
	return (
		<section className="py-20 md:py-28">
			<div className="container">
				{(heading || subheading) && (
					<div className="text-center mb-16 max-w-3xl mx-auto">
						{heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
						{subheading && <p className="text-lg text-muted-foreground">{subheading}</p>}
					</div>
				)}

				{Array.isArray(personas) && personas.length > 0 && (
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{personas.map((persona, index) => {
							const Icon = persona.icon ? iconMap[persona.icon] : User

							return (
								<div
									key={index}
									className="text-center p-8 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
								>
									{Icon && (
										<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
											<Icon className="w-8 h-8 text-primary" />
										</div>
									)}
									{persona.title && <h3 className="text-xl font-semibold mb-2">{persona.title}</h3>}
									{persona.description && (
										<div className="text-muted-foreground text-sm">
											<RichText data={persona.description} enableGutter={false} />
										</div>
									)}
								</div>
							)
						})}
					</div>
				)}
			</div>
		</section>
	)
}
