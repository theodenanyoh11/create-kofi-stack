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

export const Personas: Block = {
	slug: "personas",
	interfaceName: "PersonasBlock",
	fields: [
		{
			name: "heading",
			type: "text",
			label: "Section Heading",
			defaultValue: "Who It's For",
		},
		{
			name: "subheading",
			type: "textarea",
			label: "Section Subheading",
		},
		{
			name: "personas",
			type: "array",
			label: "Personas",
			minRows: 1,
			maxRows: 8,
			fields: [
				{
					name: "icon",
					type: "select",
					options: [
						{ label: "User", value: "user" },
						{ label: "Briefcase", value: "briefcase" },
						{ label: "Users", value: "users" },
						{ label: "Award", value: "award" },
						{ label: "Building", value: "building" },
						{ label: "Lightbulb", value: "lightbulb" },
						{ label: "TrendingUp", value: "trendingUp" },
						{ label: "Code", value: "code" },
					],
				},
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
			],
		},
	],
	labels: {
		plural: "Personas Sections",
		singular: "Personas",
	},
}
