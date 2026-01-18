import type { Faq } from "@/payload-types"
import { createParagraph } from "./richtext-helper"

export const faqData: Partial<Faq>[] = [
	// Getting Started FAQs
	{
		question: "How quickly can I launch my directory?",
		answer: createParagraph(
			"Most customers launch their first directory within 1-2 days. Pick a template, customize your branding, add your first listings, and you're live. No coding required.",
		),
		category: "getting-started",
		order: 1,
	},
	{
		question: "Do I need technical skills to use DirectoryHub?",
		answer: createParagraph(
			"No technical skills required. DirectoryHub is designed for non-technical users. Our visual editor lets you customize everything from colors to layouts without writing any code.",
		),
		category: "getting-started",
		order: 2,
	},
	{
		question: "Can I import existing listings from another platform?",
		answer: createParagraph(
			"Yes! You can import listings via CSV upload. We also offer migration assistance for larger directories moving from other platforms. Contact our support team for help with migrations.",
		),
		category: "getting-started",
		order: 3,
	},
	{
		question: "What kind of directories can I build?",
		answer: createParagraph(
			"DirectoryHub works for any type of directory: local services, B2B vendors, community directories, marketplaces, job boards, real estate, and more. Our templates cover the most popular use cases, and custom fields let you build any schema.",
		),
		category: "getting-started",
		order: 4,
	},

	// Pricing FAQs
	{
		question: "Is there a free plan?",
		answer: createParagraph(
			"Yes! Start with our Free plan to explore the platform. You can launch a basic directory with up to 50 listings. Upgrade anytime to unlock premium features and higher limits.",
		),
		category: "pricing",
		order: 1,
	},
	{
		question: "What payment methods do you accept?",
		answer: createParagraph(
			"We accept all major credit cards (Visa, Mastercard, American Express) and debit cards through Stripe. Annual plans can also be paid via invoice for qualifying accounts.",
		),
		category: "pricing",
		order: 2,
	},
	{
		question: "Can I change plans at any time?",
		answer: createParagraph(
			"Absolutely. Upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the credit will be applied to your next billing cycle.",
		),
		category: "pricing",
		order: 3,
	},
	{
		question: "Do you offer discounts for annual billing?",
		answer: createParagraph(
			"Yes! Save 20% when you choose annual billing. Annual plans also include priority support and early access to new features.",
		),
		category: "pricing",
		order: 4,
	},
	{
		question: "What happens if I exceed my listing limit?",
		answer: createParagraph(
			"You'll receive a notification when approaching your limit. You can upgrade your plan to increase limits, or we'll help you identify which listings to archive if you prefer to stay on your current plan.",
		),
		category: "pricing",
		order: 5,
	},
	{
		question: "Is there a refund policy?",
		answer: createParagraph(
			"We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied within the first 14 days, contact support for a full refund, no questions asked.",
		),
		category: "pricing",
		order: 6,
	},

	// Features FAQs
	{
		question: "Can I accept payments through my directory?",
		answer: createParagraph(
			"Yes! Connect your Stripe account to accept payments for premium listings, subscriptions, and featured placements. We handle the payment flow; you keep the revenue minus Stripe's standard fees.",
		),
		category: "features",
		order: 1,
	},
	{
		question: "How does SEO work with DirectoryHub?",
		answer: createParagraph(
			"Every directory includes automatic SEO optimization: schema markup, dynamic sitemaps, meta tags, and clean URLs. Your listings are structured for Google's rich results and local pack rankings.",
		),
		category: "features",
		order: 2,
	},
	{
		question: "Can I use my own domain name?",
		answer: createParagraph(
			"Yes! Custom domains are supported on all paid plans. Point your domain to DirectoryHub, and we'll handle SSL certificates and domain configuration automatically.",
		),
		category: "features",
		order: 3,
	},
	{
		question: "Do you support reviews and ratings?",
		answer: createParagraph(
			"Yes! Enable user reviews and ratings for your listings. You can moderate reviews, require verification, and display aggregate ratings. Review schema is automatically added for rich snippets.",
		),
		category: "features",
		order: 4,
	},
	{
		question: "Can businesses manage their own listings?",
		answer: createParagraph(
			"Absolutely. Business owners can claim and manage their listings through dedicated dashboards. They can update information, respond to reviews, track analytics, and manage their subscription.",
		),
		category: "features",
		order: 5,
	},
	{
		question: "Is there an API available?",
		answer: createParagraph(
			"Yes! Our REST API is available on Professional and Enterprise plans. Use it to integrate your directory with other tools, import data programmatically, or build custom applications.",
		),
		category: "features",
		order: 6,
	},

	// Technical FAQs
	{
		question: "Where is my data hosted?",
		answer: createParagraph(
			"All data is hosted on secure servers in the United States and Europe. We use enterprise-grade infrastructure with automatic backups, redundancy, and 99.9% uptime SLA.",
		),
		category: "technical",
		order: 1,
	},
	{
		question: "Is DirectoryHub GDPR compliant?",
		answer: createParagraph(
			"Yes. We are fully GDPR compliant. We provide data processing agreements, respect user consent preferences, and offer data export/deletion tools for you to fulfill user requests.",
		),
		category: "technical",
		order: 2,
	},
	{
		question: "Can I export my data?",
		answer: createParagraph(
			"Yes! Export your listings, users, and analytics data at any time. We provide CSV exports for all data types. You own your data and can take it with you if you ever decide to leave.",
		),
		category: "technical",
		order: 3,
	},
	{
		question: "How secure is my directory?",
		answer: createParagraph(
			"Security is a top priority. We use SSL encryption, secure payment processing via Stripe, regular security audits, and follow OWASP best practices. Enterprise plans include SOC 2 compliance.",
		),
		category: "technical",
		order: 4,
	},

	// Support FAQs
	{
		question: "What support options are available?",
		answer: createParagraph(
			"All plans include email support with 24-hour response times. Professional plans add live chat support. Enterprise plans include dedicated account managers and phone support.",
		),
		category: "support",
		order: 1,
	},
	{
		question: "Do you offer onboarding assistance?",
		answer: createParagraph(
			"Yes! All paid plans include onboarding guides and video tutorials. Professional and Enterprise plans include personalized onboarding calls to help you get set up for success.",
		),
		category: "support",
		order: 2,
	},
	{
		question: "Can I request new features?",
		answer: createParagraph(
			"Absolutely! We love hearing from customers. Submit feature requests through our feedback portal. Many of our most popular features came directly from customer suggestions.",
		),
		category: "support",
		order: 3,
	},

	// General FAQs
	{
		question: "What makes DirectoryHub different from other platforms?",
		answer: createParagraph(
			"DirectoryHub is purpose-built for directories. Unlike general website builders or generic CMS platforms, every feature is designed specifically for the directory use case—from listing schemas to monetization tools.",
		),
		category: "general",
		order: 1,
	},
	{
		question: "Can I use DirectoryHub for multiple directories?",
		answer: createParagraph(
			"Yes! Our Professional and Enterprise plans support multiple directories under one account. Manage all your directories from a single dashboard with unified billing and analytics.",
		),
		category: "general",
		order: 2,
	},
	{
		question: "How do I contact sales?",
		answer: createParagraph(
			"For sales inquiries, contact us at sales@directoryhub.com or book a demo through our website. Our team will help you understand which plan and features are right for your needs.",
		),
		category: "general",
		order: 3,
	},
]
