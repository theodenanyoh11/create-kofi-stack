import type { Category, Post } from "@/payload-types"
import { createRichText } from "./richtext-helper"

// Helper to generate post content
const generatePostContent = (sections: Array<{ heading: string; content: string }>) => {
	const elements: Array<
		{ type: "heading"; tag: "h2" | "h3"; text: string } | { type: "paragraph"; text: string }
	> = []

	for (const section of sections) {
		elements.push({ type: "heading", tag: "h2", text: section.heading })
		elements.push({ type: "paragraph", text: section.content })
	}

	return createRichText(elements)
}

export const blogPosts = (categories: Category[]): Partial<Post>[] => {
	// Find or use default categories
	const findCategory = (slug: string) => categories.find((c) => c.slug === slug)?.id

	const posts: Partial<Post>[] = [
		// Directory Business Strategies (5 posts)
		{
			title: "How to Launch a Profitable Directory Website in 2024",
			slug: "how-to-launch-profitable-directory-website-2024",
			_status: "published",
			publishedAt: new Date("2024-01-15").toISOString(),
			categories: findCategory("business") ? [findCategory("business")!] : [],
			content: generatePostContent([
				{
					heading: "The Directory Business Opportunity",
					content:
						"Directory websites remain one of the most viable online business models in 2024. Unlike content sites that require constant updates, directories generate recurring revenue through listings and subscriptions. This guide walks you through everything you need to know to launch your first directory successfully.",
				},
				{
					heading: "Choosing Your Niche",
					content:
						"The key to a successful directory is finding a niche with demand but limited competition. Look for industries where businesses actively seek customers online but generic directories like Yelp or Google Maps don't serve well. Professional services, B2B vendors, and specialized local services are excellent starting points.",
				},
				{
					heading: "Building Your MVP",
					content:
						"Don't spend months building the perfect directory. Launch with a minimum viable product featuring 50-100 quality listings, basic search and filtering, and a simple submission form. You can always add features later based on user feedback.",
				},
				{
					heading: "Acquiring Your First Listings",
					content:
						"Start by manually adding listings from public sources like business registrations and industry associations. Then reach out to businesses directly with free listings to build your initial database. Quality matters more than quantity in the early stages.",
				},
				{
					heading: "Monetization Strategies",
					content:
						"The most successful directories use multiple revenue streams: premium listings, featured placements, subscription tiers, and lead generation fees. Start with one model and expand as you understand what your audience and listed businesses value most.",
				},
			]),
			meta: {
				title: "How to Launch a Profitable Directory Website in 2024",
				description:
					"Complete guide to starting a directory business. Learn niche selection, MVP building, listing acquisition, and monetization strategies.",
			},
		},
		{
			title: "10 Directory Business Models That Actually Make Money",
			slug: "10-directory-business-models-that-make-money",
			_status: "published",
			publishedAt: new Date("2024-01-22").toISOString(),
			categories: findCategory("business") ? [findCategory("business")!] : [],
			content: generatePostContent([
				{
					heading: "Introduction to Directory Monetization",
					content:
						"Not all directories are created equal when it comes to making money. Some niches and business models consistently outperform others. Here are 10 proven directory business models that generate real revenue.",
				},
				{
					heading: "1. Local Service Directories",
					content:
						"Directories connecting homeowners with plumbers, electricians, and contractors generate revenue through lead fees and featured placements. HomeAdvisor built a billion-dollar business on this model.",
				},
				{
					heading: "2. B2B Software Directories",
					content:
						"Think G2 or Capterra. These directories charge software vendors for premium profiles, lead capture, and verified reviews. High ticket items mean high willingness to pay for visibility.",
				},
				{
					heading: "3. Professional Service Directories",
					content:
						"Lawyers, accountants, and consultants pay premium prices for qualified leads. Directories in these niches can charge $50-500 per lead depending on the practice area.",
				},
				{
					heading: "4. Wedding Vendor Directories",
					content:
						"The wedding industry spends heavily on advertising. Directories connecting couples with photographers, venues, and caterers can charge $200-2000/year for premium vendor listings.",
				},
				{
					heading: "5. Real Estate Directories",
					content:
						"Agent directories, property listings, and real estate service directories generate revenue through subscriptions and featured placements. High commission values support premium pricing.",
				},
			]),
			meta: {
				title: "10 Directory Business Models That Actually Make Money",
				description:
					"Discover the most profitable directory niches and business models. From local services to B2B software, learn which directories generate real revenue.",
			},
		},
		{
			title: "The Complete Guide to Niche Directory Market Research",
			slug: "complete-guide-niche-directory-market-research",
			_status: "published",
			publishedAt: new Date("2024-02-01").toISOString(),
			categories: findCategory("business") ? [findCategory("business")!] : [],
			content: generatePostContent([
				{
					heading: "Why Market Research Matters",
					content:
						"The difference between a successful directory and a failed one often comes down to niche selection. Proper market research helps you find opportunities with real demand, identify your competition, and understand what businesses will pay for visibility.",
				},
				{
					heading: "Evaluating Market Demand",
					content:
						'Use Google Keyword Planner to find search volume for terms like "[industry] directory" or "find [service] near me". Look for niches with at least 1,000 monthly searches for relevant terms. Also check if businesses in the space are actively advertising on Google.',
				},
				{
					heading: "Analyzing Competition",
					content:
						"Search for existing directories in your target niche. Analyze their listings count, monetization model, and user experience. A niche with 2-3 mediocre competitors is often better than one with no competition (which might mean no demand).",
				},
				{
					heading: "Validating Willingness to Pay",
					content:
						"Before building, reach out to 20-30 businesses in your target niche. Ask if they'd pay $50-200/month for premium visibility in a directory. If you can't get at least 5 \"yes\" responses, reconsider your niche.",
				},
				{
					heading: "Sizing Your Market",
					content:
						"Estimate the total number of businesses that could list in your directory and realistic conversion rates. A niche with 10,000 potential listings and 5% premium conversion at $100/month is a $500K annual opportunity.",
				},
			]),
			meta: {
				title: "The Complete Guide to Niche Directory Market Research",
				description:
					"Learn how to research and validate directory niches before building. Evaluate demand, competition, and monetization potential.",
			},
		},
		{
			title: "Building a Directory Website Without Code: Tools and Platforms",
			slug: "building-directory-website-without-code",
			_status: "published",
			publishedAt: new Date("2024-02-10").toISOString(),
			categories: findCategory("technology") ? [findCategory("technology")!] : [],
			content: generatePostContent([
				{
					heading: "The No-Code Directory Revolution",
					content:
						"Building a directory website no longer requires months of development or a technical background. Modern platforms let you launch professional directories in days. Here's how to choose the right tool for your needs.",
				},
				{
					heading: "Key Features to Look For",
					content:
						"Any directory platform should offer: customizable listing fields, search and filtering, user submissions, payment processing, and SEO optimization. Bonus features include reviews, maps integration, and email notifications.",
				},
				{
					heading: "Dedicated Directory Platforms",
					content:
						"Platforms like DirectoryHub, Jetkicks, and Publishizer are purpose-built for directories. They offer the fastest path to launch with pre-built features specifically for directory use cases.",
				},
				{
					heading: "WordPress with Directory Plugins",
					content:
						"WordPress plugins like GeoDirectory and Business Directory Plugin offer flexibility but require more setup. Best for those comfortable with WordPress who want full customization control.",
				},
				{
					heading: "Making Your Decision",
					content:
						"For most people starting out, a dedicated directory platform is the best choice. You'll launch faster, avoid technical headaches, and can focus on growing your directory instead of managing code.",
				},
			]),
			meta: {
				title: "Building a Directory Website Without Code: Tools and Platforms",
				description:
					"Compare no-code directory platforms and tools. Launch your directory website in days without writing a single line of code.",
			},
		},
		{
			title: "How to Price Directory Listings for Maximum Revenue",
			slug: "how-to-price-directory-listings-maximum-revenue",
			_status: "published",
			publishedAt: new Date("2024-02-18").toISOString(),
			categories: findCategory("business") ? [findCategory("business")!] : [],
			content: generatePostContent([
				{
					heading: "The Psychology of Directory Pricing",
					content:
						"Pricing directory listings is both art and science. Price too low and you leave money on the table. Price too high and no one signs up. Here's how to find the sweet spot that maximizes revenue.",
				},
				{
					heading: "Understanding Business Value",
					content:
						"The right price depends on the value your directory delivers. A lead worth $500 justifies higher listing fees than a lead worth $50. Start by understanding the lifetime value of customers your listings generate.",
				},
				{
					heading: "Creating Pricing Tiers",
					content:
						"Offer 3-4 tiers: Free (basic visibility), Starter ($29-49/mo), Professional ($99-149/mo), and Premium ($249-499/mo). Each tier should add clear value through better placement, more features, or enhanced visibility.",
				},
				{
					heading: "Annual vs Monthly Billing",
					content:
						"Offer 20-30% discounts for annual billing to improve cash flow and reduce churn. Most businesses that commit annually stay for multiple years, dramatically increasing lifetime value.",
				},
				{
					heading: "Testing and Optimization",
					content:
						"Start with prices in the middle of your estimated range and adjust based on conversion rates. If everyone is buying, you're priced too low. If no one is buying, you're priced too high or not communicating value effectively.",
				},
			]),
			meta: {
				title: "How to Price Directory Listings for Maximum Revenue",
				description:
					"Learn directory pricing strategies that maximize revenue. Create pricing tiers, understand business value, and optimize conversions.",
			},
		},

		// Monetization Guides (4 posts)
		{
			title: "Stripe Integration for Directory Payments: Complete Guide",
			slug: "stripe-integration-directory-payments-guide",
			_status: "published",
			publishedAt: new Date("2024-02-25").toISOString(),
			categories: findCategory("technology") ? [findCategory("technology")!] : [],
			content: generatePostContent([
				{
					heading: "Why Stripe for Directories",
					content:
						"Stripe is the gold standard for directory payments. It handles subscriptions, one-time payments, invoicing, and even marketplace-style payouts. This guide covers everything you need to know to integrate Stripe with your directory.",
				},
				{
					heading: "Setting Up Stripe Connect",
					content:
						"For directories that pay out to listed businesses (like marketplaces), Stripe Connect handles split payments automatically. Connect your Stripe account, configure payout schedules, and let Stripe handle tax reporting.",
				},
				{
					heading: "Subscription Management",
					content:
						"Use Stripe Billing to manage directory subscriptions. Create products for each tier, configure billing cycles, and let Stripe handle upgrades, downgrades, and cancellations automatically.",
				},
				{
					heading: "Handling Failed Payments",
					content:
						"Stripe's Smart Retries automatically attempt to collect failed payments at optimal times. Configure dunning emails to notify customers and give them a chance to update payment methods before cancellation.",
				},
				{
					heading: "Reporting and Analytics",
					content:
						"Stripe Dashboard provides comprehensive revenue reporting. Track MRR, churn, ARPU, and customer lifetime value. Export data for deeper analysis or integrate with business intelligence tools.",
				},
			]),
			meta: {
				title: "Stripe Integration for Directory Payments: Complete Guide",
				description:
					"Learn how to integrate Stripe with your directory for subscriptions, one-time payments, and marketplace payouts.",
			},
		},
		{
			title: "Premium Listing Features That Businesses Will Pay For",
			slug: "premium-listing-features-businesses-will-pay-for",
			_status: "published",
			publishedAt: new Date("2024-03-05").toISOString(),
			categories: findCategory("business") ? [findCategory("business")!] : [],
			content: generatePostContent([
				{
					heading: "What Makes Premium Worth It",
					content:
						"The key to selling premium listings is offering features that directly impact business results. Vanity features don't sell. Features that generate leads, build credibility, and drive traffic do.",
				},
				{
					heading: "Featured Placement",
					content:
						"The most valuable premium feature is visibility. Featured spots on the homepage, category pages, and search results generate significantly more views and clicks. This alone can justify $100-500/month premium pricing.",
				},
				{
					heading: "Enhanced Profiles",
					content:
						"Allow premium listings to add more photos, videos, service details, and portfolio examples. Rich profiles convert browsers into customers at higher rates.",
				},
				{
					heading: "Lead Capture Tools",
					content:
						"Give premium listings direct lead capture with contact forms, click-to-call buttons, and quote request features. Track leads in a dashboard so businesses can see the ROI of their listing.",
				},
				{
					heading: "Verification Badges",
					content:
						"Verified, licensed, or certified badges build trust. Offer verification as a premium feature or require premium subscriptions to display existing credentials prominently.",
				},
			]),
			meta: {
				title: "Premium Listing Features That Businesses Will Pay For",
				description:
					"Discover which premium directory features generate the most revenue. Featured placements, enhanced profiles, lead capture, and more.",
			},
		},
		{
			title: "Lead Generation Revenue: How Directories Charge Per Lead",
			slug: "lead-generation-revenue-directories-charge-per-lead",
			_status: "published",
			publishedAt: new Date("2024-03-12").toISOString(),
			categories: findCategory("business") ? [findCategory("business")!] : [],
			content: generatePostContent([
				{
					heading: "The Lead Gen Model",
					content:
						"Instead of subscription fees, some directories charge businesses for each lead they receive. This model works especially well in high-value service industries where a single customer is worth hundreds or thousands of dollars.",
				},
				{
					heading: "Pricing Your Leads",
					content:
						"Lead pricing depends on industry and lead quality. Home service leads typically sell for $15-75, legal leads for $50-500, and B2B software leads for $100-1000. Price based on the value of closed deals.",
				},
				{
					heading: "Qualifying Leads",
					content:
						"Not all leads are created equal. Use qualification forms to capture budget, timeline, and specific needs. Better qualified leads command higher prices and lead to happier customers.",
				},
				{
					heading: "Distributing Leads",
					content:
						"Exclusive leads go to one business and command premium prices. Shared leads go to 3-5 businesses at lower prices. Match your model to industry norms and business preferences.",
				},
				{
					heading: "Tracking and Reporting",
					content:
						"Provide businesses with lead dashboards showing volume, sources, and conversion tracking. Transparency builds trust and helps businesses see the value of your directory.",
				},
			]),
			meta: {
				title: "Lead Generation Revenue: How Directories Charge Per Lead",
				description:
					"Learn the lead generation business model for directories. Price leads, qualify inquiries, and build sustainable revenue.",
			},
		},
		{
			title: "Affiliate Revenue Strategies for Directory Websites",
			slug: "affiliate-revenue-strategies-directory-websites",
			_status: "published",
			publishedAt: new Date("2024-03-20").toISOString(),
			categories: findCategory("business") ? [findCategory("business")!] : [],
			content: generatePostContent([
				{
					heading: "Directories and Affiliate Marketing",
					content:
						"Directories are natural fits for affiliate revenue. You're already connecting buyers with sellers. Adding affiliate links to relevant products and services creates an additional revenue stream without charging listed businesses more.",
				},
				{
					heading: "Choosing Affiliate Programs",
					content:
						"Select programs relevant to your directory's audience. A B2B software directory might partner with SaaS tools. A local service directory might partner with insurance or financing companies.",
				},
				{
					heading: "Integration Strategies",
					content:
						'Add affiliate recommendations to comparison pages, resource sections, and even listing profiles (with permission). Create "tools we recommend" sections that add value while generating commissions.',
				},
				{
					heading: "Disclosure and Trust",
					content:
						"Always disclose affiliate relationships clearly. Trust is your most valuable asset. Transparent disclosure maintains credibility while still generating affiliate revenue.",
				},
				{
					heading: "Measuring Performance",
					content:
						"Track clicks, conversions, and revenue by placement. A/B test different affiliate partners and placements. Focus efforts on high-converting, high-commission opportunities.",
				},
			]),
			meta: {
				title: "Affiliate Revenue Strategies for Directory Websites",
				description:
					"Add affiliate revenue to your directory without charging businesses more. Learn integration strategies and program selection.",
			},
		},

		// SEO Optimization (3 posts)
		{
			title: "Directory SEO: Ranking Your Listings on Google",
			slug: "directory-seo-ranking-listings-google",
			_status: "published",
			publishedAt: new Date("2024-03-28").toISOString(),
			categories: findCategory("technology") ? [findCategory("technology")!] : [],
			content: generatePostContent([
				{
					heading: "Why SEO Matters for Directories",
					content:
						'Organic search drives the majority of traffic to successful directories. Ranking for "[industry] + [location]" and similar queries brings highly qualified visitors ready to find what you list. Here\'s how to optimize your directory for search engines.',
				},
				{
					heading: "Unique Listing Content",
					content:
						"The biggest SEO challenge for directories is thin or duplicate content. Encourage listed businesses to write unique descriptions. Add schema markup, categories, and attributes to make each listing page substantive and unique.",
				},
				{
					heading: "Category Page Optimization",
					content:
						"Category pages often rank better than individual listings. Optimize category titles, descriptions, and URLs. Add introductory content explaining what users will find in each category.",
				},
				{
					heading: "Technical SEO Essentials",
					content:
						"Ensure fast load times, mobile responsiveness, and clean URL structures. Implement proper canonical tags to handle pagination and filtering without creating duplicate content issues.",
				},
				{
					heading: "Building Directory Authority",
					content:
						"Earn backlinks through guest posts, industry partnerships, and creating linkable resources. As your domain authority grows, individual listing pages will rank better for long-tail queries.",
				},
			]),
			meta: {
				title: "Directory SEO: Ranking Your Listings on Google",
				description:
					"Complete guide to directory SEO. Optimize listings, category pages, and technical elements to rank on Google.",
			},
		},
		{
			title: "Schema Markup for Directory Websites Explained",
			slug: "schema-markup-directory-websites-explained",
			_status: "published",
			publishedAt: new Date("2024-04-05").toISOString(),
			categories: findCategory("technology") ? [findCategory("technology")!] : [],
			content: generatePostContent([
				{
					heading: "What is Schema Markup",
					content:
						"Schema markup is structured data that helps search engines understand your content. For directories, proper schema markup can result in rich snippets showing ratings, prices, and other details directly in search results.",
				},
				{
					heading: "LocalBusiness Schema",
					content:
						"For local service directories, LocalBusiness schema is essential. Include name, address, phone, hours, and aggregate ratings. Google uses this data for local pack results and knowledge panels.",
				},
				{
					heading: "Product and Service Schema",
					content:
						"For directories listing products or services, use appropriate Product or Service schema. Include pricing, availability, and reviews to enable rich snippets in search results.",
				},
				{
					heading: "AggregateRating Schema",
					content:
						"If your directory includes reviews, implement AggregateRating schema. This can display star ratings in search results, significantly improving click-through rates.",
				},
				{
					heading: "Testing Your Schema",
					content:
						"Use Google's Rich Results Test and Schema Validator to verify your implementation. Monitor Search Console for schema errors and fix them promptly to maintain rich result eligibility.",
				},
			]),
			meta: {
				title: "Schema Markup for Directory Websites Explained",
				description:
					"Learn how to implement schema markup for directory websites. LocalBusiness, Product, and review schema for rich snippets.",
			},
		},
		{
			title: "Creating SEO-Optimized Category Pages for Directories",
			slug: "seo-optimized-category-pages-directories",
			_status: "published",
			publishedAt: new Date("2024-04-12").toISOString(),
			categories: findCategory("technology") ? [findCategory("technology")!] : [],
			content: generatePostContent([
				{
					heading: "The Power of Category Pages",
					content:
						"Category pages are often the highest-traffic pages on directory websites. They rank for broad industry terms and serve as hubs that pass authority to individual listings. Optimizing these pages is critical for directory SEO success.",
				},
				{
					heading: "Category Page Structure",
					content:
						"Each category page needs a unique title, meta description, and H1 tag. Include 200-500 words of introductory content explaining what the category contains and why visitors should browse it.",
				},
				{
					heading: "Internal Linking Strategy",
					content:
						"Link to category pages from your homepage, navigation, and footer. Cross-link related categories. This internal link structure helps search engines understand your site hierarchy and passes authority effectively.",
				},
				{
					heading: "Faceted Navigation SEO",
					content:
						"Filters and facets create multiple URL variations that can cause duplicate content issues. Use canonical tags, parameter handling in Search Console, or AJAX filtering to maintain clean indexation.",
				},
				{
					heading: "User Experience Signals",
					content:
						"Google considers user experience signals like bounce rate and time on page. Make category pages genuinely useful with good filtering, sorting, and preview information to keep users engaged.",
				},
			]),
			meta: {
				title: "Creating SEO-Optimized Category Pages for Directories",
				description:
					"Optimize directory category pages for search engines. Structure, content, internal linking, and faceted navigation best practices.",
			},
		},

		// Success Stories/Case Studies (3 posts)
		{
			title: "From Side Project to $50K MRR: A Directory Success Story",
			slug: "side-project-to-50k-mrr-directory-success-story",
			_status: "published",
			publishedAt: new Date("2024-04-20").toISOString(),
			categories: findCategory("news") ? [findCategory("news")!] : [],
			content: generatePostContent([
				{
					heading: "The Beginning",
					content:
						"What started as a weekend project to solve a personal problem turned into a six-figure business. This is the story of how one entrepreneur built a niche directory from zero to $50,000 in monthly recurring revenue.",
				},
				{
					heading: "Finding the Niche",
					content:
						"The founder noticed that finding specialized contractors in their industry was frustrating. Generic directories didn't have the specific information buyers needed. That gap became the opportunity.",
				},
				{
					heading: "The MVP Launch",
					content:
						"Instead of building perfect technology, the founder launched with a simple WordPress site and 100 manually-researched listings. The focus was on quality data and user experience, not fancy features.",
				},
				{
					heading: "Growth Strategies That Worked",
					content:
						"SEO was the primary growth driver. By creating comprehensive category pages and optimizing for long-tail keywords, organic traffic grew steadily. Paid acquisition was tested but proved less efficient than SEO.",
				},
				{
					heading: "Lessons Learned",
					content:
						"The founder's biggest lessons: start smaller than you think, focus on a specific niche, prioritize SEO from day one, and don't underestimate the power of quality over quantity.",
				},
			]),
			meta: {
				title: "From Side Project to $50K MRR: A Directory Success Story",
				description:
					"How one entrepreneur built a niche directory from weekend project to $50K monthly recurring revenue. Strategies and lessons learned.",
			},
		},
		{
			title: "How Local Directories Compete with Google and Win",
			slug: "local-directories-compete-with-google-and-win",
			_status: "published",
			publishedAt: new Date("2024-04-28").toISOString(),
			categories: findCategory("news") ? [findCategory("news")!] : [],
			content: generatePostContent([
				{
					heading: "The Google Challenge",
					content:
						"Many assume Google has won local search. But specialized local directories continue to thrive by offering what Google can't: deep niche expertise, curated quality, and features tailored to specific industries.",
				},
				{
					heading: "Niche Expertise Wins",
					content:
						"Google treats all businesses the same. A specialized directory can require industry-specific information, verify credentials, and ensure listings meet quality standards. This curation creates genuine value.",
				},
				{
					heading: "Community Building",
					content:
						"Successful local directories build communities around their niches. User reviews, Q&A forums, and resource content create engagement that generic platforms can't match.",
				},
				{
					heading: "Better Lead Quality",
					content:
						"Businesses report that leads from niche directories convert better than generic sources. Users who find businesses through specialized directories are further along in their buying journey.",
				},
				{
					heading: "The Trust Factor",
					content:
						"A curated, specialized directory builds trust that an algorithm can't. When a directory stakes its reputation on listing quality, users trust those recommendations more than generic search results.",
				},
			]),
			meta: {
				title: "How Local Directories Compete with Google and Win",
				description:
					"Why specialized local directories still thrive despite Google. Niche expertise, curation, and community building strategies.",
			},
		},
		{
			title: "5 Directory Founders Share Their Biggest Mistakes",
			slug: "5-directory-founders-share-biggest-mistakes",
			_status: "published",
			publishedAt: new Date("2024-05-05").toISOString(),
			categories: findCategory("news") ? [findCategory("news")!] : [],
			content: generatePostContent([
				{
					heading: "Learning from Failure",
					content:
						"Success leaves clues, but so does failure. We talked to five directory founders about the mistakes that cost them time, money, and momentum. Here's what they wish they'd known from the start.",
				},
				{
					heading: "Mistake 1: Building Too Much Before Launching",
					content:
						'"I spent 6 months building features no one asked for. By the time I launched, a competitor had already captured the market." - Founder of a defunct legal directory. Launch early, iterate based on feedback.',
				},
				{
					heading: "Mistake 2: Ignoring SEO Until Too Late",
					content:
						'"I thought paid advertising would be enough. When I finally focused on SEO, I was 18 months behind competitors." - Founder of a home services directory. SEO is a long game; start day one.',
				},
				{
					heading: "Mistake 3: Pricing Too Low",
					content:
						'"I was afraid to charge what the listings were worth. It took two years to raise prices, and I left hundreds of thousands on the table." - Founder of a B2B directory. Know your value and charge accordingly.',
				},
				{
					heading: "Mistake 4: Trying to Serve Everyone",
					content:
						"\"My directory covered too many industries. I couldn't go deep on any of them and couldn't compete with specialists.\" - Founder of a general business directory. Niche down ruthlessly.",
				},
			]),
			meta: {
				title: "5 Directory Founders Share Their Biggest Mistakes",
				description:
					"Learn from directory founders who share their costliest mistakes. Building too much, ignoring SEO, underpricing, and more.",
			},
		},
	]

	return posts
}
