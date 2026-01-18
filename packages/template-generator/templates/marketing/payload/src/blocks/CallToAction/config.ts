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

import { linkGroup } from "../../fields/linkGroup"

export const CallToAction: Block = {
	slug: "cta",
	interfaceName: "CallToActionBlock",
	fields: [
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
			appearances: ["default", "outline"],
			overrides: {
				maxRows: 2,
			},
		}),
	],
	labels: {
		plural: "Calls to Action",
		singular: "Call to Action",
	},
}
