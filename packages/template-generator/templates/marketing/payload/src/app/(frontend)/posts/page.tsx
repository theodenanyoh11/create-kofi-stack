import type { Metadata } from "next/types"

import configPromise from "@payload-config"
import { getPayload } from "payload"
import { BlogPageClient } from "./BlogPageClient"

export const dynamic = "force-static"
export const revalidate = 600

export default async function Page() {
	const payload = await getPayload({ config: configPromise })

	const posts = await payload.find({
		collection: "posts",
		depth: 1,
		limit: 100,
		overrideAccess: false,
		select: {
			title: true,
			slug: true,
			categories: true,
			meta: true,
			publishedAt: true,
		},
		sort: "-publishedAt",
	})

	const categories = await payload.find({
		collection: "categories",
		limit: 50,
		overrideAccess: false,
	})

	return (
		<BlogPageClient
			initialPosts={posts.docs}
			categories={categories.docs}
			totalPosts={posts.totalDocs}
		/>
	)
}

export function generateMetadata(): Metadata {
	return {
		title: "Blog — SaaSify Resources & Guides",
		description:
			"Tips, strategies, and insights for growing teams. Learn how to boost productivity and scale your business with SaaSify.",
	}
}
