"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/utilities/ui"
import {
	BarChart3,
	Building,
	ChevronRight,
	Database,
	DollarSign,
	Globe,
	Layers,
	Layout,
	type LucideIcon,
	Rocket,
	Search,
	Settings,
	Shield,
	Store,
	Target,
	Users,
	Zap,
} from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useEffect, useState } from "react"

import type { Header, Page, Post } from "@/payload-types"
import { HamburgerIcon } from "./HamburgerIcon"

const iconMap: Record<string, LucideIcon> = {
	layout: Layout,
	dollarSign: DollarSign,
	search: Search,
	settings: Settings,
	zap: Zap,
	layers: Layers,
	users: Users,
	building: Building,
	globe: Globe,
	store: Store,
	rocket: Rocket,
	target: Target,
	barChart: BarChart3,
	shield: Shield,
	database: Database,
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

interface MobileMenuProps {
	data: Header
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ data }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

	const navItems = data?.navItems || []
	const leftItems = navItems.filter((item) => (item.position || "left") === "left")
	const rightItems = navItems.filter((item) => (item.position || "left") === "right")

	// Separate CTA items (typically the primary action buttons)
	const ctaItems = rightItems.filter((item) => item.type === "link")

	// Prevent body scroll when menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = ""
		}
		return () => {
			document.body.style.overflow = ""
		}
	}, [isOpen])

	const toggleExpanded = (id: string) => {
		setExpandedItems((prev) => {
			const next = new Set(prev)
			if (next.has(id)) {
				next.delete(id)
			} else {
				next.add(id)
			}
			return next
		})
	}

	const closeMenu = () => {
		setIsOpen(false)
		setExpandedItems(new Set())
	}

	return (
		<>
			{/* Hamburger button - visible on tablet and below */}
			<HamburgerIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

			{/* Mobile menu overlay */}
			<div
				className={cn(
					"fixed inset-0 z-50 lg:hidden",
					"transition-opacity duration-300",
					isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
				)}
			>
				{/* Backdrop */}
				<div
					className="absolute inset-0 bg-background/80 backdrop-blur-sm"
					onClick={closeMenu}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault()
							closeMenu()
						}
					}}
					role="button"
					tabIndex={0}
					aria-label="Close menu"
				/>

				{/* Menu panel */}
				<div
					className={cn(
						"absolute top-0 right-0 h-full w-full max-w-md bg-background border-l border-border",
						"flex flex-col",
						"transition-transform duration-300 ease-out",
						isOpen ? "translate-x-0" : "translate-x-full",
					)}
				>
					{/* Header with close button */}
					<div className="flex items-center justify-between p-4 border-b border-border">
						<Link href="/" onClick={closeMenu} className="text-xl font-semibold">
							DirectoryHub
						</Link>
						<HamburgerIcon isOpen={isOpen} onClick={closeMenu} className="lg:block" />
					</div>

					{/* Nav items */}
					<div className="flex-1 overflow-y-auto p-4">
						<nav className="space-y-1">
							{leftItems.map((item, index) => {
								const itemId = item.id || `item-${index}`
								const isExpanded = expandedItems.has(itemId)
								const hasMegaMenu = item.type === "megaMenu"

								if (hasMegaMenu) {
									return (
										<div key={itemId}>
											{/* Expandable item */}
											<button
												type="button"
												onClick={() => toggleExpanded(itemId)}
												className={cn(
													"w-full flex items-center justify-between py-4 text-lg font-medium",
													"border-b border-border/50 transition-colors hover:text-primary",
												)}
											>
												<span>{item.label}</span>
												<ChevronRight
													className={cn(
														"w-5 h-5 transition-transform duration-200",
														isExpanded && "rotate-90",
													)}
												/>
											</button>

											{/* Expanded content */}
											<div
												className={cn(
													"overflow-hidden transition-all duration-300",
													isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
												)}
											>
												<div className="py-2 pl-4 space-y-4">
													{item.megaMenuColumns?.map((column, colIndex) => (
														<div key={column.columnLabel || `col-${colIndex}`}>
															{column.columnLabel && (
																<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
																	{column.columnLabel}
																</p>
															)}
															<ul className="space-y-1">
																{column.items?.map((menuItem) => {
																	const Icon =
																		menuItem.icon && menuItem.icon !== "none"
																			? iconMap[menuItem.icon]
																			: null
																	const href = menuItem.link ? getLinkHref(menuItem.link) : "#"

																	return (
																		<li key={menuItem.label}>
																			<Link
																				href={href}
																				onClick={closeMenu}
																				className="flex items-center gap-3 py-2 text-sm hover:text-primary transition-colors"
																			>
																				{Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
																				<span>{menuItem.label}</span>
																			</Link>
																		</li>
																	)
																})}
															</ul>
														</div>
													))}
												</div>
											</div>
										</div>
									)
								}

								// Simple link item
								const link = item.link
								if (!link) return null
								const href = getLinkHref(link)

								return (
									<Link
										key={itemId}
										href={href}
										onClick={closeMenu}
										className={cn(
											"block py-4 text-lg font-medium",
											"border-b border-border/50 transition-colors hover:text-primary",
										)}
									>
										{item.label}
									</Link>
								)
							})}
						</nav>
					</div>

					{/* Bottom CTA section */}
					<div className="p-4 border-t border-border space-y-3">
						{ctaItems.map((item, index) => {
							const link = item.link
							if (!link) return null
							const href = getLinkHref(link)
							const itemAppearance = item.appearance || "button"
							const isButton = itemAppearance === "button"

							if (isButton) {
								// First button item is primary (filled), others are outline
								const buttonItems = ctaItems.filter((i) => (i.appearance || "button") === "button")
								const buttonIndex = buttonItems.findIndex((i) => i.id === item.id)
								const isPrimary = buttonIndex === 0

								return (
									<Button
										key={item.id || `cta-${index}`}
										asChild
										variant={isPrimary ? "default" : "outline"}
										className="w-full"
										size="lg"
									>
										<Link href={href} onClick={closeMenu}>
											{item.label}
										</Link>
									</Button>
								)
							}

							// Link appearance - render as text link
							return (
								<Link
									key={item.id || `cta-${index}`}
									href={href}
									onClick={closeMenu}
									className="block w-full text-center py-3 text-sm font-medium hover:text-primary transition-colors"
								>
									{item.label}
								</Link>
							)
						})}
					</div>
				</div>
			</div>
		</>
	)
}
