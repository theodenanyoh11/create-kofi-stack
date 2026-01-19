"use client"
import { useHeaderTheme } from "@/providers/HeaderTheme"
import Link from "next/link"
import type React from "react"
import { useEffect, useMemo, useState } from "react"

import type { Header, Page, Post } from "@/payload-types"

import { Logo } from "@/components/Logo/Logo"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "./MobileMenu"
import { HeaderNav } from "./Nav"

interface HeaderClientProps {
	data: Header | null
}

// Helper to get href from link data
const getLinkHref = (link: {
	type?: "custom" | "reference" | null
	reference?: {
		relationTo: "pages" | "posts"
		value: Page | Post | string | number
	} | null
	url?: string | null
}): string => {
	if (link.type === "reference" && link.reference) {
		const { relationTo, value } = link.reference
		if (typeof value === "object" && value.slug) {
			return relationTo === "pages" ? `/${value.slug}` : `/${relationTo}/${value.slug}`
		}
	}
	return link.url || "#"
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
	/* Storing the value in a useState to avoid hydration errors */
	const [theme, setTheme] = useState<string | null>(null)
	const { headerTheme, setHeaderTheme } = useHeaderTheme()

	useEffect(() => {
		setHeaderTheme(null)
	}, [setHeaderTheme])

	useEffect(() => {
		if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
	}, [headerTheme, theme])

	// Get the primary CTA (first right-positioned button item) for mobile view
	const primaryCta = useMemo(() => {
		const rightButtonItems = data?.navItems?.filter(
			(item) =>
				(item.position || "left") === "right" &&
				item.type === "link" &&
				(item.appearance || "button") === "button",
		)
		return rightButtonItems?.[0]
	}, [data?.navItems])

	// Show setup header when database isn't initialized yet
	if (!data) {
		return (
			<header className="sticky top-0 z-20 border-b border-border bg-background">
				<div className="container mx-auto px-4 h-16 flex justify-between items-center">
					<div className="flex items-center gap-2">
						<span className="text-xl font-semibold">Welcome</span>
					</div>
					<Button asChild size="sm">
						<Link href="/admin">Setup Site →</Link>
					</Button>
				</div>
			</header>
		)
	}

	return (
		<header
			className="sticky top-0 z-20 border-b border-border bg-background"
			{...(theme ? { "data-theme": theme } : {})}
		>
			<div className="container mx-auto px-4 h-16 flex justify-between items-center">
				{/* Left section: Logo + Left Nav Links */}
				<div className="flex items-center gap-8">
					<Link href="/" className="flex items-center gap-2">
						<Logo loading="eager" priority="high" variant="auto" />
						<span className="text-xl font-semibold hidden sm:inline">DirectoryHub</span>
					</Link>
					{/* Left nav - hidden on tablet and below, visible on desktop */}
					<HeaderNav data={data} position="left" className="hidden lg:flex gap-6 items-center" />
				</div>

				{/* Right section: Right Nav Links (CTAs) */}
				<div className="flex items-center gap-3">
					{/* Full right nav - hidden on mobile and tablet, visible on desktop */}
					<HeaderNav data={data} position="right" className="hidden lg:flex gap-4 items-center" />

					{/* Primary CTA for tablet/mobile - visible on tablet and below, hidden on desktop */}
					{primaryCta?.link && (
						<Button asChild className="lg:hidden" size="sm">
							<Link href={getLinkHref(primaryCta.link)}>{primaryCta.label}</Link>
						</Button>
					)}

					{/* Mobile menu hamburger - visible on tablet and below */}
					<MobileMenu data={data} />
				</div>
			</div>
		</header>
	)
}
