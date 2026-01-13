#!/usr/bin/env node

import { Command } from 'commander'
import * as p from '@clack/prompts'
import pc from 'picocolors'
import gradient from 'gradient-string'
import { runPrompts } from './prompts.js'
import { generateProject } from './generate.js'
import { DEFAULT_CONFIG } from 'kofi-stack-types'

const VERSION = '2.0.0'

const kofiGradient = gradient(['#FF6B6B', '#4ECDC4', '#FFE66D'])

function displayBanner() {
  console.log()
  console.log(
    kofiGradient.multiline(`
    ██╗  ██╗ ██████╗ ███████╗██╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
    ██║ ██╔╝██╔═══██╗██╔════╝██║    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    █████╔╝ ██║   ██║█████╗  ██║    ███████╗   ██║   ███████║██║     █████╔╝
    ██╔═██╗ ██║   ██║██╔══╝  ██║    ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║  ██╗╚██████╔╝██║     ██║    ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
  `)
  )
  console.log()
  console.log(
    pc.dim(`  v${VERSION} - Scaffold full-stack projects with Next.js, Convex, Better-Auth`)
  )
  console.log()
}

const program = new Command()

program
  .name('create-kofi-stack')
  .description('Scaffold opinionated full-stack projects')
  .version(VERSION)
  .argument('[project-name]', 'Name of your project')
  .option('--standalone', 'Create standalone project (default)')
  .option('--monorepo', 'Create monorepo with Turborepo')
  .option('--marketing <type>', 'Marketing site type: none, nextjs, payload')
  .option('--analytics <type>', 'Analytics: none, posthog, vercel')
  .option('--uploads <type>', 'Upload provider: none, uploadthing, s3, vercel-blob')
  .option('--rate-limiting', 'Add rate limiting with Arcjet')
  .option('--monitoring', 'Add monitoring with Sentry')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .action(async (projectName, options) => {
    displayBanner()

    p.intro(pc.bgCyan(pc.black(' create-kofi-stack ')))

    try {
      // Get config from prompts or defaults
      const config = await runPrompts(projectName, options)

      // Generate the project
      await generateProject(config)

      // Display success message
      displaySuccessMessage(config.projectName)
    } catch (error) {
      if (error instanceof Error && error.message === 'cancelled') {
        p.cancel('Operation cancelled')
        process.exit(0)
      }
      console.error(pc.red('Error:'), error)
      process.exit(1)
    }
  })

function displaySuccessMessage(projectName: string) {
  console.log()
  p.outro(pc.green('Project created successfully!'))

  console.log()
  console.log(pc.bold('Next steps:'))
  console.log()
  console.log(`  ${pc.cyan('cd')} ${projectName}`)
  console.log(`  ${pc.cyan('pnpm')} dev`)
  console.log()
  console.log(pc.dim('This will automatically:'))
  console.log(pc.dim('  - Install dependencies'))
  console.log(pc.dim('  - Guide you through Convex setup'))
  console.log(pc.dim('  - Start Next.js and Convex dev servers'))
  console.log()
  console.log(pc.bold('Documentation:'))
  console.log(`  ${pc.dim('-')} Convex: ${pc.cyan('https://docs.convex.dev')}`)
  console.log(`  ${pc.dim('-')} Better-Auth: ${pc.cyan('https://www.better-auth.com')}`)
  console.log(`  ${pc.dim('-')} shadcn/ui: ${pc.cyan('https://ui.shadcn.com')}`)
  console.log()
}

program.parse()
