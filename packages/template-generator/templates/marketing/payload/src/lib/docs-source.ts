import { api } from "../../../../convex/_generated/api"
import { convex } from "./convex"

/**
 * Fetch published docs from Convex
 */
export async function getDocsFromConvex() {
	try {
		if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
			console.error(
				"[Docs] NEXT_PUBLIC_CONVEX_URL environment variable is not set. Docs will not be available.",
			)
			return []
		}

		const docs = await convex.query(api.docs.listPublished)

		if (process.env.NODE_ENV === "development") {
			console.log(`[Docs] Fetched ${docs.length} published document(s) from Convex`)
		}

		return docs
	} catch (error) {
		console.error("[Docs] Failed to fetch docs from Convex:", error)
		return []
	}
}

/**
 * Fetch a single doc by slug from Convex
 */
export async function getDocBySlug(slug: string) {
	try {
		if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
			console.error(
				"[Docs] NEXT_PUBLIC_CONVEX_URL environment variable is not set. Docs will not be available.",
			)
			return null
		}

		const doc = await convex.query(api.docs.getBySlug, { slug })
		return doc
	} catch (error) {
		console.error(`[Docs] Failed to fetch doc "${slug}" from Convex:`, error)
		return null
	}
}

/**
 * Build page tree for navigation from docs
 */
export function buildPageTree(docs: Awaited<ReturnType<typeof getDocsFromConvex>>) {
	// Sort docs by order, then alphabetically
	const sortedDocs = [...docs].sort((a, b) => {
		if (a.order !== undefined && b.order !== undefined) {
			return a.order - b.order
		}
		if (a.order !== undefined) return -1
		if (b.order !== undefined) return 1
		return a.title.localeCompare(b.title)
	})

	// Group docs by parent
	const topLevel = sortedDocs.filter((d) => !d.parentSlug)
	const byParent = new Map<string, typeof sortedDocs>()

	for (const doc of sortedDocs) {
		if (doc.parentSlug) {
			const existing = byParent.get(doc.parentSlug) || []
			existing.push(doc)
			byParent.set(doc.parentSlug, existing)
		}
	}

	// Build tree structure
	const buildChildren = (parentSlug: string): PageTreeItem[] => {
		const children = byParent.get(parentSlug) || []
		return children.map((doc) => ({
			type: "page" as const,
			name: doc.title,
			url: `/docs/${doc.slug}`,
			children: buildChildren(doc.slug),
		}))
	}

	const tree: PageTreeItem[] = topLevel.map((doc) => {
		const children = buildChildren(doc.slug)
		if (children.length > 0) {
			return {
				type: "folder" as const,
				name: doc.title,
				index: {
					type: "page" as const,
					name: doc.title,
					url: `/docs/${doc.slug}`,
				},
				children,
			}
		}
		return {
			type: "page" as const,
			name: doc.title,
			url: `/docs/${doc.slug}`,
		}
	})

	return {
		name: "Documentation",
		children: tree,
	}
}

// Types for page tree
type PageTreeItem =
	| {
			type: "page"
			name: string
			url: string
			children?: PageTreeItem[]
	  }
	| {
			type: "folder"
			name: string
			index?: { type: "page"; name: string; url: string }
			children: PageTreeItem[]
	  }
	| {
			type: "separator"
			name: string
	  }

/**
 * Get all page slugs for static generation
 */
export async function getAllDocSlugs(): Promise<string[][]> {
	const docs = await getDocsFromConvex()
	return docs.map((doc) => doc.slug.split("/"))
}
