import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const productPage = (): Partial<Page> => {
	return {
		slug: "use-cases/product",
		_status: "published",
		title: "SaaSify for Product Teams",
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
									text: "Ship features your users will love",
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
									text: "Roadmap planning, feedback collection, and release management that help your product team build what matters and ship faster.",
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
						label: "Start free trial",
						url: "/sign-up",
					},
				},
				{
					link: {
						type: "custom",
						appearance: "outline",
						label: "See a demo",
						url: "/demo",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Roadmap Planning",
				label: "Product Roadmap",
				headline: "Plan and communicate your product vision",
				description: createParagraph(
					"Visual roadmaps that keep everyone aligned on what's coming. Timeline, kanban, and list views help you plan sprints and communicate priorities to stakeholders.",
				),
				link: {
					type: "custom",
					label: "See roadmap features",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Visual product roadmap" },
					{ text: "Sprint planning" },
					{ text: "Milestone tracking" },
					{ text: "Stakeholder sharing" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Feedback Collection",
				label: "User Feedback",
				headline: "Collect and prioritize user feedback",
				description: createParagraph(
					"Centralize feedback from users, support, and sales. Vote on ideas, tag themes, and connect feedback directly to roadmap items.",
				),
				link: {
					type: "custom",
					label: "Learn about feedback tools",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Feedback collection portal" },
					{ text: "Voting and prioritization" },
					{ text: "Theme tagging" },
					{ text: "Feedback-to-roadmap linking" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Release Management",
				label: "Releases",
				headline: "Ship releases with confidence",
				description: createParagraph(
					"Track releases, manage changelogs, and coordinate launches. Automated release notes and internal announcements keep everyone in the loop.",
				),
				link: {
					type: "custom",
					label: "See release features",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Release tracking" },
					{ text: "Automated changelogs" },
					{ text: "Internal announcements" },
					{ text: "Launch coordination" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Product Features",
				heading: "Tools that help you ship faster",
				subheading: "Everything your product team needs in one platform",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "rocket",
						stat: "50%",
						title: "Faster Shipping",
						description: createParagraph("Reduce time from idea to production."),
					},
					{
						size: "small",
						style: "accent",
						icon: "layers",
						title: "Feature Specs",
						description: createParagraph("Document requirements and acceptance criteria."),
					},
					{
						size: "small",
						style: "default",
						icon: "users",
						title: "Cross-Team Collaboration",
						description: createParagraph("Work with design, engineering, and QA."),
					},
					{
						size: "small",
						style: "primary",
						icon: "barChart",
						title: "Product Analytics",
						description: createParagraph("Track feature adoption and usage."),
					},
					{
						size: "small",
						style: "default",
						icon: "zap",
						title: "Jira Integration",
						description: createParagraph("Sync with your engineering workflow."),
					},
					{
						size: "small",
						style: "default",
						icon: "users",
						title: "Stakeholder Updates",
						description: createParagraph("Keep leadership informed automatically."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Build products your users will love",
				subtext:
					"Roadmap planning, feedback collection, and release management. Start shipping faster today.",
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
							label: "Talk to sales",
							url: "/contact",
						},
					},
				],
			},
		],
		meta: {
			description:
				"SaaSify for product teams. Roadmap planning, feedback collection, and release management to help you build and ship features your users will love.",
			title: "Product Teams — SaaSify Use Case",
		},
	}
}
