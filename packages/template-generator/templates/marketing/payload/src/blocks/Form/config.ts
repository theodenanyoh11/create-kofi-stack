import type { Block } from "payload"

import {
	AlignFeature,
	BlockquoteFeature,
	ChecklistFeature,
	EXPERIMENTAL_TableFeature,
	FixedToolbarFeature,
	HeadingFeature,
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

export const FormBlock: Block = {
	slug: "formBlock",
	interfaceName: "FormBlock",
	fields: [
		{
			name: "form",
			type: "relationship",
			relationTo: "forms",
			required: true,
		},
		{
			name: "enableIntro",
			type: "checkbox",
			label: "Enable Intro Content",
		},
		{
			name: "introContent",
			type: "richText",
			admin: {
				condition: (_, { enableIntro }) => Boolean(enableIntro),
			},
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
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
			label: "Intro Content",
		},
	],
	graphQL: {
		singularName: "FormBlock",
	},
	labels: {
		plural: "Form Blocks",
		singular: "Form Block",
	},
}
