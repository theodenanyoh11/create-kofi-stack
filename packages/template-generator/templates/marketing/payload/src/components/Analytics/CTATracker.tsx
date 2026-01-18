"use client"

import type { ReactNode } from "react"

interface CTATrackerProps {
	children: ReactNode
	location: string
	variant?: string
	className?: string
}

/**
 * Wraps clickable elements to track CTA clicks.
 * Use this around buttons or links that should be tracked.
 */
export function CTATracker({ children, location, variant, className }: CTATrackerProps) {
	const handleClick = () => {
		// Track CTA click - analytics can be added here if needed
		if (process.env.NODE_ENV === "development") {
			console.log("CTA clicked:", { location, variant })
		}
	}

	return (
		<div
			onClick={handleClick}
			onKeyDown={(e) => e.key === "Enter" && handleClick()}
			className={className}
		>
			{children}
		</div>
	)
}
