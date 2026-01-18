"use client"

import React, { useState } from "react"

import type { ThemePreference } from "./types"

import { cn } from "@/utilities/ui"
import { useTheme } from ".."
import { themeLocalStorageKey } from "./types"

// Icons for theme modes
const SunIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<title>Light mode</title>
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2" />
		<path d="M12 20v2" />
		<path d="m4.93 4.93 1.41 1.41" />
		<path d="m17.66 17.66 1.41 1.41" />
		<path d="M2 12h2" />
		<path d="M20 12h2" />
		<path d="m6.34 17.66-1.41 1.41" />
		<path d="m19.07 4.93-1.41 1.41" />
	</svg>
)

const MoonIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<title>Dark mode</title>
		<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
	</svg>
)

const SystemIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<title>System mode</title>
		<rect width="20" height="14" x="2" y="3" rx="2" />
		<line x1="8" x2="16" y1="21" y2="21" />
		<line x1="12" x2="12" y1="17" y2="21" />
	</svg>
)

export const ThemeSelector: React.FC = () => {
	const { setTheme } = useTheme()
	const [value, setValue] = useState<ThemePreference>("light")

	const onThemeChange = (themeToSet: ThemePreference) => {
		// Save preference to localStorage
		window.localStorage.setItem(themeLocalStorageKey, themeToSet)
		setValue(themeToSet)

		if (themeToSet === "auto") {
			// Apply system preference
			setTheme(null)
		} else {
			setTheme(themeToSet)
		}
	}

	React.useEffect(() => {
		const preference = window.localStorage.getItem(themeLocalStorageKey) as ThemePreference | null
		if (preference === "light" || preference === "dark" || preference === "auto") {
			setValue(preference)
		} else {
			// Default to light if no preference saved
			setValue("light")
		}
	}, [])

	const themes: { value: ThemePreference; icon: React.ReactNode; label: string }[] = [
		{ value: "light", icon: <SunIcon />, label: "Light" },
		{ value: "auto", icon: <SystemIcon />, label: "System" },
		{ value: "dark", icon: <MoonIcon />, label: "Dark" },
	]

	return (
		<div
			className="inline-flex items-center rounded-full border border-border bg-background p-1"
			aria-label="Theme selection"
		>
			{themes.map(({ value: themeValue, icon, label }) => (
				<button
					key={themeValue}
					type="button"
					aria-pressed={value === themeValue}
					aria-label={`${label} theme`}
					onClick={() => onThemeChange(themeValue)}
					className={cn(
						"flex h-7 w-7 items-center justify-center rounded-full transition-all",
						value === themeValue
							? "bg-primary text-primary-foreground"
							: "text-muted-foreground hover:text-foreground",
					)}
				>
					{icon}
				</button>
			))}
		</div>
	)
}
