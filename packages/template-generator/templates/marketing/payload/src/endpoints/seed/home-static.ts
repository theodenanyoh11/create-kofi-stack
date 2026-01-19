import type { RequiredDataFromCollectionSlug } from "payload"

// Minimal setup page shown before the database is seeded
// This page guides users to complete their site setup
export const homeStatic: RequiredDataFromCollectionSlug<"pages"> = {
	slug: "home",
	_status: "published",
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
								text: "Welcome to your new site",
								version: 1,
							},
						],
						direction: "ltr",
						format: "",
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
								text: "Your site is ready to be configured. Visit the admin panel to set up your content.",
								version: 1,
							},
						],
						direction: "ltr",
						format: "",
						indent: 0,
						textFormat: 0,
						version: 1,
					},
				],
				direction: "ltr",
				format: "",
				indent: 0,
				version: 1,
			},
		},
		links: [
			{
				link: {
					type: "custom",
					newTab: false,
					url: "/admin",
					label: "Go to Admin Panel",
					appearance: "default",
				},
			},
		],
	},
	meta: {
		description: "Welcome to your new site. Set up your content in the admin panel.",
		title: "Welcome — Site Setup",
	},
	title: "Home",
	layout: [
		{
			blockType: "content",
			columns: [
				{
					size: "full",
					richText: {
						root: {
							type: "root",
							children: [
								{
									type: "heading",
									tag: "h2",
									children: [
										{
											type: "text",
											detail: 0,
											format: 0,
											mode: "normal",
											style: "",
											text: "Getting Started",
											version: 1,
										},
									],
									direction: "ltr",
									format: "",
									indent: 0,
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
											text: "1. Go to ",
											version: 1,
										},
										{
											type: "text",
											detail: 0,
											format: 1,
											mode: "normal",
											style: "",
											text: "/admin",
											version: 1,
										},
										{
											type: "text",
											detail: 0,
											format: 0,
											mode: "normal",
											style: "",
											text: " and create your admin account",
											version: 1,
										},
									],
									direction: "ltr",
									format: "",
									indent: 0,
									textFormat: 0,
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
											text: "2. Click the \"Seed Database\" button to populate your site with demo content",
											version: 1,
										},
									],
									direction: "ltr",
									format: "",
									indent: 0,
									textFormat: 0,
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
											text: "3. Customize your pages, navigation, and content",
											version: 1,
										},
									],
									direction: "ltr",
									format: "",
									indent: 0,
									textFormat: 0,
									version: 1,
								},
							],
							direction: "ltr",
							format: "",
							indent: 0,
							version: 1,
						},
					},
				},
			],
		},
	],
}
