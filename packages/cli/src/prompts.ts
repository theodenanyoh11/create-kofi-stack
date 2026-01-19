import * as p from '@clack/prompts'
import pc from 'picocolors'
import path from 'path'
import type {
  ProjectConfig,
  ProjectStructure,
  MarketingSite,
  ComponentLibrary,
  ShadcnStyle,
  BaseColor,
  ThemeColor,
  IconLibrary,
  Font,
  MenuAccent,
  MenuColor,
  Radius,
  AnalyticsProvider,
  UploadsProvider,
  PayloadStorageProvider,
  PaymentProvider,
  Addon,
  OptionalApp,
} from 'kofi-stack-types'
import { DEFAULT_CONFIG } from 'kofi-stack-types'

interface CLIOptions {
  standalone?: boolean
  monorepo?: boolean
  marketing?: string
  analytics?: string
  uploads?: string
  payments?: string
  rateLimiting?: boolean
  monitoring?: boolean
  yes?: boolean
}

export async function runPrompts(
  projectNameArg: string | undefined,
  options: CLIOptions
): Promise<ProjectConfig> {
  // Parse project name from argument (could be a path or just a name)
  let projectName: string
  let targetDir: string

  if (projectNameArg) {
    if (path.isAbsolute(projectNameArg)) {
      // Full path provided
      targetDir = projectNameArg
      projectName = path.basename(projectNameArg)
    } else {
      // Just a name or relative path
      projectName = path.basename(projectNameArg)
      targetDir = path.resolve(process.cwd(), projectNameArg)
    }
  } else {
    projectName = 'my-kofi-app'
    targetDir = path.resolve(process.cwd(), projectName)
  }

  // If --yes flag, use defaults with project name
  if (options.yes) {
    return {
      ...DEFAULT_CONFIG,
      projectName,
      targetDir,
      structure: options.monorepo ? 'monorepo' : 'standalone',
      marketingSite: validateMarketingSite(options.marketing) || 'none',
      integrations: {
        analytics: validateAnalytics(options.analytics) || 'none',
        uploads: validateUploads(options.uploads) || 'convex-fs',
        payments: validatePayments(options.payments) || 'none',
      },
      addons: [
        ...(options.rateLimiting ? ['rate-limiting' as const] : []),
        ...(options.monitoring ? ['monitoring' as const] : []),
      ],
      optionalApps: [],
    }
  }

  // Interactive prompts
  const name =
    projectNameArg
      ? projectName
      : ((await p.text({
          message: 'What is your project name?',
          placeholder: 'my-kofi-app',
          defaultValue: 'my-kofi-app',
          validate: (value) => {
            if (!value) return 'Project name is required'
            if (!/^[a-z0-9-]+$/.test(value)) {
              return 'Project name must be lowercase letters, numbers, and hyphens only'
            }
            return undefined
          },
        })) as string)

  if (p.isCancel(name)) throw new Error('cancelled')

  // Update targetDir if user entered a different name
  if (!projectNameArg) {
    targetDir = path.resolve(process.cwd(), name)
  }

  const structure = (await p.select({
    message: 'What type of project structure?',
    options: [
      {
        value: 'standalone' as const,
        label: 'Standalone',
        hint: 'Single Next.js application',
      },
      {
        value: 'monorepo' as const,
        label: 'Monorepo',
        hint: 'Turborepo with apps and packages',
      },
    ],
    initialValue: options.monorepo ? 'monorepo' : 'standalone',
  })) as ProjectStructure

  if (p.isCancel(structure)) throw new Error('cancelled')

  let marketingSite: MarketingSite = 'none'
  if (structure === 'monorepo') {
    const marketingOptions: { value: MarketingSite; label: string; hint: string }[] = [
      { value: 'none', label: 'None', hint: 'Skip marketing site' },
      { value: 'nextjs', label: 'Next.js', hint: 'Simple marketing pages' },
      { value: 'astro', label: 'Astro', hint: 'Fast static marketing site' },
      { value: 'payload', label: 'Payload CMS', hint: 'Full CMS for content' },
    ]
    marketingSite = (await p.select({
      message: 'Add a marketing site?',
      options: marketingOptions,
      initialValue: 'none' as MarketingSite,
    })) as MarketingSite

    if (p.isCancel(marketingSite)) throw new Error('cancelled')
  }

  // Optional apps prompt (monorepo only)
  let optionalApps: OptionalApp[] = []
  if (structure === 'monorepo') {
    const optionalAppsOptions: { value: OptionalApp; label: string; hint: string }[] = [
      {
        value: 'design-system',
        label: 'Design System',
        hint: 'Color palette, typography, components showcase (port 3002)',
      },
      {
        value: 'mobile',
        label: 'Mobile App',
        hint: 'Expo React Native app scaffold',
      },
      {
        value: 'admin',
        label: 'Admin Dashboard',
        hint: 'User management, analytics, settings (port 3003)',
      },
    ]

    optionalApps = (await p.multiselect({
      message: 'Optional apps to include?',
      options: optionalAppsOptions,
      required: false,
    })) as OptionalApp[]

    if (p.isCancel(optionalApps)) throw new Error('cancelled')
  }

  // ============================================
  // shadcn UI v4 Design System Prompts
  // ============================================

  const componentLibraryOptions: { value: ComponentLibrary; label: string; hint: string }[] = [
    { value: 'base', label: 'Base UI', hint: 'Recommended - Headless, unstyled primitives' },
    { value: 'radix', label: 'Radix UI', hint: 'Full-featured accessible primitives' },
  ]
  const componentLibrary = (await p.select({
    message: 'Select a component library',
    options: componentLibraryOptions,
    initialValue: 'base' as ComponentLibrary,
  })) as ComponentLibrary

  if (p.isCancel(componentLibrary)) throw new Error('cancelled')

  const styleOptions: { value: ShadcnStyle; label: string; hint: string }[] = [
    { value: 'nova', label: 'Nova', hint: 'Modern, clean design' },
    { value: 'vega', label: 'Vega', hint: 'Bold, vibrant' },
    { value: 'maia', label: 'Maia', hint: 'Soft, organic' },
    { value: 'lyra', label: 'Lyra', hint: 'Minimal, refined' },
    { value: 'mira', label: 'Mira', hint: 'Elegant, classic' },
  ]
  const style = (await p.select({
    message: 'What style do you want?',
    options: styleOptions,
    initialValue: 'nova' as ShadcnStyle,
  })) as ShadcnStyle

  if (p.isCancel(style)) throw new Error('cancelled')

  const baseColorOptions: { value: BaseColor; label: string }[] = [
    { value: 'neutral', label: 'Neutral' },
    { value: 'stone', label: 'Stone' },
    { value: 'zinc', label: 'Zinc' },
    { value: 'gray', label: 'Gray' },
  ]
  const baseColor = (await p.select({
    message: 'Choose your base color',
    options: baseColorOptions,
    initialValue: 'neutral' as BaseColor,
  })) as BaseColor

  if (p.isCancel(baseColor)) throw new Error('cancelled')

  const themeColorOptions: { value: ThemeColor; label: string }[] = [
    { value: 'neutral', label: 'Neutral' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' },
    { value: 'amber', label: 'Amber' },
    { value: 'cyan', label: 'Cyan' },
    { value: 'emerald', label: 'Emerald' },
    { value: 'fuchsia', label: 'Fuchsia' },
    { value: 'indigo', label: 'Indigo' },
    { value: 'lime', label: 'Lime' },
    { value: 'pink', label: 'Pink' },
    { value: 'rose', label: 'Rose' },
    { value: 'sky', label: 'Sky' },
    { value: 'teal', label: 'Teal' },
    { value: 'violet', label: 'Violet' },
    { value: 'yellow', label: 'Yellow' },
  ]
  const themeColor = (await p.select({
    message: 'Choose your theme color',
    options: themeColorOptions,
    initialValue: 'neutral' as ThemeColor,
  })) as ThemeColor

  if (p.isCancel(themeColor)) throw new Error('cancelled')

  const iconLibraryOptions: { value: IconLibrary; label: string; hint: string }[] = [
    { value: 'hugeicons', label: 'HugeIcons', hint: 'Recommended - 4000+ icons' },
    { value: 'lucide', label: 'Lucide', hint: 'Popular, lightweight' },
    { value: 'tabler', label: 'Tabler Icons', hint: 'Free, open source' },
    { value: 'phosphor', label: 'Phosphor Icons', hint: 'Flexible, consistent' },
  ]
  const iconLibrary = (await p.select({
    message: 'Choose your icon library',
    options: iconLibraryOptions,
    initialValue: 'hugeicons' as IconLibrary,
  })) as IconLibrary

  if (p.isCancel(iconLibrary)) throw new Error('cancelled')

  const fontOptions: { value: Font; label: string; hint: string }[] = [
    { value: 'inter', label: 'Inter', hint: 'Recommended - Clean, modern' },
    { value: 'dm-sans', label: 'DM Sans', hint: 'Geometric, friendly' },
    { value: 'figtree', label: 'Figtree', hint: 'Playful, readable' },
    { value: 'outfit', label: 'Outfit', hint: 'Modern, versatile' },
    { value: 'public-sans', label: 'Public Sans', hint: 'Neutral, accessible' },
    { value: 'roboto', label: 'Roboto', hint: 'Classic, reliable' },
    { value: 'raleway', label: 'Raleway', hint: 'Elegant, stylish' },
    { value: 'noto-sans', label: 'Noto Sans', hint: 'Global, inclusive' },
    { value: 'nunito-sans', label: 'Nunito Sans', hint: 'Rounded, friendly' },
    { value: 'jetbrains-mono', label: 'JetBrains Mono', hint: 'Code-focused' },
  ]
  const font = (await p.select({
    message: 'Select your font',
    options: fontOptions,
    initialValue: 'inter' as Font,
  })) as Font

  if (p.isCancel(font)) throw new Error('cancelled')

  const menuAccentOptions: { value: MenuAccent; label: string; hint: string }[] = [
    { value: 'subtle', label: 'Subtle', hint: 'Muted accent colors' },
    { value: 'bold', label: 'Bold', hint: 'Strong accent colors' },
  ]
  const menuAccent = (await p.select({
    message: 'Menu accent',
    options: menuAccentOptions,
    initialValue: 'subtle' as MenuAccent,
  })) as MenuAccent

  if (p.isCancel(menuAccent)) throw new Error('cancelled')

  const menuColorOptions: { value: MenuColor; label: string; hint: string }[] = [
    { value: 'default', label: 'Default', hint: 'Standard colors' },
    { value: 'inverted', label: 'Inverted', hint: 'Dark sidebar' },
  ]
  const menuColor = (await p.select({
    message: 'Menu color',
    options: menuColorOptions,
    initialValue: 'default' as MenuColor,
  })) as MenuColor

  if (p.isCancel(menuColor)) throw new Error('cancelled')

  const radiusOptions: { value: Radius; label: string; hint?: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'none', label: 'None', hint: 'Sharp corners' },
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large', hint: 'Rounded corners' },
  ]
  const radius = (await p.select({
    message: 'Border radius',
    options: radiusOptions,
    initialValue: 'default' as Radius,
  })) as Radius

  if (p.isCancel(radius)) throw new Error('cancelled')

  // ============================================
  // Integrations Prompts
  // ============================================

  const analyticsOptions: { value: AnalyticsProvider; label: string; hint: string }[] = [
    { value: 'none', label: 'None', hint: 'Skip analytics' },
    { value: 'posthog', label: 'PostHog', hint: 'Product analytics' },
    { value: 'vercel', label: 'Vercel Analytics', hint: 'Simple analytics' },
  ]
  const analytics = (await p.select({
    message: 'Analytics provider?',
    options: analyticsOptions,
    initialValue: 'none' as AnalyticsProvider,
  })) as AnalyticsProvider

  if (p.isCancel(analytics)) throw new Error('cancelled')

  const uploadsOptions: { value: UploadsProvider; label: string; hint: string }[] = [
    { value: 'convex-fs', label: 'Convex FS', hint: 'Built-in Convex storage (Recommended)' },
    { value: 'r2', label: 'Cloudflare R2', hint: 'S3-compatible edge storage' },
    { value: 'uploadthing', label: 'UploadThing', hint: 'Easy file uploads' },
    { value: 's3', label: 'AWS S3', hint: 'S3-compatible storage' },
    { value: 'vercel-blob', label: 'Vercel Blob', hint: 'Vercel storage' },
    { value: 'none', label: 'None', hint: 'Skip file storage' },
  ]
  const uploads = (await p.select({
    message: 'Web app file storage?',
    options: uploadsOptions,
    initialValue: 'convex-fs' as UploadsProvider,
  })) as UploadsProvider

  if (p.isCancel(uploads)) throw new Error('cancelled')

  // Payload CMS storage (only if Payload is selected)
  let payloadStorage: PayloadStorageProvider | undefined = undefined
  if (marketingSite === 'payload') {
    const payloadStorageOptions: { value: PayloadStorageProvider; label: string; hint: string }[] = [
      { value: 'local', label: 'Local Filesystem', hint: 'Store files on server (Recommended for dev)' },
      { value: 's3', label: 'AWS S3', hint: 'S3-compatible storage' },
      { value: 'r2', label: 'Cloudflare R2', hint: 'S3-compatible edge storage' },
      { value: 'vercel-blob', label: 'Vercel Blob', hint: 'Vercel storage' },
      { value: 'gcs', label: 'Google Cloud Storage', hint: 'GCS bucket storage' },
    ]
    payloadStorage = (await p.select({
      message: 'Payload CMS file storage?',
      options: payloadStorageOptions,
      initialValue: 'local' as PayloadStorageProvider,
    })) as PayloadStorageProvider

    if (p.isCancel(payloadStorage)) throw new Error('cancelled')
  }

  const paymentsOptions: { value: PaymentProvider; label: string; hint: string }[] = [
    { value: 'none', label: 'None', hint: 'Skip payments' },
    { value: 'stripe', label: 'Stripe', hint: 'Full payment platform' },
    { value: 'polar', label: 'Polar', hint: 'Open source monetization' },
  ]
  const payments = (await p.select({
    message: 'Payment provider?',
    options: paymentsOptions,
    initialValue: 'none' as PaymentProvider,
  })) as PaymentProvider

  if (p.isCancel(payments)) throw new Error('cancelled')

  const addonsOptions: { value: Addon; label: string; hint: string }[] = [
    { value: 'rate-limiting', label: 'Rate Limiting', hint: 'Convex Rate Limiter (Recommended)' },
    { value: 'monitoring', label: 'Error Monitoring', hint: 'Sentry integration' },
  ]
  const addonsSelected = (await p.multiselect({
    message: 'Additional features?',
    options: addonsOptions,
    required: false,
  })) as Addon[]

  if (p.isCancel(addonsSelected)) throw new Error('cancelled')

  // Confirm selection
  console.log()
  p.note(
    [
      `${pc.cyan('Project:')} ${name}`,
      `${pc.cyan('Structure:')} ${structure}`,
      structure === 'monorepo' ? `${pc.cyan('Marketing:')} ${marketingSite}` : null,
      optionalApps.length > 0 ? `${pc.cyan('Optional Apps:')} ${optionalApps.join(', ')}` : null,
      '',
      pc.dim('─── Design System ───'),
      `${pc.cyan('Component Library:')} ${componentLibrary}`,
      `${pc.cyan('Style:')} ${style}`,
      `${pc.cyan('Base Color:')} ${baseColor}`,
      `${pc.cyan('Theme Color:')} ${themeColor}`,
      `${pc.cyan('Icon Library:')} ${iconLibrary}`,
      `${pc.cyan('Font:')} ${font}`,
      `${pc.cyan('Radius:')} ${radius}`,
      '',
      pc.dim('─── Integrations ───'),
      `${pc.cyan('Analytics:')} ${analytics}`,
      `${pc.cyan('Web Storage:')} ${uploads}`,
      payloadStorage ? `${pc.cyan('Payload Storage:')} ${payloadStorage}` : null,
      `${pc.cyan('Payments:')} ${payments}`,
      addonsSelected.length > 0
        ? `${pc.cyan('Addons:')} ${addonsSelected.join(', ')}`
        : null,
    ]
      .filter(Boolean)
      .join('\n'),
    'Configuration'
  )

  const confirmed = await p.confirm({
    message: 'Proceed with this configuration?',
    initialValue: true,
  })

  if (p.isCancel(confirmed) || !confirmed) throw new Error('cancelled')

  return {
    projectName: name,
    targetDir,
    structure,
    marketingSite,
    auth: {
      providers: ['github', 'google'],
      organizations: false,
    },
    shadcn: {
      componentLibrary,
      style,
      baseColor,
      themeColor,
      iconLibrary,
      font,
      menuAccent,
      menuColor,
      radius,
    },
    integrations: {
      analytics,
      uploads,
      payments,
      payloadStorage,
    },
    addons: addonsSelected,
    optionalApps,
    packageManager: 'pnpm',
  }
}

function validateMarketingSite(value?: string): 'none' | 'nextjs' | 'payload' | 'astro' | undefined {
  if (!value) return undefined
  if (['none', 'nextjs', 'payload', 'astro'].includes(value)) {
    return value as 'none' | 'nextjs' | 'payload' | 'astro'
  }
  return undefined
}

function validateAnalytics(value?: string): 'none' | 'posthog' | 'vercel' | undefined {
  if (!value) return undefined
  if (['none', 'posthog', 'vercel'].includes(value)) {
    return value as 'none' | 'posthog' | 'vercel'
  }
  return undefined
}

function validateUploads(value?: string): 'none' | 'convex-fs' | 'r2' | 'uploadthing' | 's3' | 'vercel-blob' | undefined {
  if (!value) return undefined
  if (['none', 'convex-fs', 'r2', 'uploadthing', 's3', 'vercel-blob'].includes(value)) {
    return value as 'none' | 'convex-fs' | 'r2' | 'uploadthing' | 's3' | 'vercel-blob'
  }
  return undefined
}

function validatePayments(value?: string): 'none' | 'stripe' | 'polar' | undefined {
  if (!value) return undefined
  if (['none', 'stripe', 'polar'].includes(value)) {
    return value as 'none' | 'stripe' | 'polar'
  }
  return undefined
}
