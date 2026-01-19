import * as p from '@clack/prompts'
import pc from 'picocolors'
import ora from 'ora'
import fs from 'fs-extra'
import path from 'path'
import { execSync } from 'child_process'
import { execa } from 'execa'
import type { ProjectConfig, VirtualNode } from 'kofi-stack-types'
import { generateVirtualProject } from 'kofi-stack-template-generator'

interface GenerateOptions {
  skipPrompts?: boolean
}

function generateSecret(): string {
  try {
    return execSync('openssl rand -base64 32', { encoding: 'utf-8' }).trim()
  } catch {
    // Fallback to Node.js crypto if openssl is not available
    const crypto = require('crypto')
    return crypto.randomBytes(32).toString('base64')
  }
}

/**
 * Get the shadcn base color from user configuration
 * Maps our config values to shadcn's accepted values
 */
function getShadcnBaseColor(config: ProjectConfig): string {
  // shadcn accepts: neutral, gray, zinc, stone, slate
  const baseColor = config.shadcn?.baseColor || 'neutral'
  const validColors = ['neutral', 'gray', 'zinc', 'stone', 'slate']
  return validColors.includes(baseColor) ? baseColor : 'neutral'
}

/**
 * Build shadcn preset URL with all user configuration options
 * Used with `shadcn create --preset <url>` for standalone projects
 */
function buildShadcnPresetUrl(config: ProjectConfig): string {
  const shadcn = config.shadcn || {}
  const params = new URLSearchParams({
    base: shadcn.componentLibrary || 'base',
    style: shadcn.style || 'nova',
    baseColor: shadcn.baseColor || 'neutral',
    theme: shadcn.themeColor || 'neutral',
    iconLibrary: shadcn.iconLibrary || 'hugeicons',
    font: shadcn.font || 'inter',
    menuAccent: shadcn.menuAccent || 'subtle',
    menuColor: shadcn.menuColor || 'default',
    radius: shadcn.radius || 'default',
    template: 'next',
  })
  return `https://ui.shadcn.com/init?${params.toString()}`
}

async function updateEnvWithSecrets(envPath: string, secrets: Record<string, string>): Promise<void> {
  if (!await fs.pathExists(envPath)) {
    return
  }

  let content = await fs.readFile(envPath, 'utf-8')

  for (const [key, value] of Object.entries(secrets)) {
    // Replace empty value with generated secret
    // Matches: KEY=, KEY="", KEY=''
    const regex = new RegExp(`^(${key}=)(?:""|'')?$`, 'm')
    content = content.replace(regex, `$1"${value}"`)
  }

  await fs.writeFile(envPath, content, 'utf-8')
}

export async function generateProject(config: ProjectConfig, options: GenerateOptions = {}): Promise<void> {
  const { skipPrompts = false } = options
  const spinner = ora()

  // Check if directory already exists
  if (await fs.pathExists(config.targetDir)) {
    p.cancel(`Directory ${config.projectName} already exists`)
    process.exit(1)
  }

  console.log()
  p.log.info(`Creating project in ${pc.cyan(config.targetDir)}`)
  console.log()

  try {
    // Get shadcn base color from user configuration (for monorepo init)
    const baseColor = getShadcnBaseColor(config)
    // Build full preset URL (for standalone create)
    const presetUrl = buildShadcnPresetUrl(config)

    // For standalone: Use shadcn create to scaffold the base project
    // For monorepo: We need a different approach
    if (config.structure === 'standalone') {
      // Step 1: Create base project with shadcn create using preset URL
      // Note: shadcn create may fail at dependency install due to pnpm-workspace.yaml issue
      // but the project structure will be created successfully
      spinner.start('Creating project with shadcn/ui...')
      try {
        await execa('pnpm', ['dlx', 'shadcn@latest', 'create', config.projectName, '--preset', presetUrl], {
          cwd: path.dirname(config.targetDir),
          stdio: 'pipe',
        })
        spinner.succeed('Base project created with shadcn/ui')
      } catch {
        // shadcn create often fails at pnpm add step due to workspace detection
        // but the project structure is usually created, so we continue
        if (await fs.pathExists(config.targetDir)) {
          spinner.succeed('Base project created with shadcn/ui')
        } else {
          spinner.fail('Failed to create project with shadcn')
          throw new Error('shadcn create failed and project directory was not created')
        }
      }

      // Step 2: Remove pnpm-workspace.yaml if it was created (causes issues)
      const workspaceFile = path.join(config.targetDir, 'pnpm-workspace.yaml')
      if (await fs.pathExists(workspaceFile)) {
        await fs.remove(workspaceFile)
      }

      // Step 3: Generate and overlay our custom files (Convex, auth, etc.)
      spinner.start('Adding Convex and authentication...')
      const result = await generateVirtualProject(config)

      if (!result.success) {
        spinner.fail('Failed to generate project files')
        console.error(pc.red('Errors:'), result.errors?.join('\n'))
        process.exit(1)
      }

      // Write our files on top, skipping files shadcn already created
      await writeNodeToDisk(result.tree.root, config.targetDir, {
        skipExisting: ['src/app/globals.css', 'tailwind.config.ts', 'components.json', 'next.config.ts', 'postcss.config.mjs']
      })
      spinner.succeed('Convex and authentication added')

      // Step 4: Merge package.json dependencies
      spinner.start('Merging dependencies...')
      await mergePackageJson(config.targetDir, result.tree.root)
      spinner.succeed('Dependencies merged')

    } else {
      // Monorepo: Generate our structure first, then init shadcn in apps/web
      spinner.start('Generating project files...')
      const result = await generateVirtualProject(config)

      if (!result.success) {
        spinner.fail('Failed to generate project')
        console.error(pc.red('Errors:'), result.errors?.join('\n'))
        process.exit(1)
      }

      spinner.succeed('Project files generated')

      // Write virtual file tree to disk
      spinner.start('Writing files to disk...')
      await writeNodeToDisk(result.tree.root, config.targetDir)
      spinner.succeed('Files written to disk')
    }

    // Generate and update secrets in .env.local files
    spinner.start('Generating secrets...')
    const backendEnvPath =
      config.structure === 'monorepo'
        ? path.join(config.targetDir, 'packages/backend/.env.local')
        : path.join(config.targetDir, '.env.local')

    await updateEnvWithSecrets(backendEnvPath, {
      BETTER_AUTH_SECRET: generateSecret(),
    })

    // If Payload CMS selected, generate secrets for marketing app
    if (config.marketingSite === 'payload') {
      const marketingEnvPath = path.join(config.targetDir, 'apps/marketing/.env.local')
      await updateEnvWithSecrets(marketingEnvPath, {
        PAYLOAD_SECRET: generateSecret(),
        CRON_SECRET: generateSecret(),
        PREVIEW_SECRET: generateSecret(),
      })
    }
    spinner.succeed('Secrets generated')

    // Initialize git
    spinner.start('Initializing git repository...')
    try {
      await execa('git', ['init'], { cwd: config.targetDir })
      await execa('git', ['add', '.'], { cwd: config.targetDir })
      spinner.succeed('Git repository initialized')
    } catch {
      spinner.warn('Failed to initialize git repository')
    }

    // Install dependencies (for standalone, reinstall to get our added deps)
    spinner.start('Installing dependencies...')
    try {
      await execa('pnpm', ['install'], { cwd: config.targetDir, stdio: 'pipe' })
      spinner.succeed('Dependencies installed')
    } catch {
      spinner.warn('Failed to install dependencies. Run pnpm install manually.')
    }

    // Install shadcn components
    const shadcnDir = config.structure === 'monorepo'
      ? path.join(config.targetDir, 'apps/web')
      : config.targetDir

    // For monorepo: Skip shadcn init entirely
    // All apps (web, marketing) have complete themed CSS templates with:
    // - globals.css.hbs with theme color conditionals for all 18 shadcn colors
    // - components.json.hbs with proper style, baseColor, and iconLibrary settings
    // Running shadcn init would overwrite these templated files with defaults
    if (config.structure === 'monorepo') {
      // Templates already include properly configured globals.css and components.json
      // Just log that we're using the templated configuration
      p.log.info('Using themed shadcn/ui configuration from templates')
    }

    // Install all shadcn components
    spinner.start('Installing shadcn/ui components...')
    try {
      await execa('pnpm', ['dlx', 'shadcn@latest', 'add', '--all', '--yes'], {
        cwd: shadcnDir,
        stdio: 'pipe',
      })
      spinner.succeed('shadcn/ui components installed')
    } catch {
      spinner.warn('Failed to install shadcn/ui components. Run: pnpm dlx shadcn@latest add --all')
    }

    // Ask user if they want to set up Convex now (skip if -y flag)
    if (!skipPrompts) {
      console.log()
      const setupConvex = await p.confirm({
        message: 'Would you like to set up Convex now?',
        initialValue: true,
      })

      if (p.isCancel(setupConvex)) {
        p.cancel('Setup cancelled')
        process.exit(0)
      }

      if (setupConvex) {
        console.log()
        p.log.info('Starting Convex setup...')
        p.log.message(pc.dim('This will open your browser to authenticate with Convex'))
        console.log()

        try {
          // Run dev:setup - works for both monorepo and standalone
          await execa('pnpm', ['dev:setup'], {
            cwd: config.targetDir,
            stdio: 'inherit',
          })
          console.log()
          p.log.success('Convex configured successfully!')

          // After Convex setup, ask about Resend
          await setupResend(config, backendEnvPath)

          // If Payload selected, set up Payload
          if (config.marketingSite === 'payload') {
            await setupPayload(config)
          }
        } catch {
          console.log()
          p.log.warn('Convex setup was interrupted. Run pnpm dev:setup to try again.')
        }
      } else {
        console.log()
        p.log.info(`Run ${pc.cyan('pnpm dev:setup')} when you're ready to configure Convex`)
      }

      // Ask user if they want to open in IDE
      console.log()
      const openInIDE = await p.confirm({
        message: 'Would you like to open the project in VS Code?',
        initialValue: true,
      })

      if (!p.isCancel(openInIDE) && openInIDE) {
        try {
          await execa('code', [config.targetDir], { stdio: 'pipe' })
          p.log.success('Opened in VS Code')
        } catch {
          p.log.warn('Could not open VS Code. Make sure "code" command is in your PATH.')
        }
      }
    } else {
      // When using -y flag, just show instructions
      console.log()
      p.log.info(`Run ${pc.cyan('pnpm dev:setup')} to configure Convex`)
    }

    // Final success message with cd command
    console.log()
    p.log.success(`Project ${pc.cyan(config.projectName)} created successfully!`)
    console.log()
    p.log.message(`${pc.dim('To get started:')}`)
    p.log.message(`  ${pc.cyan(`cd ${config.projectName}`)}`)
    p.log.message(`  ${pc.cyan('pnpm dev')}`)
    console.log()

  } catch (error) {
    spinner.fail('An error occurred during project generation')
    throw error
  }
}

async function setupResend(config: ProjectConfig, backendEnvPath: string): Promise<void> {
  console.log()
  const setupResendNow = await p.confirm({
    message: 'Would you like to set up Resend email now?',
    initialValue: false,
  })

  if (p.isCancel(setupResendNow) || !setupResendNow) {
    return
  }

  console.log()
  p.log.info(pc.dim('Get your Resend credentials at https://resend.com'))
  console.log()

  const domain = await p.text({
    message: 'Verified domain name (from https://resend.com/domains):',
    placeholder: 'example.com',
    validate: (value) => {
      if (!value) return 'Domain is required'
      return undefined
    },
  })

  if (p.isCancel(domain)) return

  const fromEmail = await p.text({
    message: 'Sending email address:',
    placeholder: `noreply@${domain}`,
    defaultValue: `noreply@${domain}`,
    validate: (value) => {
      if (!value) return 'Email is required'
      if (!value.includes('@')) return 'Invalid email format'
      return undefined
    },
  })

  if (p.isCancel(fromEmail)) return

  const apiKey = await p.password({
    message: 'Resend API key (from https://resend.com/api-keys):',
    validate: (value) => {
      if (!value) return 'API key is required'
      if (!value.startsWith('re_')) return 'Invalid Resend API key format'
      return undefined
    },
  })

  if (p.isCancel(apiKey)) return

  // Update backend .env.local with Resend credentials
  await updateEnvWithSecrets(backendEnvPath, {
    RESEND_API_KEY: apiKey as string,
    RESEND_FROM_EMAIL: fromEmail as string,
  })

  // If Payload CMS is selected, also copy Resend credentials to marketing app
  if (config.marketingSite === 'payload') {
    const marketingEnvPath = path.join(config.targetDir, 'apps/marketing/.env.local')
    await updateEnvWithSecrets(marketingEnvPath, {
      RESEND_API_KEY: apiKey as string,
      RESEND_FROM_EMAIL: fromEmail as string,
    })
  }

  p.log.success('Resend configured successfully!')
}

async function setupPayload(config: ProjectConfig): Promise<void> {
  console.log()
  const setupPayloadNow = await p.confirm({
    message: 'Would you like to set up Payload CMS now?',
    initialValue: true,
  })

  if (p.isCancel(setupPayloadNow) || !setupPayloadNow) {
    console.log()
    p.log.info(pc.dim('Run the following when ready:'))
    p.log.message(`  ${pc.cyan('1. Add DATABASE_URL to apps/marketing/.env.local')}`)
    p.log.message(`  ${pc.cyan('2. pnpm --filter @repo/marketing payload migrate')}`)
    return
  }

  console.log()
  p.log.info(pc.dim('Payload CMS requires a PostgreSQL database.'))
  p.log.message(pc.dim('You can get a free database at:'))
  p.log.message(pc.dim('  - https://neon.tech'))
  p.log.message(pc.dim('  - https://supabase.com'))
  p.log.message(pc.dim('  - https://railway.app'))
  console.log()

  const databaseUrl = await p.text({
    message: 'PostgreSQL DATABASE_URL:',
    placeholder: 'postgresql://user:password@host:5432/database',
    validate: (value) => {
      if (!value) return 'DATABASE_URL is required'
      if (!value.startsWith('postgresql://') && !value.startsWith('postgres://')) {
        return 'Invalid PostgreSQL connection string'
      }
      return undefined
    },
  })

  if (p.isCancel(databaseUrl)) return

  // Update marketing app .env.local with DATABASE_URL
  const marketingEnvPath = path.join(config.targetDir, 'apps/marketing/.env.local')
  await updateEnvWithSecrets(marketingEnvPath, {
    DATABASE_URL: databaseUrl as string,
  })

  // Run Payload migrations
  const spinner = ora('Running Payload migrations...').start()
  try {
    await execa('pnpm', ['--filter', '@repo/marketing', 'payload', 'migrate'], {
      cwd: config.targetDir,
      stdio: 'pipe',
    })
    spinner.succeed('Payload migrations completed')
  } catch {
    spinner.warn('Failed to run migrations. Run pnpm --filter @repo/marketing payload migrate manually.')
  }

  p.log.success('Payload CMS configured successfully!')
}

interface WriteOptions {
  skipExisting?: string[]
  basePath?: string
}

async function writeNodeToDisk(node: VirtualNode, targetDir: string, options: WriteOptions = {}): Promise<void> {
  const { skipExisting = [], basePath = '' } = options

  if (node.type === 'file') {
    // Check if this file should be skipped
    const relativePath = basePath ? `${basePath}/${node.name}` : node.name
    if (skipExisting.includes(relativePath)) {
      return
    }

    // Write file
    const filePath = path.join(targetDir, node.name)
    await fs.ensureDir(path.dirname(filePath))
    if (Buffer.isBuffer(node.content)) {
      await fs.writeFile(filePath, node.content)
    } else {
      await fs.writeFile(filePath, node.content, 'utf-8')
    }
  } else {
    // Create directory and write children
    await fs.ensureDir(targetDir)
    for (const child of node.children) {
      const childRelativePath = basePath ? `${basePath}/${child.name}` : child.name

      if (child.type === 'file') {
        // Check if this file should be skipped
        if (skipExisting.includes(childRelativePath)) {
          continue
        }

        const filePath = path.join(targetDir, child.name)
        await fs.ensureDir(path.dirname(filePath))
        if (Buffer.isBuffer(child.content)) {
          await fs.writeFile(filePath, child.content)
        } else {
          await fs.writeFile(filePath, child.content, 'utf-8')
        }
      } else {
        // Recurse into subdirectory
        await writeNodeToDisk(child, path.join(targetDir, child.name), {
          skipExisting,
          basePath: childRelativePath
        })
      }
    }
  }
}

/**
 * Merge our generated package.json dependencies into the shadcn-created package.json
 */
async function mergePackageJson(targetDir: string, virtualRoot: VirtualNode): Promise<void> {
  const packageJsonPath = path.join(targetDir, 'package.json')

  // Read existing package.json (created by shadcn)
  const existingPkg = await fs.readJson(packageJsonPath)

  // Find our generated package.json in the virtual tree
  let ourPkgContent: string | undefined
  if (virtualRoot.type === 'directory') {
    const pkgFile = virtualRoot.children.find(c => c.name === 'package.json')
    if (pkgFile?.type === 'file' && typeof pkgFile.content === 'string') {
      ourPkgContent = pkgFile.content
    }
  }

  if (!ourPkgContent) return

  const ourPkg = JSON.parse(ourPkgContent)

  // Merge dependencies
  existingPkg.dependencies = {
    ...existingPkg.dependencies,
    ...ourPkg.dependencies,
  }

  // Merge devDependencies
  existingPkg.devDependencies = {
    ...existingPkg.devDependencies,
    ...ourPkg.devDependencies,
  }

  // Merge scripts (our scripts take precedence)
  existingPkg.scripts = {
    ...existingPkg.scripts,
    ...ourPkg.scripts,
  }

  // Write merged package.json
  await fs.writeJson(packageJsonPath, existingPkg, { spaces: 2 })
}
