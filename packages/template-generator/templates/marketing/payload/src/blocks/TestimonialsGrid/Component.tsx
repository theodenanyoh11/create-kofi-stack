import type React from "react"

import type { TestimonialsGridBlock as TestimonialsGridBlockProps } from "@/payload-types"

import { Media } from "@/components/Media"
import { cn } from "@/utilities/ui"

export const TestimonialsGridBlock: React.FC<TestimonialsGridBlockProps> = ({
	heading,
	subheading,
	testimonials,
}) => {
	if (!Array.isArray(testimonials) || testimonials.length === 0) {
		return null
	}

	return (
		<section className="py-20 md:py-28">
			<div className="container">
				{/* Header */}
				{(heading || subheading) && (
					<div className="mb-12">
						{heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
						{subheading && <p className="text-lg text-muted-foreground max-w-2xl">{subheading}</p>}
					</div>
				)}

				{/* Testimonials Grid */}
				<div
					className={cn(
						"grid gap-6",
						testimonials.length === 1 && "grid-cols-1",
						testimonials.length === 2 && "grid-cols-1 md:grid-cols-2",
						testimonials.length >= 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
					)}
				>
					{testimonials.map((testimonial, index) => (
						<div
							key={testimonial.id || `testimonial-${index}`}
							className="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4]"
						>
							{/* Background Image or Gradient */}
							{testimonial.image && typeof testimonial.image === "object" ? (
								<div className="absolute inset-0 overflow-hidden">
									<Media
										resource={testimonial.image}
										imgClassName="w-full h-full object-cover"
										fill
										size="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
									/>
								</div>
							) : (
								<div
									className={cn(
										"absolute inset-0 bg-gradient-to-br",
										index % 3 === 0 && "from-blue-100 to-blue-200",
										index % 3 === 1 && "from-emerald-100 to-emerald-200",
										index % 3 === 2 && "from-amber-100 to-amber-200",
									)}
								/>
							)}

							{/* Gradient Overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

							{/* Content */}
							<div className="absolute inset-0 flex flex-col justify-end p-6">
								{/* Stat Badge */}
								<div className="mb-4">
									<span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none">
										{testimonial.stat}
									</span>
								</div>

								{/* Stat Label */}
								<p className="text-lg md:text-xl font-semibold text-white mb-3">
									{testimonial.statLabel}
								</p>

								{/* Quote (if provided) */}
								{testimonial.quote && (
									<p className="text-sm text-white/80 mb-3 line-clamp-3">
										&ldquo;{testimonial.quote}&rdquo;
									</p>
								)}

								{/* Author */}
								{(testimonial.author || testimonial.company) && (
									<div className="flex items-center gap-2 text-sm text-white/70">
										{testimonial.author && <span>{testimonial.author}</span>}
										{testimonial.author && testimonial.company && <span>•</span>}
										{testimonial.company && (
											<span className="font-medium">{testimonial.company}</span>
										)}
									</div>
								)}
							</div>

							{/* Hover Effect */}
							<div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
