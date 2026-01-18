"use client"

import { Media } from "@/components/Media"
import { cn } from "@/utilities/ui"
import {
	BarChart3,
	Building,
	ChevronDown,
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
import { useState } from "react"

import type { Header, Media as MediaType, Page, Post } from "@/payload-types"

type NavItem = NonNullable<Header["navItems"]>[number]

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

interface MegaMenuProps {
	item: NavItem
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ item }) => {
	const [isOpen, setIsOpen] = useState(false)

	const columns = item.megaMenuColumns || []
	const featuredItem = item.featuredItem

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			{/* Trigger */}
			<button
				type="button"
				className={cn(
					"flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
					isOpen && "text-primary",
				)}
				onClick={() => setIsOpen(!isOpen)}
			>
				{item.label}
				<ChevronDown
					className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
				/>
			</button>

			{/* Dropdown */}
			{isOpen && (
				<div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50">
					<div
						className={cn(
							"bg-background border border-border rounded-xl shadow-xl overflow-hidden",
							"animate-in fade-in-0 zoom-in-95 duration-200",
							featuredItem?.enabled ? "min-w-[700px]" : "min-w-[500px]",
						)}
					>
						<div className="flex">
							{/* Menu Columns */}
							<div className={cn("flex-1 p-6", columns.length > 1 ? "grid grid-cols-2 gap-8" : "")}>
								{columns.map((column) => (
									<div key={column.columnLabel || "column"}>
										{column.columnLabel && (
											<div className="mb-4">
												<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
													{column.columnLabel}
												</h3>
												{column.columnDescription && (
													<p className="text-xs text-muted-foreground mt-1">
														{column.columnDescription}
													</p>
												)}
											</div>
										)}
										<ul className="space-y-1">
											{column.items?.map((menuItem) => {
												const Icon =
													menuItem.icon && menuItem.icon !== "none" ? iconMap[menuItem.icon] : null
												const href = menuItem.link ? getLinkHref(menuItem.link) : "#"

												return (
													<li key={menuItem.label}>
														<Link
															href={href}
															className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
															onClick={() => setIsOpen(false)}
														>
															{Icon && (
																<div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
																	<Icon className="w-4 h-4 text-primary" />
																</div>
															)}
															<div className="flex-1 min-w-0">
																<div className="text-sm font-medium group-hover:text-primary transition-colors">
																	{menuItem.label}
																</div>
																{menuItem.description && (
																	<div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
																		{menuItem.description}
																	</div>
																)}
															</div>
														</Link>
													</li>
												)
											})}
										</ul>
									</div>
								))}
							</div>

							{/* Featured Section */}
							{featuredItem?.enabled && (
								<div className="w-64 bg-muted/50 p-6 border-l border-border">
									{featuredItem.image && typeof featuredItem.image === "object" && (
										<div className="rounded-lg overflow-hidden mb-4 aspect-video">
											<Media
												resource={featuredItem.image as MediaType}
												imgClassName="w-full h-full object-cover"
											/>
										</div>
									)}
									{featuredItem.heading && (
										<h4 className="font-semibold text-sm mb-2">{featuredItem.heading}</h4>
									)}
									{featuredItem.description && (
										<p className="text-xs text-muted-foreground mb-4">{featuredItem.description}</p>
									)}
									{featuredItem.link && (
										<Link
											href={getLinkHref(featuredItem.link)}
											className="text-xs font-medium text-primary hover:underline"
											onClick={() => setIsOpen(false)}
										>
											{featuredItem.link.label || "Learn more"} →
										</Link>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
