import type { Faq } from "@/payload-types"
import { createParagraph } from "./richtext-helper"

export const faqData: Partial<Faq>[] = [
	// Getting Started FAQs
	{
		question: "How quickly can I get my team started?",
		answer: createParagraph(
			"Most teams are up and running within hours. Invite your team members, configure your workspace, and start collaborating immediately. No lengthy setup or technical expertise required.",
		),
		category: "getting-started",
		order: 1,
	},
	{
		question: "Do I need technical skills to use SaaSify?",
		answer: createParagraph(
			"No technical skills required. Our intuitive interface lets anyone configure workflows, set up integrations, and manage their workspace without writing any code.",
		),
		category: "getting-started",
		order: 2,
	},
	{
		question: "Can I import data from other tools?",
		answer: createParagraph(
			"Yes! Import data via CSV or use our native integrations to sync data from tools like Salesforce, HubSpot, Notion, and more. We also offer migration assistance for larger accounts.",
		),
		category: "getting-started",
		order: 3,
	},
	{
		question: "What teams and use cases is SaaSify best for?",
		answer: createParagraph(
			"SaaSify works for any team that needs to collaborate and get work done: sales, marketing, product, operations, customer success, and more. Our flexible platform adapts to your workflows.",
		),
		category: "getting-started",
		order: 4,
	},

	// Pricing FAQs
	{
		question: "Is there a free plan?",
		answer: createParagraph(
			"Yes! Start with our Free plan for up to 3 users. Explore the platform, set up your workspace, and upgrade anytime to unlock more users and advanced features.",
		),
		category: "pricing",
		order: 1,
	},
	{
		question: "What payment methods do you accept?",
		answer: createParagraph(
			"We accept all major credit cards (Visa, Mastercard, American Express) through Stripe. Annual plans can also be paid via invoice for qualifying accounts.",
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
		question: "What happens if my team grows beyond my plan limits?",
		answer: createParagraph(
			"We'll notify you when approaching your user limit. You can upgrade your plan to increase limits, or we'll help you optimize your current plan to get the most value.",
		),
		category: "pricing",
		order: 5,
	},
	{
		question: "Is there a refund policy?",
		answer: createParagraph(
			"We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied within the first 14 days, contact support for a full refund, no questions asked.",
		),
		category: "pricing",
		order: 6,
	},

	// Features FAQs
	{
		question: "What integrations does SaaSify support?",
		answer: createParagraph(
			"We integrate with 100+ tools including Slack, Salesforce, HubSpot, Jira, Notion, Google Workspace, Microsoft 365, and more. New integrations are added regularly based on customer requests.",
		),
		category: "features",
		order: 1,
	},
	{
		question: "How does reporting and analytics work?",
		answer: createParagraph(
			"Real-time dashboards show key metrics for your team and projects. Create custom reports, schedule automated delivery to stakeholders, and export data anytime for deeper analysis.",
		),
		category: "features",
		order: 2,
	},
	{
		question: "Can team members manage their own workspaces?",
		answer: createParagraph(
			"Yes! Team members can customize their workspace, set personal preferences, and manage their own workflows within your organization's guidelines. Admins maintain control over permissions.",
		),
		category: "features",
		order: 3,
	},
	{
		question: "Is there an API available?",
		answer: createParagraph(
			"Yes! Our REST API is available on Pro and Business plans. Use it to build custom integrations, automate workflows programmatically, or connect SaaSify to your internal tools.",
		),
		category: "features",
		order: 4,
	},
	{
		question: "Can I automate workflows?",
		answer: createParagraph(
			"Absolutely. Our visual workflow builder lets you automate approvals, notifications, data syncing, and more without writing code. Set triggers, conditions, and actions in minutes.",
		),
		category: "features",
		order: 5,
	},
	{
		question: "Do you support custom fields and data types?",
		answer: createParagraph(
			"Yes! Create custom fields to capture any data your team needs. We support text, numbers, dates, dropdowns, checkboxes, file attachments, and more.",
		),
		category: "features",
		order: 6,
	},

	// Technical FAQs
	{
		question: "Where is my data hosted?",
		answer: createParagraph(
			"All data is hosted on secure AWS infrastructure in US and EU regions. We maintain a 99.9% uptime SLA with automatic failover and regular backups.",
		),
		category: "technical",
		order: 1,
	},
	{
		question: "Is SaaSify GDPR compliant?",
		answer: createParagraph(
			"Yes. We're fully GDPR and CCPA compliant. We provide data processing agreements, consent management tools, and data export/deletion capabilities to help you meet your obligations.",
		),
		category: "technical",
		order: 2,
	},
	{
		question: "Can I export my data?",
		answer: createParagraph(
			"Yes! Export all your data anytime via CSV or API. You own your data and can take it with you if you ever decide to leave. No lock-in, no hassle.",
		),
		category: "technical",
		order: 3,
	},
	{
		question: "How secure is SaaSify?",
		answer: createParagraph(
			"We're SOC 2 Type II certified with end-to-end encryption, SSO/SAML support, and regular third-party security audits. Your data security is our top priority.",
		),
		category: "technical",
		order: 4,
	},

	// Support FAQs
	{
		question: "What support options are available?",
		answer: createParagraph(
			"All plans include email support with 24-hour response times. Pro plans add live chat support. Business plans include a dedicated customer success manager and phone support.",
		),
		category: "support",
		order: 1,
	},
	{
		question: "Do you offer onboarding assistance?",
		answer: createParagraph(
			"Yes! All paid plans include onboarding guides and video tutorials. Pro and Business plans include personalized onboarding calls to help you get set up for success.",
		),
		category: "support",
		order: 2,
	},
	{
		question: "Can I request new features?",
		answer: createParagraph(
			"Absolutely! Submit feature requests through our feedback portal. Many of our most popular features came directly from customer suggestions. We prioritize based on demand.",
		),
		category: "support",
		order: 3,
	},

	// General FAQs
	{
		question: "What makes SaaSify different from other platforms?",
		answer: createParagraph(
			"SaaSify brings together the best of project management, CRM, and collaboration tools in one unified platform designed for how modern teams actually work. No more app switching or lost context.",
		),
		category: "general",
		order: 1,
	},
	{
		question: "Can I use SaaSify for multiple teams?",
		answer: createParagraph(
			"Yes! Our Business plan supports unlimited teams and workspaces with unified billing and cross-team visibility. Perfect for organizations with multiple departments.",
		),
		category: "general",
		order: 2,
	},
	{
		question: "How do I contact sales?",
		answer: createParagraph(
			"For sales inquiries, contact us at sales@saasify.com or book a demo through our website. Our team will help you understand which plan and features are right for your needs.",
		),
		category: "general",
		order: 3,
	},
]
