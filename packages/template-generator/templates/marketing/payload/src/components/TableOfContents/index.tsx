"use client"

import type { HeadingItem } from "@/utilities/extractHeadings"
import { cn } from "@/utilities/ui"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface TableOfContentsProps {
	headings: HeadingItem[]
	signUpCta?: {
		title?: string
		description?: string
		buttonText?: string
		buttonLink?: string
		imageSrc?: string
		imageAlt?: string
	}
}

export function TableOfContents({ headings, signUpCta }: TableOfContentsProps) {
	const [activeId, setActiveId] = useState<string>("")

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id)
					}
				}
			},
			{
				rootMargin: "-80px 0px -80% 0px",
				threshold: 0,
			},
		)

		// Observe all heading elements
		for (const heading of headings) {
			const element = document.getElementById(heading.id)
			if (element) {
				observer.observe(element)
			}
		}

		return () => observer.disconnect()
	}, [headings])

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		e.preventDefault()
		const element = document.getElementById(id)
		if (element) {
			const yOffset = -100
			const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
			window.scrollTo({ top: y, behavior: "smooth" })
			setActiveId(id)
		}
	}

	if (headings.length === 0) {
		return null
	}

	return (
		<nav className="flex flex-col gap-6">
			{/* TOC Header */}
			<div>
				<h4 className="text-sm font-semibold text-foreground mb-4">On this page</h4>
				<ul className="space-y-2">
					{headings.map((heading) => (
						<li key={heading.id} style={{ paddingLeft: `${(heading.depth - 2) * 12}px` }}>
							<a
								href={`#${heading.id}`}
								onClick={(e) => handleClick(e, heading.id)}
								className={cn(
									"block text-sm leading-relaxed transition-colors duration-200",
									"hover:text-foreground",
									activeId === heading.id ? "text-[#3DA9A3] font-medium" : "text-muted-foreground",
								)}
							>
								{heading.text}
							</a>
						</li>
					))}
				</ul>
			</div>

			{/* Sign-up CTA */}
			{signUpCta && (
				<div className="mt-4 p-4 bg-[#F7F9FC] dark:bg-[#0F1F3D]/30 rounded-xl border border-[#E1E6EF] dark:border-[#0F1F3D]">
					<div className="flex flex-col gap-3">
						{/* App Feature Mockup */}
						{signUpCta.imageSrc && (
							<div className="w-full aspect-square rounded-lg overflow-hidden bg-white dark:bg-[#0F1F3D] border border-[#E1E6EF] dark:border-[#0F1F3D]">
								<Image
									src={signUpCta.imageSrc}
									alt={signUpCta.imageAlt || "DirectoryHub app feature"}
									width={200}
									height={200}
									className="w-full h-full object-cover"
								/>
							</div>
						)}

						{/* Text */}
						<div>
							<p className="text-sm font-semibold text-foreground">
								{signUpCta.title || "Experience DirectoryHub"}
							</p>
							<p className="text-xs text-muted-foreground mt-1">
								{signUpCta.description || "Start building your directory today"}
							</p>
						</div>

						{/* CTA Button */}
						<Link
							href={signUpCta.buttonLink || "https://app.directoryhub.app/sign-up"}
							className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#0F1F3D] hover:bg-[#0B162C] dark:bg-[#3DA9A3] dark:hover:bg-[#3DA9A3]/90 rounded-lg transition-colors"
						>
							{signUpCta.buttonText || "Sign up for free"}
						</Link>
					</div>
				</div>
			)}
		</nav>
	)
}
