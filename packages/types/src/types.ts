import type { z } from 'zod'
import type {
  ProjectStructureSchema,
  MarketingSiteSchema,
  AuthProviderSchema,
  AnalyticsProviderSchema,
  UploadsProviderSchema,
  PaymentProviderSchema,
  BaseColorSchema,
  ThemeColorSchema,
  MenuAccentSchema,
  IconLibrarySchema,
  FontFamilySchema,
  BorderRadiusSchema,
  SpacingScaleSchema,
  PackageManagerSchema,
  AddonSchema,
  DesignSystemConfigSchema,
  AuthConfigSchema,
  IntegrationsConfigSchema,
  ProjectConfigSchema,
  CLIInputSchema,
} from './schemas.js'

// Inferred types from Zod schemas
export type ProjectStructure = z.infer<typeof ProjectStructureSchema>
export type MarketingSite = z.infer<typeof MarketingSiteSchema>
export type AuthProvider = z.infer<typeof AuthProviderSchema>
export type AnalyticsProvider = z.infer<typeof AnalyticsProviderSchema>
export type UploadsProvider = z.infer<typeof UploadsProviderSchema>
export type PaymentProvider = z.infer<typeof PaymentProviderSchema>
export type BaseColor = z.infer<typeof BaseColorSchema>
export type ThemeColor = z.infer<typeof ThemeColorSchema>
export type MenuAccent = z.infer<typeof MenuAccentSchema>
export type IconLibrary = z.infer<typeof IconLibrarySchema>
export type FontFamily = z.infer<typeof FontFamilySchema>
export type BorderRadius = z.infer<typeof BorderRadiusSchema>
export type SpacingScale = z.infer<typeof SpacingScaleSchema>
export type PackageManager = z.infer<typeof PackageManagerSchema>
export type Addon = z.infer<typeof AddonSchema>
export type DesignSystemConfig = z.infer<typeof DesignSystemConfigSchema>
export type AuthConfig = z.infer<typeof AuthConfigSchema>
export type IntegrationsConfig = z.infer<typeof IntegrationsConfigSchema>
export type ProjectConfig = z.infer<typeof ProjectConfigSchema>
export type CLIInput = z.infer<typeof CLIInputSchema>

// Virtual filesystem types
export interface VirtualFile {
  type: 'file'
  path: string
  name: string
  content: string | Buffer
  extension: string
  sourcePath?: string // For binary files
}

export interface VirtualDirectory {
  type: 'directory'
  path: string
  name: string
  children: VirtualNode[]
}

export type VirtualNode = VirtualFile | VirtualDirectory

export interface VirtualFileTree {
  root: VirtualDirectory
  fileCount: number
  directoryCount: number
  config: ProjectConfig
}

// Generator types
export interface GeneratorOptions {
  config: ProjectConfig
}

export interface GeneratorResult {
  tree: VirtualFileTree
  success: boolean
  errors?: string[]
}
