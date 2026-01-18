"use client"

import { useEffect, useRef } from "react"

interface FeatureSectionTrackerProps {
	children: React.ReactNode
	featureName: string
}

/**
 * Tracks when a feature section comes into view.
 * Wrap around feature showcase or bento feature blocks.
 */
export function FeatureSectionTracker({ children, featureName }: FeatureSectionTrackerProps) {
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
						// Track feature section view - analytics can be added here if needed
						if (process.env.NODE_ENV === "development") {
							console.log("Feature section viewed:", featureName)
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
	}, [featureName])

	return <div ref={ref}>{children}</div>
}
