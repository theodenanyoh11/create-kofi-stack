import type { Block } from "payload"

export const LogoBanner: Block = {
	slug: "logoBanner",
	interfaceName: "LogoBannerBlock",
	fields: [
		{
			name: "heading",
			type: "text",
			label: "Heading",
			defaultValue: "Trusted by entrepreneurs worldwide",
		},
		{
			name: "logos",
			type: "array",
			label: "Logos",
			minRows: 1,
			maxRows: 12,
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
					label: "Company Name",
				},
				{
					name: "logo",
					type: "upload",
					relationTo: "media",
					label: "Logo Image",
				},
			],
		},
		{
			name: "style",
			type: "select",
			defaultValue: "scroll",
			options: [
				{ label: "Scrolling", value: "scroll" },
				{ label: "Static Grid", value: "grid" },
			],
		},
	],
	labels: {
		plural: "Logo Banners",
		singular: "Logo Banner",
	},
}
