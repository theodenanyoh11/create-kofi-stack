import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const marketplacesPage = (): Partial<Page> => {
	return {
		slug: "use-cases/marketplaces",
		_status: "published",
		title: "Marketplace Directory",
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
									text: "Launch your own multi-vendor marketplace",
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
									text: "Build a thriving marketplace with seller storefronts, product listings, and integrated payments. Featured placements and automated payouts help sellers succeed.",
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
						label: "Build your marketplace",
						url: "/sign-up",
					},
				},
				{
					link: {
						type: "custom",
						appearance: "outline",
						label: "See marketplace templates",
						url: "/templates",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Seller Storefronts",
				label: "Seller Profiles",
				headline: "Beautiful storefronts for every seller",
				description: createParagraph(
					"Each seller gets their own storefront with branding, product showcase, and reviews. Customers can browse by seller or discover products across the entire marketplace.",
				),
				link: {
					type: "custom",
					label: "See seller features",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Customizable seller pages" },
					{ text: "Product galleries and catalogs" },
					{ text: "Seller ratings and reviews" },
					{ text: "Contact and inquiry forms" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Product Listings",
				label: "Product Management",
				headline: "Comprehensive product listing tools",
				description: createParagraph(
					"Sellers can add products with images, variants, pricing, and inventory. Built-in categories and search help customers find exactly what they're looking for.",
				),
				link: {
					type: "custom",
					label: "Explore product features",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Multiple product images" },
					{ text: "Variants and options" },
					{ text: "Inventory tracking" },
					{ text: "Category organization" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Payments",
				label: "Marketplace Payments",
				headline: "Integrated payments with automated payouts",
				description: createParagraph(
					"Process payments through Stripe with automatic seller payouts. Set your marketplace commission, handle refunds, and track revenue all in one place.",
				),
				link: {
					type: "custom",
					label: "Learn about payments",
					url: "/features/monetization",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Stripe Connect integration" },
					{ text: "Automated seller payouts" },
					{ text: "Configurable commission rates" },
					{ text: "Refund management" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Marketplace Features",
				heading: "Everything you need for a thriving marketplace",
				subheading: "Tools for sellers to succeed and buyers to discover",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "dollarSign",
						stat: "$2M+",
						title: "Revenue Processed",
						description: createParagraph("Marketplaces generating real revenue."),
					},
					{
						size: "small",
						style: "accent",
						icon: "dollarSign",
						title: "Seller Dashboard",
						description: createParagraph("Analytics and management for sellers."),
					},
					{
						size: "small",
						style: "default",
						icon: "rocket",
						title: "Featured Slots",
						description: createParagraph("Premium placement for top sellers."),
					},
					{
						size: "small",
						style: "primary",
						icon: "shield",
						title: "Buyer Protection",
						description: createParagraph("Dispute resolution and guarantees."),
					},
					{
						size: "small",
						style: "default",
						icon: "search",
						title: "Smart Search",
						description: createParagraph("AI-powered product discovery."),
					},
					{
						size: "small",
						style: "default",
						icon: "barChart",
						title: "Market Analytics",
						description: createParagraph("Trends, sales data, and insights."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Launch your marketplace today",
				subtext:
					"From niche products to local services, build the marketplace your community needs.",
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
							label: "See pricing",
							url: "/pricing",
						},
					},
				],
			},
		],
		meta: {
			description:
				"Build a multi-vendor marketplace with seller storefronts, product listings, and integrated payments. Automated payouts and featured placements included.",
			title: "Marketplace Directory — DirectoryHub Use Case",
		},
	}
}
