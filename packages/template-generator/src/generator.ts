import type {
  ProjectConfig,
  VirtualFileTree,
  GeneratorResult,
} from 'kofi-stack-types'
import { VirtualFileSystem } from './core/virtual-fs.js'
import {
  processTemplateString,
  transformFilename,
  isBinaryFile,
  shouldIncludeFile,
} from './core/template-processor.js'
import { EMBEDDED_TEMPLATES } from './templates.generated.js'
import path from 'path'

/**
 * Generate a virtual project based on the provided configuration.
 * Returns a VirtualFileTree that can be written to disk.
 */
export async function generateVirtualProject(
  config: ProjectConfig
): Promise<GeneratorResult> {
  const vfs = new VirtualFileSystem()
  const errors: string[] = []

  try {
    // Process templates in order
    await processBaseTemplates(vfs, config)
    await processWebAppTemplates(vfs, config)
    await processConvexTemplates(vfs, config)
    await processBetterAuthTemplates(vfs, config)

    if (config.structure === 'monorepo') {
      await processMonorepoTemplates(vfs, config)
      if (config.marketingSite === 'payload') {
        await processPayloadTemplates(vfs, config)
      } else if (config.marketingSite === 'nextjs') {
        await processMarketingTemplates(vfs, config)
      }
    }

    await processIntegrationTemplates(vfs, config)
    await processAddonTemplates(vfs, config)

    // Post-processing: Generate package.json, README, etc.
    await postProcess(vfs, config)

    const tree = vfs.toTree(config)

    return {
      tree,
      success: true,
    }
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error))
    return {
      tree: vfs.toTree(config),
      success: false,
      errors,
    }
  }
}

/**
 * Process templates from a given prefix path
 */
function processTemplatesFromPrefix(
  vfs: VirtualFileSystem,
  prefix: string,
  outputPrefix: string,
  config: ProjectConfig
): void {
  for (const [templatePath, content] of Object.entries(EMBEDDED_TEMPLATES)) {
    if (!templatePath.startsWith(prefix)) continue
    if (!shouldIncludeFile(templatePath, config)) continue

    // Calculate output path
    const relativePath = templatePath.slice(prefix.length)
    const outputPath = path.join(outputPrefix, relativePath)

    // Transform filename
    const dir = path.dirname(outputPath)
    const filename = path.basename(outputPath)
    const transformedFilename = transformFilename(filename, config)
    const finalPath = path.join(dir, transformedFilename)

    // Process content
    if (isBinaryFile(filename)) {
      // For binary files, we store the source path for later copying
      vfs.writeFile(finalPath, Buffer.from(content, 'base64'))
    } else {
      // Process as template
      const processedContent = processTemplateString(content, config)
      vfs.writeFile(finalPath, processedContent)
    }
  }
}

async function processBaseTemplates(
  vfs: VirtualFileSystem,
  config: ProjectConfig
): Promise<void> {
  processTemplatesFromPrefix(vfs, 'base/', '/', config)
}

async function processWebAppTemplates(
  vfs: VirtualFileSystem,
  config: ProjectConfig
): Promise<void> {
  const appPath = config.structure === 'monorepo' ? '/apps/web' : '/'
  processTemplatesFromPrefix(vfs, 'web/', appPath, config)
}

async function processConvexTemplates(
  vfs: VirtualFileSystem,
  config: ProjectConfig
): Promise<void> {
  const convexPath = config.structure === 'monorepo' ? '/packages/backend' : '/'
  processTemplatesFromPrefix(vfs, 'convex/', convexPath, config)
}

async function processBetterAuthTemplates(
  vfs: VirtualFileSystem,
  config: ProjectConfig
): Promise<void> {
  const webPath = config.structure === 'monorepo' ? '/apps/web' : '/'
  processTemplatesFromPrefix(vfs, 'auth/', webPath, config)
}

async function processMonorepoTemplates(
  vfs: VirtualFileSystem,
  config: ProjectConfig
): Promise<void> {
  processTemplatesFromPrefix(vfs, 'monorepo/', '/', config)
  processTemplatesFromPrefix(vfs, 'packages/ui/', '/packages/ui', config)
  processTemplatesFromPrefix(vfs, 'packages/config-typescript/', '/packages/config-typescript', config)
  processTemplatesFromPrefix(vfs, 'packages/config-biome/', '/packages/config-biome', config)
}

async function processPayloadTemplates(
  vfs: VirtualFileSystem,
  config: ProjectConfig
): Promise<void> {
  processTemplatesFromPrefix(vfs, 'marketing/payload/', '/apps/marketing', config)
}

async function processMarketingTemplates(
  vfs: VirtualFileSystem,
  config: ProjectConfig
): Promise<void> {
  processTemplatesFromPrefix(vfs, 'marketing/nextjs/', '/apps/marketing', config)
}

async function processIntegrationTemplates(
  vfs: VirtualFileSystem,
  config: ProjectConfig
): Promise<void> {
  const webPath = config.structure === 'monorepo' ? '/apps/web' : '/'

  if (config.integrations.analytics === 'posthog') {
    processTemplatesFromPrefix(vfs, 'integrations/posthog/', webPath, config)
  }
  if (config.integrations.analytics === 'vercel') {
    processTemplatesFromPrefix(vfs, 'integrations/vercel-analytics/', webPath, config)
  }
  if (config.integrations.uploads === 'uploadthing') {
    processTemplatesFromPrefix(vfs, 'integrations/uploadthing/', webPath, config)
  }
  if (config.integrations.uploads === 's3') {
    processTemplatesFromPrefix(vfs, 'integrations/s3/', webPath, config)
  }
  if (config.integrations.uploads === 'vercel-blob') {
    processTemplatesFromPrefix(vfs, 'integrations/vercel-blob/', webPath, config)
  }
}

async function processAddonTemplates(
  vfs: VirtualFileSystem,
  config: ProjectConfig
): Promise<void> {
  for (const addon of config.addons) {
    processTemplatesFromPrefix(vfs, `addons/${addon}/`, '/', config)
  }
}

async function postProcess(
  vfs: VirtualFileSystem,
  config: ProjectConfig
): Promise<void> {
  // Generate scripts directory with dev.mjs and setup scripts
  const scriptsPath = config.structure === 'monorepo' ? '/scripts' : '/scripts'
  const webScriptsPath = config.structure === 'monorepo' ? '/apps/web/scripts' : '/scripts'

  generateDevScript(vfs, scriptsPath, config)
  generateSetupConvexScript(vfs, webScriptsPath, config)

  // Generate README
  generateReadme(vfs, config)
}

function generateDevScript(
  vfs: VirtualFileSystem,
  scriptsPath: string,
  config: ProjectConfig
): void {
  const isMonorepo = config.structure === 'monorepo'
  const webAppDir = isMonorepo ? 'apps/web' : '.'

  const devScript = `#!/usr/bin/env node
/**
 * Dev Script - Starts Next.js and Convex dev servers
 */

import { spawn, execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const webAppDir = resolve(rootDir, '${webAppDir}')

function loadEnvFile(dir) {
  const envPath = resolve(dir, '.env.local')
  if (!existsSync(envPath)) return {}

  const content = readFileSync(envPath, 'utf-8')
  const env = {}

  for (const line of content.split('\\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIndex = trimmed.indexOf('=')
    if (eqIndex === -1) continue
    const key = trimmed.slice(0, eqIndex)
    let value = trimmed.slice(eqIndex + 1)
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    if (value) env[key] = value
  }
  return env
}

async function checkAndInstall() {
  if (!existsSync(resolve(rootDir, 'node_modules'))) {
    console.log('📦 Installing dependencies...\\n')
    execSync('pnpm install', { cwd: rootDir, stdio: 'inherit' })
  }
}

function startDevServers() {
  const localEnv = loadEnvFile(webAppDir)

  if (!localEnv.CONVEX_DEPLOYMENT) {
    console.log('⚠️  Convex not configured. Run: pnpm dev:setup\\n')
    console.log('Starting Next.js only...\\n')
    spawn('pnpm', ['${isMonorepo ? 'dev:turbo' : 'dev:next'}'], {
      cwd: rootDir, stdio: 'inherit', shell: true
    })
    return
  }

  console.log('🚀 Starting development servers...\\n')

  const nextProcess = spawn('pnpm', ['${isMonorepo ? 'dev:turbo' : 'dev:next'}'], {
    cwd: rootDir, stdio: 'inherit', shell: true
  })

  const convexProcess = spawn('npx', ['convex', 'dev'], {
    cwd: webAppDir, stdio: 'inherit', shell: true
  })

  const cleanup = () => {
    nextProcess.kill()
    convexProcess.kill()
    process.exit(0)
  }

  process.on('SIGINT', cleanup)
  process.on('SIGTERM', cleanup)
}

async function main() {
  await checkAndInstall()
  startDevServers()
}

main()
`

  vfs.writeFile(`${scriptsPath}/dev.mjs`, devScript)
}

function generateSetupConvexScript(
  vfs: VirtualFileSystem,
  scriptsPath: string,
  config: ProjectConfig
): void {
  const setupScript = `#!/usr/bin/env node
/**
 * Setup Convex - Interactive setup wizard for Convex
 */

import { execSync, spawnSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import * as readline from 'readline'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectDir = resolve(__dirname, '..')

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function main() {
  console.log('\\n🔧 Convex Setup Wizard\\n')

  // Check if already configured
  const envPath = resolve(projectDir, '.env.local')
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, 'utf-8')
    if (content.includes('CONVEX_DEPLOYMENT=') && !content.includes('CONVEX_DEPLOYMENT=\\n')) {
      console.log('✅ Convex is already configured!')
      console.log('   Run "pnpm dev" to start development.\\n')
      return
    }
  }

  console.log('This wizard will help you set up Convex for your project.\\n')

  // Run convex dev to trigger authentication and project creation
  console.log('Running Convex setup (this will open your browser if needed)...\\n')

  try {
    spawnSync('npx', ['convex', 'dev', '--once'], {
      cwd: projectDir,
      stdio: 'inherit',
      shell: true
    })

    console.log('\\n✅ Convex setup complete!')
    console.log('   Run "pnpm dev" to start development.\\n')
  } catch (error) {
    console.error('\\n❌ Convex setup failed:', error.message)
    console.error('   Try running "npx convex dev" manually.\\n')
    process.exit(1)
  }
}

main()
`

  vfs.writeFile(`${scriptsPath}/setup-convex.mjs`, setupScript)
}

function generateReadme(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const readme = `# ${config.projectName}

Built with [create-kofi-stack](https://github.com/theodenanyoh11/create-kofi-stack)

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Backend**: Convex (reactive backend-as-a-service)
- **Auth**: Better-Auth with Convex adapter
- **UI**: shadcn/ui (New York style)
- **Styling**: Tailwind CSS v4

## Getting Started

\`\`\`bash
cd ${config.projectName}
pnpm dev
\`\`\`

This will:
- Install dependencies (if needed)
- Set up Convex (if not configured)
- Start Next.js and Convex dev servers

## Project Structure

${config.structure === 'monorepo' ? `
\`\`\`
├── apps/
│   ├── web/          # Main Next.js application
│   ${config.marketingSite !== 'none' ? '├── marketing/    # Marketing site' : ''}
│   └── design-system/ # Component showcase
├── packages/
│   ├── backend/      # Convex functions
│   └── ui/           # Shared UI components
└── ...
\`\`\`
` : `
\`\`\`
├── src/
│   ├── app/          # Next.js App Router
│   ├── components/   # React components
│   └── lib/          # Utilities
├── convex/           # Convex functions
└── ...
\`\`\`
`}

## Documentation

- [Convex](https://docs.convex.dev)
- [Better-Auth](https://www.better-auth.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Next.js](https://nextjs.org/docs)
`

  vfs.writeFile('/README.md', readme)
}

export { VirtualFileSystem }
