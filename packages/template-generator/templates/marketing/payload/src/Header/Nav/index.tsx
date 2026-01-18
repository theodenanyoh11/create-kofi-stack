"use client"

import React from "react"

import type { Header as HeaderType } from "@/payload-types"

import { CTATracker } from "@/components/Analytics"
import { CMSLink } from "@/components/Link"
import { MegaMenu } from "../MegaMenu"

type Position = "left" | "right"

interface HeaderNavProps {
	data: HeaderType
	position?: Position
	className?: string
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, position, className }) => {
	const allNavItems = data?.navItems || []

	// Filter items by position if specified
	const navItems = position
		? allNavItems.filter((item) => (item.position || "left") === position)
		: allNavItems

	if (navItems.length === 0) return null

	return (
		<nav className={className}>
			{navItems.map((item, i) => {
				const isRightPosition = (item.position || "left") === "right"

				// Handle mega menu type
				if (item.type === "megaMenu") {
					return <MegaMenu key={item.id || i} item={item} />
				}

				// Handle simple link type
				const link = item.link
				if (!link) return null

				// Determine appearance based on position and CMS setting
				// Right-positioned items use their appearance setting (button = 'default', link = 'link')
				// Left-positioned items always use link styling
				const itemAppearance = item.appearance || "button"
				const appearance = isRightPosition
					? itemAppearance === "button"
						? "default"
						: "link"
					: "link"

				// Track CTA clicks for button-style items in the header
				const isButton = appearance === "default"
				const linkContent = (
					<CMSLink
						{...link}
						label={item.label}
						appearance={appearance}
						className={appearance === "link" ? "text-sm font-medium" : undefined}
					/>
				)

				if (isButton) {
					return (
						<CTATracker key={item.id || i} location="header" variant={item.label || `nav_${i}`}>
							{linkContent}
						</CTATracker>
					)
				}

				return <React.Fragment key={item.id || i}>{linkContent}</React.Fragment>
			})}
		</nav>
	)
}
