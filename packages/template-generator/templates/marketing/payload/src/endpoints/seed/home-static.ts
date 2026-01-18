import type { RequiredDataFromCollectionSlug } from "payload"

// Helper to create simple paragraph rich text
const createParagraph = (text: string) => ({
	root: {
		type: "root" as const,
		children: [
			{
				type: "paragraph" as const,
				children: [
					{
						type: "text" as const,
						detail: 0,
						format: 0,
						mode: "normal" as const,
						style: "",
						text,
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
})

// Helper to create rich text with multiple elements
type RichTextElement =
	| { type: "heading"; tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; text: string }
	| { type: "paragraph"; text: string }

const createRichText = (elements: RichTextElement[]) => ({
	root: {
		type: "root" as const,
		children: elements.map((el) => {
			if (el.type === "heading") {
				return {
					type: "heading" as const,
					tag: el.tag,
					children: [
						{
							type: "text" as const,
							detail: 0,
							format: 0,
							mode: "normal" as const,
							style: "",
							text: el.text,
							version: 1,
						},
					],
					direction: "ltr" as const,
					format: "" as const,
					indent: 0,
					version: 1,
				}
			}
			return {
				type: "paragraph" as const,
				children: [
					{
						type: "text" as const,
						detail: 0,
						format: 0,
						mode: "normal" as const,
						style: "",
						text: el.text,
						version: 1,
					},
				],
				direction: "ltr" as const,
				format: "" as const,
				indent: 0,
				textFormat: 0,
				version: 1,
			}
		}),
		direction: "ltr" as const,
		format: "" as const,
		indent: 0,
		version: 1,
	},
})

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<"pages"> = {
	slug: "home",
	_status: "published",
	hero: {
		type: "productShowcase",
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
					newTab: false,
					url: "/sign-up",
					label: "Get started",
					appearance: "default",
				},
			},
			{
				link: {
					type: "custom",
					newTab: false,
					url: "/templates",
					label: "View templates",
					appearance: "outline",
				},
			},
		],
	},
	meta: {
		description:
			"Launch a profitable directory business in minutes with built-in payments, SEO, and automation. Free to start.",
		title: "DirectoryHub — Launch revenue-first directories fast",
	},
	title: "Home",
	layout: [
		// Logo Banner - Social proof strip (like Bird's Fortune 500 logos)
		{
			blockType: "logoBanner",
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

		// KPI Strip - Duna-style animated metrics
		{
			blockType: "proofBanner",
			style: "centered",
			headline: "Designed to convert. Built to scale.",
			subtext: "5x faster launches • 99.9% uptime • $2M+ processed",
		},

		// Value Pillars - Bird-style feature grid with icons
		{
			blockType: "featureGrid",
			heading: "Get to know DirectoryHub",
			subheading: "Everything you need to launch and monetize directories",
			columns: "3",
			features: [
				{
					icon: "zap",
					title: "Launch in days, not months",
					description: createParagraph(
						"Pick a template, add your brand, and publish. No backend setup, no DevOps headaches.",
					),
				},
				{
					icon: "dollarSign",
					title: "Monetize from day one",
					description: createParagraph(
						"Stripe-powered payments, subscription tiers, featured placements, and automated payouts.",
					),
				},
				{
					icon: "search",
					title: "SEO out of the box",
					description: createParagraph(
						"Structured data, sitemaps, and clean URLs generated automatically for every listing.",
					),
				},
			],
		},

		// Product Feature 1 - Duna-style asymmetric content
		{
			blockType: "content",
			columns: [
				{
					size: "twoThirds",
					richText: createRichText([
						{
							type: "heading",
							tag: "h2",
							text: "Go from idea to live directory in a weekend",
						},
						{
							type: "paragraph",
							text: "High-converting directory templates — no code required. Benefit from schema pre-fills, dynamic UI, smart reminders, and intelligent optimizations.",
						},
					]),
					enableLink: true,
					link: {
						type: "custom",
						label: "See templates →",
						url: "/templates",
						appearance: "default",
					},
				},
				{
					size: "oneThird",
					richText: createRichText([
						{ type: "paragraph", text: "✓ 10+ ready-to-use templates" },
						{ type: "paragraph", text: "✓ Custom domain in minutes" },
						{ type: "paragraph", text: "✓ Mobile-first responsive design" },
						{ type: "paragraph", text: "✓ Deep localization support" },
					]),
				},
			],
		},

		// How It Works - Visual walkthrough (Duna-style steps)
		{
			blockType: "howItWorks",
			heading: "The infrastructure behind every directory",
			subheading:
				"At the heart of DirectoryHub is a powerful engine driving decisions across the full customer lifecycle.",
			steps: [
				{
					title: "Choose & customize",
					description: createParagraph(
						"Select from professionally designed templates. Configure every field to fit your niche — from basic listings to complex schemas.",
					),
				},
				{
					title: "Configure monetization",
					description: createParagraph(
						"Set up subscription tiers, featured placements, and pay-per-listing. Stripe handles payments, we handle the rest.",
					),
				},
				{
					title: "Launch & scale",
					description: createParagraph(
						"Publish your directory with SEO baked in. Monitor analytics, automate moderation, and grow your audience.",
					),
				},
			],
		},

		// Product Feature 2 - Monetization (Duna-style reversed layout)
		{
			blockType: "content",
			columns: [
				{
					size: "oneThird",
					richText: createRichText([
						{ type: "paragraph", text: "💳 Subscription tiers" },
						{ type: "paragraph", text: "⭐ Featured placements" },
						{ type: "paragraph", text: "📝 Pay-per-listing" },
						{ type: "paragraph", text: "🎫 Coupon codes" },
					]),
				},
				{
					size: "twoThirds",
					richText: createRichText([
						{ type: "heading", tag: "h2", text: "Drive revenue with built-in monetization" },
						{
							type: "paragraph",
							text: "Stop leaving money on the table. Charge for listings, offer premium placements, and run subscription tiers without writing a line of payment code.",
						},
						{
							type: "paragraph",
							text: "Automated invoicing, tax handling, and payout scheduling included.",
						},
					]),
					enableLink: true,
					link: {
						type: "custom",
						label: "Learn about monetization →",
						url: "/pricing",
						appearance: "default",
					},
				},
			],
		},

		// Use Cases - Bird-style vertical cards
		{
			blockType: "personas",
			heading: "Directories that turn data into intelligent experiences",
			subheading:
				"Whether you are building for local services or global marketplaces, DirectoryHub adapts to your model.",
			personas: [
				{
					icon: "briefcase",
					title: "Local Services",
					description: createParagraph(
						"Plumbers, photographers, restaurants. Card grids with reviews, maps, and geo-filtering.",
					),
				},
				{
					icon: "building",
					title: "B2B Vendor Hubs",
					description: createParagraph(
						"SaaS tools, agencies, consultants. Advanced filters, comparison views, and lead capture.",
					),
				},
				{
					icon: "users",
					title: "Communities",
					description: createParagraph(
						"Member directories, alumni networks, professional associations with gated access.",
					),
				},
				{
					icon: "trendingUp",
					title: "Marketplaces",
					description: createParagraph(
						"Multi-vendor search, featured slots, automated payouts to sellers.",
					),
				},
			],
		},

		// Testimonials Header
		{
			blockType: "content",
			columns: [
				{
					size: "full",
					richText: createRichText([
						{ type: "heading", tag: "h2", text: "Trusted by founders who depend on their data" },
						{
							type: "paragraph",
							text: "See how leading directory builders use DirectoryHub to drive intelligent growth.",
						},
					]),
				},
			],
		},

		// Testimonials - Bird-style stats cards
		{
			blockType: "featureGrid",
			columns: "3",
			features: [
				{
					icon: "star",
					title: "94% faster launch time",
					description: createParagraph(
						'"We went from idea to collecting payments in 3 days. The templates and Stripe integration saved us months." — Sarah Chen, Northwind Market',
					),
				},
				{
					icon: "star",
					title: "Page 1 rankings in weeks",
					description: createParagraph(
						'"Our niche directory started ranking on page 1 within weeks. The structured data and sitemaps are handled automatically." — Marcus Rivera, Beacon Partners',
					),
				},
				{
					icon: "star",
					title: "$12K MRR in month one",
					description: createParagraph(
						'"Featured placements and premium tiers covered our costs in the first month. The monetization tools just work." — David Kim, Cascade Labs',
					),
				},
			],
		},

		// Social Proof Banner - Full-width CTA (Duna-style)
		{
			blockType: "proofBanner",
			style: "withBackground",
			headline: "Join 500+ founders building revenue-first directories",
			subtext:
				"Ship faster than custom builds. Keep the polish, security, and governance your users expect.",
			links: [
				{
					link: {
						type: "custom",
						newTab: false,
						url: "/sign-up",
						label: "Get started",
						appearance: "outline",
					},
				},
				{
					link: {
						type: "custom",
						newTab: false,
						url: "/posts",
						label: "See customer stories",
						appearance: "default",
					},
				},
			],
		},

		// Trust & Security - Duna-style two-column
		{
			blockType: "content",
			columns: [
				{
					size: "half",
					richText: createRichText([
						{ type: "heading", tag: "h2", text: "Safe and secure" },
						{
							type: "paragraph",
							text: "Your trust is our foundation. DirectoryHub is designed with a deep commitment to data privacy and security.",
						},
						{ type: "paragraph", text: "🔒 SOC 2-minded controls" },
						{ type: "paragraph", text: "🔐 Per-tenant data isolation" },
						{ type: "paragraph", text: "📋 Complete audit trails" },
						{ type: "paragraph", text: "🌍 GDPR-ready infrastructure" },
					]),
				},
				{
					size: "half",
					richText: createRichText([
						{ type: "heading", tag: "h2", text: "Enterprise-ready infrastructure" },
						{
							type: "paragraph",
							text: "We partner with the best so you do not have to worry about uptime, scaling, or reliability.",
						},
						{ type: "paragraph", text: "⚡ 99.9% uptime SLA" },
						{ type: "paragraph", text: "🚀 Global CDN delivery" },
						{ type: "paragraph", text: "💾 Automated backups" },
						{ type: "paragraph", text: "📈 Auto-scaling infrastructure" },
					]),
				},
			],
		},

		// Integrations Wall - Bird-style
		{
			blockType: "logoBanner",
			heading: "Connect anywhere. Plug in and get started immediately.",
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

		// Pricing
		{
			blockType: "pricingTable",
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

		// FAQ Header
		{
			blockType: "content",
			columns: [
				{
					size: "full",
					richText: createRichText([
						{ type: "heading", tag: "h2", text: "Frequently asked questions" },
						{ type: "paragraph", text: "Everything you need to know about DirectoryHub." },
					]),
				},
			],
		},

		// FAQ Content - Two columns
		{
			blockType: "content",
			columns: [
				{
					size: "half",
					richText: createRichText([
						{ type: "heading", tag: "h4", text: "How fast can I launch?" },
						{
							type: "paragraph",
							text: "Most teams go live in a weekend. Pick a template, add your brand, configure monetization, and publish.",
						},
						{ type: "heading", tag: "h4", text: "Do you handle SEO?" },
						{
							type: "paragraph",
							text: "Yes. Structured data, sitemaps, meta tags, and clean URLs are all generated automatically.",
						},
						{ type: "heading", tag: "h4", text: "Can I use my own domain?" },
						{
							type: "paragraph",
							text: "Absolutely. Custom domains are supported on all paid plans, with automatic SSL certificates.",
						},
					]),
				},
				{
					size: "half",
					richText: createRichText([
						{ type: "heading", tag: "h4", text: "How do payments work?" },
						{
							type: "paragraph",
							text: "We integrate with Stripe. You can charge for listings, offer subscriptions, and receive automated payouts.",
						},
						{ type: "heading", tag: "h4", text: "Can I moderate submissions?" },
						{
							type: "paragraph",
							text: "Yes. Built-in review queues, approval workflows, and auto-moderation tools keep your directory quality high.",
						},
						{ type: "heading", tag: "h4", text: "What if I need help?" },
						{
							type: "paragraph",
							text: "Community support on Free, priority support on Pro, and dedicated support on Business plans.",
						},
					]),
				},
			],
		},

		// Final CTA
		{
			blockType: "cta",
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
									text: "Ready to launch your directory?",
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
									text: "Join hundreds of founders who chose the faster path to a profitable directory business.",
									version: 1,
								},
							],
							direction: "ltr",
							format: "",
							indent: 0,
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
						url: "/sign-up",
						label: "Get started",
						appearance: "default",
					},
				},
				{
					link: {
						type: "custom",
						newTab: false,
						url: "/contact",
						label: "Book a demo",
						appearance: "outline",
					},
				},
			],
		},
	],
}
