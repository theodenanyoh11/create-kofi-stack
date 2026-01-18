import { getDocsFromConvex } from "@/lib/docs-source"
import { NextResponse } from "next/server"

/**
 * Search API for documentation
 * Returns matching docs based on query
 */
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const query = searchParams.get("q")?.toLowerCase() || ""

	if (!query || query.length < 2) {
		return NextResponse.json({ results: [] })
	}

	try {
		const docs = await getDocsFromConvex()

		// Simple search implementation
		const results = docs
			.filter((doc) => {
				const titleMatch = doc.title.toLowerCase().includes(query)
				const descriptionMatch = doc.description?.toLowerCase().includes(query)
				const contentMatch = doc.content.toLowerCase().includes(query)
				return titleMatch || descriptionMatch || contentMatch
			})
			.map((doc) => ({
				id: doc._id,
				title: doc.title,
				description: doc.description || "",
				url: `/docs/${doc.slug}`,
				// Extract a snippet from the content
				snippet: extractSnippet(doc.content, query),
			}))
			.slice(0, 10) // Limit results

		return NextResponse.json({ results })
	} catch (error) {
		console.error("Search error:", error)
		return NextResponse.json({ results: [], error: "Search failed" }, { status: 500 })
	}
}

/**
 * Extract a snippet around the search query
 */
function extractSnippet(content: string, query: string): string {
	const lowerContent = content.toLowerCase()
	const index = lowerContent.indexOf(query)

	if (index === -1) {
		// Return first 150 chars if query not found in content
		return `${content.slice(0, 150).trim()}...`
	}

	// Get 50 chars before and 100 chars after the match
	const start = Math.max(0, index - 50)
	const end = Math.min(content.length, index + query.length + 100)

	let snippet = content.slice(start, end).trim()

	// Add ellipsis if needed
	if (start > 0) snippet = `...${snippet}`
	if (end < content.length) snippet = `${snippet}...`

	return snippet
}
