import type { Page } from "@/payload-types"

export const directoryHubTerms = (): Partial<Page> => {
	return {
		slug: "terms",
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
									text: "Terms of Service",
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
									text: "Last updated: December 2024",
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
			links: [],
		},
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
									// Agreement to Terms
									{
										type: "heading",
										children: [
											{
												type: "text",
												detail: 0,
												format: 0,
												mode: "normal",
												style: "",
												text: "1. Agreement to Terms",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										tag: "h2",
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
												text: "By accessing or using SaaSify, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our service.",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										textFormat: 0,
										version: 1,
									},
									// Description of Service
									{
										type: "heading",
										children: [
											{
												type: "text",
												detail: 0,
												format: 0,
												mode: "normal",
												style: "",
												text: "2. Description of Service",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										tag: "h2",
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
												text: "SaaSify is a platform that enables teams to collaborate, automate workflows, and scale their operations. Our service includes project management, integrations, analytics, and various features to help you work smarter.",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										textFormat: 0,
										version: 1,
									},
									// User Accounts
									{
										type: "heading",
										children: [
											{
												type: "text",
												detail: 0,
												format: 0,
												mode: "normal",
												style: "",
												text: "3. User Accounts",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										tag: "h2",
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
												text: "When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding your password and for all activities that occur under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										textFormat: 0,
										version: 1,
									},
									// Acceptable Use
									{
										type: "heading",
										children: [
											{
												type: "text",
												detail: 0,
												format: 0,
												mode: "normal",
												style: "",
												text: "4. Acceptable Use",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										tag: "h2",
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
												text: "You agree not to use our service to: violate any laws or regulations, infringe upon intellectual property rights, distribute malware or harmful code, engage in spam or phishing, harass or abuse others, or attempt to gain unauthorized access to our systems.",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										textFormat: 0,
										version: 1,
									},
									// Intellectual Property
									{
										type: "heading",
										children: [
											{
												type: "text",
												detail: 0,
												format: 0,
												mode: "normal",
												style: "",
												text: "5. Intellectual Property",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										tag: "h2",
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
												text: "The service and its original content, features, and functionality are and will remain the exclusive property of SaaSify. Our service is protected by copyright, trademark, and other laws. You retain ownership of any content you create using our platform.",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										textFormat: 0,
										version: 1,
									},
									// Payment Terms
									{
										type: "heading",
										children: [
											{
												type: "text",
												detail: 0,
												format: 0,
												mode: "normal",
												style: "",
												text: "6. Payment Terms",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										tag: "h2",
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
												text: "Certain features of our service may require payment. You agree to provide accurate billing information and authorize us to charge your payment method for all applicable fees. Subscriptions automatically renew unless cancelled before the renewal date.",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										textFormat: 0,
										version: 1,
									},
									// Limitation of Liability
									{
										type: "heading",
										children: [
											{
												type: "text",
												detail: 0,
												format: 0,
												mode: "normal",
												style: "",
												text: "7. Limitation of Liability",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										tag: "h2",
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
												text: "In no event shall SaaSify, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										textFormat: 0,
										version: 1,
									},
									// Termination
									{
										type: "heading",
										children: [
											{
												type: "text",
												detail: 0,
												format: 0,
												mode: "normal",
												style: "",
												text: "8. Termination",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										tag: "h2",
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
												text: "We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the service will cease immediately. You may terminate your account at any time by contacting us.",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										textFormat: 0,
										version: 1,
									},
									// Changes to Terms
									{
										type: "heading",
										children: [
											{
												type: "text",
												detail: 0,
												format: 0,
												mode: "normal",
												style: "",
												text: "9. Changes to Terms",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										tag: "h2",
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
												text: "We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										textFormat: 0,
										version: 1,
									},
									// Contact Us
									{
										type: "heading",
										children: [
											{
												type: "text",
												detail: 0,
												format: 0,
												mode: "normal",
												style: "",
												text: "10. Contact Us",
												version: 1,
											},
										],
										direction: "ltr" as const,
										format: "" as const,
										indent: 0,
										tag: "h2",
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
												text: "If you have any questions about these Terms, please contact us at legal@saasify.com.",
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
					},
				],
			},
		],
		meta: {
			description:
				"Read SaaSify's Terms of Service to understand the rules and guidelines for using our platform.",
			title: "Terms of Service",
		},
		title: "Terms of Service",
	}
}
