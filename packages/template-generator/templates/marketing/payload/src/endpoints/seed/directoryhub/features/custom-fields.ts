import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const customFieldsPage = (): Partial<Page> => {
	return {
		slug: "features/custom-fields",
		_status: "published",
		title: "Custom Fields",
		hero: {
			type: "lowImpact",
			richText: {
				root: {
					type: "root",
					children: [
						{
							type: "heading",
							children: [
								{
									type: "text",
									detail: 0,
									format: 0,
									mode: "normal",
									style: "",
									text: "Flexible schemas for any directory type",
									version: 1,
								},
							],
							direction: "ltr" as const,
							format: "" as const,
							indent: 0,
							tag: "h1",
							version: 1,
						},
						{
							type: "paragraph",
							children: [
								{
									type: "text",
									detail: 0,
									format: 0,
									mode: "normal",
									style: "",
									text: "Create custom fields that match your niche perfectly. Text, numbers, dropdowns, images, locations, and more. Build the exact data structure your directory needs.",
									version: 1,
								},
							],
							direction: "ltr" as const,
							format: "" as const,
							indent: 0,
							textFormat: 0,
							version: 1,
						},
					],
					direction: "ltr" as const,
					format: "" as const,
					indent: 0,
					version: 1,
				},
			},
			links: [
				{
					link: {
						type: "custom",
						appearance: "default",
						label: "Start building",
						url: "/sign-up",
					},
				},
				{
					link: {
						type: "custom",
						appearance: "outline",
						label: "See field types",
						url: "/features",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Field Types",
				label: "Rich Field Types",
				headline: "Every field type you need",
				description: createParagraph(
					"From simple text and numbers to complex relationships and media galleries. Choose from 20+ field types to capture exactly the data your directory requires.",
				),
				link: {
					type: "custom",
					label: "Explore field types",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Text, rich text, and numbers" },
					{ text: "Dropdowns and multi-select" },
					{ text: "Images and file uploads" },
					{ text: "Location and map fields" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Dynamic Filtering",
				label: "Smart Filters",
				headline: "Custom fields power smart filtering",
				description: createParagraph(
					"Every custom field becomes a filterable attribute. Users can search and filter by any field you create, making it easy to find exactly what they're looking for.",
				),
				link: {
					type: "custom",
					label: "See filtering in action",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Automatic filter generation" },
					{ text: "Range sliders for numbers" },
					{ text: "Multi-select tag filters" },
					{ text: "Location-based search" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Conditional Logic",
				label: "Conditional Fields",
				headline: "Show fields based on conditions",
				description: createParagraph(
					"Display different fields based on category, listing type, or user selections. Create smart forms that only show relevant fields to keep the submission process simple.",
				),
				link: {
					type: "custom",
					label: "Learn about conditions",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Category-specific fields" },
					{ text: "Conditional visibility rules" },
					{ text: "Dynamic form sections" },
					{ text: "Required field logic" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Custom Field Features",
				heading: "Build any directory schema",
				subheading: "No limitations on what data you can collect and display",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "layers",
						stat: "20+",
						title: "Field Types",
						description: createParagraph("Every data type you could need."),
					},
					{
						size: "small",
						style: "accent",
						icon: "settings",
						title: "Drag & Drop",
						description: createParagraph("Visual field builder interface."),
					},
					{
						size: "small",
						style: "default",
						icon: "search",
						title: "Searchable",
						description: createParagraph("All fields indexed for search."),
					},
					{
						size: "small",
						style: "primary",
						icon: "database",
						title: "Structured Data",
						description: createParagraph("Automatic schema.org mapping."),
					},
					{
						size: "small",
						style: "default",
						icon: "globe",
						title: "Multi-Language",
						description: createParagraph("Localized field labels and values."),
					},
					{
						size: "small",
						style: "default",
						icon: "shield",
						title: "Validation Rules",
						description: createParagraph("Required, format, and custom rules."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Build your perfect directory schema",
				subtext: "No coding required. Create custom fields in minutes and start collecting data.",
				links: [
					{
						link: {
							type: "custom",
							appearance: "default",
							label: "Start for free",
							url: "/sign-up",
						},
					},
					{
						link: {
							type: "custom",
							appearance: "outline",
							label: "See all features",
							url: "/features",
						},
					},
				],
			},
		],
		meta: {
			description:
				"Create custom fields for your directory with 20+ field types. Text, numbers, dropdowns, images, locations, and more. Build any schema without code.",
			title: "Custom Fields — DirectoryHub Flexible Schemas",
		},
	}
}
