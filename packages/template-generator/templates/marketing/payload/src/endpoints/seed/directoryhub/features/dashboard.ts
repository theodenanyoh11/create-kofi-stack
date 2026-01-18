import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const dashboardPage = (): Partial<Page> => {
	return {
		slug: "features/dashboard",
		_status: "published",
		title: "Admin Dashboard",
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
									text: "Manage everything from one powerful dashboard",
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
									text: "Review submissions, moderate content, track analytics, and manage payments all in one place. Built-in tools help you maintain quality while scaling your directory business.",
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
						label: "Try the dashboard",
						url: "/sign-up",
					},
				},
				{
					link: {
						type: "custom",
						appearance: "outline",
						label: "See a demo",
						url: "/contact",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Content Moderation",
				label: "Moderation Tools",
				headline: "Review and approve submissions effortlessly",
				description: createParagraph(
					"Submission queues, bulk actions, and smart filters make content moderation fast. Approve, reject, or request changes with one click. Keep your directory quality high without the manual overhead.",
				),
				link: {
					type: "custom",
					label: "See moderation tools",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Submission review queues" },
					{ text: "Bulk approve and reject" },
					{ text: "Request changes workflow" },
					{ text: "Automated spam detection" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Analytics",
				label: "Real-Time Analytics",
				headline: "Track what matters with built-in analytics",
				description: createParagraph(
					"See how your directory is performing at a glance. Track page views, listing engagement, conversion rates, and revenue metrics. Export reports or integrate with your favorite analytics tools.",
				),
				link: {
					type: "custom",
					label: "Explore analytics",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Traffic and engagement metrics" },
					{ text: "Revenue and subscription tracking" },
					{ text: "Listing performance insights" },
					{ text: "Custom report generation" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "User Management",
				label: "User Administration",
				headline: "Manage users and permissions with ease",
				description: createParagraph(
					"Control who can do what in your directory. Set up team members with different roles, manage listing owners, and handle user support all from the dashboard.",
				),
				link: {
					type: "custom",
					label: "Learn about permissions",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Role-based access control" },
					{ text: "Team member management" },
					{ text: "User activity logs" },
					{ text: "Account suspension tools" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Dashboard Features",
				heading: "Everything you need to run your directory",
				subheading: "A complete admin experience without the complexity",
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
						description: createParagraph("Find any listing, user, or setting instantly."),
					},
					{
						size: "small",
						style: "primary",
						icon: "shield",
						title: "Activity Logs",
						description: createParagraph("Full audit trail of all admin actions."),
					},
					{
						size: "small",
						style: "default",
						icon: "settings",
						title: "Settings Hub",
						description: createParagraph("Configure every aspect of your directory."),
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
				headline: "Take control of your directory",
				subtext: "Powerful admin tools that scale with your business. Start managing today.",
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
							label: "Request a demo",
							url: "/contact",
						},
					},
				],
			},
		],
		meta: {
			description:
				"Manage your directory with a powerful admin dashboard. Content moderation, analytics, user management, and more in one intuitive interface.",
			title: "Admin Dashboard — DirectoryHub Management Tools",
		},
	}
}
