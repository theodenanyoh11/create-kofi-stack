import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const b2bVendorHubsPage = (): Partial<Page> => {
	return {
		slug: "use-cases/b2b-vendor-hubs",
		_status: "published",
		title: "B2B Vendor Hub",
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
									text: "Create the definitive vendor directory for your industry",
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
									text: "Help businesses find SaaS tools, agencies, consultants, and service providers. Advanced filtering, comparison views, and lead capture that convert browsers into buyers.",
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
						label: "Build your directory",
						url: "/sign-up",
					},
				},
				{
					link: {
						type: "custom",
						appearance: "outline",
						label: "See B2B templates",
						url: "/templates",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Advanced Filtering",
				label: "Smart Filtering",
				headline: "Find the right vendor with advanced filters",
				description: createParagraph(
					"Let buyers filter by pricing, features, integrations, company size, and more. Multi-select filters and faceted search help decision-makers narrow down options quickly.",
				),
				link: {
					type: "custom",
					label: "See filtering options",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Multi-attribute filtering" },
					{ text: "Price range sliders" },
					{ text: "Feature checkboxes" },
					{ text: "Integration compatibility" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Comparison Views",
				label: "Vendor Comparison",
				headline: "Side-by-side vendor comparison",
				description: createParagraph(
					"Help buyers evaluate options with comparison tables. Users can select vendors and compare features, pricing, and ratings in a clear side-by-side view.",
				),
				link: {
					type: "custom",
					label: "See comparison features",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Side-by-side comparison" },
					{ text: "Feature matrix tables" },
					{ text: "Save comparisons" },
					{ text: "Share comparison links" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Lead Capture",
				label: "Lead Generation",
				headline: "Capture and qualify B2B leads",
				description: createParagraph(
					"Built-in lead capture forms collect buyer information and route it to vendors. Track inquiries, measure conversion, and help vendors close deals faster.",
				),
				link: {
					type: "custom",
					label: "Learn about lead capture",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Custom inquiry forms" },
					{ text: "Lead qualification fields" },
					{ text: "Vendor notification emails" },
					{ text: "Lead analytics dashboard" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "B2B Features",
				heading: "Purpose-built for B2B directories",
				subheading: "Features that help businesses evaluate and connect with vendors",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "building",
						stat: "94%",
						title: "Faster Onboarding",
						description: createParagraph("Smart filters accelerate vendor discovery."),
					},
					{
						size: "small",
						style: "accent",
						icon: "layers",
						title: "Rich Profiles",
						description: createParagraph("Detailed vendor info, case studies, and integrations."),
					},
					{
						size: "small",
						style: "default",
						icon: "target",
						title: "Buyer Intent",
						description: createParagraph("Track which vendors buyers are researching."),
					},
					{
						size: "small",
						style: "primary",
						icon: "barChart",
						title: "Market Insights",
						description: createParagraph("Category trends and vendor rankings."),
					},
					{
						size: "small",
						style: "default",
						icon: "users",
						title: "Vendor Reviews",
						description: createParagraph("Verified B2B reviews from real customers."),
					},
					{
						size: "small",
						style: "default",
						icon: "zap",
						title: "Demo Requests",
						description: createParagraph("One-click demo scheduling integration."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Launch your B2B vendor directory",
				subtext: "Become the go-to resource for businesses in your industry. Start building today.",
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
							label: "Talk to sales",
							url: "/contact",
						},
					},
				],
			},
		],
		meta: {
			description:
				"Build a B2B vendor directory with advanced filtering, comparison views, and lead capture. Help businesses find SaaS tools, agencies, and consultants.",
			title: "B2B Vendor Hub — DirectoryHub Use Case",
		},
	}
}
