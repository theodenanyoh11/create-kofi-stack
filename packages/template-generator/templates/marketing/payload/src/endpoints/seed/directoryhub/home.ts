import type { Media, Page } from "@/payload-types"
import { createParagraph } from "./richtext-helper"

interface HomePageParams {
	heroImage?: Media | null
	testimonialImages?: (Media | null)[]
}

export const directoryHubHome = ({
	heroImage,
	testimonialImages = [],
}: HomePageParams = {}): Partial<Page> => {
	return {
		slug: "home",
		_status: "published",
		hero: {
			type: "productShowcase",
			// Include media reference if heroImage was uploaded
			...(heroImage && { media: heroImage.id }),
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
									text: "The modern platform for growing teams",
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
									text: "Streamline workflows, boost productivity, and scale your business with one powerful platform.",
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
			// 1. Logo Banner - Social proof strip
			{
				blockType: "logoBanner",
				blockName: "Trusted By",
				heading: "Trusted by fast-growing companies everywhere",
				style: "scroll",
				logos: [
					{ name: "TechFlow Inc" },
					{ name: "Acme Corp" },
					{ name: "Evergreen HQ" },
					{ name: "Atlas Network" },
					{ name: "Beacon Digital" },
					{ name: "Cascade Systems" },
				],
			},

			// 2. Value Proposition - Bird-style headline section
			{
				blockType: "proofBanner",
				blockName: "Value Proposition",
				style: "centered",
				headline: "Transform how your team works, collaborates, and grows",
				subtext:
					"Every interaction feeds into a powerful platform that powers personalized experiences, seamless collaboration, and intelligent automation across every touchpoint.",
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
							label: "Book a demo",
							url: "/contact",
						},
					},
				],
			},

			// 3. Bento Features - Asymmetric bento grid with 8 cards
			{
				blockType: "bentoFeatures",
				blockName: "Get to know SaaSify",
				heading: "Discover what SaaSify can do",
				subheading: "Everything you need to work smarter and scale faster",
				features: [
					// Position 1: Small (1x1) - top left
					{
						size: "small",
						style: "gradient",
						icon: "zap",
						stat: "5x",
						title: "Faster onboarding",
						description: createParagraph("Get your team up and running in hours, not weeks."),
					},
					// Position 2: Small (1x1) - top middle
					{
						size: "small",
						style: "accent",
						icon: "rocket",
						title: "Quick setup",
						description: createParagraph("Configure your workspace, invite your team, and start collaborating."),
					},
					// Position 3: Small (1x1) - top right
					{
						size: "small",
						style: "default",
						icon: "layers",
						title: "Powerful integrations",
						description: createParagraph("Connect with 100+ tools you already use."),
					},
					// Position 4: Tall (1x2) - left side spanning 2 rows
					{
						size: "tall",
						style: "primary",
						icon: "shield",
						title: "Enterprise security",
						description: createParagraph(
							"SOC 2 compliant with end-to-end encryption and complete audit trails for peace of mind.",
						),
					},
					// Position 5: Small (1x1) - row 2, middle
					{
						size: "small",
						style: "default",
						icon: "globe",
						stat: "99.9%",
						title: "Uptime",
						description: createParagraph("Reliable infrastructure you can count on."),
					},
					// Position 6: Small (1x1) - row 2, right
					{
						size: "small",
						style: "default",
						icon: "globe",
						title: "Global scale",
						description: createParagraph("Multi-region with custom domains."),
					},
					// Position 7: Small (1x1) - row 3, middle
					{
						size: "small",
						style: "default",
						icon: "settings",
						title: "Smart automation",
						description: createParagraph("Automate repetitive tasks and workflows."),
					},
					// Position 8: Small (1x1) - row 3, right
					{
						size: "small",
						style: "default",
						icon: "layers",
						title: "Flexible workflows",
						description: createParagraph("Build custom processes for any use case."),
					},
				],
			},

			// 4. Feature Showcase: Integrations (image right)
			{
				blockType: "featureShowcase",
				blockName: "Feature: Integrations",
				label: "Seamless Integrations",
				headline: "Connect everything your team uses in one place",
				description: createParagraph(
					"Integrate with 100+ popular tools including Slack, Salesforce, HubSpot, and more. Two-way sync keeps everything up to date automatically.",
				),
				link: {
					type: "custom",
					label: "Explore integrations",
					url: "/features/integrations",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "100+ native integrations" },
					{ text: "Two-way data sync" },
					{ text: "Custom webhooks" },
					{ text: "API access included" },
				],
			},

			// 5. Feature Showcase: Analytics (image left)
			{
				blockType: "featureShowcase",
				blockName: "Feature: Analytics",
				label: "Actionable Analytics",
				headline: "Make decisions backed by real-time data",
				description: createParagraph(
					"Track every metric that matters. From team performance to customer insights, get the visibility you need to drive growth.",
				),
				link: {
					type: "custom",
					label: "Learn about analytics",
					url: "/features/analytics",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Real-time dashboards" },
					{ text: "Custom reports" },
					{ text: "Team performance metrics" },
					{ text: "Automated insights" },
				],
			},

			// 6. Feature Showcase: Automation (image right)
			{
				blockType: "featureShowcase",
				blockName: "Feature: Automation",
				label: "Workflow Automation",
				headline: "Eliminate busywork with smart automation",
				description: createParagraph(
					"Build powerful workflows without code. Automate approvals, notifications, data entry, and more to focus on what matters.",
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
					{ text: "Conditional logic" },
					{ text: "Scheduled triggers" },
					{ text: "Cross-app automation" },
				],
			},

			// 7. Feature Showcase: Collaboration (image left)
			{
				blockType: "featureShowcase",
				blockName: "Feature: Collaboration",
				label: "Team Collaboration",
				headline: "Work together seamlessly, from anywhere",
				description: createParagraph(
					"Real-time collaboration features keep everyone aligned. Share workspaces, leave comments, and track activity across your entire team.",
				),
				link: {
					type: "custom",
					label: "Explore collaboration",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Real-time collaboration" },
					{ text: "Shared workspaces" },
					{ text: "Comments and mentions" },
					{ text: "Activity tracking" },
				],
			},

			// 8. Industry Tabs - Team solutions
			{
				blockType: "industryTabs",
				blockName: "Team Solutions",
				heading: "Solutions that deliver real results",
				subheading:
					"Whether you're in sales, marketing, or product, SaaSify adapts to how your team works.",
				tabs: [
					{
						name: "Sales Teams",
						stat: "40%",
						statLabel: "Faster deal cycles with smart pipeline tools",
						description:
							"Close deals faster with intelligent pipeline management, automated follow-ups, and real-time insights that help your team hit quota every quarter.",
						link: {
							type: "custom",
							label: "Solutions for sales",
							url: "/use-cases/sales",
							appearance: "default",
						},
					},
					{
						name: "Marketing Teams",
						stat: "3x",
						statLabel: "Campaign velocity with streamlined workflows",
						description:
							"Launch campaigns that convert with collaborative planning, asset management, and performance analytics all in one place.",
						link: {
							type: "custom",
							label: "Solutions for marketing",
							url: "/use-cases/marketing",
							appearance: "default",
						},
					},
					{
						name: "Product Teams",
						stat: "50%",
						statLabel: "Faster shipping with better prioritization",
						description:
							"Ship features users love with roadmap planning, feedback collection, and release management that keeps everyone aligned.",
						link: {
							type: "custom",
							label: "Solutions for product",
							url: "/use-cases/product",
							appearance: "default",
						},
					},
					{
						name: "Operations",
						stat: "60%",
						statLabel: "Time saved with process automation",
						description:
							"Scale your operations without the chaos. Automate processes, manage resources, and get visibility across your entire organization.",
						link: {
							type: "custom",
							label: "Solutions for ops",
							url: "/use-cases/operations",
							appearance: "default",
						},
					},
				],
			},

			// 9. Testimonials Grid - Bird-style stats with photos
			{
				blockType: "testimonialsGrid",
				blockName: "Customer Stories",
				heading: "Loved by teams at companies of all sizes",
				subheading:
					"See how leading teams use SaaSify to drive growth and productivity.",
				testimonials: [
					{
						...(testimonialImages[0] && { image: testimonialImages[0].id }),
						stat: "94%",
						statLabel: "Faster onboarding",
						quote:
							"We got our entire team onboarded in under a day. The intuitive interface and powerful integrations saved us weeks of setup time.",
						author: "Sarah Chen",
						company: "TechFlow Inc",
					},
					{
						...(testimonialImages[1] && { image: testimonialImages[1].id }),
						stat: "3x",
						statLabel: "Productivity",
						quote:
							"Our team is shipping features faster than ever. The automation tools eliminated hours of manual work every week.",
						author: "Marcus Rivera",
						company: "Beacon Digital",
					},
					{
						...(testimonialImages[2] && { image: testimonialImages[2].id }),
						stat: "40%",
						statLabel: "Cost reduction",
						quote:
							"We consolidated five different tools into SaaSify. The ROI was immediate and our team loves having everything in one place.",
						author: "David Kim",
						company: "Cascade Systems",
					},
				],
			},

			// 10. Trust Columns - Bird-style two-column section
			{
				blockType: "trustColumns",
				blockName: "Trust & Security",
				columns: [
					{
						label: "Integrations",
						heading: "Connect anywhere",
						description:
							"Plug in and get started immediately with pre-built connectors for every major platform.",
						items: [
							{ icon: "zap", text: "Go live in minutes" },
							{ icon: "plug", text: "Pre-built connectors" },
							{ icon: "database", text: "Complete data sync" },
							{ icon: "cloud", text: "Cloud-native infrastructure" },
						],
					},
					{
						label: "Security & Compliance",
						heading: "Enterprise-level security",
						description:
							"Keep your data safe with encryption, granular access control, and compliance-ready infrastructure.",
						items: [
							{ icon: "shield", text: "SOC 2 Type II certified" },
							{ icon: "lock", text: "End-to-end encryption" },
							{ icon: "award", text: "Complete audit trails" },
							{ icon: "globe", text: "GDPR compliant" },
						],
					},
				],
			},

			// 11. Integrations Banner
			{
				blockType: "logoBanner",
				blockName: "Integrations",
				heading: "Integrates with your favorite tools",
				style: "grid",
				logos: [
					{ name: "Slack" },
					{ name: "Salesforce" },
					{ name: "HubSpot" },
					{ name: "Google Workspace" },
					{ name: "Zapier" },
					{ name: "Jira" },
				],
			},

			// 12. Pricing
			{
				blockType: "pricingTable",
				blockName: "Pricing",
				heading: "Simple, transparent pricing",
				subheading: "Start free, upgrade as your team grows. No hidden fees.",
				showComparisonTable: false,
				showViewAllLink: true,
				maxFeaturesOnCard: 4,
				plans: [
					{
						name: "Free",
						price: "$0/mo",
						description: "Perfect for trying SaaSify.",
						features: [
							{ feature: "Up to 3 users", included: true },
							{ feature: "Basic features", included: true },
							{ feature: "Community support", included: true },
						],
						link: {
							type: "custom",
							label: "Get started free",
							url: "/sign-up",
							appearance: "outline",
						},
					},
					{
						name: "Pro",
						price: "$29/mo",
						description: "For small teams getting started.",
						featured: true,
						features: [
							{ feature: "Up to 10 users", included: true },
							{ feature: "Advanced features", included: true },
							{ feature: "Integrations", included: true },
							{ feature: "Priority support", included: true },
						],
						link: {
							type: "custom",
							label: "Get Pro",
							url: "/sign-up",
							appearance: "default",
						},
					},
					{
						name: "Business",
						price: "$99/mo",
						description: "For teams ready to scale.",
						features: [
							{ feature: "Unlimited users", included: true },
							{ feature: "All features", included: true },
							{ feature: "API access", included: true },
							{ feature: "Dedicated support", included: true },
						],
						link: {
							type: "custom",
							label: "Get Business",
							url: "/sign-up",
							appearance: "outline",
						},
					},
				],
			},

			// 13. Final CTA - Bird-style full-width with background
			{
				blockType: "finalCta",
				blockName: "Final CTA",
				headline: "Ready to transform how your team works?",
				subheading:
					"Join thousands of teams who chose the smarter way to work. Start free, upgrade as you grow.",
				style: "dark",
				links: [
					{
						link: {
							type: "custom",
							appearance: "outline",
							label: "Start free trial",
							url: "/sign-up",
						},
					},
					{
						link: {
							type: "custom",
							appearance: "default",
							label: "Book a demo",
							url: "/contact",
						},
					},
				],
			},
		],
		meta: {
			description:
				"Streamline workflows, boost productivity, and scale your business with SaaSify. The modern platform for growing teams. Free to start.",
			title: "SaaSify — The Modern Platform for Growing Teams",
		},
		title: "Home",
	}
}
