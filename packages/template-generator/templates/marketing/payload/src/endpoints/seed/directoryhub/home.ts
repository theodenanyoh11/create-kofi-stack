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
									text: "Launch, monetize, and scale directories fast",
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
									text: "The platform that accelerates directory launches, automates operations, and grows revenue.",
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
						label: "Get started",
						url: "/sign-up",
					},
				},
				{
					link: {
						type: "custom",
						appearance: "outline",
						label: "View templates",
						url: "/templates",
					},
				},
			],
		},
		layout: [
			// 1. Logo Banner - Social proof strip (KEEP)
			{
				blockType: "logoBanner",
				blockName: "Trusted By",
				heading: "Built for businesses where directories matter",
				style: "scroll",
				logos: [
					{ name: "Northwind Market" },
					{ name: "Acme Listings" },
					{ name: "Evergreen HQ" },
					{ name: "Atlas Network" },
					{ name: "Beacon Partners" },
					{ name: "Cascade Labs" },
				],
			},

			// 2. Value Proposition - Bird-style headline section
			{
				blockType: "proofBanner",
				blockName: "Value Proposition",
				style: "centered",
				headline: "Turn your niche expertise into a revenue-generating directory",
				subtext:
					"Every interaction feeds into a powerful platform that powers personalized experiences, targeted discovery, and intelligent automation across every touchpoint.",
				links: [
					{
						link: {
							type: "custom",
							appearance: "default",
							label: "Start for free",
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
				blockName: "Get to know DirectoryHub",
				heading: "Get to know DirectoryHub",
				subheading: "Everything you need to launch and monetize directories",
				features: [
					// Position 1: Small (1x1) - top left
					{
						size: "small",
						style: "gradient",
						icon: "zap",
						stat: "5x",
						title: "Faster launches",
						description: createParagraph("Launch your directory in days, not months."),
					},
					// Position 2: Small (1x1) - top middle
					{
						size: "small",
						style: "accent",
						icon: "rocket",
						title: "Go live quickly",
						description: createParagraph("Pick a template, customize your brand, and publish."),
					},
					// Position 3: Small (1x1) - top right
					{
						size: "small",
						style: "default",
						icon: "dollarSign",
						title: "Monetize instantly",
						description: createParagraph("Stripe payments and subscription tiers built-in."),
					},
					// Position 4: Tall (1x2) - left side spanning 2 rows
					{
						size: "tall",
						style: "primary",
						icon: "shield",
						title: "Enterprise security",
						description: createParagraph(
							"Per-tenant isolation, encrypted data, and complete audit trails for peace of mind.",
						),
					},
					// Position 5: Small (1x1) - row 2, middle
					{
						size: "small",
						style: "default",
						icon: "search",
						stat: "100%",
						title: "SEO ready",
						description: createParagraph("Schema markup and sitemaps generated automatically."),
					},
					// Position 6: Small (1x1) - row 2, right
					{
						size: "small",
						style: "default",
						icon: "globe",
						title: "Global scale",
						description: createParagraph("Multi-tenant with custom domains."),
					},
					// Position 7: Small (1x1) - row 3, middle
					{
						size: "small",
						style: "default",
						icon: "settings",
						title: "Smart automation",
						description: createParagraph("Automated workflows and moderation."),
					},
					// Position 8: Small (1x1) - row 3, right
					{
						size: "small",
						style: "default",
						icon: "layers",
						title: "Custom fields",
						description: createParagraph("Flexible schemas for any directory type."),
					},
				],
			},

			// 4. Feature Showcase: Templates (image right)
			{
				blockType: "featureShowcase",
				blockName: "Feature: Templates",
				label: "Directory Templates",
				headline: "Go from idea to live directory in a weekend",
				description: createParagraph(
					"High-converting directory templates designed for every niche. Benefit from schema pre-fills, dynamic UI, smart search, and intelligent optimizations that drive engagement.",
				),
				link: {
					type: "custom",
					label: "Explore templates",
					url: "/templates",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "10+ ready-to-use templates" },
					{ text: "Custom domain in minutes" },
					{ text: "Mobile-first responsive design" },
					{ text: "Deep localization support" },
				],
			},

			// 5. Feature Showcase: Monetization (image left)
			{
				blockType: "featureShowcase",
				blockName: "Feature: Monetization",
				label: "Revenue Engine",
				headline: "Drive revenue with built-in monetization",
				description: createParagraph(
					"Stop leaving money on the table. Charge for listings, offer premium placements, and run subscription tiers without writing a line of payment code. Automated invoicing and tax handling included.",
				),
				link: {
					type: "custom",
					label: "Learn about monetization",
					url: "/pricing",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Subscription tiers" },
					{ text: "Featured placements" },
					{ text: "Pay-per-listing options" },
					{ text: "Automated payouts" },
				],
			},

			// 6. Feature Showcase: SEO (image right)
			{
				blockType: "featureShowcase",
				blockName: "Feature: SEO",
				label: "Search Optimization",
				headline: "Rank on page one without the technical overhead",
				description: createParagraph(
					"Every directory comes with enterprise-grade SEO built-in. Structured data, dynamic sitemaps, and optimized meta tags ensure your listings get discovered by the right audience.",
				),
				link: {
					type: "custom",
					label: "See SEO features",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "Automatic schema markup" },
					{ text: "Dynamic XML sitemaps" },
					{ text: "SEO-friendly URLs" },
					{ text: "Social sharing optimization" },
				],
			},

			// 7. Feature Showcase: Management (image left)
			{
				blockType: "featureShowcase",
				blockName: "Feature: Management",
				label: "Admin Dashboard",
				headline: "Manage everything from one powerful dashboard",
				description: createParagraph(
					"Review submissions, moderate content, track analytics, and manage payments all in one place. Built-in tools help you maintain quality while scaling your directory business.",
				),
				link: {
					type: "custom",
					label: "Explore dashboard",
					url: "/features",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Submission review queues" },
					{ text: "Bulk moderation tools" },
					{ text: "Real-time analytics" },
					{ text: "User management" },
				],
			},

			// 8. Industry Tabs - Bird-style tabbed use cases
			{
				blockType: "industryTabs",
				blockName: "Use Cases",
				heading: "Directories that turn data into intelligent experiences",
				subheading:
					"Whether you are building for local services or global marketplaces, DirectoryHub adapts to your model.",
				tabs: [
					{
						name: "Local Services",
						stat: "340%",
						statLabel: "Higher conversion with location-based discovery",
						description:
							"Plumbers, photographers, restaurants. Card grids with reviews, maps, and geo-filtering that help customers find exactly what they need.",
						link: {
							type: "custom",
							label: "Local directory solutions",
							url: "/templates",
							appearance: "default",
						},
					},
					{
						name: "B2B Vendor Hubs",
						stat: "94%",
						statLabel: "Faster vendor onboarding with smart filters",
						description:
							"SaaS tools, agencies, consultants. Advanced filters, comparison views, and lead capture that convert browsers into buyers.",
						link: {
							type: "custom",
							label: "B2B directory solutions",
							url: "/templates",
							appearance: "default",
						},
					},
					{
						name: "Communities",
						stat: "+12K",
						statLabel: "Members connected through curated networks",
						description:
							"Member directories, alumni networks, professional associations with gated access and rich member profiles.",
						link: {
							type: "custom",
							label: "Community solutions",
							url: "/templates",
							appearance: "default",
						},
					},
					{
						name: "Marketplaces",
						stat: "$2M+",
						statLabel: "Revenue processed through integrated payments",
						description:
							"Multi-vendor search, featured slots, automated payouts to sellers. Everything you need to run a thriving marketplace.",
						link: {
							type: "custom",
							label: "Marketplace solutions",
							url: "/templates",
							appearance: "default",
						},
					},
				],
			},

			// 9. Testimonials Grid - Bird-style stats with photos
			{
				blockType: "testimonialsGrid",
				blockName: "Customer Stories",
				heading: "Trusted by founders who depend on their directories",
				subheading:
					"See how leading directory builders use DirectoryHub to drive intelligent growth.",
				testimonials: [
					{
						...(testimonialImages[0] && { image: testimonialImages[0].id }),
						stat: "94%",
						statLabel: "Faster launch time",
						quote:
							"We went from idea to collecting payments in 3 days. The templates and Stripe integration saved us months of development time.",
						author: "Sarah Chen",
						company: "Northwind Market",
					},
					{
						...(testimonialImages[1] && { image: testimonialImages[1].id }),
						stat: "+300%",
						statLabel: "Traffic growth",
						quote:
							"Our niche directory started ranking on page 1 within weeks. The structured data and sitemaps are handled automatically.",
						author: "Marcus Rivera",
						company: "Beacon Partners",
					},
					{
						...(testimonialImages[2] && { image: testimonialImages[2].id }),
						stat: "161%",
						statLabel: "Revenue increase",
						quote:
							"Featured placements and premium tiers covered our costs in the first month. The monetization tools just work.",
						author: "David Kim",
						company: "Cascade Labs",
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
							"Keep your data private with encryption, granular access control, and compliance-ready infrastructure.",
						items: [
							{ icon: "shield", text: "SOC 2-minded controls" },
							{ icon: "lock", text: "Per-tenant data isolation" },
							{ icon: "award", text: "Complete audit trails" },
							{ icon: "globe", text: "GDPR-ready infrastructure" },
						],
					},
				],
			},

			// 11. Integrations Banner (KEEP)
			{
				blockType: "logoBanner",
				blockName: "Integrations",
				heading: "Powered by industry-leading technology",
				style: "grid",
				logos: [
					{ name: "Stripe" },
					{ name: "Vercel" },
					{ name: "AWS" },
					{ name: "Google Analytics" },
					{ name: "Zapier" },
					{ name: "Convex" },
				],
			},

			// 12. Pricing (KEEP)
			{
				blockType: "pricingTable",
				blockName: "Pricing",
				heading: "Simple, transparent pricing",
				subheading: "Start free, upgrade as you grow. No hidden fees.",
				showComparisonTable: false,
				showViewAllLink: true,
				maxFeaturesOnCard: 4,
				plans: [
					{
						name: "Free",
						price: "$0/mo",
						description: "Perfect for getting started.",
						features: [
							{ feature: "1 directory site", included: true },
							{ feature: "Basic customization", included: true },
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
						description: "For growing businesses.",
						featured: true,
						features: [
							{ feature: "5 directory sites", included: true },
							{ feature: "Advanced customization", included: true },
							{ feature: "Custom domains", included: true },
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
						description: "For teams and agencies.",
						features: [
							{ feature: "Unlimited directory sites", included: true },
							{ feature: "White-label branding", included: true },
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
				headline: "The complete platform that scales with your directory business",
				subheading:
					"Join hundreds of founders who chose the faster path to a profitable directory business. Start free, upgrade as you grow.",
				style: "dark",
				links: [
					{
						link: {
							type: "custom",
							appearance: "outline",
							label: "Get started",
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
				"Launch a profitable directory business in minutes with built-in payments, SEO, and automation. Free to start.",
			title: "DirectoryHub — Launch revenue-first directories fast",
		},
		title: "Home",
	}
}
