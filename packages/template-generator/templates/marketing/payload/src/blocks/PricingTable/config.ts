import type { Block } from "payload"

import { link } from "@/fields/link"

export const PricingTable: Block = {
	slug: "pricingTable",
	interfaceName: "PricingTableBlock",
	fields: [
		{
			name: "heading",
			type: "text",
			label: "Section Heading",
			defaultValue: "Simple, Transparent Pricing",
		},
		{
			name: "subheading",
			type: "textarea",
			label: "Section Subheading",
		},
		{
			name: "useDynamicPricing",
			type: "checkbox",
			label: "Use Dynamic Pricing from Stripe",
			defaultValue: true,
			admin: {
				description:
					"When enabled, prices and features are fetched dynamically from Stripe Entitlements. CMS plans below are used as fallback and for CTA links.",
			},
		},
		{
			name: "showComparisonTable",
			type: "checkbox",
			label: "Show Feature Comparison Table",
			defaultValue: true,
			admin: {
				description:
					"Display a full feature comparison table below the pricing cards (requires dynamic pricing)",
			},
		},
		{
			name: "showViewAllLink",
			type: "checkbox",
			label: "Show 'View Full Comparison' Link",
			defaultValue: false,
			admin: {
				description:
					"Show a link to the /pricing page for full comparison (useful for home page where comparison table is hidden)",
			},
		},
		{
			name: "maxFeaturesOnCard",
			type: "number",
			label: "Max Features on Card",
			defaultValue: 4,
			admin: {
				description: "Maximum number of features to show on each pricing card (default: 4)",
			},
		},
		{
			name: "plans",
			type: "array",
			label: "Pricing Plans",
			minRows: 1,
			maxRows: 4,
			admin: {
				description:
					"When using dynamic pricing, only the CTA links from these plans are used. Prices and features come from Stripe.",
			},
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
					label: "Plan Name",
					admin: {
						description: "Must match Stripe plan name (Free, Pro, Business) for CTA link mapping",
					},
				},
				{
					name: "price",
					type: "text",
					required: true,
					label: "Price",
					admin: {
						description:
							'e.g., "$29/mo" or "Custom" - Only used as fallback when dynamic pricing is disabled',
					},
				},
				{
					name: "description",
					type: "textarea",
					label: "Plan Description",
					admin: {
						description: "Only used as fallback when dynamic pricing is disabled",
					},
				},
				{
					name: "featured",
					type: "checkbox",
					label: "Featured Plan",
					defaultValue: false,
					admin: {
						description: "Only used as fallback when dynamic pricing is disabled",
					},
				},
				{
					name: "features",
					type: "array",
					label: "Features",
					admin: {
						description: "Only used as fallback when dynamic pricing is disabled",
					},
					fields: [
						{
							name: "feature",
							type: "text",
							required: true,
						},
						{
							name: "included",
							type: "checkbox",
							defaultValue: true,
						},
					],
				},
				link({
					overrides: {
						label: "CTA Button",
						admin: {
							description:
								"The call-to-action button link - used for both dynamic and static pricing",
						},
					},
				}),
			],
		},
	],
	labels: {
		plural: "Pricing Tables",
		singular: "Pricing Table",
	},
}
