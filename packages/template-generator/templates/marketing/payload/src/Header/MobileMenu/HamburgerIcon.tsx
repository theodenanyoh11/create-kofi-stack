"use client"

import { cn } from "@/utilities/ui"
import type React from "react"

interface HamburgerIconProps {
	isOpen: boolean
	onClick: () => void
	className?: string
}

/**
 * Animated 2-line hamburger icon that morphs into an X when open
 */
export const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, onClick, className }) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"relative w-8 h-8 flex items-center justify-center focus:outline-none",
				"lg:hidden", // Only show on tablet and below
				className,
			)}
			aria-label={isOpen ? "Close menu" : "Open menu"}
			aria-expanded={isOpen}
		>
			<div className="relative w-6 h-4 flex flex-col justify-between">
				{/* Top line */}
				<span
					className={cn(
						"absolute left-0 w-full h-0.5 bg-foreground rounded-full",
						"transition-all duration-300 ease-in-out origin-center",
						isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 translate-y-0 rotate-0",
					)}
				/>
				{/* Bottom line */}
				<span
					className={cn(
						"absolute left-0 w-full h-0.5 bg-foreground rounded-full",
						"transition-all duration-300 ease-in-out origin-center",
						isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0 translate-y-0 rotate-0",
					)}
				/>
			</div>
		</button>
	)
}
