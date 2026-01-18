import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const monetizationPage = (): Partial<Page> => {
	return {
		slug: "features/monetization",
		_status: "published",
		title: "Monetization",
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
									text: "Turn your directory into a revenue machine",
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
									text: "Built-in payment processing, subscription management, and premium placements. Start earning from day one without writing payment code.",
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
						label: "Start monetizing",
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
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Subscription Tiers",
				label: "Subscription Management",
				headline: "Create recurring revenue with subscription tiers",
				description: createParagraph(
					"Set up multiple subscription tiers with different features and pricing. Let businesses choose the plan that fits their needs while you collect recurring payments automatically.",
				),
				link: {
					type: "custom",
					label: "Learn about subscriptions",
					url: "/pricing",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Unlimited subscription tiers" },
					{ text: "Annual and monthly billing" },
					{ text: "Free trial periods" },
					{ text: "Automatic renewals" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Featured Placements",
				label: "Premium Placements",
				headline: "Sell premium visibility",
				description: createParagraph(
					"Offer featured spots, homepage placements, and category highlights. Businesses pay for premium visibility, you collect the revenue. Simple pricing, instant upgrades.",
				),
				link: {
					type: "custom",
					label: "Explore placement options",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Featured listing badges" },
					{ text: "Homepage spotlight sections" },
					{ text: "Category top placements" },
					{ text: "Search result boosting" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Payment Processing",
				label: "Stripe Integration",
				headline: "Payments powered by Stripe",
				description: createParagraph(
					"Secure payment processing with Stripe handles everything from card payments to invoicing. Accept payments globally with support for 135+ currencies and dozens of payment methods.",
				),
				link: {
					type: "custom",
					label: "View payment options",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Credit cards and digital wallets" },
					{ text: "Automatic invoicing" },
					{ text: "135+ currencies supported" },
					{ text: "PCI compliant security" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Revenue Features",
				heading: "Everything you need to generate revenue",
				subheading: "From one-time payments to complex subscription models",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "dollarSign",
						stat: "$0",
						title: "Setup fees",
						description: createParagraph("Start collecting payments with no upfront costs."),
					},
					{
						size: "small",
						style: "accent",
						icon: "zap",
						title: "Instant payouts",
						description: createParagraph("Get paid directly to your bank account."),
					},
					{
						size: "small",
						style: "default",
						icon: "shield",
						title: "Fraud protection",
						description: createParagraph("Built-in fraud detection and prevention."),
					},
					{
						size: "small",
						style: "primary",
						icon: "barChart",
						title: "Revenue analytics",
						description: createParagraph("Track MRR, churn, and growth metrics."),
					},
					{
						size: "small",
						style: "default",
						icon: "globe",
						title: "Global payments",
						description: createParagraph("Accept payments from anywhere in the world."),
					},
					{
						size: "small",
						style: "default",
						icon: "settings",
						title: "Tax handling",
						description: createParagraph("Automatic tax calculation and collection."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Start generating revenue today",
				subtext:
					"Connect Stripe in minutes and start accepting payments. No payment code to write.",
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
							label: "Talk to sales",
							url: "/contact",
						},
					},
				],
			},
		],
		meta: {
			description:
				"Monetize your directory with built-in payments, subscriptions, and premium placements. Stripe integration, automatic invoicing, and revenue analytics included.",
			title: "Monetization Features — DirectoryHub Revenue Tools",
		},
	}
}
