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

      // Optional apps (monorepo only)
      if (config.optionalApps?.includes('design-system')) {
        await processDesignSystemTemplates(vfs, config)
      }
      if (config.optionalApps?.includes('mobile')) {
        await processMobileTemplates(vfs, config)
      }
      if (config.optionalApps?.includes('admin')) {
        await processAdminTemplates(vfs, config)
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
    } else if (filename.endsWith('.hbs')) {
      // Only process .hbs files through Handlebars
      const processedContent = processTemplateString(content, config)
      // Skip writing empty files (can happen with conditional templates)
      if (processedContent.trim()) {
        vfs.writeFile(finalPath, processedContent)
      }
    } else {
      // For non-template files, copy content directly without Handlebars processing
      vfs.writeFile(finalPath, content)
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

async function processDesignSystemTemplates(
  vfs: VirtualFileSystem,
  config: ProjectConfig
): Promise<void> {
  processTemplatesFromPrefix(vfs, 'design-system/', '/apps/design-system', config)
}

async function processMobileTemplates(
  vfs: VirtualFileSystem,
  config: ProjectConfig
): Promise<void> {
  processTemplatesFromPrefix(vfs, 'mobile/', '/apps/mobile', config)
}

async function processAdminTemplates(
  vfs: VirtualFileSystem,
  config: ProjectConfig
): Promise<void> {
  processTemplatesFromPrefix(vfs, 'admin/', '/apps/admin', config)
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
  const backendDir = isMonorepo ? 'packages/backend' : '.'

  // Build dynamic ports array based on config
  const ports = [3000, 3001] // marketing, web
  if (config.optionalApps?.includes('design-system')) ports.push(3002)
  if (config.optionalApps?.includes('admin')) ports.push(3003)

  const devScript = `#!/usr/bin/env node
/**
 * Dev Script - Starts Next.js and Convex dev servers
 */

import { spawn, execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const webAppDir = resolve(rootDir, '${webAppDir}')
const backendDir = resolve(rootDir, '${backendDir}')

// Kill process on a given port
function killPort(port) {
  try {
    const platform = process.platform
    if (platform === 'darwin' || platform === 'linux') {
      execSync(\`lsof -ti:\${port} | xargs kill -9 2>/dev/null || true\`, { stdio: 'ignore' })
    } else if (platform === 'win32') {
      execSync(\`for /f "tokens=5" %a in ('netstat -ano ^| findstr :\${port} ^| findstr LISTENING') do taskkill /F /PID %a 2>nul\`, { stdio: 'ignore', shell: 'cmd' })
    }
  } catch (e) {
    // Port not in use or already free
  }
}

// Free up app ports before starting
const APP_PORTS = [${ports.join(', ')}]
console.log('Freeing ports...')
APP_PORTS.forEach(killPort)
console.log('')

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

function syncEnvToWebApp() {
  // In monorepo, Convex creates .env.local in backend package
  // Web app needs NEXT_PUBLIC_CONVEX_URL and NEXT_PUBLIC_CONVEX_SITE_URL
  const backendEnv = loadEnvFile(backendDir)
  const webEnvPath = resolve(webAppDir, '.env.local')

  if (backendEnv.NEXT_PUBLIC_CONVEX_URL) {
    const webEnv = loadEnvFile(webAppDir)
    // Derive site URL from cloud URL (.convex.cloud -> .convex.site)
    const convexSiteUrl = backendEnv.NEXT_PUBLIC_CONVEX_URL.replace('.convex.cloud', '.convex.site')

    // Check if sync is needed
    const needsSync = webEnv.NEXT_PUBLIC_CONVEX_URL !== backendEnv.NEXT_PUBLIC_CONVEX_URL ||
                      webEnv.NEXT_PUBLIC_CONVEX_SITE_URL !== convexSiteUrl

    if (needsSync) {
      let content = ''
      if (existsSync(webEnvPath)) {
        content = readFileSync(webEnvPath, 'utf-8')
        // Remove existing lines
        content = content.split('\\n')
          .filter(line => !line.startsWith('NEXT_PUBLIC_CONVEX_URL=') && !line.startsWith('NEXT_PUBLIC_CONVEX_SITE_URL='))
          .join('\\n')
        if (content && !content.endsWith('\\n')) content += '\\n'
      }
      content += \`NEXT_PUBLIC_CONVEX_URL=\${backendEnv.NEXT_PUBLIC_CONVEX_URL}\\n\`
      content += \`NEXT_PUBLIC_CONVEX_SITE_URL=\${convexSiteUrl}\\n\`
      writeFileSync(webEnvPath, content)
      console.log('✓ Synced Convex URLs to web app\\n')
    }
  }

  return backendEnv
}

async function checkAndInstall() {
  if (!existsSync(resolve(rootDir, 'node_modules'))) {
    console.log('📦 Installing dependencies...\\n')
    execSync('pnpm install', { cwd: rootDir, stdio: 'inherit' })
  }
}

function syncEnvToConvex(envVars) {
  // Sync required env vars to Convex cloud (only if not already synced)
  const requiredVars = ['BETTER_AUTH_SECRET', 'SITE_URL']
  let needsSync = false

  // Check if env vars need syncing by trying to list them
  try {
    const result = execSync('npx convex env list', { cwd: backendDir, stdio: 'pipe' }).toString()
    for (const varName of requiredVars) {
      if (envVars[varName] && !result.includes(varName + '=')) {
        needsSync = true
        break
      }
    }
  } catch {
    needsSync = true
  }

  if (needsSync) {
    console.log('📤 Syncing environment variables to Convex cloud...\\n')
    for (const varName of requiredVars) {
      if (envVars[varName]) {
        try {
          execSync(\`npx convex env set \${varName} "\${envVars[varName]}"\`, {
            cwd: backendDir,
            stdio: 'pipe'
          })
          console.log(\`   ✓ \${varName}\\n\`)
        } catch (error) {
          console.warn(\`   ⚠️  Could not set \${varName}\\n\`)
        }
      }
    }
  }
}

function startDevServers() {
  ${isMonorepo ? 'const backendEnv = syncEnvToWebApp()' : 'const backendEnv = loadEnvFile(webAppDir)'}

  if (!backendEnv.CONVEX_DEPLOYMENT) {
    console.log('⚠️  Convex not configured. Run: pnpm dev:setup\\n')
    console.log('Starting Next.js only...\\n')
    spawn('pnpm', ['${isMonorepo ? 'dev:web' : 'dev:next'}'], {
      cwd: rootDir, stdio: 'inherit', shell: true
    })
    return
  }

  // Sync env vars to Convex cloud if needed
  syncEnvToConvex(backendEnv)

  console.log('🚀 Starting development servers...\\n')
  spawn('pnpm', ['${isMonorepo ? 'dev:all' : 'dev:next'}'], {
    cwd: rootDir, stdio: 'inherit', shell: true
  })${isMonorepo ? '' : `

  const convexProcess = spawn('npx', ['convex', 'dev'], {
    cwd: webAppDir, stdio: 'inherit', shell: true
  })

  process.on('SIGINT', () => {
    convexProcess.kill()
    process.exit(0)
  })
  process.on('SIGTERM', () => {
    convexProcess.kill()
    process.exit(0)
  })`}
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
  const isMonorepo = config.structure === 'monorepo'
  const backendDir = isMonorepo ? '../packages/backend' : '.'

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
const backendDir = resolve(projectDir, '${backendDir}')

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

function syncEnvToConvex(envVars) {
  // Required env vars that Better Auth needs in Convex cloud
  const requiredVars = ['BETTER_AUTH_SECRET', 'SITE_URL']

  for (const varName of requiredVars) {
    if (envVars[varName]) {
      try {
        console.log(\`   Setting \${varName} in Convex...\`)
        execSync(\`npx convex env set \${varName} "\${envVars[varName]}"\`, {
          cwd: backendDir,
          stdio: 'pipe'
        })
      } catch (error) {
        console.warn(\`   ⚠️  Could not set \${varName}: \${error.message}\`)
      }
    }
  }

  // Optional OAuth env vars - only sync if they have values
  const optionalVars = [
    'GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET',
    'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET',
    'RESEND_API_KEY', 'RESEND_FROM_EMAIL'
  ]

  for (const varName of optionalVars) {
    if (envVars[varName]) {
      try {
        execSync(\`npx convex env set \${varName} "\${envVars[varName]}"\`, {
          cwd: backendDir,
          stdio: 'pipe'
        })
      } catch (error) {
        // Silent fail for optional vars
      }
    }
  }
}

async function main() {
  console.log('\\n🔧 Convex Setup Wizard\\n')

  // Check if already configured
  const envPath = resolve(backendDir, '.env.local')
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, 'utf-8')
    if (content.includes('CONVEX_DEPLOYMENT=') && !content.includes('CONVEX_DEPLOYMENT=\\n')) {
      console.log('✅ Convex deployment already configured!')

      // Sync env vars even if deployment exists
      console.log('\\n📤 Syncing environment variables to Convex cloud...')
      const envVars = loadEnvFile(backendDir)
      syncEnvToConvex(envVars)

      console.log('\\n✅ Setup complete!')
      console.log('   Run "pnpm dev" to start development.\\n')
      return
    }
  }

  console.log('This wizard will help you set up Convex for your project.\\n')

  // Run convex dev to trigger authentication and project creation
  console.log('Running Convex setup (this will open your browser if needed)...\\n')

  try {
    spawnSync('npx', ['convex', 'dev', '--once'], {
      cwd: backendDir,
      stdio: 'inherit',
      shell: true
    })

    // After setup, sync env vars to Convex cloud
    console.log('\\n📤 Syncing environment variables to Convex cloud...')
    const envVars = loadEnvFile(backendDir)
    syncEnvToConvex(envVars)

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
