import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const salesPage = (): Partial<Page> => {
	return {
		slug: "use-cases/sales",
		_status: "published",
		title: "SaaSify for Sales Teams",
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
									text: "Close more deals with less effort",
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
									text: "Pipeline management, lead tracking, forecasting, and automation tools that help your sales team work smarter and close faster.",
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
				blockName: "Pipeline Management",
				label: "Visual Pipeline",
				headline: "See your entire pipeline at a glance",
				description: createParagraph(
					"Drag-and-drop deal management with customizable stages. Track deal values, probabilities, and expected close dates. Never let a deal slip through the cracks.",
				),
				link: {
					type: "custom",
					label: "See pipeline features",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Customizable deal stages" },
					{ text: "Drag-and-drop interface" },
					{ text: "Deal value tracking" },
					{ text: "Win probability scoring" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Lead Management",
				label: "Lead Tracking",
				headline: "Never lose track of a lead again",
				description: createParagraph(
					"Capture leads from any source, score them automatically, and route them to the right rep. Activity tracking shows every touchpoint so you always have context.",
				),
				link: {
					type: "custom",
					label: "Learn about lead management",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Lead capture from any source" },
					{ text: "Automatic lead scoring" },
					{ text: "Smart lead routing" },
					{ text: "Complete activity history" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Sales Automation",
				label: "Automation",
				headline: "Automate follow-ups and admin tasks",
				description: createParagraph(
					"Set up automated email sequences, task reminders, and deal updates. Spend less time on admin and more time selling.",
				),
				link: {
					type: "custom",
					label: "See automation options",
					url: "/features/automation",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Automated email sequences" },
					{ text: "Task reminders and follow-ups" },
					{ text: "Deal stage automation" },
					{ text: "Meeting scheduling" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Sales Features",
				heading: "Tools that help you sell more",
				subheading: "Everything your sales team needs in one platform",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "barChart",
						stat: "40%",
						title: "Faster Deal Cycles",
						description: createParagraph("Close deals faster with better tools."),
					},
					{
						size: "small",
						style: "accent",
						icon: "users",
						title: "Contact Management",
						description: createParagraph("Complete contact and company records."),
					},
					{
						size: "small",
						style: "default",
						icon: "search",
						title: "Smart Search",
						description: createParagraph("Find any deal, contact, or activity instantly."),
					},
					{
						size: "small",
						style: "primary",
						icon: "target",
						title: "Forecasting",
						description: createParagraph("Accurate revenue forecasting and reporting."),
					},
					{
						size: "small",
						style: "default",
						icon: "zap",
						title: "Email Integration",
						description: createParagraph("Sync with Gmail and Outlook."),
					},
					{
						size: "small",
						style: "default",
						icon: "shield",
						title: "Activity Tracking",
						description: createParagraph("Log calls, emails, and meetings automatically."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Give your sales team an unfair advantage",
				subtext:
					"Pipeline management, lead tracking, and automation. Start closing more deals today.",
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
				"SaaSify for sales teams. Pipeline management, lead tracking, forecasting, and automation tools to help you close more deals faster.",
			title: "Sales Teams — SaaSify Use Case",
		},
	}
}
