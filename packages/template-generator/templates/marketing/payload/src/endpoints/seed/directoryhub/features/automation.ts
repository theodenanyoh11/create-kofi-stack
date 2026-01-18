import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const automationPage = (): Partial<Page> => {
	return {
		slug: "features/automation",
		_status: "published",
		title: "Automation",
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
									text: "Automate the busywork, focus on growth",
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
									text: "Set up workflows that handle repetitive tasks automatically. From email notifications to listing expirations, let automation do the heavy lifting.",
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
						label: "Start automating",
						url: "/sign-up",
					},
				},
				{
					link: {
						type: "custom",
						appearance: "outline",
						label: "See automation examples",
						url: "/features",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Email Automation",
				label: "Email Workflows",
				headline: "Automated emails that nurture and convert",
				description: createParagraph(
					"Welcome new users, remind about expiring listings, confirm submissions, and celebrate milestones. Set up email sequences once and let them run automatically.",
				),
				link: {
					type: "custom",
					label: "Learn about email automation",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Welcome email sequences" },
					{ text: "Listing expiration reminders" },
					{ text: "Submission confirmation emails" },
					{ text: "Payment receipt notifications" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Workflow Automation",
				label: "Smart Workflows",
				headline: "Build custom workflows without code",
				description: createParagraph(
					"Create trigger-based workflows that respond to events in your directory. When a listing is submitted, approved, or expires, trigger the right actions automatically.",
				),
				link: {
					type: "custom",
					label: "Explore workflow builder",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Visual workflow builder" },
					{ text: "Event-based triggers" },
					{ text: "Conditional logic branches" },
					{ text: "Third-party integrations" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Scheduled Tasks",
				label: "Scheduled Actions",
				headline: "Set it and forget it with scheduled tasks",
				description: createParagraph(
					"Schedule recurring tasks like content cleanup, report generation, and backup exports. Keep your directory running smoothly without manual intervention.",
				),
				link: {
					type: "custom",
					label: "See scheduling options",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Automated content expiration" },
					{ text: "Scheduled report emails" },
					{ text: "Recurring backup exports" },
					{ text: "Periodic data cleanup" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Automation Features",
				heading: "Automation that saves hours every week",
				subheading: "Focus on growing your directory while automation handles the rest",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "zap",
						stat: "10x",
						title: "Faster Operations",
						description: createParagraph("Automate repetitive tasks instantly."),
					},
					{
						size: "small",
						style: "accent",
						icon: "settings",
						title: "No-Code Setup",
						description: createParagraph("Build automations without developers."),
					},
					{
						size: "small",
						style: "default",
						icon: "rocket",
						title: "Instant Triggers",
						description: createParagraph("React to events in real-time."),
					},
					{
						size: "small",
						style: "primary",
						icon: "layers",
						title: "Webhook Support",
						description: createParagraph("Connect to any external service."),
					},
					{
						size: "small",
						style: "default",
						icon: "database",
						title: "Action History",
						description: createParagraph("Full logs of all automated actions."),
					},
					{
						size: "small",
						style: "default",
						icon: "shield",
						title: "Fail-Safe Design",
						description: createParagraph("Automatic retries and error handling."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Let automation do the work",
				subtext: "Set up workflows once and save hours every week. Start automating today.",
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
							label: "See all features",
							url: "/features",
						},
					},
				],
			},
		],
		meta: {
			description:
				"Automate your directory operations with smart workflows, email sequences, and scheduled tasks. Save hours every week without writing code.",
			title: "Automation Features — DirectoryHub Workflow Tools",
		},
	}
}
