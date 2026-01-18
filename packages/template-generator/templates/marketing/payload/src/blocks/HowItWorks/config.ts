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

export const HowItWorks: Block = {
	slug: "howItWorks",
	interfaceName: "HowItWorksBlock",
	fields: [
		{
			name: "heading",
			type: "text",
			label: "Section Heading",
			defaultValue: "How It Works",
		},
		{
			name: "subheading",
			type: "textarea",
			label: "Section Subheading",
		},
		{
			name: "steps",
			type: "array",
			label: "Steps",
			minRows: 1,
			maxRows: 6,
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
				},
				{
					name: "description",
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
				},
				{
					name: "media",
					type: "upload",
					relationTo: "media",
					label: "Step Image (optional)",
				},
			],
		},
	],
	labels: {
		plural: "How It Works Sections",
		singular: "How It Works",
	},
}
