import type { Metadata } from "next"
import { getServerSideURL } from "./getURL"

const defaultOpenGraph: Metadata["openGraph"] = {
	type: "website",
	description:
		"Streamline workflows, boost productivity, and scale your business with one powerful platform.",
	images: [
		{
			url: `${getServerSideURL()}/website-template-OG.webp`,
			width: 1200,
			height: 630,
			alt: "SaaSify - The Modern Platform for Growing Teams",
		},
	],
	siteName: "SaaSify",
	title: "SaaSify - The Modern Platform for Growing Teams",
}

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images,
	}
}
