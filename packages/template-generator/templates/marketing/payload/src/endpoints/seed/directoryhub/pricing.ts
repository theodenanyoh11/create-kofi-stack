import type { Page } from "@/payload-types"
import { createParagraph } from "./richtext-helper"

export const directoryHubPricing = (): Partial<Page> => {
	return {
		slug: "pricing",
		_status: "published",
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
									text: "Simple, Transparent Pricing",
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
									text: "Start free, scale as you grow. No hidden fees, no surprises.",
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
			links: [],
		},
		layout: [
			// Pricing Table - Fetches pricing and features dynamically from Stripe
			{
				blockType: "pricingTable",
				blockName: "Pricing Plans",
				heading: "Choose Your Plan",
				subheading: "Save 20% with annual billing.",
				showComparisonTable: true,
				showViewAllLink: false,
				maxFeaturesOnCard: 4,
				// CTA link mapping for dynamic pricing (plan names must match Stripe product names)
				plans: [
					{
						name: "Free",
						price: "$0/mo", // Fallback only
						description: "Perfect for testing your directory idea",
						featured: false,
						features: [], // Features come from Stripe Entitlements
						link: {
							type: "custom",
							label: "Get Started Free",
							url: "/sign-up",
						},
					},
					{
						name: "Pro",
						price: "$29/mo", // Fallback only
						description: "For launching your first directory",
						featured: false,
						features: [], // Features come from Stripe Entitlements
						link: {
							type: "custom",
							label: "Get Pro",
							url: "/sign-up",
						},
					},
					{
						name: "Business",
						price: "$79/mo", // Fallback only
						description: "For growing directory businesses",
						featured: true,
						features: [], // Features come from Stripe Entitlements
						link: {
							type: "custom",
							label: "Get Business",
							url: "/sign-up",
						},
					},
				],
			},
			// Trust Banner
			{
				blockType: "proofBanner",
				blockName: "Trust Section",
				style: "withBackground",
				headline: "Trusted by 500+ directory builders worldwide",
				subtext:
					"Join thousands of entrepreneurs building successful directories with DirectoryHub",
			},
			// Features Comparison
			{
				blockType: "bentoFeatures",
				blockName: "All Plans Include",
				heading: "Everything you need to succeed",
				subheading: "Core features included in every plan",
				features: [
					{
						size: "small",
						style: "default",
						icon: "layout",
						title: "Beautiful Templates",
						description: createParagraph("Professionally designed, mobile-first templates."),
					},
					{
						size: "small",
						style: "default",
						icon: "search",
						title: "SEO Optimization",
						description: createParagraph("Schema markup, sitemaps, and meta tags."),
					},
					{
						size: "small",
						style: "default",
						icon: "shield",
						title: "SSL Security",
						description: createParagraph("Free SSL certificates for all directories."),
					},
					{
						size: "small",
						style: "default",
						icon: "zap",
						title: "Fast Performance",
						description: createParagraph("CDN-powered for global speed."),
					},
					{
						size: "small",
						style: "default",
						icon: "globe",
						title: "Reliable Hosting",
						description: createParagraph("99.9% uptime with automatic scaling."),
					},
					{
						size: "small",
						style: "default",
						icon: "layers",
						title: "Easy Management",
						description: createParagraph("Intuitive dashboard for all your directories."),
					},
				],
			},
			// Final CTA
			{
				blockType: "cta",
				blockName: "Pricing CTA",
				links: [
					{
						link: {
							type: "custom",
							appearance: "default",
							label: "Start Building Free",
							url: "/sign-up",
						},
					},
					{
						link: {
							type: "custom",
							appearance: "outline",
							label: "Talk to Sales",
							url: "/contact",
						},
					},
				],
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
										text: "Ready to build your directory?",
										version: 1,
									},
								],
								direction: "ltr" as const,
								format: "" as const,
								indent: 0,
								tag: "h3",
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
										text: "Start free today. No credit card required. Upgrade when you're ready to scale.",
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
			},
		],
		meta: {
			description:
				"Simple, transparent pricing for DirectoryHub. Start free, scale as you grow. Plans from $0 to enterprise.",
			title: "Pricing — DirectoryHub Directory Builder",
		},
		title: "Pricing",
	}
}
