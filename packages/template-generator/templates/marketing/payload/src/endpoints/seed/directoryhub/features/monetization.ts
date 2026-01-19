import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const analyticsPage = (): Partial<Page> => {
	return {
		slug: "features/analytics",
		_status: "published",
		title: "Analytics & Reporting",
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
									text: "Turn data into actionable insights",
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
									text: "Real-time dashboards, custom reports, and automated insights help you make data-driven decisions. Track the metrics that matter without spreadsheet chaos.",
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
						label: "See demo",
						url: "/demo",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Real-Time Dashboards",
				label: "Live Dashboards",
				headline: "See what's happening right now",
				description: createParagraph(
					"Real-time dashboards update instantly as your team works. Track key metrics, monitor progress, and spot trends the moment they emerge.",
				),
				link: {
					type: "custom",
					label: "See dashboard examples",
					url: "/demo",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Real-time data updates" },
					{ text: "Customizable widgets" },
					{ text: "Team and individual views" },
					{ text: "Mobile-friendly dashboards" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Custom Reports",
				label: "Reporting Tools",
				headline: "Build reports that answer your questions",
				description: createParagraph(
					"Create custom reports with drag-and-drop simplicity. Filter, group, and visualize your data exactly how you need it. Schedule reports to deliver automatically.",
				),
				link: {
					type: "custom",
					label: "Explore report builder",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Drag-and-drop report builder" },
					{ text: "Multiple chart types" },
					{ text: "Scheduled report delivery" },
					{ text: "Export to PDF, CSV, Excel" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Team Analytics",
				label: "Performance Insights",
				headline: "Understand team performance at a glance",
				description: createParagraph(
					"Track productivity, workload distribution, and goal progress. Identify bottlenecks, celebrate wins, and make data-backed decisions about resource allocation.",
				),
				link: {
					type: "custom",
					label: "View team analytics",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Individual performance metrics" },
					{ text: "Team workload distribution" },
					{ text: "Goal tracking and progress" },
					{ text: "Historical trend analysis" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Analytics Features",
				heading: "Analytics that drive results",
				subheading: "From overview dashboards to granular insights",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "barChart",
						stat: "50+",
						title: "Built-in Metrics",
						description: createParagraph("Pre-configured metrics ready to use."),
					},
					{
						size: "small",
						style: "accent",
						icon: "zap",
						title: "Real-Time",
						description: createParagraph("Data updates in seconds, not hours."),
					},
					{
						size: "small",
						style: "default",
						icon: "search",
						title: "Data Explorer",
						description: createParagraph("Query and explore raw data."),
					},
					{
						size: "small",
						style: "primary",
						icon: "layout",
						title: "Custom Views",
						description: createParagraph("Save and share personalized dashboards."),
					},
					{
						size: "small",
						style: "default",
						icon: "database",
						title: "Data Export",
						description: createParagraph("Export to any format or tool."),
					},
					{
						size: "small",
						style: "default",
						icon: "globe",
						title: "API Access",
						description: createParagraph("Pull analytics into your own tools."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Start making data-driven decisions",
				subtext:
					"Real-time dashboards and custom reports included in every plan. No setup required.",
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
		],
		meta: {
			description:
				"Real-time dashboards, custom reports, and team analytics. Make data-driven decisions with SaaSify's powerful analytics and reporting tools.",
			title: "Analytics & Reporting — SaaSify Business Intelligence",
		},
	}
}
