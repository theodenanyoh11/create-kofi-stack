import { getDocBySlug, getDocsFromConvex } from "@/lib/docs-source"
import { compileMDX } from "@/lib/mdx"
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

// Make this route dynamic so new docs appear immediately without rebuild
// This ensures docs added via admin portal show up right away
export const dynamic = "force-dynamic"

interface DocsPageProps {
	params: Promise<{
		slug?: string[]
	}>
}

export default async function Page({ params }: DocsPageProps) {
	const { slug } = await params
	const slugPath = slug?.join("/") || ""

	// If this is the index page (no slug), check for an "index" doc first
	if (!slugPath) {
		// Try to find a doc with slug "index" to use as the home page
		const indexDoc = await getDocBySlug("index")

		if (indexDoc) {
			// Found an index doc, render it as the home page
			const { content, toc } = await compileMDX(indexDoc.content)
			return (
				<DocsPage toc={toc}>
					<DocsTitle>{indexDoc.title}</DocsTitle>
					{indexDoc.description && <DocsDescription>{indexDoc.description}</DocsDescription>}
					<DocsBody>{content}</DocsBody>
				</DocsPage>
			)
		}

		// No index doc found, check if there are other docs
		const docs = await getDocsFromConvex()

		// If there are docs, redirect to the first one
		if (docs.length > 0 && docs[0]) {
			redirect(`/docs/${docs[0].slug}`)
		}

		// Otherwise show an empty state
		return (
			<DocsPage>
				<DocsTitle>Documentation</DocsTitle>
				<DocsDescription>Welcome to DirectoryHub documentation</DocsDescription>
				<DocsBody>
					<div className="flex flex-col items-center justify-center py-12 text-center">
						<h2 className="text-xl font-semibold mb-4">No documentation yet</h2>
						<p className="text-muted-foreground mb-6">
							Documentation is coming soon. Check back later!
						</p>
						<Link
							href="/"
							className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
						>
							Back to Home
						</Link>
					</div>
				</DocsBody>
			</DocsPage>
		)
	}

	// Try to find the doc
	const doc = await getDocBySlug(slugPath)

	if (!doc) {
		notFound()
	}

	// Compile MDX content
	const { content, toc } = await compileMDX(doc.content)

	return (
		<DocsPage toc={toc}>
			<DocsTitle>{doc.title}</DocsTitle>
			{doc.description && <DocsDescription>{doc.description}</DocsDescription>}
			<DocsBody>{content}</DocsBody>
		</DocsPage>
	)
}

// Removed generateStaticParams to make route fully dynamic
// This allows new docs to appear immediately without requiring a rebuild
// export async function generateStaticParams() {
// 	const slugs = await getAllDocSlugs()
// 	return [{ slug: [] }, ...slugs.map((slug) => ({ slug }))]
// }

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
	const { slug } = await params
	const slugPath = slug?.join("/") || "index"

	const doc = await getDocBySlug(slugPath)

	if (!doc) {
		return {
			title: "Documentation | DirectoryHub",
		}
	}

	return {
		title: `${doc.title} | DirectoryHub Docs`,
		description: doc.description || `Learn about ${doc.title} in DirectoryHub documentation.`,
		openGraph: {
			title: `${doc.title} | DirectoryHub Docs`,
			description: doc.description || `Learn about ${doc.title} in DirectoryHub documentation.`,
			type: "article",
		},
	}
}
