import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const integrationsPage = (): Partial<Page> => {
	return {
		slug: "features/integrations",
		_status: "published",
		title: "Integrations",
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
									text: "Connect all your tools in one place",
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
									text: "One-click connections to 100+ apps your team already uses. Sync data, automate workflows, and eliminate context switching.",
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
						label: "View all integrations",
						url: "/integrations",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Native Integrations",
				label: "100+ Integrations",
				headline: "Connect your favorite tools instantly",
				description: createParagraph(
					"Native integrations with Slack, Salesforce, HubSpot, Jira, Notion, Google Workspace, Microsoft 365, and more. Set up in minutes, not days.",
				),
				link: {
					type: "custom",
					label: "Browse integrations",
					url: "/integrations",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "100+ native integrations" },
					{ text: "Two-way data sync" },
					{ text: "Real-time updates" },
					{ text: "No coding required" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Custom Integrations",
				label: "Developer Tools",
				headline: "Build custom integrations with our API",
				description: createParagraph(
					"REST API and webhooks let you connect any tool or build custom integrations. Comprehensive documentation and SDKs for popular languages.",
				),
				link: {
					type: "custom",
					label: "View API docs",
					url: "/developers",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "RESTful API access" },
					{ text: "Custom webhooks" },
					{ text: "SDKs for popular languages" },
					{ text: "Detailed documentation" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Integration Categories",
				heading: "Integrations for every workflow",
				subheading:
					"Connect your entire tech stack and keep data flowing seamlessly",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "messageSquare",
						title: "Communication",
						description: createParagraph(
							"Slack, Microsoft Teams, Discord, and email integrations.",
						),
					},
					{
						size: "small",
						style: "accent",
						icon: "users",
						title: "CRM & Sales",
						description: createParagraph(
							"Salesforce, HubSpot, Pipedrive, and more.",
						),
					},
					{
						size: "small",
						style: "default",
						icon: "folder",
						title: "Project Management",
						description: createParagraph(
							"Jira, Asana, Monday.com, Trello integrations.",
						),
					},
					{
						size: "small",
						style: "primary",
						icon: "database",
						title: "Data & Storage",
						description: createParagraph(
							"Google Drive, Dropbox, AWS S3, and databases.",
						),
					},
					{
						size: "small",
						style: "default",
						icon: "barChart",
						title: "Analytics",
						description: createParagraph("Google Analytics, Mixpanel, Amplitude."),
					},
					{
						size: "small",
						style: "default",
						icon: "zap",
						title: "Automation",
						description: createParagraph("Zapier, Make, n8n for custom workflows."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Connect your tools today",
				subtext: "One-click integrations with 100+ apps. Set up in minutes, not days.",
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
							label: "View all integrations",
							url: "/integrations",
						},
					},
				],
			},
		],
		meta: {
			description:
				"Connect SaaSify with 100+ tools including Slack, Salesforce, HubSpot, and more. Native integrations, custom webhooks, and REST API access.",
			title: "Integrations — Connect Your Tools with SaaSify",
		},
	}
}
