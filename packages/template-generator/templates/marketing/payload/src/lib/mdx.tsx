import { compile, run } from "@mdx-js/mdx"
import type { ReactNode } from "react"
import { createElement } from "react"
import * as runtime from "react/jsx-runtime"

interface TableOfContentsItem {
	title: string
	url: string
	depth: number
}

/**
 * Compile MDX content to React components
 */
export async function compileMDX(source: string): Promise<{
	content: ReactNode
	toc: TableOfContentsItem[]
}> {
	// Extract headings for TOC before compilation
	const toc = extractTableOfContents(source)

	try {
		// Compile MDX to JavaScript
		const compiled = await compile(source, {
			outputFormat: "function-body",
			development: false,
		})

		// Run the compiled code
		const { default: MDXContent } = await run(String(compiled), {
			...runtime,
			baseUrl: import.meta.url,
		})

		// Create the content element with custom components
		const content = createElement(MDXContent, {
			components: getMDXComponents(),
		})

		return { content, toc }
	} catch (error) {
		console.error("MDX compilation error:", error)

		// Return a fallback with the raw content
		return {
			content: createElement(
				"div",
				{ className: "prose dark:prose-invert" },
				createElement("p", { className: "text-red-500" }, "Error rendering content"),
				createElement("pre", { className: "text-sm" }, source),
			),
			toc,
		}
	}
}

/**
 * Extract table of contents from markdown headings
 */
function extractTableOfContents(source: string): TableOfContentsItem[] {
	const headingRegex = /^(#{1,6})\s+(.+)$/gm
	const toc: TableOfContentsItem[] = []

	const matches = source.matchAll(headingRegex)
	for (const match of matches) {
		const depth = match[1]?.length ?? 1
		const title = match[2]?.trim() ?? ""

		// Create URL-friendly slug
		const url = `#${title
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/\s+/g, "-")}`

		toc.push({ title, url, depth })
	}

	return toc
}

/**
 * Custom MDX components for styling
 */
function getMDXComponents() {
	return {
		h1: (props: React.HTMLAttributes<HTMLHeadingElement>) =>
			createElement("h1", {
				...props,
				className: "scroll-m-20 text-4xl font-bold tracking-tight",
				id: slugify(String(props.children)),
			}),
		h2: (props: React.HTMLAttributes<HTMLHeadingElement>) =>
			createElement("h2", {
				...props,
				className:
					"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10",
				id: slugify(String(props.children)),
			}),
		h3: (props: React.HTMLAttributes<HTMLHeadingElement>) =>
			createElement("h3", {
				...props,
				className: "scroll-m-20 text-2xl font-semibold tracking-tight mt-8",
				id: slugify(String(props.children)),
			}),
		h4: (props: React.HTMLAttributes<HTMLHeadingElement>) =>
			createElement("h4", {
				...props,
				className: "scroll-m-20 text-xl font-semibold tracking-tight mt-6",
				id: slugify(String(props.children)),
			}),
		p: (props: React.HTMLAttributes<HTMLParagraphElement>) =>
			createElement("p", {
				...props,
				className: "leading-7 [&:not(:first-child)]:mt-6",
			}),
		ul: (props: React.HTMLAttributes<HTMLUListElement>) =>
			createElement("ul", {
				...props,
				className: "my-6 ml-6 list-disc [&>li]:mt-2",
			}),
		ol: (props: React.HTMLAttributes<HTMLOListElement>) =>
			createElement("ol", {
				...props,
				className: "my-6 ml-6 list-decimal [&>li]:mt-2",
			}),
		li: (props: React.HTMLAttributes<HTMLLIElement>) => createElement("li", { ...props }),
		blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) =>
			createElement("blockquote", {
				...props,
				className: "mt-6 border-l-2 pl-6 italic",
			}),
		code: (props: React.HTMLAttributes<HTMLElement>) => {
			// Check if this is an inline code or a code block
			const isInline = typeof props.children === "string"
			if (isInline) {
				return createElement("code", {
					...props,
					className:
						"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
				})
			}
			return createElement("code", { ...props })
		},
		pre: (props: React.HTMLAttributes<HTMLPreElement>) =>
			createElement("pre", {
				...props,
				className: "mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
			}),
		a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
			createElement("a", {
				...props,
				className: "font-medium text-primary underline underline-offset-4",
			}),
		table: (props: React.HTMLAttributes<HTMLTableElement>) =>
			createElement(
				"div",
				{ className: "my-6 w-full overflow-y-auto" },
				createElement("table", { ...props, className: "w-full" }),
			),
		tr: (props: React.HTMLAttributes<HTMLTableRowElement>) =>
			createElement("tr", {
				...props,
				className: "m-0 border-t p-0 even:bg-muted",
			}),
		th: (props: React.HTMLAttributes<HTMLTableCellElement>) =>
			createElement("th", {
				...props,
				className:
					"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
			}),
		td: (props: React.HTMLAttributes<HTMLTableCellElement>) =>
			createElement("td", {
				...props,
				className:
					"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
			}),
		hr: () => createElement("hr", { className: "my-4 md:my-8" }),
		img: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
			createElement("img", {
				...props,
				className: "rounded-md border",
			}),
	}
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
}
