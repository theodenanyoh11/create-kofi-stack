import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const workflowsPage = (): Partial<Page> => {
	return {
		slug: "features/workflows",
		_status: "published",
		title: "Workflows",
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
									text: "Build custom processes without code",
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
									text: "Create workflows that match exactly how your team works. Visual builders, conditional logic, and templates make it easy to digitize any process.",
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
						label: "See workflow templates",
						url: "/templates",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Visual Builder",
				label: "Workflow Builder",
				headline: "Design workflows visually",
				description: createParagraph(
					"Drag and drop to create multi-step workflows. Add approvals, conditions, notifications, and integrations. See your entire process at a glance.",
				),
				link: {
					type: "custom",
					label: "Try the builder",
					url: "/sign-up",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Drag-and-drop interface" },
					{ text: "Multi-step workflows" },
					{ text: "Parallel branches" },
					{ text: "Visual process maps" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Approvals",
				label: "Approval Workflows",
				headline: "Streamline approvals and reviews",
				description: createParagraph(
					"Route requests to the right approvers automatically. Set up sequential or parallel approvals, escalations, and delegation rules.",
				),
				link: {
					type: "custom",
					label: "Learn about approvals",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Multi-level approvals" },
					{ text: "Automatic escalation" },
					{ text: "Delegation and backup" },
					{ text: "Approval history" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Templates",
				label: "Workflow Templates",
				headline: "Start fast with pre-built templates",
				description: createParagraph(
					"Choose from dozens of workflow templates for common processes. Customize to fit your needs or build from scratch.",
				),
				link: {
					type: "custom",
					label: "Browse templates",
					url: "/templates",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "50+ workflow templates" },
					{ text: "Onboarding workflows" },
					{ text: "Request and approval flows" },
					{ text: "Project workflows" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Workflow Features",
				heading: "Workflows for any process",
				subheading: "From simple approvals to complex multi-department processes",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "layers",
						stat: "50+",
						title: "Templates",
						description: createParagraph("Pre-built workflows ready to use."),
					},
					{
						size: "small",
						style: "accent",
						icon: "settings",
						title: "No-Code Builder",
						description: createParagraph("Visual workflow design interface."),
					},
					{
						size: "small",
						style: "default",
						icon: "search",
						title: "Forms & Fields",
						description: createParagraph("Custom forms for data collection."),
					},
					{
						size: "small",
						style: "primary",
						icon: "database",
						title: "Data Routing",
						description: createParagraph("Route data based on conditions."),
					},
					{
						size: "small",
						style: "default",
						icon: "globe",
						title: "Integrations",
						description: createParagraph("Connect to 100+ apps."),
					},
					{
						size: "small",
						style: "default",
						icon: "shield",
						title: "Audit Trail",
						description: createParagraph("Complete history of every workflow."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Digitize your processes today",
				subtext: "Build custom workflows in minutes. No coding required.",
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
				"Build custom workflows for any process with SaaSify's visual workflow builder. Approvals, forms, conditions, and integrations without code.",
			title: "Workflows — SaaSify Custom Process Builder",
		},
	}
}
