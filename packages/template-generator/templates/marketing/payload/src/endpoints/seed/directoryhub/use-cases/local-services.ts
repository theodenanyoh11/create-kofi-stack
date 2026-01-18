import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const localServicesPage = (): Partial<Page> => {
	return {
		slug: "use-cases/local-services",
		_status: "published",
		title: "Local Services Directory",
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
									text: "Build the go-to directory for local services",
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
									text: "Help customers find trusted plumbers, electricians, restaurants, photographers, and more. Location-based search, reviews, and verified badges make it easy.",
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
						label: "Start your directory",
						url: "/sign-up",
					},
				},
				{
					link: {
						type: "custom",
						appearance: "outline",
						label: "See templates",
						url: "/templates",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Location Search",
				label: "Location-Based Discovery",
				headline: "Find services near you with map search",
				description: createParagraph(
					"Integrated maps let users search by location, view service areas, and get directions. Auto-detect location for instant local results. Perfect for plumbers, electricians, restaurants, and any location-based service.",
				),
				link: {
					type: "custom",
					label: "See location features",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Interactive map search" },
					{ text: "Service area boundaries" },
					{ text: "Distance-based filtering" },
					{ text: "Auto-detect user location" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Reviews",
				label: "Reviews & Ratings",
				headline: "Build trust with verified reviews",
				description: createParagraph(
					"Let customers leave reviews and ratings. Display aggregate scores, filter by rating, and highlight top-rated services. Verified reviews build trust and help great businesses stand out.",
				),
				link: {
					type: "custom",
					label: "Learn about reviews",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Star ratings and written reviews" },
					{ text: "Verified customer badges" },
					{ text: "Review moderation tools" },
					{ text: "Aggregate score display" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Categories",
				label: "Service Categories",
				headline: "Organize by service type",
				description: createParagraph(
					"Create unlimited service categories and subcategories. Users can browse by type or search across all services. Clean category navigation helps customers find exactly what they need.",
				),
				link: {
					type: "custom",
					label: "See category options",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Unlimited categories" },
					{ text: "Nested subcategories" },
					{ text: "Category icons and images" },
					{ text: "Featured category sections" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Local Services Features",
				heading: "Everything for local service directories",
				subheading: "Purpose-built features for connecting customers with local providers",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "globe",
						stat: "340%",
						title: "Higher Conversion",
						description: createParagraph("Location-based discovery drives action."),
					},
					{
						size: "small",
						style: "accent",
						icon: "users",
						title: "Business Profiles",
						description: createParagraph("Rich profiles with hours, services, and contact."),
					},
					{
						size: "small",
						style: "default",
						icon: "search",
						title: "Smart Search",
						description: createParagraph("Search by service, location, or keyword."),
					},
					{
						size: "small",
						style: "primary",
						icon: "shield",
						title: "Verified Badges",
						description: createParagraph("Highlight licensed and insured providers."),
					},
					{
						size: "small",
						style: "default",
						icon: "dollarSign",
						title: "Price Ranges",
						description: createParagraph("Display pricing tiers to set expectations."),
					},
					{
						size: "small",
						style: "default",
						icon: "zap",
						title: "Contact Forms",
						description: createParagraph("Lead capture directly from listings."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Launch your local services directory today",
				subtext:
					"Pick a template, customize for your market, and start connecting customers with local businesses.",
				links: [
					{
						link: {
							type: "custom",
							appearance: "default",
							label: "Get started free",
							url: "/sign-up",
						},
					},
					{
						link: {
							type: "custom",
							appearance: "outline",
							label: "View pricing",
							url: "/pricing",
						},
					},
				],
			},
		],
		meta: {
			description:
				"Build a local services directory with location search, reviews, and verified badges. Help customers find plumbers, electricians, restaurants, and more.",
			title: "Local Services Directory — DirectoryHub Use Case",
		},
	}
}
