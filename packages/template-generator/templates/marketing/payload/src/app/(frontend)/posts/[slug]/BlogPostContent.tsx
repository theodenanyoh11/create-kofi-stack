"use client"

import type { HeadingItem } from "@/utilities/extractHeadings"
import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical"

import RichText from "@/components/RichText"
import { TableOfContents } from "@/components/TableOfContents"
import { slugify } from "@/utilities/extractHeadings"
import { useEffect, useRef } from "react"

interface BlogPostContentProps {
	content: DefaultTypedEditorState
	headings: HeadingItem[]
}

export function BlogPostContent({ content, headings }: BlogPostContentProps) {
	const contentRef = useRef<HTMLDivElement>(null)

	// Add IDs to headings after mount for TOC linking
	useEffect(() => {
		if (!contentRef.current) return

		const headingElements = contentRef.current.querySelectorAll("h1, h2, h3, h4, h5, h6")
		for (const heading of headingElements) {
			const text = heading.textContent || ""
			const id = slugify(text)
			if (!heading.id) {
				heading.id = id
			}
		}
	}, [])

	return (
		<div className="container py-12">
			<div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
				{/* Sticky TOC Sidebar - Hidden on mobile */}
				<aside className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0">
					<div className="sticky top-24">
						<TableOfContents
							headings={headings}
							signUpCta={{
								title: "Experience SaaSify",
								description: "Start boosting your team's productivity today",
								buttonText: "Start free trial",
								buttonLink: "/pricing",
								imageSrc: "/media/hero-dashboard-500x500.webp",
								imageAlt: "SaaSify dashboard feature",
							}}
						/>
					</div>
				</aside>

				{/* Main Content */}
				<main className="flex-1 min-w-0" ref={contentRef}>
					{content && (
						<RichText
							className="max-w-none prose-headings:scroll-mt-24"
							data={content}
							enableGutter={false}
							enableProse={true}
						/>
					)}
				</main>
			</div>
		</div>
	)
}
