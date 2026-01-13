import Handlebars from 'handlebars'
import type { ProjectConfig } from 'kofi-stack-types'
import path from 'path'

// Register custom Handlebars helpers
Handlebars.registerHelper('eq', (a: unknown, b: unknown) => a === b)
Handlebars.registerHelper('ne', (a: unknown, b: unknown) => a !== b)
Handlebars.registerHelper('and', (...args: unknown[]) => {
  // Remove the options object (last argument)
  const values = args.slice(0, -1)
  return values.every(Boolean)
})
Handlebars.registerHelper('or', (...args: unknown[]) => {
  const values = args.slice(0, -1)
  return values.some(Boolean)
})
Handlebars.registerHelper('includes', (array: unknown[], value: unknown) => {
  if (!Array.isArray(array)) return false
  return array.includes(value)
})
Handlebars.registerHelper('not', (value: unknown) => !value)
Handlebars.registerHelper('json', (value: unknown) => JSON.stringify(value, null, 2))

// Binary file extensions that shouldn't be processed as templates
const BINARY_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.ico',
  '.webp',
  '.svg',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.otf',
  '.mp3',
  '.mp4',
  '.webm',
  '.pdf',
  '.zip',
  '.tar',
  '.gz',
])

/**
 * Check if a file is binary based on extension
 */
export function isBinaryFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase()
  return BINARY_EXTENSIONS.has(ext)
}

/**
 * Process a Handlebars template string with the given config context
 */
export function processTemplateString(
  template: string,
  config: ProjectConfig
): string {
  try {
    const compiled = Handlebars.compile(template, { noEscape: true })
    return compiled(config)
  } catch (error) {
    console.error('Template processing error:', error)
    return template
  }
}

/**
 * Transform a template filename to the final output filename
 * - Remove .hbs extension
 * - Convert _gitignore to .gitignore
 * - Process filename through Handlebars if it contains {{ }}
 */
export function transformFilename(
  filename: string,
  config: ProjectConfig
): string {
  let result = filename

  // Remove .hbs extension
  if (result.endsWith('.hbs')) {
    result = result.slice(0, -4)
  }

  // Convert underscore prefix to dot prefix (for hidden files)
  if (result.startsWith('_')) {
    result = '.' + result.slice(1)
  }

  // Process filename through Handlebars if it contains template syntax
  if (result.includes('{{')) {
    result = processTemplateString(result, config)
  }

  return result
}

/**
 * Check if a template file should be processed
 * Some files are conditionally included based on config
 */
export function shouldIncludeFile(
  templatePath: string,
  config: ProjectConfig
): boolean {
  // Files in conditional directories
  if (templatePath.includes('/if-monorepo/') && config.structure !== 'monorepo') {
    return false
  }
  if (templatePath.includes('/if-standalone/') && config.structure !== 'standalone') {
    return false
  }
  if (templatePath.includes('/if-payload/') && config.marketingSite !== 'payload') {
    return false
  }
  if (templatePath.includes('/if-posthog/') && config.integrations.analytics !== 'posthog') {
    return false
  }
  if (templatePath.includes('/if-uploadthing/') && config.integrations.uploads !== 'uploadthing') {
    return false
  }

  return true
}
