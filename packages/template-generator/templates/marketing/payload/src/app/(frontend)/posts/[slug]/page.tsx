import type { Metadata } from "next"

import { RelatedPosts } from "@/blocks/RelatedPosts/Component"
import { BlogCTA } from "@/components/BlogCTA"
import { PayloadRedirects } from "@/components/PayloadRedirects"
import configPromise from "@payload-config"
import { draftMode } from "next/headers"
import { getPayload } from "payload"
import { cache } from "react"

import { LivePreviewListener } from "@/components/LivePreviewListener"
import { PostHero } from "@/heros/PostHero"
import { extractHeadingsFromLexical } from "@/utilities/extractHeadings"
import { generateMeta } from "@/utilities/generateMeta"
import { BlogPostContent } from "./BlogPostContent"
import PageClient from "./page.client"

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise })
	const posts = await payload.find({
		collection: "posts",
		draft: false,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true,
		},
	})

	const params = posts.docs.map(({ slug }) => {
		return { slug }
	})

	return params
}

type Args = {
	params: Promise<{
		slug?: string
	}>
}

export default async function Post({ params: paramsPromise }: Args) {
	const { isEnabled: draft } = await draftMode()
	const { slug = "" } = await paramsPromise
	// Decode to support slugs with special characters
	const decodedSlug = decodeURIComponent(slug)
	const url = `/posts/${decodedSlug}`
	const post = await queryPostBySlug({ slug: decodedSlug })

	if (!post) return <PayloadRedirects url={url} />

	// Extract headings for table of contents
	const headings = extractHeadingsFromLexical(post.content)

	return (
		<article className="pb-0">
			<PageClient />

			{/* Allows redirects for valid pages too */}
			<PayloadRedirects disableNotFound url={url} />

			{draft && <LivePreviewListener />}

			{/* Hero Section */}
			<PostHero post={post} />

			{/* Two-column layout with TOC and content */}
			<BlogPostContent content={post.content} headings={headings} />

			{/* Related Posts */}
			{post.relatedPosts && post.relatedPosts.length > 0 && (
				<div className="container py-12 border-t border-border">
					<h2 className="text-2xl font-bold mb-8">Related Articles</h2>
					<RelatedPosts
						className="max-w-none"
						docs={post.relatedPosts.filter((post) => typeof post === "object")}
					/>
				</div>
			)}

			{/* Bottom CTA */}
			<BlogCTA />
		</article>
	)
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { slug = "" } = await paramsPromise
	// Decode to support slugs with special characters
	const decodedSlug = decodeURIComponent(slug)
	const post = await queryPostBySlug({ slug: decodedSlug })

	return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = await draftMode()

	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: "posts",
		depth: 2, // Populate relationships in rich text content
		draft,
		limit: 1,
		overrideAccess: draft,
		pagination: false,
		where: {
			slug: {
				equals: slug,
			},
		},
	})

	return result.docs?.[0] || null
})
