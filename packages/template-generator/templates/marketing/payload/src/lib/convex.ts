import { ConvexHttpClient } from "convex/browser"

/**
 * Convex HTTP client for server-side data fetching in the marketing site.
 * Used for fetching documentation content from Convex.
 */
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

if (!convexUrl) {
	console.warn("[Convex] NEXT_PUBLIC_CONVEX_URL is not set. Documentation features will not work.")
}

export const convex = new ConvexHttpClient(convexUrl || "")
