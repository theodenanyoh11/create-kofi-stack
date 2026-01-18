import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical"

export interface HeadingItem {
	id: string
	text: string
	depth: number
}

/**
 * Slugify a string for use as an anchor ID
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim()
}

/**
 * Extract text content from a Lexical node recursively
 */
function extractTextFromNode(node: Record<string, unknown>): string {
	if (node.type === "text" && typeof node.text === "string") {
		return node.text
	}

	if (Array.isArray(node.children)) {
		return node.children
			.map((child) => extractTextFromNode(child as Record<string, unknown>))
			.join("")
	}

	return ""
}

/**
 * Get heading depth from tag name
 */
function getHeadingDepth(tag: string): number {
	const depthMap: Record<string, number> = {
		h1: 1,
		h2: 2,
		h3: 3,
		h4: 4,
		h5: 5,
		h6: 6,
	}
	return depthMap[tag] || 2
}

/**
 * Extract headings from Lexical editor state for table of contents
 */
export function extractHeadingsFromLexical(content: DefaultTypedEditorState): HeadingItem[] {
	const headings: HeadingItem[] = []

	if (!content?.root?.children) {
		return headings
	}

	for (const node of content.root.children) {
		const nodeRecord = node as Record<string, unknown>
		if (nodeRecord.type === "heading" && typeof nodeRecord.tag === "string") {
			const text = extractTextFromNode(nodeRecord)
			if (text.trim()) {
				headings.push({
					id: slugify(text),
					text: text.trim(),
					depth: getHeadingDepth(nodeRecord.tag),
				})
			}
		}
	}

	return headings
}
