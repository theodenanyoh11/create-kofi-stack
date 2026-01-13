import { z } from 'zod'

// Project structure
export const ProjectStructureSchema = z.enum(['standalone', 'monorepo'])

// Marketing site options
export const MarketingSiteSchema = z.enum(['none', 'nextjs', 'payload'])

// Auth providers (OAuth)
export const AuthProviderSchema = z.enum([
  'github',
  'google',
  'discord',
  'twitter',
  'apple',
  'microsoft',
  'linkedin',
])

// Analytics providers
export const AnalyticsProviderSchema = z.enum(['none', 'posthog', 'vercel'])

// Upload providers
export const UploadsProviderSchema = z.enum([
  'none',
  'uploadthing',
  's3',
  'vercel-blob',
])


// Base color
export const BaseColorSchema = z.enum(['neutral', 'gray', 'zinc', 'slate', 'stone'])

// Theme color
export const ThemeColorSchema = z.enum([
  'zinc',
  'slate',
  'stone',
  'gray',
  'neutral',
  'red',
  'rose',
  'orange',
  'green',
  'blue',
  'yellow',
  'violet',
])

// Menu accent
export const MenuAccentSchema = z.enum(['none', 'muted', 'primary'])

// Icon library
export const IconLibrarySchema = z.enum(['lucide', 'hugeicons'])

// Font family
export const FontFamilySchema = z.enum(['geist', 'inter', 'system'])

// Border radius
export const BorderRadiusSchema = z.enum(['0', '0.3', '0.5', '0.75', '1.0'])

// Spacing scale
export const SpacingScaleSchema = z.enum(['default', 'compact', 'comfortable'])

// Package manager
export const PackageManagerSchema = z.enum(['pnpm', 'npm', 'bun'])

// Addons
export const AddonSchema = z.enum([
  'biome',
  'husky',
  'turborepo',
  'playwright',
  'vitest',
  'rate-limiting',
  'monitoring',
])

// Design system configuration
export const DesignSystemConfigSchema = z.object({
  baseColor: BaseColorSchema,
  themeColor: ThemeColorSchema,
  menuAccent: MenuAccentSchema,
  iconLibrary: IconLibrarySchema,
  headingFont: FontFamilySchema,
  bodyFont: FontFamilySchema,
  borderRadius: BorderRadiusSchema,
  spacingScale: SpacingScaleSchema,
})

// Auth configuration
export const AuthConfigSchema = z.object({
  providers: z.array(AuthProviderSchema),
  organizations: z.boolean(),
})

// Integrations configuration
export const IntegrationsConfigSchema = z.object({
  analytics: AnalyticsProviderSchema,
  uploads: UploadsProviderSchema,
})

// Complete project configuration
export const ProjectConfigSchema = z.object({
  // Basic info
  projectName: z.string(),
  targetDir: z.string(),

  // Structure
  structure: ProjectStructureSchema,
  marketingSite: MarketingSiteSchema,

  // Design system
  shadcn: DesignSystemConfigSchema,

  // Auth
  auth: AuthConfigSchema,

  // Integrations
  integrations: IntegrationsConfigSchema,

  // Addons
  addons: z.array(AddonSchema),

  // Setup options
  packageManager: PackageManagerSchema,
})

// CLI input (what user provides, before defaults are applied)
export const CLIInputSchema = z.object({
  projectName: z.string().optional(),
  structure: ProjectStructureSchema.optional(),
  marketingSite: MarketingSiteSchema.optional(),
  baseColor: BaseColorSchema.optional(),
  themeColor: ThemeColorSchema.optional(),
  menuAccent: MenuAccentSchema.optional(),
  iconLibrary: IconLibrarySchema.optional(),
  headingFont: FontFamilySchema.optional(),
  bodyFont: FontFamilySchema.optional(),
  borderRadius: BorderRadiusSchema.optional(),
  spacingScale: SpacingScaleSchema.optional(),
  authProviders: z.array(AuthProviderSchema).optional(),
  organizations: z.boolean().optional(),
  analytics: AnalyticsProviderSchema.optional(),
  uploads: UploadsProviderSchema.optional(),
  addons: z.array(AddonSchema).optional(),
  git: z.boolean().optional(),
  packageManager: PackageManagerSchema.optional(),
  install: z.boolean().optional(),
  yes: z.boolean().optional(), // Skip prompts with defaults
})

// Default configuration
export const DEFAULT_CONFIG: z.infer<typeof ProjectConfigSchema> = {
  projectName: 'my-kofi-app',
  targetDir: '',
  structure: 'standalone',
  marketingSite: 'none',
  shadcn: {
    baseColor: 'neutral',
    themeColor: 'zinc',
    menuAccent: 'muted',
    iconLibrary: 'lucide',
    headingFont: 'geist',
    bodyFont: 'geist',
    borderRadius: '0.5',
    spacingScale: 'default',
  },
  auth: {
    providers: ['github', 'google'],
    organizations: false,
  },
  integrations: {
    analytics: 'none',
    uploads: 'none',
  },
  addons: [],
  packageManager: 'pnpm',
}
