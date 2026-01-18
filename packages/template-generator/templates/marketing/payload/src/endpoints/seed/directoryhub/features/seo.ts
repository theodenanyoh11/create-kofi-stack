import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const seoPage = (): Partial<Page> => {
	return {
		slug: "features/seo",
		_status: "published",
		title: "SEO Optimization",
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
									text: "Rank on page one without the technical overhead",
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
									text: "Enterprise-grade SEO built into every directory. Structured data, dynamic sitemaps, and optimized meta tags work automatically so your listings get discovered.",
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
						label: "Start ranking",
						url: "/sign-up",
					},
				},
				{
					link: {
						type: "custom",
						appearance: "outline",
						label: "See SEO features",
						url: "/features",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Structured Data",
				label: "Schema Markup",
				headline: "Automatic schema markup for rich results",
				description: createParagraph(
					"Every listing gets proper schema.org markup automatically. Local businesses, organizations, products, and services are all structured for Google's rich results and knowledge panels.",
				),
				link: {
					type: "custom",
					label: "Learn about structured data",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "LocalBusiness schema for local directories" },
					{ text: "Organization schema for B2B" },
					{ text: "Product schema for marketplaces" },
					{ text: "Rich snippets in search results" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Sitemaps",
				label: "Dynamic Sitemaps",
				headline: "Sitemaps that update automatically",
				description: createParagraph(
					"XML sitemaps are generated and updated automatically as listings are added or changed. Google and other search engines always know about your latest content.",
				),
				link: {
					type: "custom",
					label: "Explore sitemap features",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Auto-generated XML sitemaps" },
					{ text: "Real-time updates" },
					{ text: "Priority and frequency hints" },
					{ text: "Automatic search engine ping" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Meta Tags",
				label: "Meta Optimization",
				headline: "Optimized meta tags for every page",
				description: createParagraph(
					"Custom meta titles, descriptions, and Open Graph tags for every listing and category. Social sharing previews look great and drive more clicks from search and social.",
				),
				link: {
					type: "custom",
					label: "See meta features",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Custom meta titles and descriptions" },
					{ text: "Open Graph tags for social sharing" },
					{ text: "Twitter Card support" },
					{ text: "Canonical URLs to prevent duplicates" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "SEO Features",
				heading: "Built-in SEO that works",
				subheading: "Technical SEO handled automatically so you can focus on content",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "search",
						stat: "100%",
						title: "SEO Coverage",
						description: createParagraph("Every page optimized automatically."),
					},
					{
						size: "small",
						style: "accent",
						icon: "zap",
						title: "Fast Loading",
						description: createParagraph("Core Web Vitals optimized out of the box."),
					},
					{
						size: "small",
						style: "default",
						icon: "globe",
						title: "Clean URLs",
						description: createParagraph("SEO-friendly URL structure."),
					},
					{
						size: "small",
						style: "primary",
						icon: "layout",
						title: "Mobile First",
						description: createParagraph("Mobile-optimized for Google's mobile-first indexing."),
					},
					{
						size: "small",
						style: "default",
						icon: "database",
						title: "Crawl Efficient",
						description: createParagraph("Optimized for search engine crawlers."),
					},
					{
						size: "small",
						style: "default",
						icon: "barChart",
						title: "Analytics Ready",
						description: createParagraph("Track rankings and organic traffic."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Get discovered by the right audience",
				subtext: "Every directory comes with enterprise-grade SEO. No plugins, no configuration.",
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
				"Built-in SEO features including automatic schema markup, dynamic sitemaps, and optimized meta tags. Get your directory listings ranking on Google.",
			title: "SEO Features — DirectoryHub Search Optimization",
		},
	}
}
