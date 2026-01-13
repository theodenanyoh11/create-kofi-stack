import { createFsFromVolume, Volume } from 'memfs'
import type {
  VirtualFile,
  VirtualDirectory,
  VirtualNode,
  VirtualFileTree,
  ProjectConfig,
} from 'kofi-stack-types'
import path from 'path'

/**
 * Virtual filesystem using memfs for in-memory file operations.
 * This allows us to generate the entire project tree without disk I/O,
 * enabling browser compatibility and faster generation.
 */
export class VirtualFileSystem {
  private volume: InstanceType<typeof Volume>
  private fs: ReturnType<typeof createFsFromVolume>
  private binarySourcePaths: Map<string, string> = new Map()

  constructor() {
    this.volume = new Volume()
    this.fs = createFsFromVolume(this.volume)
  }

  /**
   * Write a file to the virtual filesystem
   */
  writeFile(filePath: string, content: string | Buffer): void {
    const dir = path.dirname(filePath)
    this.mkdir(dir)
    this.fs.writeFileSync(filePath, content)
  }

  /**
   * Read a file from the virtual filesystem
   */
  readFile(filePath: string): string | Buffer {
    return this.fs.readFileSync(filePath)
  }

  /**
   * Check if a path exists
   */
  exists(filePath: string): boolean {
    try {
      this.fs.statSync(filePath)
      return true
    } catch {
      return false
    }
  }

  /**
   * Check if path is a file
   */
  fileExists(filePath: string): boolean {
    try {
      return this.fs.statSync(filePath).isFile()
    } catch {
      return false
    }
  }

  /**
   * Check if path is a directory
   */
  directoryExists(filePath: string): boolean {
    try {
      return this.fs.statSync(filePath).isDirectory()
    } catch {
      return false
    }
  }

  /**
   * Create directory recursively
   */
  mkdir(dirPath: string): void {
    if (!this.exists(dirPath)) {
      this.fs.mkdirSync(dirPath, { recursive: true })
    }
  }

  /**
   * Delete a file
   */
  deleteFile(filePath: string): void {
    if (this.fileExists(filePath)) {
      this.fs.unlinkSync(filePath)
    }
  }

  /**
   * List directory contents
   */
  listDir(dirPath: string): string[] {
    if (!this.directoryExists(dirPath)) {
      return []
    }
    return this.fs.readdirSync(dirPath) as string[]
  }

  /**
   * Track source path for binary files (for later copying)
   */
  setBinarySourcePath(virtualPath: string, sourcePath: string): void {
    this.binarySourcePaths.set(virtualPath, sourcePath)
  }

  /**
   * Get source path for binary file
   */
  getBinarySourcePath(virtualPath: string): string | undefined {
    return this.binarySourcePaths.get(virtualPath)
  }

  /**
   * Convert the virtual filesystem to a tree structure
   */
  toTree(config: ProjectConfig): VirtualFileTree {
    const root = this.buildTree('/')
    const stats = this.countNodes(root)

    return {
      root,
      fileCount: stats.files,
      directoryCount: stats.directories,
      config,
    }
  }

  private buildTree(dirPath: string): VirtualDirectory {
    const name = dirPath === '/' ? '/' : path.basename(dirPath)
    const children: VirtualNode[] = []

    const entries = this.listDir(dirPath)
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry)
      const stat = this.fs.statSync(fullPath)

      if (stat.isDirectory()) {
        children.push(this.buildTree(fullPath))
      } else {
        const content = this.fs.readFileSync(fullPath)
        const file: VirtualFile = {
          type: 'file',
          path: fullPath,
          name: entry,
          content: content as string | Buffer,
          extension: path.extname(entry),
          sourcePath: this.binarySourcePaths.get(fullPath),
        }
        children.push(file)
      }
    }

    return {
      type: 'directory',
      path: dirPath,
      name,
      children,
    }
  }

  private countNodes(node: VirtualNode): { files: number; directories: number } {
    if (node.type === 'file') {
      return { files: 1, directories: 0 }
    }

    let files = 0
    let directories = 1 // Count this directory

    for (const child of node.children) {
      const counts = this.countNodes(child)
      files += counts.files
      directories += counts.directories
    }

    return { files, directories }
  }

  /**
   * Get the raw memfs instance for advanced operations
   */
  getRawFs(): ReturnType<typeof createFsFromVolume> {
    return this.fs
  }
}
