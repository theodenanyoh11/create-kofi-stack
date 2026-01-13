// Main generator
export { generateVirtualProject, VirtualFileSystem } from './generator.js'

// Core utilities
export {
  processTemplateString,
  transformFilename,
  isBinaryFile,
  shouldIncludeFile,
} from './core/template-processor.js'

// Re-export types
export type {
  ProjectConfig,
  VirtualFileTree,
  VirtualFile,
  VirtualDirectory,
  GeneratorResult,
} from 'kofi-stack-types'
