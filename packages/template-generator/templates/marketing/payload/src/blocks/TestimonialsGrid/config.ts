import type { Block } from "payload"

export const TestimonialsGrid: Block = {
	slug: "testimonialsGrid",
	interfaceName: "TestimonialsGridBlock",
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
			name: "testimonials",
			type: "array",
			label: "Testimonials",
			minRows: 1,
			maxRows: 6,
			fields: [
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					label: "Background Image",
					admin: {
						description: "Stock photo or image for the testimonial card background",
					},
				},
				{
					name: "stat",
					type: "text",
					label: "Stat Number",
					required: true,
					admin: {
						description: 'e.g., "94.4%" or "+300%"',
					},
				},
				{
					name: "statLabel",
					type: "text",
					label: "Stat Label",
					required: true,
					admin: {
						description: 'e.g., "SMS deliverability improved"',
					},
				},
				{
					name: "quote",
					type: "textarea",
					label: "Quote",
					admin: {
						description: "Optional testimonial quote",
					},
				},
				{
					name: "author",
					type: "text",
					label: "Author Name",
				},
				{
					name: "company",
					type: "text",
					label: "Company Name",
				},
			],
		},
	],
	labels: {
		plural: "Testimonials Grids",
		singular: "Testimonials Grid",
	},
}
