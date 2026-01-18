import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const templatesPage = (): Partial<Page> => {
	return {
		slug: "features/templates",
		_status: "published",
		title: "Directory Templates",
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
									text: "Launch your directory in days, not months",
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
									text: "Choose from professionally designed directory templates, customize to match your brand, and go live instantly. No coding required.",
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
						label: "Get started free",
						url: "/sign-up",
					},
				},
				{
					link: {
						type: "custom",
						appearance: "outline",
						label: "View all templates",
						url: "/templates",
					},
				},
			],
		},
		layout: [
			// Feature showcase blocks
			{
				blockType: "featureShowcase",
				blockName: "Template Gallery",
				label: "Ready-Made Templates",
				headline: "Pick a template, customize, launch",
				description: createParagraph(
					"Our template library covers every niche from local services to B2B vendor directories. Each template is designed for conversions with optimized layouts, smart filtering, and mobile-first responsive design.",
				),
				link: {
					type: "custom",
					label: "Browse templates",
					url: "/templates",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "10+ professionally designed templates" },
					{ text: "Niche-specific layouts and fields" },
					{ text: "Mobile-first responsive design" },
					{ text: "One-click preview and deploy" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Customization",
				label: "Brand Customization",
				headline: "Make it yours in minutes",
				description: createParagraph(
					"Every template is fully customizable. Change colors, fonts, layouts, and content without touching a line of code. Our visual editor makes it simple to match your brand identity perfectly.",
				),
				link: {
					type: "custom",
					label: "See customization options",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Visual drag-and-drop editor" },
					{ text: "Custom color schemes and fonts" },
					{ text: "Logo and branding integration" },
					{ text: "Custom domain support" },
				],
			},
			// Bento features for specific capabilities
			{
				blockType: "bentoFeatures",
				blockName: "Template Features",
				heading: "Built for every directory type",
				subheading:
					"Templates designed for specific use cases with pre-configured schemas and optimized layouts",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "layout",
						title: "Local Services",
						description: createParagraph(
							"Plumbers, photographers, restaurants with map integration.",
						),
					},
					{
						size: "small",
						style: "accent",
						icon: "building",
						title: "B2B Directories",
						description: createParagraph(
							"Software vendors, agencies, consultants with comparison views.",
						),
					},
					{
						size: "small",
						style: "default",
						icon: "users",
						title: "Community Directories",
						description: createParagraph(
							"Member directories, alumni networks, professional groups.",
						),
					},
					{
						size: "small",
						style: "primary",
						icon: "building",
						title: "Marketplaces",
						description: createParagraph(
							"Multi-vendor platforms with seller profiles and products.",
						),
					},
					{
						size: "small",
						style: "default",
						icon: "globe",
						title: "Global Ready",
						description: createParagraph("Multi-language support and localization built-in."),
					},
					{
						size: "small",
						style: "default",
						icon: "zap",
						title: "Fast Loading",
						description: createParagraph("Optimized for speed with edge caching."),
					},
				],
			},
			// Proof banner
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Ready to launch your directory?",
				subtext: "Pick a template and go live today. Free to start, upgrade as you grow.",
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
							label: "Book a demo",
							url: "/contact",
						},
					},
				],
			},
		],
		meta: {
			description:
				"Launch your directory website in days with professionally designed templates. Customize colors, layouts, and content without coding. Start free today.",
			title: "Directory Templates — Launch Fast with DirectoryHub",
		},
	}
}
