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

export const Archive: Block = {
	slug: "archive",
	interfaceName: "ArchiveBlock",
	fields: [
		{
			name: "introContent",
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
			label: "Intro Content",
		},
		{
			name: "populateBy",
			type: "select",
			defaultValue: "collection",
			options: [
				{
					label: "Collection",
					value: "collection",
				},
				{
					label: "Individual Selection",
					value: "selection",
				},
			],
		},
		{
			name: "relationTo",
			type: "select",
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === "collection",
			},
			defaultValue: "posts",
			label: "Collections To Show",
			options: [
				{
					label: "Posts",
					value: "posts",
				},
			],
		},
		{
			name: "categories",
			type: "relationship",
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === "collection",
			},
			hasMany: true,
			label: "Categories To Show",
			relationTo: "categories",
		},
		{
			name: "limit",
			type: "number",
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === "collection",
				step: 1,
			},
			defaultValue: 10,
			label: "Limit",
		},
		{
			name: "selectedDocs",
			type: "relationship",
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === "selection",
			},
			hasMany: true,
			label: "Selection",
			relationTo: ["posts"],
		},
	],
	labels: {
		plural: "Archives",
		singular: "Archive",
	},
}
