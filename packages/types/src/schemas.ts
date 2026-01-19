import { z } from 'zod'

// Project structure
export const ProjectStructureSchema = z.enum(['standalone', 'monorepo'])

// Marketing site options
export const MarketingSiteSchema = z.enum(['none', 'nextjs', 'payload', 'astro'])

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

// Upload/Storage providers (for web app - Convex-based)
export const UploadsProviderSchema = z.enum([
  'none',
  'convex-fs',
  'r2',
  'uploadthing',
  's3',
  'vercel-blob',
])

// Payload CMS Storage providers
export const PayloadStorageProviderSchema = z.enum([
  'local',
  's3',
  'vercel-blob',
  'gcs',
  'r2',
])

// Payment providers
export const PaymentProviderSchema = z.enum(['none', 'stripe', 'polar'])

// ============================================
// shadcn UI v4 Design System Options
// ============================================

// Component library (base or radix primitives)
export const ComponentLibrarySchema = z.enum(['base', 'radix'])

// Style presets (shadcn v4)
export const ShadcnStyleSchema = z.enum(['vega', 'nova', 'maia', 'lyra', 'mira'])

// Base color (background/surface colors)
export const BaseColorSchema = z.enum(['neutral', 'stone', 'zinc', 'gray'])

// Theme color (accent/primary color)
export const ThemeColorSchema = z.enum([
  'neutral',
  'amber',
  'blue',
  'cyan',
  'emerald',
  'fuchsia',
  'green',
  'indigo',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'rose',
  'sky',
  'teal',
  'violet',
  'yellow',
])

// Icon library
export const IconLibrarySchema = z.enum(['lucide', 'tabler', 'hugeicons', 'phosphor'])

// Font
export const FontSchema = z.enum([
  'inter',
  'noto-sans',
  'nunito-sans',
  'figtree',
  'roboto',
  'raleway',
  'dm-sans',
  'public-sans',
  'outfit',
  'jetbrains-mono',
])

// Menu accent
export const MenuAccentSchema = z.enum(['subtle', 'bold'])

// Menu color
export const MenuColorSchema = z.enum(['default', 'inverted'])

// Border radius
export const RadiusSchema = z.enum(['default', 'none', 'small', 'medium', 'large'])

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

// Optional apps (monorepo only)
export const OptionalAppSchema = z.enum(['design-system', 'mobile', 'admin'])

// Design system configuration (shadcn v4)
export const DesignSystemConfigSchema = z.object({
  componentLibrary: ComponentLibrarySchema,
  style: ShadcnStyleSchema,
  baseColor: BaseColorSchema,
  themeColor: ThemeColorSchema,
  iconLibrary: IconLibrarySchema,
  font: FontSchema,
  menuAccent: MenuAccentSchema,
  menuColor: MenuColorSchema,
  radius: RadiusSchema,
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
  payments: PaymentProviderSchema,
  payloadStorage: PayloadStorageProviderSchema.optional(),
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

  // Optional apps (monorepo only)
  optionalApps: z.array(OptionalAppSchema),

  // Setup options
  packageManager: PackageManagerSchema,
})

// CLI input (what user provides, before defaults are applied)
export const CLIInputSchema = z.object({
  projectName: z.string().optional(),
  structure: ProjectStructureSchema.optional(),
  marketingSite: MarketingSiteSchema.optional(),
  // shadcn v4 options
  componentLibrary: ComponentLibrarySchema.optional(),
  style: ShadcnStyleSchema.optional(),
  baseColor: BaseColorSchema.optional(),
  themeColor: ThemeColorSchema.optional(),
  iconLibrary: IconLibrarySchema.optional(),
  font: FontSchema.optional(),
  menuAccent: MenuAccentSchema.optional(),
  menuColor: MenuColorSchema.optional(),
  radius: RadiusSchema.optional(),
  // Auth
  authProviders: z.array(AuthProviderSchema).optional(),
  organizations: z.boolean().optional(),
  // Integrations
  analytics: AnalyticsProviderSchema.optional(),
  uploads: UploadsProviderSchema.optional(),
  payments: PaymentProviderSchema.optional(),
  payloadStorage: PayloadStorageProviderSchema.optional(),
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
    componentLibrary: 'base',
    style: 'nova',
    baseColor: 'neutral',
    themeColor: 'neutral',
    iconLibrary: 'hugeicons',
    font: 'inter',
    menuAccent: 'subtle',
    menuColor: 'default',
    radius: 'default',
  },
  auth: {
    providers: ['github', 'google'],
    organizations: false,
  },
  integrations: {
    analytics: 'none',
    uploads: 'none',
    payments: 'none',
  },
  addons: [],
  optionalApps: [],
  packageManager: 'pnpm',
}
