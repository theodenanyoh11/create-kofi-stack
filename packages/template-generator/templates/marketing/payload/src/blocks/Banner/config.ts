import type { Block } from "payload"

import {
	AlignFeature,
	BlockquoteFeature,
	ChecklistFeature,
	EXPERIMENTAL_TableFeature,
	FixedToolbarFeature,
	IndentFeature,
	InlineCodeFeature,
	InlineToolbarFeature,
	OrderedListFeature,
	RelationshipFeature,
	StrikethroughFeature,
	SubscriptFeature,
	SuperscriptFeature,
	UnorderedListFeature,
	UploadFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical"

export const Banner: Block = {
	slug: "banner",
	fields: [
		{
			name: "style",
			type: "select",
			defaultValue: "info",
			options: [
				{ label: "Info", value: "info" },
				{ label: "Warning", value: "warning" },
				{ label: "Error", value: "error" },
				{ label: "Success", value: "success" },
			],
			required: true,
		},
		{
			name: "content",
			type: "richText",
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						FixedToolbarFeature(),
						InlineToolbarFeature(),
						StrikethroughFeature(),
						SubscriptFeature(),
						SuperscriptFeature(),
						InlineCodeFeature(),
						BlockquoteFeature(),
						UnorderedListFeature(),
						OrderedListFeature(),
						ChecklistFeature(),
						AlignFeature(),
						IndentFeature(),
						RelationshipFeature(),
						UploadFeature(),
						EXPERIMENTAL_TableFeature(),
					]
				},
			}),
			label: false,
			required: true,
		},
	],
	interfaceName: "BannerBlock",
}
