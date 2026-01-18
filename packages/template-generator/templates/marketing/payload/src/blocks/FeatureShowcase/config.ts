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

import { link } from "@/fields/link"

export const FeatureShowcase: Block = {
	slug: "featureShowcase",
	interfaceName: "FeatureShowcaseBlock",
	fields: [
		{
			name: "label",
			type: "text",
			label: "Label Tag",
			admin: {
				description: 'Small label above the headline (e.g., "Marketing platform")',
			},
		},
		{
			name: "headline",
			type: "text",
			label: "Headline",
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
		link({
			appearances: ["default", "outline"],
		}),
		{
			name: "media",
			type: "upload",
			relationTo: "media",
			label: "Feature Image",
			admin: {
				description: "Large image showcasing the feature (recommended: 800x600 or larger)",
			},
		},
		{
			name: "imagePosition",
			type: "select",
			defaultValue: "right",
			options: [
				{ label: "Image on Right", value: "right" },
				{ label: "Image on Left", value: "left" },
			],
			label: "Image Position",
		},
		{
			name: "features",
			type: "array",
			label: "Feature Bullets",
			maxRows: 6,
			admin: {
				description: "Optional list of feature highlights",
			},
			fields: [
				{
					name: "text",
					type: "text",
					required: true,
				},
			],
		},
	],
	labels: {
		plural: "Feature Showcases",
		singular: "Feature Showcase",
	},
}
