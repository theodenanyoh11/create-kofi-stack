import type { Block } from "payload"

export const FAQAccordion: Block = {
	slug: "faqAccordion",
	interfaceName: "FAQAccordionBlock",
	labels: {
		singular: "FAQ Accordion",
		plural: "FAQ Accordions",
	},
	fields: [
		{
			name: "heading",
			type: "text",
			label: "Section Heading",
			defaultValue: "Frequently Asked Questions",
		},
		{
			name: "subheading",
			type: "textarea",
			label: "Section Subheading",
		},
		{
			name: "style",
			type: "select",
			defaultValue: "default",
			options: [
				{ label: "Default", value: "default" },
				{ label: "Centered", value: "centered" },
				{ label: "Two Column", value: "twoColumn" },
			],
			admin: {
				description: "Layout style for the FAQ section",
			},
		},
		{
			name: "faqs",
			type: "relationship",
			relationTo: "faqs",
			hasMany: true,
			label: "FAQs to Display",
			admin: {
				description: "Select FAQs to display in this section. Leave empty to show all FAQs.",
			},
		},
		{
			name: "filterByCategory",
			type: "select",
			label: "Filter by Category",
			options: [
				{ label: "All Categories", value: "all" },
				{ label: "General", value: "general" },
				{ label: "Pricing", value: "pricing" },
				{ label: "Features", value: "features" },
				{ label: "Getting Started", value: "getting-started" },
				{ label: "Technical", value: "technical" },
				{ label: "Support", value: "support" },
			],
			defaultValue: "all",
			admin: {
				condition: (data, siblingData) => !siblingData?.faqs?.length,
				description: "Only used when no specific FAQs are selected",
			},
		},
		{
			name: "maxItems",
			type: "number",
			label: "Maximum Items",
			defaultValue: 10,
			admin: {
				condition: (data, siblingData) => !siblingData?.faqs?.length,
				description: "Maximum number of FAQs to display (only when using category filter)",
			},
		},
	],
}
