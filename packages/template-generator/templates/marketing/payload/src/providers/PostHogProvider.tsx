"use client"

import { usePathname, useSearchParams } from "next/navigation"
import posthog from "posthog-js"
import { Suspense, useEffect } from "react"

function PostHogPageviewTracker() {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		// Only track in production with PostHog configured
		if (process.env.NODE_ENV !== "production") return
		if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return

		// Track pageviews when the route changes
		const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
		posthog.capture("$pageview", { $current_url: url })
	}, [pathname, searchParams])

	return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Suspense fallback={null}>
				<PostHogPageviewTracker />
			</Suspense>
			{children}
		</>
	)
}
