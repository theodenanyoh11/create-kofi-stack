import type { Metadata } from "next"

import type { Config, Media, Page, Post } from "../payload-types"

import { getServerSideURL } from "./getURL"
import { mergeOpenGraph } from "./mergeOpenGraph"

const getImageURL = (image?: Media | Config["db"]["defaultIDType"] | null) => {
	const serverUrl = getServerSideURL()

	let url = `${serverUrl}/website-template-OG.webp`

	if (image && typeof image === "object" && "url" in image) {
		const ogUrl = image.sizes?.og?.url

		url = ogUrl ? `${serverUrl}${ogUrl}` : `${serverUrl}${image.url}`
	}

	return url
}

// Default keywords for SEO
const defaultKeywords = [
	"SaaS platform",
	"team productivity",
	"workflow automation",
	"business software",
	"collaboration tools",
	"project management",
	"team collaboration",
	"business automation",
	"startup tools",
	"productivity software",
]

export const generateMeta = async (args: {
	doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
	const { doc } = args
	const serverUrl = getServerSideURL()

	const ogImage = getImageURL(doc?.meta?.image)

	const title = doc?.meta?.title
		? `${doc?.meta?.title} | SaaSify`
		: "SaaSify - The Modern Platform for Growing Teams"

	const description =
		doc?.meta?.description ||
		"Streamline workflows, boost productivity, and scale your business with one powerful platform. The modern solution for teams that want to work smarter."

	// Generate canonical URL
	const slug = Array.isArray(doc?.slug) ? doc?.slug.join("/") : doc?.slug || ""
	const canonicalUrl = slug === "home" ? serverUrl : `${serverUrl}/${slug}`

	return {
		title,
		description,
		keywords: defaultKeywords,
		authors: [{ name: "SaaSify", url: serverUrl }],
		creator: "SaaSify",
		publisher: "SaaSify",
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: mergeOpenGraph({
			description,
			images: ogImage
				? [
						{
							url: ogImage,
							width: 1200,
							height: 630,
							alt: title,
						},
					]
				: undefined,
			title,
			url: canonicalUrl,
		}),
	}
}
