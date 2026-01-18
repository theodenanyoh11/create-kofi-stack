import type { Form, Page } from "@/payload-types"
import { createParagraph } from "./richtext-helper"

type AboutArgs = {
	contactForm: Form
}

export const directoryHubAbout = ({ contactForm }: AboutArgs): Partial<Page> => {
	return {
		slug: "about",
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
									text: "We help entrepreneurs build directory businesses",
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
									text: "DirectoryHub makes it easy for anyone to launch, monetize, and grow niche directory websites — without writing code.",
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
		layout: [
			// Mission Section
			{
				blockType: "featureShowcase",
				blockName: "Our Mission",
				label: "Our Mission",
				headline: "Democratizing the directory business model",
				description: createParagraph(
					"Directory websites remain one of the most sustainable online business models, yet building one traditionally requires significant technical expertise. We believe anyone with niche knowledge should be able to turn that expertise into a profitable directory business. DirectoryHub handles the technical complexity so you can focus on what matters: curating great content and growing your community.",
				),
				link: {
					type: "custom",
					url: "/pricing",
					label: "View pricing",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "No coding required" },
					{ text: "Built-in monetization" },
					{ text: "Enterprise-grade SEO" },
					{ text: "Scale as you grow" },
				],
			},
			// Stats Banner
			{
				blockType: "proofBanner",
				blockName: "Impact Stats",
				style: "withBackground",
				headline: "Trusted by directory builders worldwide",
				subtext:
					"Join hundreds of entrepreneurs who have launched successful directories with DirectoryHub",
			},
			// Values Grid
			{
				blockType: "bentoFeatures",
				blockName: "Our Values",
				heading: "What we stand for",
				subheading: "The principles that guide everything we build",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "zap",
						title: "Simplicity First",
						description: createParagraph(
							"We remove complexity so you can focus on building your business.",
						),
					},
					{
						size: "small",
						style: "accent",
						icon: "rocket",
						title: "Built for Growth",
						description: createParagraph(
							"Every feature is designed to help you scale sustainably.",
						),
					},
					{
						size: "small",
						style: "default",
						icon: "shield",
						title: "Transparency",
						description: createParagraph(
							"Clear pricing, no hidden fees, honest communication always.",
						),
					},
					{
						size: "small",
						style: "primary",
						icon: "users",
						title: "Customer Success",
						description: createParagraph("Your success is our success. We invest in your growth."),
					},
					{
						size: "small",
						style: "default",
						icon: "globe",
						title: "Quality Matters",
						description: createParagraph(
							"We build tools that help you maintain high-quality directories.",
						),
					},
					{
						size: "small",
						style: "default",
						icon: "settings",
						title: "Continuous Innovation",
						description: createParagraph(
							"We constantly improve our platform based on customer feedback.",
						),
					},
				],
			},
			// Our Story
			{
				blockType: "featureShowcase",
				blockName: "Our Story",
				label: "Our Story",
				headline: "From frustration to solution",
				description: createParagraph(
					"DirectoryHub was born when our founders tried to build a niche directory and discovered how much technical overhead was involved. After months of custom development for what seemed like a simple project, we realized there had to be a better way. We built DirectoryHub to be the platform we wished existed — one that handles all the technical complexity while giving directory builders complete control over their business.",
				),
				link: {
					type: "custom",
					url: "/sign-up",
					label: "Start building free",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Founded by directory builders" },
					{ text: "Bootstrapped and profitable" },
					{ text: "Customer-funded development" },
					{ text: "Global remote team" },
				],
			},
			// Contact Section
			{
				blockType: "content",
				blockName: "Contact Header",
				columns: [
					{
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
												text: "Get in Touch",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										tag: "h2",
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
												text: "Have questions about DirectoryHub? We'd love to hear from you. Send us a message and our team will respond within 24 hours.",
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
						size: "full",
					},
				],
			},
			// Contact Form
			{
				blockType: "formBlock",
				blockName: "Contact Form",
				form: contactForm.id,
				enableIntro: false,
			},
			// Final CTA
			{
				blockType: "proofBanner",
				blockName: "Footer CTA",
				style: "centered",
				headline: "Ready to build your directory?",
				subtext: "Join hundreds of entrepreneurs building successful directory businesses.",
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
							label: "View pricing",
							url: "/pricing",
						},
					},
				],
			},
		],
		meta: {
			description:
				"Learn about DirectoryHub — the platform that makes it easy to build, monetize, and grow directory websites. Founded by directory builders, for directory builders.",
			title: "About DirectoryHub — Our Mission & Story",
		},
		title: "About",
	}
}
