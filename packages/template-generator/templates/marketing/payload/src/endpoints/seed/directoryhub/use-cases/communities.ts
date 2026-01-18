import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const communitiesPage = (): Partial<Page> => {
	return {
		slug: "use-cases/communities",
		_status: "published",
		title: "Community Directory",
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
									text: "Connect your community with a powerful member directory",
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
									text: "Build member directories for alumni networks, professional associations, and private communities. Gated access, rich profiles, and networking tools included.",
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
						label: "Start your directory",
						url: "/sign-up",
					},
				},
				{
					link: {
						type: "custom",
						appearance: "outline",
						label: "See community templates",
						url: "/templates",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Member Profiles",
				label: "Rich Member Profiles",
				headline: "Showcase your members with detailed profiles",
				description: createParagraph(
					"Members can create rich profiles with photos, bios, skills, interests, and contact information. Custom fields let you capture whatever matters most to your community.",
				),
				link: {
					type: "custom",
					label: "See profile options",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Profile photos and cover images" },
					{ text: "Custom bio and about sections" },
					{ text: "Skills and interests tags" },
					{ text: "Social media links" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Access Control",
				label: "Gated Access",
				headline: "Control who can see and access content",
				description: createParagraph(
					"Restrict directory access to members only, or allow public browsing with limited profile visibility. Membership tiers can unlock different levels of access and features.",
				),
				link: {
					type: "custom",
					label: "Learn about access control",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Members-only directory" },
					{ text: "Tiered access levels" },
					{ text: "Private contact information" },
					{ text: "Approval workflows" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Networking",
				label: "Networking Tools",
				headline: "Help members connect with each other",
				description: createParagraph(
					"Built-in messaging, connection requests, and member search make it easy for community members to find and connect with each other. Foster meaningful professional relationships.",
				),
				link: {
					type: "custom",
					label: "Explore networking features",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Member search and discovery" },
					{ text: "Connection requests" },
					{ text: "Direct messaging" },
					{ text: "Member activity feed" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Community Features",
				heading: "Everything for member communities",
				subheading: "Tools to build, engage, and grow your community",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "users",
						stat: "+12K",
						title: "Members Connected",
						description: createParagraph("Build thriving member networks."),
					},
					{
						size: "small",
						style: "accent",
						icon: "shield",
						title: "Privacy Controls",
						description: createParagraph("Members control their visibility."),
					},
					{
						size: "small",
						style: "default",
						icon: "search",
						title: "Smart Search",
						description: createParagraph("Find members by skills, location, or interests."),
					},
					{
						size: "small",
						style: "primary",
						icon: "building",
						title: "Organization Pages",
						description: createParagraph("Company profiles for corporate members."),
					},
					{
						size: "small",
						style: "default",
						icon: "globe",
						title: "Subgroups",
						description: createParagraph("Regional chapters or interest groups."),
					},
					{
						size: "small",
						style: "default",
						icon: "barChart",
						title: "Engagement Analytics",
						description: createParagraph("Track member activity and growth."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Build your community directory today",
				subtext:
					"Connect your members with a modern directory. Perfect for associations, alumni networks, and private communities.",
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
							label: "Talk to sales",
							url: "/contact",
						},
					},
				],
			},
		],
		meta: {
			description:
				"Build a community member directory with rich profiles, gated access, and networking tools. Perfect for alumni networks, associations, and private communities.",
			title: "Community Directory — DirectoryHub Use Case",
		},
	}
}
