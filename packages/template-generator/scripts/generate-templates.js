#!/usr/bin/env node
/**
 * Generate templates.generated.ts from template files
 *
 * This script reads all template files from the templates/ directory
 * and embeds them as a TypeScript object for browser/Node.js compatibility.
 */

import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'fs'
import { join, relative, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const TEMPLATES_DIR = join(__dirname, '..', 'templates')
const OUTPUT_FILE = join(__dirname, '..', 'src', 'templates.generated.ts')

// Binary extensions that should be base64 encoded
const BINARY_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.svg',
  '.woff', '.woff2', '.ttf', '.eot', '.otf',
  '.mp3', '.mp4', '.webm', '.pdf', '.zip', '.tar', '.gz'
])

function isBinaryFile(filename) {
  const ext = extname(filename).toLowerCase()
  return BINARY_EXTENSIONS.has(ext)
}

function getAllFiles(dir, baseDir = dir) {
  const files = []

  if (!existsSync(dir)) {
    console.warn(`Warning: Templates directory not found at ${dir}`)
    return files
  }

  const entries = readdirSync(dir)

  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir))
    } else {
      const relativePath = relative(baseDir, fullPath)
      files.push({
        path: relativePath.replace(/\\/g, '/'), // Normalize to forward slashes
        fullPath
      })
    }
  }

  return files
}

function generateTemplates() {
  console.log('Generating templates.generated.ts...')

  const files = getAllFiles(TEMPLATES_DIR)

  if (files.length === 0) {
    // Create empty templates file if no templates exist yet
    const output = `// Auto-generated file. Do not edit manually.
// Run 'pnpm prebuild' to regenerate.

export const EMBEDDED_TEMPLATES: Record<string, string> = {}
`
    writeFileSync(OUTPUT_FILE, output)
    console.log('Created empty templates.generated.ts (no templates found)')
    return
  }

  const templates = {}

  for (const file of files) {
    const content = readFileSync(file.fullPath)

    if (isBinaryFile(file.path)) {
      // Base64 encode binary files
      templates[file.path] = content.toString('base64')
    } else {
      // Store text files as-is
      templates[file.path] = content.toString('utf-8')
    }
  }

  // Generate the TypeScript file
  const output = `// Auto-generated file. Do not edit manually.
// Run 'pnpm prebuild' to regenerate.
// Generated: ${new Date().toISOString()}
// Template count: ${files.length}

export const EMBEDDED_TEMPLATES: Record<string, string> = ${JSON.stringify(templates, null, 2)}
`

  writeFileSync(OUTPUT_FILE, output)
  console.log(`Generated templates.generated.ts with ${files.length} templates`)
}

generateTemplates()
