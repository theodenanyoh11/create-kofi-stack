import type { Block } from "payload"

import { linkGroup } from "../../fields/linkGroup"

export const ProofBanner: Block = {
	slug: "proofBanner",
	interfaceName: "ProofBannerBlock",
	fields: [
		{
			name: "style",
			type: "select",
			defaultValue: "centered",
			options: [
				{ label: "Centered", value: "centered" },
				{ label: "With Background", value: "withBackground" },
				{ label: "Minimal", value: "minimal" },
			],
		},
		{
			name: "headline",
			type: "text",
			required: true,
			label: "Headline",
		},
		{
			name: "subtext",
			type: "textarea",
			label: "Supporting Text",
		},
		linkGroup({
			appearances: ["default", "outline"],
			overrides: {
				maxRows: 2,
				label: "CTA Buttons (optional)",
			},
		}),
	],
	labels: {
		plural: "Proof Banners",
		singular: "Proof Banner",
	},
}
