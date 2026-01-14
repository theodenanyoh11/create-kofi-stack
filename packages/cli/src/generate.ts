import * as p from '@clack/prompts'
import pc from 'picocolors'
import ora from 'ora'
import fs from 'fs-extra'
import path from 'path'
import { execSync } from 'child_process'
import { execa } from 'execa'
import type { ProjectConfig, VirtualFileTree, VirtualFile, VirtualDirectory, VirtualNode } from 'kofi-stack-types'
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
    // Generate virtual file tree
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

    // Install dependencies
    spinner.start('Installing dependencies...')
    try {
      await execa('pnpm', ['install'], { cwd: config.targetDir, stdio: 'pipe' })
      spinner.succeed('Dependencies installed')
    } catch {
      spinner.warn('Failed to install dependencies. Run pnpm install manually.')
    }

    // Run shadcn add --all in the web app directory
    const shadcnDir =
      config.structure === 'monorepo'
        ? path.join(config.targetDir, 'apps/web')
        : config.targetDir

    spinner.start('Installing shadcn/ui components...')
    try {
      await execa('pnpm', ['dlx', 'shadcn@latest', 'add', '--all', '-y'], {
        cwd: shadcnDir,
        stdio: 'pipe',
      })
      spinner.succeed('shadcn/ui components installed')
    } catch {
      spinner.warn('Failed to install shadcn/ui components. Run pnpm dlx shadcn@latest add --all manually.')
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

  // Update .env.local with Resend credentials
  await updateEnvWithSecrets(backendEnvPath, {
    RESEND_API_KEY: apiKey as string,
    RESEND_FROM_EMAIL: fromEmail as string,
  })

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

async function writeNodeToDisk(node: VirtualNode, targetDir: string): Promise<void> {
  if (node.type === 'file') {
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
      if (child.type === 'file') {
        const filePath = path.join(targetDir, child.name)
        await fs.ensureDir(path.dirname(filePath))
        if (Buffer.isBuffer(child.content)) {
          await fs.writeFile(filePath, child.content)
        } else {
          await fs.writeFile(filePath, child.content, 'utf-8')
        }
      } else {
        // Recurse into subdirectory
        await writeNodeToDisk(child, path.join(targetDir, child.name))
      }
    }
  }
}
