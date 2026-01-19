import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const marketingPage = (): Partial<Page> => {
	return {
		slug: "use-cases/marketing",
		_status: "published",
		title: "SaaSify for Marketing Teams",
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
									text: "Launch campaigns that actually convert",
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
									text: "Campaign planning, asset management, and performance analytics that help your marketing team move faster and measure what matters.",
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
				blockName: "Campaign Management",
				label: "Campaign Planning",
				headline: "Plan and execute campaigns in one place",
				description: createParagraph(
					"Visual campaign calendars, task assignments, and deadline tracking. See every campaign across channels and keep your team aligned on priorities.",
				),
				link: {
					type: "custom",
					label: "See campaign features",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Visual campaign calendar" },
					{ text: "Multi-channel planning" },
					{ text: "Task and deadline tracking" },
					{ text: "Team collaboration tools" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Asset Management",
				label: "Asset Library",
				headline: "Organize and share marketing assets",
				description: createParagraph(
					"Central repository for all your marketing materials. Version control, approval workflows, and easy sharing make it simple to keep everyone on brand.",
				),
				link: {
					type: "custom",
					label: "Learn about asset management",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Centralized asset library" },
					{ text: "Version control" },
					{ text: "Approval workflows" },
					{ text: "Brand guidelines enforcement" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Performance Analytics",
				label: "Analytics",
				headline: "Measure what matters",
				description: createParagraph(
					"Track campaign performance across channels. Custom dashboards show the metrics that matter most to your team and stakeholders.",
				),
				link: {
					type: "custom",
					label: "See analytics features",
					url: "/features/analytics",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Cross-channel analytics" },
					{ text: "Custom dashboards" },
					{ text: "Automated reporting" },
					{ text: "ROI tracking" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Marketing Features",
				heading: "Tools that help you market smarter",
				subheading: "Everything your marketing team needs in one platform",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "rocket",
						stat: "3x",
						title: "Campaign Velocity",
						description: createParagraph("Launch campaigns faster than ever."),
					},
					{
						size: "small",
						style: "accent",
						icon: "folder",
						title: "Project Templates",
						description: createParagraph("Pre-built templates for common campaigns."),
					},
					{
						size: "small",
						style: "default",
						icon: "users",
						title: "Team Workload",
						description: createParagraph("Balance work across your team."),
					},
					{
						size: "small",
						style: "primary",
						icon: "barChart",
						title: "Performance Metrics",
						description: createParagraph("Track KPIs across all campaigns."),
					},
					{
						size: "small",
						style: "default",
						icon: "zap",
						title: "Integrations",
						description: createParagraph("Connect with HubSpot, Marketo, and more."),
					},
					{
						size: "small",
						style: "default",
						icon: "messageSquare",
						title: "Collaboration",
						description: createParagraph("Comments, feedback, and approvals in context."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Supercharge your marketing team",
				subtext:
					"Campaign planning, asset management, and analytics. Start launching better campaigns today.",
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
				"SaaSify for marketing teams. Campaign planning, asset management, and performance analytics to help you launch campaigns that convert.",
			title: "Marketing Teams — SaaSify Use Case",
		},
	}
}
