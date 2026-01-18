import type { Field } from "payload"

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

import { linkGroup } from "@/fields/linkGroup"

export const hero: Field = {
	name: "hero",
	type: "group",
	fields: [
		{
			name: "type",
			type: "select",
			defaultValue: "lowImpact",
			label: "Type",
			options: [
				{
					label: "None",
					value: "none",
				},
				{
					label: "Product Showcase",
					value: "productShowcase",
				},
				{
					label: "High Impact",
					value: "highImpact",
				},
				{
					label: "Medium Impact",
					value: "mediumImpact",
				},
				{
					label: "Low Impact",
					value: "lowImpact",
				},
			],
			required: true,
		},
		{
			name: "richText",
			type: "richText",
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
			label: false,
		},
		linkGroup({
			overrides: {
				maxRows: 2,
			},
		}),
		{
			name: "media",
			type: "upload",
			admin: {
				condition: (_, { type } = {}) =>
					["highImpact", "mediumImpact", "productShowcase"].includes(type),
			},
			relationTo: "media",
			required: false,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			validate: (value: any, { siblingData }: { siblingData?: { type?: string } }) => {
				if (["highImpact", "mediumImpact"].includes(siblingData?.type ?? "") && !value) {
					return "Media is required for high impact and medium impact hero types"
				}
				return true
			},
		},
		{
			name: "backgroundMedia",
			type: "upload",
			admin: {
				condition: (_, { type } = {}) => type === "productShowcase",
				description: "Optional background illustration. Falls back to default if not set.",
			},
			relationTo: "media",
			required: false,
			label: "Background Image",
		},
	],
	label: false,
}
