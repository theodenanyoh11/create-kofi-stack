import * as fs from "node:fs"
import * as path from "node:path"
import type { CollectionSlug, File, Payload, PayloadRequest } from "payload"

import { directoryHubAbout } from "./about"
import { faqData } from "./faqs"
import {
	analyticsPage,
	automationPage,
	dashboardPage,
	integrationsPage,
	securityPage,
	workflowsPage,
} from "./features"
import { directoryHubHome } from "./home"
import { blogPosts } from "./posts"
import { directoryHubPricing } from "./pricing"
import { directoryHubPrivacy } from "./privacy"
import { directoryHubTerms } from "./terms"
import {
	marketingPage,
	operationsPage,
	productPage,
	salesPage,
} from "./use-cases"

const collections: CollectionSlug[] = [
	"categories",
	"media",
	"pages",
	"posts",
	"forms",
	"form-submissions",
	"search",
	"faqs",
]

const categories = [
	{ title: "Business", slug: "business" },
	{ title: "Technology", slug: "technology" },
	{ title: "News", slug: "news" },
	{ title: "Guides", slug: "guides" },
]

// Contact form configuration for DirectoryHub
const contactFormData = {
	title: "Contact Form",
	confirmationMessage: {
		root: {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							detail: 0,
							format: 0,
							mode: "normal",
							style: "",
							text: "Thanks for reaching out! We'll get back to you within 24 hours.",
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
	confirmationType: "message" as const,
	fields: [
		{
			name: "name",
			label: "Name",
			required: true,
			blockType: "text" as const,
		},
		{
			name: "email",
			label: "Email",
			required: true,
			blockType: "email" as const,
		},
		{
			name: "subject",
			label: "Subject",
			required: false,
			blockType: "text" as const,
		},
		{
			name: "message",
			label: "Message",
			required: true,
			blockType: "textarea" as const,
		},
	],
	submitButtonLabel: "Send Message",
}

export const seedDirectoryHub = async ({
	payload,
	req,
}: {
	payload: Payload
	req: PayloadRequest
}): Promise<void> => {
	payload.logger.info("Seeding SaaSify database...")

	// Clear collections and globals
	payload.logger.info("— Clearing collections and globals...")

	// Clear header
	await payload.updateGlobal({
		slug: "header",
		data: {
			navItems: [],
		},
		depth: 0,
		context: {
			disableRevalidate: true,
		},
	})

	// Clear footer with new structure
	await payload.updateGlobal({
		slug: "footer",
		data: {
			columns: [],
			socialLinks: {},
			newsletter: { enabled: false },
			copyrightText: "",
			bottomLinks: [],
		},
		depth: 0,
		context: {
			disableRevalidate: true,
		},
	})

	// Delete collections sequentially to avoid database deadlocks
	for (const collection of collections) {
		if (payload.collections[collection]) {
			try {
				await payload.db.deleteMany({ collection, req, where: {} })
			} catch (error) {
				payload.logger.warn(`Warning: Could not clear ${collection}: ${error}`)
			}
		}
	}

	// Delete versions sequentially
	for (const collection of collections) {
		if (payload.collections[collection]?.config?.versions) {
			try {
				await payload.db.deleteVersions({ collection, req, where: {} })
			} catch (error) {
				payload.logger.warn(`Warning: Could not clear ${collection} versions: ${error}`)
			}
		}
	}

	payload.logger.info("— Seeding demo author...")

	await payload.delete({
		collection: "users",
		depth: 0,
		where: {
			email: {
				equals: "demo-author@example.com",
			},
		},
	})

	const _demoAuthor = await payload.create({
		collection: "users",
		data: {
			name: "SaaSify Team",
			email: "demo-author@example.com",
			password: "password",
		},
	})

	// Seed categories
	payload.logger.info("— Seeding categories...")

	const categoryDocs = await Promise.all(
		categories.map((category) =>
			payload.create({
				collection: "categories",
				data: {
					title: category.title,
					slug: category.slug,
				},
			}),
		),
	)

	// Seed FAQs
	payload.logger.info("— Seeding FAQs...")

	const faqDocs = await Promise.all(
		faqData.map((faq) =>
			payload.create({
				collection: "faqs",
				// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
				data: faq as any,
			}),
		),
	)

	payload.logger.info(`— Seeded ${faqDocs.length} FAQs`)

	// Upload hero dashboard image
	payload.logger.info("— Uploading hero media...")

	let heroImageDoc = null
	try {
		const heroImagePath = path.join(process.cwd(), "public/media/hero-dashboard.png")
		if (fs.existsSync(heroImagePath)) {
			const heroImageBuffer = fs.readFileSync(heroImagePath)
			const heroImageFile: File = {
				name: "hero-dashboard.png",
				data: heroImageBuffer,
				mimetype: "image/png",
				size: heroImageBuffer.byteLength,
			}
			heroImageDoc = await payload.create({
				collection: "media",
				data: {
					alt: "SaaSify Dashboard - Manage projects, track metrics, and configure settings",
				},
				file: heroImageFile,
			})
			payload.logger.info("— Hero image uploaded successfully")
		} else {
			payload.logger.info("— Hero image not found, using animated mockup fallback")
		}
	} catch (_error) {
		payload.logger.info("— Error uploading hero image, using animated mockup fallback")
	}

	// Upload testimonial images
	payload.logger.info("— Uploading testimonial images...")

	const testimonialImages: (typeof heroImageDoc)[] = []
	const testimonialImageFiles = [
		{ name: "testimonial-1.jpg", alt: "Professional woman entrepreneur" },
		{ name: "testimonial-2.jpg", alt: "Business professional reviewing analytics" },
		{ name: "testimonial-3.jpg", alt: "Team collaboration meeting" },
	]

	for (const imgData of testimonialImageFiles) {
		try {
			const imagePath = path.join(process.cwd(), `public/media/${imgData.name}`)
			if (fs.existsSync(imagePath)) {
				const imageBuffer = fs.readFileSync(imagePath)
				const imageFile: File = {
					name: imgData.name,
					data: imageBuffer,
					mimetype: "image/jpeg",
					size: imageBuffer.byteLength,
				}
				const imageDoc = await payload.create({
					collection: "media",
					data: {
						alt: imgData.alt,
					},
					file: imageFile,
				})
				testimonialImages.push(imageDoc)
			}
		} catch (_error) {
			payload.logger.info(`— Error uploading ${imgData.name}`)
		}
	}
	payload.logger.info(`— Uploaded ${testimonialImages.length} testimonial images`)

	payload.logger.info("— Seeding contact form...")

	const contactForm = await payload.create({
		collection: "forms",
		depth: 0,
		data: contactFormData,
	})

	payload.logger.info("— Seeding pages...")

	// Seed main pages
	const [homePage, pricingPage, aboutPage, privacyPage, termsPage] = await Promise.all([
		payload.create({
			collection: "pages",
			depth: 0,
			context: {
				disableRevalidate: true,
			},
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: directoryHubHome({ heroImage: heroImageDoc, testimonialImages }) as any,
		}),
		payload.create({
			collection: "pages",
			depth: 0,
			context: {
				disableRevalidate: true,
			},
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: directoryHubPricing() as any,
		}),
		payload.create({
			collection: "pages",
			depth: 0,
			context: {
				disableRevalidate: true,
			},
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: directoryHubAbout({ contactForm }) as any,
		}),
		payload.create({
			collection: "pages",
			depth: 0,
			context: {
				disableRevalidate: true,
			},
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: directoryHubPrivacy() as any,
		}),
		payload.create({
			collection: "pages",
			depth: 0,
			context: {
				disableRevalidate: true,
			},
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: directoryHubTerms() as any,
		}),
	])

	// Seed feature pages
	payload.logger.info("— Seeding feature pages...")

	const featurePages = await Promise.all([
		payload.create({
			collection: "pages",
			depth: 0,
			context: { disableRevalidate: true },
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: integrationsPage() as any,
		}),
		payload.create({
			collection: "pages",
			depth: 0,
			context: { disableRevalidate: true },
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: analyticsPage() as any,
		}),
		payload.create({
			collection: "pages",
			depth: 0,
			context: { disableRevalidate: true },
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: securityPage() as any,
		}),
		payload.create({
			collection: "pages",
			depth: 0,
			context: { disableRevalidate: true },
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: dashboardPage() as any,
		}),
		payload.create({
			collection: "pages",
			depth: 0,
			context: { disableRevalidate: true },
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: automationPage() as any,
		}),
		payload.create({
			collection: "pages",
			depth: 0,
			context: { disableRevalidate: true },
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: workflowsPage() as any,
		}),
	])

	payload.logger.info(`— Seeded ${featurePages.length} feature pages`)

	// Seed use case pages
	payload.logger.info("— Seeding use case pages...")

	const useCasePages = await Promise.all([
		payload.create({
			collection: "pages",
			depth: 0,
			context: { disableRevalidate: true },
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: salesPage() as any,
		}),
		payload.create({
			collection: "pages",
			depth: 0,
			context: { disableRevalidate: true },
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: marketingPage() as any,
		}),
		payload.create({
			collection: "pages",
			depth: 0,
			context: { disableRevalidate: true },
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: productPage() as any,
		}),
		payload.create({
			collection: "pages",
			depth: 0,
			context: { disableRevalidate: true },
			// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
			data: operationsPage() as any,
		}),
	])

	payload.logger.info(`— Seeded ${useCasePages.length} use case pages`)

	// Seed blog posts
	payload.logger.info("— Seeding blog posts...")

	const posts = blogPosts(categoryDocs)
	const createdPosts = await Promise.all(
		posts.map((post) =>
			payload.create({
				collection: "posts",
				depth: 0,
				context: { disableRevalidate: true },
				// biome-ignore lint/suspicious/noExplicitAny: Payload seed data type mismatch
				data: post as any,
			}),
		),
	)

	payload.logger.info(`— Seeded ${createdPosts.length} blog posts`)

	payload.logger.info("— Seeding globals...")

	await Promise.all([
		payload.updateGlobal({
			slug: "header",
			context: {
				disableRevalidate: true,
			},
			data: {
				navItems: [
					{
						type: "megaMenu",
						label: "Product",
						megaMenuColumns: [
							{
								columnLabel: "Core Features",
								items: [
									{
										label: "Integrations",
										description: "Connect with 100+ tools you already use",
										icon: "layout",
										link: {
											type: "reference",
											reference: {
												relationTo: "pages",
												value: featurePages[0].id,
											},
										},
									},
									{
										label: "Analytics",
										description: "Real-time insights and reporting dashboards",
										icon: "barChart",
										link: {
											type: "reference",
											reference: {
												relationTo: "pages",
												value: featurePages[1].id,
											},
										},
									},
									{
										label: "Security",
										description: "Enterprise-grade protection and compliance",
										icon: "shield",
										link: {
											type: "reference",
											reference: {
												relationTo: "pages",
												value: featurePages[2].id,
											},
										},
									},
								],
							},
							{
								columnLabel: "Productivity",
								items: [
									{
										label: "Dashboard",
										description: "Unified command center for your team",
										icon: "layout",
										link: {
											type: "reference",
											reference: {
												relationTo: "pages",
												value: featurePages[3].id,
											},
										},
									},
									{
										label: "Automation",
										description: "Streamline repetitive tasks instantly",
										icon: "zap",
										link: {
											type: "reference",
											reference: {
												relationTo: "pages",
												value: featurePages[4].id,
											},
										},
									},
									{
										label: "Workflows",
										description: "Build custom processes without code",
										icon: "layers",
										link: {
											type: "reference",
											reference: {
												relationTo: "pages",
												value: featurePages[5].id,
											},
										},
									},
								],
							},
						],
					},
					{
						type: "megaMenu",
						label: "Solutions",
						megaMenuColumns: [
							{
								columnLabel: "By Team",
								items: [
									{
										label: "Sales Teams",
										description: "Close deals faster with smart tools",
										icon: "target",
										link: {
											type: "reference",
											reference: {
												relationTo: "pages",
												value: useCasePages[0].id,
											},
										},
									},
									{
										label: "Marketing Teams",
										description: "Launch campaigns that convert",
										icon: "rocket",
										link: {
											type: "reference",
											reference: {
												relationTo: "pages",
												value: useCasePages[1].id,
											},
										},
									},
									{
										label: "Product Teams",
										description: "Ship features users love",
										icon: "layers",
										link: {
											type: "reference",
											reference: {
												relationTo: "pages",
												value: useCasePages[2].id,
											},
										},
									},
									{
										label: "Operations",
										description: "Scale without the growing pains",
										icon: "settings",
										link: {
											type: "reference",
											reference: {
												relationTo: "pages",
												value: useCasePages[3].id,
											},
										},
									},
								],
							},
						],
					},
					{
						type: "link",
						label: "Pricing",
						link: {
							type: "reference",
							reference: {
								relationTo: "pages",
								value: pricingPage.id,
							},
						},
					},
					{
						type: "link",
						label: "Blog",
						link: {
							type: "custom",
							url: "/posts",
						},
					},
					{
						type: "link",
						label: "Sign In",
						link: {
							type: "custom",
							url: "/sign-in",
						},
					},
					{
						type: "link",
						label: "Get Started",
						link: {
							type: "custom",
							url: "/sign-up",
						},
					},
				],
			},
		}),
		payload.updateGlobal({
			slug: "footer",
			context: {
				disableRevalidate: true,
			},
			data: {
				columns: [
					{
						title: "Product",
						links: [
							{
								link: {
									type: "reference",
									label: "Home",
									reference: {
										relationTo: "pages",
										value: homePage.id,
									},
								},
							},
							{
								link: {
									type: "reference",
									label: "Pricing",
									reference: {
										relationTo: "pages",
										value: pricingPage.id,
									},
								},
							},
							{
								link: {
									type: "reference",
									label: "Integrations",
									reference: {
										relationTo: "pages",
										value: featurePages[0].id,
									},
								},
							},
						],
					},
					{
						title: "Resources",
						links: [
							{
								link: {
									type: "custom",
									label: "Blog",
									url: "/posts",
								},
							},
							{
								link: {
									type: "custom",
									label: "Documentation",
									url: "/docs",
								},
							},
						],
					},
					{
						title: "Company",
						links: [
							{
								link: {
									type: "reference",
									label: "About",
									reference: {
										relationTo: "pages",
										value: aboutPage.id,
									},
								},
							},
						],
					},
					{
						title: "Legal",
						links: [
							{
								link: {
									type: "reference",
									label: "Privacy",
									reference: {
										relationTo: "pages",
										value: privacyPage.id,
									},
								},
							},
							{
								link: {
									type: "reference",
									label: "Terms",
									reference: {
										relationTo: "pages",
										value: termsPage.id,
									},
								},
							},
						],
					},
				],
				socialLinks: {
					twitter: "https://x.com/saasify",
					linkedin: "https://linkedin.com/company/saasify",
					github: "https://github.com/saasify",
				},
				newsletter: {
					enabled: true,
					title: "Newsletter",
					description: "Get product updates, tips, and insights delivered weekly.",
					buttonText: "Subscribe",
					placeholder: "Enter your email",
				},
				copyrightText: "SaaSify",
				bottomLinks: [
					{
						link: {
							type: "custom",
							label: "Contact Support",
							url: "/support",
						},
					},
				],
			},
		}),
	])

	payload.logger.info("SaaSify database seeded successfully!")
}
