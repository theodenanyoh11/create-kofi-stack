import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const dashboardPage = (): Partial<Page> => {
	return {
		slug: "features/dashboard",
		_status: "published",
		title: "Dashboard",
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
									text: "Your unified command center",
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
									text: "Everything your team needs in one place. Track projects, monitor progress, manage tasks, and collaborate seamlessly from a single intuitive dashboard.",
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
						label: "Watch demo",
						url: "/demo",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Project Overview",
				label: "Project Management",
				headline: "See all your projects at a glance",
				description: createParagraph(
					"Get a bird's-eye view of every project, task, and deadline. Customizable views let you organize work the way that makes sense for your team.",
				),
				link: {
					type: "custom",
					label: "See project views",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "List, board, and calendar views" },
					{ text: "Custom project templates" },
					{ text: "Milestone tracking" },
					{ text: "Dependencies and blockers" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Task Management",
				label: "Task Tracking",
				headline: "Never lose track of a task again",
				description: createParagraph(
					"Create, assign, and track tasks with ease. Set priorities, due dates, and assignees. Get notifications when things change so nothing falls through the cracks.",
				),
				link: {
					type: "custom",
					label: "Explore task features",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Drag-and-drop task management" },
					{ text: "Priority levels and labels" },
					{ text: "Due dates and reminders" },
					{ text: "Subtasks and checklists" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Team Collaboration",
				label: "Team Features",
				headline: "Collaborate in real-time with your team",
				description: createParagraph(
					"Comments, mentions, and activity feeds keep everyone in sync. Share files, leave feedback, and make decisions together without leaving the dashboard.",
				),
				link: {
					type: "custom",
					label: "Learn about collaboration",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Comments and @mentions" },
					{ text: "File sharing and attachments" },
					{ text: "Activity feed and updates" },
					{ text: "Team workload view" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Dashboard Features",
				heading: "Everything your team needs",
				subheading: "A complete workspace without the complexity",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "layout",
						title: "Intuitive Interface",
						description: createParagraph("Clean, modern design that's easy to navigate."),
					},
					{
						size: "small",
						style: "accent",
						icon: "zap",
						title: "Quick Actions",
						description: createParagraph("Common tasks accessible in one click."),
					},
					{
						size: "small",
						style: "default",
						icon: "search",
						title: "Global Search",
						description: createParagraph("Find any project, task, or document instantly."),
					},
					{
						size: "small",
						style: "primary",
						icon: "shield",
						title: "Activity Logs",
						description: createParagraph("Full audit trail of all team activity."),
					},
					{
						size: "small",
						style: "default",
						icon: "settings",
						title: "Customization",
						description: createParagraph("Personalize your workspace and views."),
					},
					{
						size: "small",
						style: "default",
						icon: "barChart",
						title: "Dashboard Widgets",
						description: createParagraph("Customizable overview of key metrics."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Get your team organized today",
				subtext: "A powerful dashboard that scales with your business. Free to start.",
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
							label: "Watch demo",
							url: "/demo",
						},
					},
				],
			},
		],
		meta: {
			description:
				"Manage projects, track tasks, and collaborate with your team from one unified dashboard. Intuitive interface, powerful features, no complexity.",
			title: "Dashboard — SaaSify Team Command Center",
		},
	}
}
