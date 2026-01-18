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

export const BentoFeatures: Block = {
	slug: "bentoFeatures",
	interfaceName: "BentoFeaturesBlock",
	fields: [
		{
			name: "heading",
			type: "text",
			label: "Section Heading",
		},
		{
			name: "subheading",
			type: "textarea",
			label: "Section Subheading",
		},
		{
			name: "features",
			type: "array",
			label: "Bento Features",
			minRows: 1,
			maxRows: 8,
			fields: [
				{
					name: "size",
					type: "select",
					defaultValue: "small",
					options: [
						{ label: "Small (1x1)", value: "small" },
						{ label: "Medium (2x1)", value: "medium" },
						{ label: "Large (2x2)", value: "large" },
						{ label: "Tall (1x2)", value: "tall" },
					],
					admin: {
						description: "Card size in the bento grid",
					},
				},
				{
					name: "style",
					type: "select",
					defaultValue: "default",
					options: [
						{ label: "Default (Light)", value: "default" },
						{ label: "Primary (Navy)", value: "primary" },
						{ label: "Accent (Teal)", value: "accent" },
						{ label: "Gradient", value: "gradient" },
						{ label: "Warm (Orange/Rose)", value: "warm" },
						{ label: "Cool (Purple)", value: "cool" },
					],
				},
				{
					name: "icon",
					type: "select",
					options: [
						{ label: "None", value: "none" },
						{ label: "Rocket", value: "rocket" },
						{ label: "Zap", value: "zap" },
						{ label: "Building", value: "building" },
						{ label: "Target", value: "target" },
						{ label: "Layout", value: "layout" },
						{ label: "Star", value: "star" },
						{ label: "DollarSign", value: "dollarSign" },
						{ label: "Search", value: "search" },
						{ label: "Users", value: "users" },
						{ label: "Globe", value: "globe" },
						{ label: "Shield", value: "shield" },
						{ label: "Settings", value: "settings" },
						{ label: "Database", value: "database" },
						{ label: "BarChart", value: "barChart" },
						{ label: "Layers", value: "layers" },
					],
				},
				{
					name: "stat",
					type: "text",
					label: "Stat/Number",
					admin: {
						description: 'Optional large stat to display (e.g., "5x", "99.9%")',
					},
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
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					label: "Background Image",
					admin: {
						description: "Optional background image for the card",
					},
				},
			],
		},
	],
	labels: {
		plural: "Bento Features",
		singular: "Bento Features",
	},
}
