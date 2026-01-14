import * as p from '@clack/prompts'
import pc from 'picocolors'
import path from 'path'
import type { ProjectConfig } from 'kofi-stack-types'
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
        value: 'standalone',
        label: 'Standalone',
        hint: 'Single Next.js application',
      },
      {
        value: 'monorepo',
        label: 'Monorepo',
        hint: 'Turborepo with apps and packages',
      },
    ],
    initialValue: options.monorepo ? 'monorepo' : 'standalone',
  })) as 'standalone' | 'monorepo'

  if (p.isCancel(structure)) throw new Error('cancelled')

  let marketingSite: 'none' | 'nextjs' | 'payload' = 'none'
  if (structure === 'monorepo') {
    marketingSite = (await p.select({
      message: 'Add a marketing site?',
      options: [
        { value: 'none', label: 'None', hint: 'Skip marketing site' },
        { value: 'nextjs', label: 'Next.js', hint: 'Simple marketing pages' },
        { value: 'payload', label: 'Payload CMS', hint: 'Full CMS for content' },
      ],
      initialValue: 'none',
    })) as 'none' | 'nextjs' | 'payload'

    if (p.isCancel(marketingSite)) throw new Error('cancelled')
  }

  const baseColor = (await p.select({
    message: 'Base color for theme?',
    options: [
      { value: 'neutral', label: 'Neutral' },
      { value: 'slate', label: 'Slate' },
      { value: 'zinc', label: 'Zinc' },
      { value: 'stone', label: 'Stone' },
      { value: 'gray', label: 'Gray' },
    ],
    initialValue: 'neutral',
  })) as 'neutral' | 'slate' | 'zinc' | 'stone' | 'gray'

  if (p.isCancel(baseColor)) throw new Error('cancelled')

  const analytics = (await p.select({
    message: 'Analytics provider?',
    options: [
      { value: 'none', label: 'None', hint: 'Skip analytics' },
      { value: 'posthog', label: 'PostHog', hint: 'Product analytics' },
      { value: 'vercel', label: 'Vercel Analytics', hint: 'Simple analytics' },
    ],
    initialValue: 'none',
  })) as 'none' | 'posthog' | 'vercel'

  if (p.isCancel(analytics)) throw new Error('cancelled')

  const uploads = (await p.select({
    message: 'File storage provider?',
    options: [
      { value: 'convex-fs', label: 'Convex FS', hint: 'Built-in Convex storage (Recommended)' },
      { value: 'r2', label: 'Cloudflare R2', hint: 'S3-compatible edge storage' },
      { value: 'uploadthing', label: 'UploadThing', hint: 'Easy file uploads' },
      { value: 's3', label: 'AWS S3', hint: 'S3-compatible storage' },
      { value: 'vercel-blob', label: 'Vercel Blob', hint: 'Vercel storage' },
      { value: 'none', label: 'None', hint: 'Skip file storage' },
    ],
    initialValue: 'convex-fs',
  })) as 'none' | 'convex-fs' | 'r2' | 'uploadthing' | 's3' | 'vercel-blob'

  if (p.isCancel(uploads)) throw new Error('cancelled')

  const payments = (await p.select({
    message: 'Payment provider?',
    options: [
      { value: 'none', label: 'None', hint: 'Skip payments' },
      { value: 'stripe', label: 'Stripe', hint: 'Full payment platform' },
      { value: 'polar', label: 'Polar', hint: 'Open source monetization' },
    ],
    initialValue: 'none',
  })) as 'none' | 'stripe' | 'polar'

  if (p.isCancel(payments)) throw new Error('cancelled')

  const addonsSelected = (await p.multiselect({
    message: 'Additional features?',
    options: [
      {
        value: 'rate-limiting',
        label: 'Rate Limiting',
        hint: 'Convex Rate Limiter (Recommended)',
      },
      {
        value: 'monitoring',
        label: 'Error Monitoring',
        hint: 'Sentry integration',
      },
    ],
    required: false,
  })) as ('rate-limiting' | 'monitoring')[]

  if (p.isCancel(addonsSelected)) throw new Error('cancelled')

  // Confirm selection
  console.log()
  p.note(
    [
      `${pc.cyan('Project:')} ${name}`,
      `${pc.cyan('Structure:')} ${structure}`,
      structure === 'monorepo' ? `${pc.cyan('Marketing:')} ${marketingSite}` : null,
      `${pc.cyan('Base Color:')} ${baseColor}`,
      `${pc.cyan('Analytics:')} ${analytics}`,
      `${pc.cyan('Storage:')} ${uploads}`,
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
      baseColor,
      themeColor: 'zinc',
      menuAccent: 'muted',
      iconLibrary: 'lucide',
      headingFont: 'geist',
      bodyFont: 'geist',
      borderRadius: '0.5',
      spacingScale: 'default',
    },
    integrations: {
      analytics,
      uploads,
      payments,
    },
    addons: addonsSelected,
    packageManager: 'pnpm',
  }
}

function validateMarketingSite(value?: string): 'none' | 'nextjs' | 'payload' | undefined {
  if (!value) return undefined
  if (['none', 'nextjs', 'payload'].includes(value)) {
    return value as 'none' | 'nextjs' | 'payload'
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
