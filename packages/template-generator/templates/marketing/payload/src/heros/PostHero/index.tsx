import type React from "react"
import { formatDateTime } from "src/utilities/formatDateTime"

import type { Post } from "@/payload-types"

import { formatAuthors } from "@/utilities/formatAuthors"
import Link from "next/link"

export const PostHero: React.FC<{
	post: Post
}> = ({ post }) => {
	const { categories, populatedAuthors, publishedAt, title } = post

	const hasAuthors =
		populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ""

	return (
		<div
			className="relative"
			style={{
				background: "linear-gradient(180deg, #0F1F3D 0%, #101F3C 50%, #0F1F3D 100%)",
			}}
		>
			<div className="container py-16 md:py-20 lg:py-24">
				<div className="max-w-3xl">
					{/* Category Badge */}
					{categories && categories.length > 0 && (
						<div className="flex items-center gap-2 mb-6">
							{categories.map((category) => {
								if (typeof category === "object" && category !== null) {
									const { title: categoryTitle, slug, id } = category
									const titleToUse = categoryTitle || "Untitled category"

									return (
										<Link
											key={id || slug}
											href={`/posts?category=${slug}`}
											className="inline-flex items-center px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#3DA9A3] bg-[#3DA9A3]/10 rounded-full hover:bg-[#3DA9A3]/20 transition-colors"
										>
											{titleToUse}
										</Link>
									)
								}
								return null
							})}
						</div>
					)}

					{/* Title */}
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
						{title}
					</h1>

					{/* Meta Information */}
					<div className="flex items-center gap-6 text-sm text-white/70">
						{hasAuthors && (
							<div className="flex items-center gap-2">
								<span className="text-white/50">By</span>
								<span className="text-white font-medium">{formatAuthors(populatedAuthors)}</span>
							</div>
						)}
						{hasAuthors && publishedAt && <span className="text-white/30">•</span>}
						{publishedAt && (
							<time dateTime={publishedAt} className="text-white/70">
								{formatDateTime(publishedAt)}
							</time>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
