"use client"

import { useHeaderTheme } from "@/providers/HeaderTheme"
import Image from "next/image"
import type React from "react"
import { useEffect } from "react"

import type { Page } from "@/payload-types"

import { CTATracker } from "@/components/Analytics"
import { CMSLink } from "@/components/Link"
import { Media } from "@/components/Media"
import RichText from "@/components/RichText"
import { AnimatedMockup } from "./AnimatedMockup"

export const ProductShowcaseHero: React.FC<Page["hero"]> = ({
	links,
	richText,
	media,
	backgroundMedia,
}) => {
	const { setHeaderTheme } = useHeaderTheme()
	const hasMedia = media && typeof media === "object"
	const hasBackgroundMedia = backgroundMedia && typeof backgroundMedia === "object"

	useEffect(() => {
		setHeaderTheme("light")
	}, [setHeaderTheme])

	return (
		<div className="relative overflow-hidden">
			{/* Hero Content - Left Aligned */}
			<div className="container mx-auto px-4 pt-8 pb-16 md:pt-16 md:pb-24">
				<div className="max-w-2xl">
					{richText && (
						<RichText
							className="mb-8 hero-content hero-content--left"
							data={richText}
							enableGutter={false}
							enableProse={false}
						/>
					)}
					{Array.isArray(links) && links.length > 0 && (
						<ul className="flex flex-wrap gap-4">
							{links.map(({ link }, i) => {
								return (
									// biome-ignore lint/suspicious/noArrayIndexKey: Links are static and don't reorder
									<li key={i}>
										<CTATracker
											location="hero_product_showcase"
											variant={link?.label || `cta_${i}`}
										>
											<CMSLink {...link} size="lg" />
										</CTATracker>
									</li>
								)
							})}
						</ul>
					)}
				</div>
			</div>

			{/* Product Mockup Section (Cursor-style) */}
			<div className="container mx-auto px-4">
				<div className="hero-showcase">
					{/* Background Image - LCP element, needs fetchPriority="high" */}
					<div className="hero-bg-image">
						{hasBackgroundMedia ? (
							<Media
								resource={backgroundMedia}
								fill
								imgClassName="object-cover"
								priority
								size="100vw"
							/>
						) : (
							<Image
								src="/media/hero-bg.png"
								alt=""
								fill
								sizes="(max-width: 1280px) 100vw, 1280px"
								className="object-cover"
								priority
								fetchPriority="high"
								quality={75}
							/>
						)}
					</div>

					{/* Mockup - centered within background */}
					<div className="hero-mockup-centered">
						{hasMedia ? (
							<div className="mockup-wrapper">
								<Media
									resource={media}
									imgClassName="w-full h-auto object-contain"
									size="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 960px"
								/>
							</div>
						) : (
							<AnimatedMockup />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
