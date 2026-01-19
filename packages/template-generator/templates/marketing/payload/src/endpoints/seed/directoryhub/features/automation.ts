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
									text: "Eliminate busywork with smart automation",
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
									text: "Build powerful automations without code. Automate approvals, notifications, data entry, and repetitive tasks. Let your team focus on work that matters.",
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
						label: "See automation examples",
						url: "/features",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Visual Builder",
				label: "No-Code Builder",
				headline: "Build automations visually, no code required",
				description: createParagraph(
					"Our visual workflow builder makes automation accessible to everyone. Drag and drop triggers, conditions, and actions to create powerful automations in minutes.",
				),
				link: {
					type: "custom",
					label: "Try the workflow builder",
					url: "/sign-up",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Drag-and-drop interface" },
					{ text: "Pre-built templates" },
					{ text: "Test before you deploy" },
					{ text: "Version history" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Triggers & Actions",
				label: "Smart Triggers",
				headline: "React to any event automatically",
				description: createParagraph(
					"Trigger automations based on form submissions, status changes, dates, or custom conditions. Chain multiple actions together for complex workflows.",
				),
				link: {
					type: "custom",
					label: "Explore triggers",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Event-based triggers" },
					{ text: "Scheduled automations" },
					{ text: "Conditional logic" },
					{ text: "Multi-step workflows" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Cross-App Automation",
				label: "Connected Actions",
				headline: "Automate across all your tools",
				description: createParagraph(
					"Connect automations to Slack, email, Salesforce, and 100+ other tools. When something happens in SaaSify, trigger actions anywhere in your tech stack.",
				),
				link: {
					type: "custom",
					label: "See integrations",
					url: "/features/integrations",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "100+ app integrations" },
					{ text: "Custom webhooks" },
					{ text: "API actions" },
					{ text: "Two-way data sync" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Automation Features",
				heading: "Automation that saves hours every week",
				subheading: "Focus on meaningful work while automation handles the rest",
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
							label: "Start free trial",
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
				"Build powerful automations without code. Automate approvals, notifications, and cross-app workflows with SaaSify's visual automation builder.",
			title: "Automation — SaaSify No-Code Workflow Builder",
		},
	}
}
