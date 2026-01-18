import { getServerSideURL } from "@/utilities/getURL"
import { cn } from "@/utilities/ui"
import { GeistMono } from "geist/font/mono"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"

// Import both - globals.css for Tailwind base + fumadocs styles
import "../(frontend)/globals.css"
import "fumadocs-ui/style.css"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
})

export default function DocsRootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			className={cn(inter.variable, GeistMono.variable)}
			lang="en"
			suppressHydrationWarning
			data-theme="light"
		>
			<head>
				<link href="/favicon.ico" rel="icon" sizes="32x32" />
				<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
			</head>
			<body className="font-sans antialiased" suppressHydrationWarning>
				{children}
			</body>
		</html>
	)
}

export const metadata: Metadata = {
	metadataBase: new URL(getServerSideURL()),
	title: {
		default: "Documentation | DirectoryHub",
		template: "%s | DirectoryHub Docs",
	},
	description: "DirectoryHub documentation - learn how to build and manage directory websites.",
}
