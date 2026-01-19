"use client"

import { useTheme } from "@/providers/Theme"
import clsx from "clsx"

interface Props {
	className?: string
	loading?: "lazy" | "eager"
	priority?: "auto" | "high" | "low"
	variant?: "default" | "light" | "auto"
}

export const Logo = (props: Props) => {
	const {
		loading: loadingFromProps,
		priority: priorityFromProps,
		className,
		variant = "auto",
	} = props

	const { theme } = useTheme()
	const loading = loadingFromProps || "lazy"
	const priority = priorityFromProps || "low"

	// Determine which logo to show
	let src = "/logo.svg"
	if (variant === "light") {
		src = "/logo-light.svg"
	} else if (variant === "auto" && theme === "dark") {
		src = "/logo-light.svg"
	}

	return (
		/* eslint-disable @next/next/no-img-element */
		<img
			alt="SaaSify Logo"
			width={34}
			height={34}
			loading={loading}
			fetchPriority={priority}
			decoding="async"
			className={clsx("w-[34px] h-[34px]", className)}
			src={src}
		/>
	)
}
