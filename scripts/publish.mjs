#!/usr/bin/env node
/**
 * Publish Script
 *
 * Publishes all packages to npm in the correct order:
 * 1. kofi-stack-types
 * 2. kofi-stack-template-generator
 * 3. create-kofi-stack (CLI)
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')

const VERSION = '2.1.39'

const packages = [
  { name: 'kofi-stack-types', path: 'packages/types' },
  { name: 'kofi-stack-template-generator', path: 'packages/template-generator' },
  { name: 'create-kofi-stack', path: 'packages/cli' },
]

function updatePackageJson(pkgPath, updates) {
  const fullPath = resolve(rootDir, pkgPath, 'package.json')
  const pkg = JSON.parse(readFileSync(fullPath, 'utf-8'))

  // Update version
  pkg.version = VERSION

  // Update workspace dependencies to real versions
  if (pkg.dependencies) {
    for (const [dep, version] of Object.entries(pkg.dependencies)) {
      if (version === 'workspace:*') {
        pkg.dependencies[dep] = `^${VERSION}`
      }
    }
  }

  writeFileSync(fullPath, JSON.stringify(pkg, null, 2) + '\n')
  console.log(`Updated ${pkgPath}/package.json`)
}

function buildPackage(pkgPath) {
  console.log(`\nBuilding ${pkgPath}...`)
  execSync('pnpm build', {
    cwd: resolve(rootDir, pkgPath),
    stdio: 'inherit'
  })
}

function publishPackage(pkgPath, name) {
  console.log(`\nPublishing ${name}...`)
  try {
    execSync('npm publish --access public', {
      cwd: resolve(rootDir, pkgPath),
      stdio: 'inherit'
    })
    console.log(`✅ Published ${name}@${VERSION}`)
  } catch (error) {
    console.error(`❌ Failed to publish ${name}`)
    process.exit(1)
  }
}

async function main() {
  console.log(`\n📦 Publishing kofi-stack packages v${VERSION}\n`)
  console.log('=' .repeat(50))

  // Step 1: Update all package.json files
  console.log('\n1. Updating package.json files...\n')
  for (const pkg of packages) {
    updatePackageJson(pkg.path)
  }

  // Step 2: Build all packages
  console.log('\n2. Building packages...\n')
  execSync('pnpm build', { cwd: rootDir, stdio: 'inherit' })

  // Step 3: Publish in order
  console.log('\n3. Publishing packages...\n')
  for (const pkg of packages) {
    publishPackage(pkg.path, pkg.name)
  }

  console.log('\n' + '=' .repeat(50))
  console.log(`\n✅ All packages published successfully!`)
  console.log(`\nTest with: npx create-kofi-stack@${VERSION} my-app\n`)
}

main()
