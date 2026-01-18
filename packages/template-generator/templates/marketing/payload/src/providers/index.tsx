import type React from "react"

import { HeaderThemeProvider } from "./HeaderTheme"
import { PostHogProvider } from "./PostHogProvider"
import { ThemeProvider } from "./Theme"

export const Providers: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	return (
		<ThemeProvider>
			<HeaderThemeProvider>
				<PostHogProvider>{children}</PostHogProvider>
			</HeaderThemeProvider>
		</ThemeProvider>
	)
}
