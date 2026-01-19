import type { Metadata } from "next"

import { cn } from "@/utilities/ui"
import { GeistMono } from "geist/font/mono"
import { Inter } from "next/font/google"
import type React from "react"

import { Footer } from "@/Footer/Component"
import { Header } from "@/Header/Component"
import { AdminBar } from "@/components/AdminBar"
import { JsonLdSchemas } from "@/components/JsonLd"
import { Providers } from "@/providers"
import { InitTheme } from "@/providers/Theme/InitTheme"
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph"
import { draftMode } from "next/headers"

import { getServerSideURL } from "@/utilities/getURL"
import "./globals.css"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { isEnabled } = await draftMode()

	return (
		<html className={cn(inter.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
			<head>
				<InitTheme />
				{/* Favicon */}
				<link href="/favicon.ico" rel="icon" sizes="32x32" />
				<link href="/favicon.svg" rel="icon" type="image/svg+xml" />

				{/* Preconnect to external resources for performance */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				{/* Preconnect to PostHog proxy for faster analytics initialization */}
				<link rel="preconnect" href="/ingest" />

				{/* DNS prefetch for common external services */}
				<link rel="dns-prefetch" href="https://www.google-analytics.com" />
				<link rel="dns-prefetch" href="https://www.googletagmanager.com" />

				{/* JSON-LD Structured Data */}
				<JsonLdSchemas />
			</head>
			<body className="font-sans antialiased" suppressHydrationWarning>
				<Providers>
					<AdminBar
						adminBarProps={{
							preview: isEnabled,
						}}
					/>

					<Header />
					<main id="main-content" className="flex-1">
						{children}
					</main>
					<Footer />
				</Providers>
			</body>
		</html>
	)
}

export const metadata: Metadata = {
	metadataBase: new URL(getServerSideURL()),
	title: {
		default: "SaaSify - The Modern Platform for Growing Teams",
		template: "%s | SaaSify",
	},
	description:
		"Streamline workflows, boost productivity, and scale your business with one powerful platform.",
	keywords: [
		"SaaS platform",
		"team productivity",
		"workflow automation",
		"business software",
		"collaboration tools",
		"project management",
		"team collaboration",
	],
	authors: [{ name: "SaaSify", url: getServerSideURL() }],
	creator: "SaaSify",
	publisher: "SaaSify",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: mergeOpenGraph(),
	twitter: {
		card: "summary_large_image",
		creator: "@saasify",
		site: "@saasify",
		title: "SaaSify - The Modern Platform for Growing Teams",
		description:
			"Streamline workflows, boost productivity, and scale your business with one powerful platform.",
	},
	verification: {
		// Add your verification codes here when available
		// google: 'your-google-verification-code',
		// yandex: 'your-yandex-verification-code',
	},
}
