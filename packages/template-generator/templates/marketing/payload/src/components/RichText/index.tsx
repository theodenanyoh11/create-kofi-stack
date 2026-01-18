import { MediaBlock } from "@/blocks/MediaBlock/Component"
import type {
	DefaultNodeTypes,
	DefaultTypedEditorState,
	SerializedBlockNode,
	SerializedLinkNode,
	SerializedRelationshipNode,
} from "@payloadcms/richtext-lexical"
import {
	RichText as ConvertRichText,
	type JSXConvertersFunction,
	LinkJSXConverter,
} from "@payloadcms/richtext-lexical/react"

import { CodeBlock, type CodeBlockProps } from "@/blocks/Code/Component"

import { BannerBlock } from "@/blocks/Banner/Component"
import { CallToActionBlock } from "@/blocks/CallToAction/Component"
import type {
	BannerBlock as BannerBlockProps,
	CallToActionBlock as CTABlockProps,
	MediaBlock as MediaBlockProps,
	Page,
	Post,
} from "@/payload-types"
import { cn } from "@/utilities/ui"
import Link from "next/link"

type NodeTypes =
	| DefaultNodeTypes
	| SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
	const { value, relationTo } = linkNode.fields.doc!
	if (typeof value !== "object") {
		throw new Error("Expected value to be an object")
	}
	const slug = value.slug
	return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`
}

/**
 * Renders relationship nodes embedded in rich text content.
 * These are created when using the RelationshipFeature in Lexical editor.
 */
const RelationshipComponent = ({ node }: { node: SerializedRelationshipNode }) => {
	const { relationTo, value } = node

	// If value is not populated (just an ID), we can't render it
	if (typeof value !== "object" || value === null) {
		return null
	}

	// Handle different collection types
	switch (relationTo) {
		case "posts": {
			const post = value as Post
			return (
				<Link
					href={`/posts/${post.slug}`}
					className="not-prose my-4 block rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent"
				>
					<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
						Related Post
					</span>
					<h4 className="mt-1 font-semibold text-foreground">{post.title}</h4>
					{post.meta?.description && (
						<p className="mt-1 text-sm text-muted-foreground line-clamp-2">
							{post.meta.description}
						</p>
					)}
				</Link>
			)
		}
		case "pages": {
			const page = value as Page
			return (
				<Link
					href={`/${page.slug}`}
					className="not-prose my-4 block rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent"
				>
					<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
						Related Page
					</span>
					<h4 className="mt-1 font-semibold text-foreground">{page.title}</h4>
				</Link>
			)
		}
		default: {
			// Fallback for other collection types - render basic info if available
			const doc = value as { title?: string; name?: string; slug?: string }
			const title = doc.title || doc.name || "Related Content"
			return (
				<div className="not-prose my-4 rounded-lg border border-border bg-card p-4">
					<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
						{relationTo}
					</span>
					<h4 className="mt-1 font-semibold text-foreground">{title}</h4>
				</div>
			)
		}
	}
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
	...defaultConverters,
	...LinkJSXConverter({ internalDocToHref }),
	// Add relationship node converter - this is missing from defaultConverters
	relationship: ({ node }) => <RelationshipComponent node={node} />,
	blocks: {
		banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
		mediaBlock: ({ node }) => (
			<MediaBlock
				className="col-start-1 col-span-3"
				imgClassName="m-0"
				{...node.fields}
				captionClassName="mx-auto max-w-[48rem]"
				enableGutter={false}
				disableInnerContainer={true}
			/>
		),
		code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
		cta: ({ node }) => <CallToActionBlock {...node.fields} />,
	},
})

type Props = {
	data: DefaultTypedEditorState
	enableGutter?: boolean
	enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
	const { className, enableProse = true, enableGutter = true, ...rest } = props
	return (
		<ConvertRichText
			converters={jsxConverters}
			className={cn(
				"payload-richtext",
				{
					container: enableGutter,
					"prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:not-italic prose-li:marker:text-muted-foreground":
						enableProse,
				},
				// max-w-none should come after prose to properly override
				!enableGutter && "max-w-none",
				className,
			)}
			{...rest}
		/>
	)
}
