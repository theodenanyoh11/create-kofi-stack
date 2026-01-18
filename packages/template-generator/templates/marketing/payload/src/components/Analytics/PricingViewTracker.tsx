"use client"

import { useEffect, useRef } from "react"

interface PricingViewTrackerProps {
	children: React.ReactNode
}

/**
 * Tracks when the pricing section comes into view.
 * Wrap around pricing table components.
 */
export function PricingViewTracker({ children }: PricingViewTrackerProps) {
	const ref = useRef<HTMLDivElement>(null)
	const hasTracked = useRef(false)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasTracked.current) {
						hasTracked.current = true
						// Track pricing view - analytics can be added here if needed
						if (process.env.NODE_ENV === "development") {
							console.log("Pricing section viewed")
						}
					}
				})
			},
			{
				threshold: 0.3, // 30% of the element must be visible
			},
		)

		observer.observe(element)

		return () => {
			observer.disconnect()
		}
	}, [])

	return <div ref={ref}>{children}</div>
}
