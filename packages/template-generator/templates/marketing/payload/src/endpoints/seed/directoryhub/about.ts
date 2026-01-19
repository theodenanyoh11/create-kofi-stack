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
									text: "We're building the future of team productivity",
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
									text: "SaaSify makes it easy for teams to collaborate, automate workflows, and scale their operations — all in one powerful platform.",
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
				headline: "Making powerful tools accessible to every team",
				description: createParagraph(
					"Great software shouldn't require a huge budget or dedicated IT team. We believe every organization deserves access to the tools that help them do their best work. SaaSify brings together the best of project management, collaboration, and automation in one intuitive platform that grows with your team.",
				),
				link: {
					type: "custom",
					url: "/pricing",
					label: "View pricing",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "No technical skills required" },
					{ text: "100+ integrations built-in" },
					{ text: "Enterprise-grade security" },
					{ text: "Scale as you grow" },
				],
			},
			// Stats Banner
			{
				blockType: "proofBanner",
				blockName: "Impact Stats",
				style: "withBackground",
				headline: "Trusted by teams worldwide",
				subtext:
					"Join thousands of teams who have transformed how they work with SaaSify",
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
							"We remove complexity so you can focus on what matters most.",
						),
					},
					{
						size: "small",
						style: "accent",
						icon: "rocket",
						title: "Built for Growth",
						description: createParagraph(
							"Every feature is designed to help your team scale sustainably.",
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
							"We build tools that are reliable, fast, and delightful to use.",
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
				headline: "Born from real frustrations",
				description: createParagraph(
					"SaaSify started when our founders experienced firsthand how fragmented and frustrating work tools had become. Juggling dozens of apps, losing context between tools, and spending more time managing work than doing it. We built the platform we wished we had — one that brings everything together and just works.",
				),
				link: {
					type: "custom",
					url: "/sign-up",
					label: "Start free trial",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Founded by operators, for operators" },
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
												text: "Have questions about SaaSify? We'd love to hear from you. Send us a message and our team will respond within 24 hours.",
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
				headline: "Ready to transform how your team works?",
				subtext: "Join thousands of teams building their future with SaaSify.",
				links: [
					{
						link: {
							type: "custom",
							appearance: "default",
							label: "Start free trial",
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
				"Learn about SaaSify — the platform that makes it easy to collaborate, automate, and scale. Built by operators, for operators.",
			title: "About SaaSify — Our Mission & Story",
		},
		title: "About",
	}
}
