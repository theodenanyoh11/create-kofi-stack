import { getServerSideURL } from "@/utilities/getURL"
import type React from "react"

const siteUrl = getServerSideURL()

/**
 * Organization Schema - Company information
 */
export const OrganizationSchema: React.FC = () => {
	const schema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "DirectoryHub",
		description: "The no-code platform to build, manage, and monetize niche directory websites.",
		url: siteUrl,
		logo: `${siteUrl}/logo.svg`,
		sameAs: [
			"https://twitter.com/directoryhub",
			"https://linkedin.com/company/directoryhub",
			"https://github.com/directoryhub",
		],
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "customer support",
			email: "support@directoryhub.com",
		},
		founder: {
			"@type": "Person",
			name: "DirectoryHub Team",
		},
		foundingDate: "2024",
	}

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires dangerouslySetInnerHTML for proper SEO
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	)
}

/**
 * Software Application Schema - Product details
 */
export const SoftwareApplicationSchema: React.FC = () => {
	const schema = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "DirectoryHub",
		description:
			"Launch a profitable directory business in minutes. Create, monetize, and grow with DirectoryHub - the no-code directory builder.",
		applicationCategory: "BusinessApplication",
		operatingSystem: "Web",
		url: siteUrl,
		offers: {
			"@type": "AggregateOffer",
			priceCurrency: "USD",
			lowPrice: "0",
			highPrice: "199",
			offerCount: "3",
		},
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "4.9",
			ratingCount: "127",
			bestRating: "5",
			worstRating: "1",
		},
		featureList: [
			"No-code directory builder",
			"Built-in payment processing",
			"SEO optimization",
			"Custom domains",
			"Multi-tenant architecture",
			"Analytics dashboard",
		],
		screenshot: `${siteUrl}/website-template-OG.webp`,
	}

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires dangerouslySetInnerHTML for proper SEO
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	)
}

/**
 * WebSite Schema - Site search and navigation
 */
export const WebSiteSchema: React.FC = () => {
	const schema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "DirectoryHub",
		description: "The no-code platform to build, manage, and monetize niche directory websites.",
		url: siteUrl,
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${siteUrl}/search?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
		publisher: {
			"@type": "Organization",
			name: "DirectoryHub",
			logo: {
				"@type": "ImageObject",
				url: `${siteUrl}/logo.svg`,
			},
		},
	}

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires dangerouslySetInnerHTML for proper SEO
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	)
}

/**
 * Combined JSON-LD component for all schemas
 */
export const JsonLdSchemas: React.FC = () => {
	return (
		<>
			<OrganizationSchema />
			<SoftwareApplicationSchema />
			<WebSiteSchema />
		</>
	)
}
