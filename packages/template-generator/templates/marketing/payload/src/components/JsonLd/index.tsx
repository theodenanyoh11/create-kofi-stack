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
		name: "SaaSify",
		description: "The modern platform for growing teams. Streamline workflows and boost productivity.",
		url: siteUrl,
		logo: `${siteUrl}/logo.svg`,
		sameAs: [
			"https://twitter.com/saasify",
			"https://linkedin.com/company/saasify",
			"https://github.com/saasify",
		],
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "customer support",
			email: "support@saasify.com",
		},
		founder: {
			"@type": "Person",
			name: "SaaSify Team",
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
		name: "SaaSify",
		description:
			"The modern platform for growing teams. Streamline workflows, boost productivity, and scale your business.",
		applicationCategory: "BusinessApplication",
		operatingSystem: "Web",
		url: siteUrl,
		offers: {
			"@type": "AggregateOffer",
			priceCurrency: "USD",
			lowPrice: "0",
			highPrice: "99",
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
			"Team collaboration tools",
			"Workflow automation",
			"Real-time analytics",
			"100+ integrations",
			"Enterprise security",
			"Custom dashboards",
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
		name: "SaaSify",
		description: "The modern platform for growing teams. Streamline workflows and boost productivity.",
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
			name: "SaaSify",
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
