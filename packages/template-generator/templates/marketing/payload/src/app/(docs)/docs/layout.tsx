import { buildPageTree, getDocsFromConvex } from "@/lib/docs-source"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { RootProvider } from "fumadocs-ui/provider"
import type { ReactNode } from "react"

// Make layout dynamic so navigation updates when new docs are added
export const dynamic = "force-dynamic"

export default async function DocsLayoutWrapper({
	children,
}: {
	children: ReactNode
}) {
	const docs = await getDocsFromConvex()
	const pageTree = buildPageTree(docs)

	return (
		<RootProvider
			theme={{
				enabled: true,
				defaultTheme: "light",
				attribute: "data-theme",
			}}
		>
			<DocsLayout
				tree={pageTree}
				nav={{
					title: "DirectoryHub Docs",
					url: "/docs",
				}}
				sidebar={{
					defaultOpenLevel: 1,
				}}
			>
				{children}
			</DocsLayout>
		</RootProvider>
	)
}
