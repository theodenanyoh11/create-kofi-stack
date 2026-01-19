import type { Page } from "@/payload-types"
import { createParagraph } from "../richtext-helper"

export const securityPage = (): Partial<Page> => {
	return {
		slug: "features/security",
		_status: "published",
		title: "Security & Compliance",
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
									text: "Enterprise-grade security without the complexity",
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
									text: "SOC 2 Type II certified with end-to-end encryption, SSO support, and comprehensive audit logs. Your data is protected by the same standards used by Fortune 500 companies.",
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
						label: "View security docs",
						url: "/security",
					},
				},
			],
		},
		layout: [
			{
				blockType: "featureShowcase",
				blockName: "Data Encryption",
				label: "Data Protection",
				headline: "Your data encrypted at rest and in transit",
				description: createParagraph(
					"AES-256 encryption protects your data at rest, while TLS 1.3 secures all data in transit. Your information is protected by the same standards used by financial institutions.",
				),
				link: {
					type: "custom",
					label: "Learn about encryption",
					url: "/security",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "AES-256 encryption at rest" },
					{ text: "TLS 1.3 for data in transit" },
					{ text: "Encrypted backups" },
					{ text: "Key management best practices" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Access Control",
				label: "Access Management",
				headline: "Granular permissions and SSO support",
				description: createParagraph(
					"Role-based access control lets you define exactly who can see and do what. SAML SSO integration works with Okta, Azure AD, Google Workspace, and other identity providers.",
				),
				link: {
					type: "custom",
					label: "Explore access controls",
					url: "/security",
					appearance: "default",
				},
				imagePosition: "left",
				features: [
					{ text: "Role-based access control (RBAC)" },
					{ text: "SAML SSO integration" },
					{ text: "Two-factor authentication" },
					{ text: "Session management" },
				],
			},
			{
				blockType: "featureShowcase",
				blockName: "Compliance",
				label: "Compliance & Auditing",
				headline: "Meet compliance requirements with confidence",
				description: createParagraph(
					"SOC 2 Type II certified with comprehensive audit logs and data governance tools. Export reports for auditors and meet GDPR, CCPA, and HIPAA requirements.",
				),
				link: {
					type: "custom",
					label: "View compliance docs",
					url: "/security",
					appearance: "default",
				},
				imagePosition: "right",
				features: [
					{ text: "SOC 2 Type II certified" },
					{ text: "GDPR and CCPA compliant" },
					{ text: "Comprehensive audit logs" },
					{ text: "Data retention controls" },
				],
			},
			{
				blockType: "bentoFeatures",
				blockName: "Security Features",
				heading: "Security you can trust",
				subheading: "Enterprise-grade protection without enterprise complexity",
				features: [
					{
						size: "small",
						style: "gradient",
						icon: "shield",
						stat: "SOC 2",
						title: "Certified",
						description: createParagraph("Type II certification verified annually."),
					},
					{
						size: "small",
						style: "accent",
						icon: "shield",
						title: "Zero Trust",
						description: createParagraph("Verify every request, every time."),
					},
					{
						size: "small",
						style: "default",
						icon: "globe",
						title: "Global Infrastructure",
						description: createParagraph("Redundant systems across regions."),
					},
					{
						size: "small",
						style: "primary",
						icon: "database",
						title: "Backup & Recovery",
						description: createParagraph("Automated backups with point-in-time recovery."),
					},
					{
						size: "small",
						style: "default",
						icon: "search",
						title: "Threat Detection",
						description: createParagraph("24/7 monitoring for suspicious activity."),
					},
					{
						size: "small",
						style: "default",
						icon: "barChart",
						title: "Security Reports",
						description: createParagraph("Regular penetration testing and audits."),
					},
				],
			},
			{
				blockType: "proofBanner",
				blockName: "CTA Section",
				style: "centered",
				headline: "Security that scales with you",
				subtext: "Enterprise-grade protection from day one. SOC 2 certified, GDPR compliant.",
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
							label: "Request security docs",
							url: "/contact",
						},
					},
				],
			},
		],
		meta: {
			description:
				"Enterprise-grade security with SOC 2 Type II certification, end-to-end encryption, SSO support, and comprehensive compliance tools.",
			title: "Security & Compliance — SaaSify Enterprise Protection",
		},
	}
}
