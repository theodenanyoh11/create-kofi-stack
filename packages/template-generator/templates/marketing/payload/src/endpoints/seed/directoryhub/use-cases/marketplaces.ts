import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const operationsPage = (): Partial<Page> => {
	return {
		slug: "use-cases/operations",
		_status: "published",
		title: "SaaSify for Operations Teams",
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
									text: "Scale your operations without the chaos",
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
									text: "Process automation, resource planning, and reporting tools that help operations teams do more with less and scale efficiently.",
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
				blockName: "Process Automation",
				label: "Automation",
				headline: "Automate repetitive processes",
				description: createParagraph(
					"Build workflows that handle approvals, notifications, data routing, and handoffs automatically. Reduce manual work and eliminate bottlenecks.",
				),
				link: {
					type: "custom",
					label: "See automation features",
					url: "/features/automation",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Visual workflow builder" },
					{ text: "Approval automation" },
					{ text: "Data routing and handoffs" },
					{ text: "Notification triggers" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Resource Planning",
				label: "Resource Management",
				headline: "Plan and allocate resources effectively",
				description: createParagraph(
					"See team capacity, workload distribution, and resource utilization at a glance. Make informed decisions about hiring, outsourcing, and prioritization.",
				),
				link: {
					type: "custom",
					label: "Learn about resource planning",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Capacity planning" },
					{ text: "Workload visibility" },
					{ text: "Resource allocation" },
					{ text: "Utilization tracking" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Reporting",
				label: "Operations Analytics",
				headline: "Get visibility into every process",
				description: createParagraph(
					"Track cycle times, bottlenecks, and throughput. Custom dashboards and scheduled reports keep stakeholders informed and help you continuously improve.",
				),
				link: {
					type: "custom",
					label: "See analytics features",
					url: "/features/analytics",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Process analytics" },
					{ text: "Cycle time tracking" },
					{ text: "Bottleneck identification" },
					{ text: "Custom dashboards" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Operations Features",
				heading: "Tools that help you scale",
				subheading: "Everything your operations team needs in one platform",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "zap",
						stat: "60%",
						title: "Time Saved",
						description: createParagraph("Automate away the busywork."),
					},
					{
						size: "small",
						style: "accent",
						icon: "layers",
						title: "Process Templates",
						description: createParagraph("Pre-built templates for common processes."),
					},
					{
						size: "small",
						style: "default",
						icon: "users",
						title: "Cross-Team Visibility",
						description: createParagraph("See work across departments."),
					},
					{
						size: "small",
						style: "primary",
						icon: "barChart",
						title: "Performance Metrics",
						description: createParagraph("Track KPIs across all processes."),
					},
					{
						size: "small",
						style: "default",
						icon: "database",
						title: "Data Integrations",
						description: createParagraph("Connect with your existing tools."),
					},
					{
						size: "small",
						style: "default",
						icon: "shield",
						title: "Compliance Tracking",
						description: createParagraph("Audit trails and compliance reporting."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Scale operations without adding headcount",
				subtext:
					"Process automation, resource planning, and analytics. Start scaling smarter today.",
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
				"SaaSify for operations teams. Process automation, resource planning, and reporting tools to help you scale your operations efficiently.",
			title: "Operations Teams — SaaSify Use Case",
		},
	}
}
