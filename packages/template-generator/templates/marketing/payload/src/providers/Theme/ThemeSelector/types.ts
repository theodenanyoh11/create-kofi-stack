export type Theme = "dark" | "light"

export type ThemePreference = Theme | "auto"

export const themeLocalStorageKey = "payload-theme"

export const defaultTheme: Theme = "light"
