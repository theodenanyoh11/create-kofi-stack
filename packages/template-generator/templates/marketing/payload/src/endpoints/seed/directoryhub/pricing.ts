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
									text: "Plans that grow with you",
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
									text: "Start free. Upgrade as your team scales. No hidden fees, no surprises.",
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
						description: "Perfect for trying SaaSify",
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
						description: "For small teams getting started",
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
						description: "For teams ready to scale",
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
				headline: "Trusted by 10,000+ teams worldwide",
				subtext:
					"Join thousands of teams who have transformed how they work with SaaSify",
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
						title: "Intuitive Interface",
						description: createParagraph("Clean, modern design that's easy to use."),
					},
					{
						size: "small",
						style: "default",
						icon: "zap",
						title: "Fast Performance",
						description: createParagraph("Lightning-fast load times, globally."),
					},
					{
						size: "small",
						style: "default",
						icon: "shield",
						title: "Enterprise Security",
						description: createParagraph("SOC 2 compliant with encryption."),
					},
					{
						size: "small",
						style: "default",
						icon: "globe",
						title: "99.9% Uptime",
						description: createParagraph("Reliable infrastructure you can count on."),
					},
					{
						size: "small",
						style: "default",
						icon: "layers",
						title: "Integrations",
						description: createParagraph("Connect with 100+ tools you use."),
					},
					{
						size: "small",
						style: "default",
						icon: "users",
						title: "Collaboration",
						description: createParagraph("Real-time teamwork made simple."),
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
							label: "Start Free Trial",
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
										text: "Ready to get started?",
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
				"Simple, transparent pricing for SaaSify. Start free, scale as your team grows. Plans from $0 to enterprise.",
			title: "Pricing — SaaSify",
		},
		title: "Pricing",
	}
}
