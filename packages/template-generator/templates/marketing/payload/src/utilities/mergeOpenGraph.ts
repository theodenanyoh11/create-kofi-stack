import type { Metadata } from "next"
import { getServerSideURL } from "./getURL"

const defaultOpenGraph: Metadata["openGraph"] = {
	type: "website",
	description:
		"Launch a profitable directory business in minutes. Create, monetize, and grow with DirectoryHub.",
	images: [
		{
			url: `${getServerSideURL()}/website-template-OG.webp`,
			width: 1200,
			height: 630,
			alt: "DirectoryHub - Create. Monetize. Grow.",
		},
	],
	siteName: "DirectoryHub",
	title: "DirectoryHub - Launch a Profitable Directory Business in Minutes",
}

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images,
	}
}
