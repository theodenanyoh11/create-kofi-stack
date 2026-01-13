import * as p from '@clack/prompts'
import pc from 'picocolors'
import ora from 'ora'
import fs from 'fs-extra'
import path from 'path'
import { execa } from 'execa'
import type { ProjectConfig, VirtualFileTree, VirtualFile, VirtualDirectory, VirtualNode } from 'kofi-stack-types'
import { generateVirtualProject } from 'kofi-stack-template-generator'

export async function generateProject(config: ProjectConfig): Promise<void> {
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

    // Ask user if they want to set up Convex now
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
