"use client"

import { CTATracker } from "@/components/Analytics"
import Link from "next/link"

interface BlogCTAProps {
	headline?: string
	subheading?: string
	primaryButtonText?: string
	primaryButtonLink?: string
	secondaryButtonText?: string
	secondaryButtonLink?: string
}

export function BlogCTA({
	headline = "Ready to launch your directory?",
	subheading = "Join hundreds of founders who chose the faster path to a profitable directory business.",
	primaryButtonText = "Get started for free",
	primaryButtonLink = "/sign-up",
	secondaryButtonText = "Book a demo",
	secondaryButtonLink = "/contact",
}: BlogCTAProps) {
	return (
		<section className="relative overflow-hidden">
			{/* Background */}
			<div
				className="absolute inset-0"
				style={{
					background: "linear-gradient(180deg, #0F1F3D 0%, #101F3C 50%, #0F1F3D 100%)",
				}}
			>
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
			<div className="container relative z-10 py-16 md:py-20 lg:py-24">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
						{headline}
					</h2>

					<p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/80">{subheading}</p>

					<div className="flex flex-wrap justify-center gap-4">
						<CTATracker location="blog_cta" variant="primary">
							<Link
								href={primaryButtonLink}
								className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-white text-[#0F1F3D] hover:bg-white/90 rounded-lg transition-colors"
							>
								{primaryButtonText}
							</Link>
						</CTATracker>
						<CTATracker location="blog_cta" variant="secondary">
							<Link
								href={secondaryButtonLink}
								className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-white/10 border border-white text-white hover:bg-white/20 rounded-lg transition-colors"
							>
								{secondaryButtonText}
							</Link>
						</CTATracker>
					</div>
				</div>
			</div>
		</section>
	)
}
