#!/usr/bin/env node

import { Command } from 'commander'
import * as p from '@clack/prompts'
import pc from 'picocolors'
import gradient from 'gradient-string'
import { runPrompts } from './prompts.js'
import { generateProject } from './generate.js'
import { DEFAULT_CONFIG } from 'kofi-stack-types'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'))
const VERSION = pkg.version

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
  .option('--marketing <type>', 'Marketing site type: none, nextjs, astro, payload')
  .option('--analytics <type>', 'Analytics: none, posthog, vercel')
  .option('--uploads <type>', 'Storage: convex-fs, r2, uploadthing, s3, vercel-blob, none')
  .option('--payments <type>', 'Payments: none, stripe, polar')
  .option('--rate-limiting', 'Add rate limiting with Convex Rate Limiter')
  .option('--monitoring', 'Add monitoring with Sentry')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .action(async (projectName, options) => {
    displayBanner()

    p.intro(pc.bgCyan(pc.black(' create-kofi-stack ')))

    try {
      // Get config from prompts or defaults
      const config = await runPrompts(projectName, options)

      // Generate the project
      await generateProject(config, { skipPrompts: options.yes })
    } catch (error) {
      if (error instanceof Error && error.message === 'cancelled') {
        p.cancel('Operation cancelled')
        process.exit(0)
      }
      console.error(pc.red('Error:'), error)
      process.exit(1)
    }
  })

program.parse()
