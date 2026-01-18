import type { Block } from "payload"

import { linkGroup } from "@/fields/linkGroup"

export const FinalCTA: Block = {
	slug: "finalCta",
	interfaceName: "FinalCTABlock",
	fields: [
		{
			name: "headline",
			type: "text",
			label: "Headline",
			required: true,
		},
		{
			name: "subheading",
			type: "textarea",
			label: "Subheading",
		},
		linkGroup({
			appearances: ["default", "outline"],
			overrides: {
				maxRows: 3,
			},
		}),
		{
			name: "backgroundImage",
			type: "upload",
			relationTo: "media",
			label: "Background Image",
			admin: {
				description: "Optional background image (e.g., person working at desk)",
			},
		},
		{
			name: "style",
			type: "select",
			defaultValue: "dark",
			options: [
				{ label: "Dark Background", value: "dark" },
				{ label: "Light Background", value: "light" },
				{ label: "Gradient Background", value: "gradient" },
			],
		},
	],
	labels: {
		plural: "Final CTAs",
		singular: "Final CTA",
	},
}
