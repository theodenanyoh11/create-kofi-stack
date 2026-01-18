import type { Block } from "payload"

import { link } from "@/fields/link"

export const IndustryTabs: Block = {
	slug: "industryTabs",
	interfaceName: "IndustryTabsBlock",
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
			name: "tabs",
			type: "array",
			label: "Industry Tabs",
			minRows: 2,
			maxRows: 6,
			fields: [
				{
					name: "name",
					type: "text",
					label: "Tab Name",
					required: true,
					admin: {
						description: 'e.g., "Ecommerce and Retail"',
					},
				},
				{
					name: "stat",
					type: "text",
					label: "Stat Number",
					required: true,
					admin: {
						description: 'e.g., "340%" or "$2M+"',
					},
				},
				{
					name: "statLabel",
					type: "text",
					label: "Stat Label",
					required: true,
					admin: {
						description: 'e.g., "Higher conversion rates"',
					},
				},
				{
					name: "description",
					type: "textarea",
					label: "Description",
				},
				{
					name: "media",
					type: "upload",
					relationTo: "media",
					label: "Tab Image",
					admin: {
						description: "Optional image/illustration for this tab (recommended: 800x600)",
					},
				},
				link({
					appearances: ["default", "outline"],
				}),
			],
		},
	],
	labels: {
		plural: "Industry Tabs",
		singular: "Industry Tabs",
	},
}
