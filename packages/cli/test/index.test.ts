import { beforeEach, describe, expect, it, vi } from 'vitest'
import { handle } from '../src/index'

vi.mock('node:fs', () => ({
  readFileSync: vi.fn(() => 'file content'),
}))

vi.mock('@pkg-placeholder/core', () => ({
  core: vi.fn(async () => '[pkg-placeholder] core'),
  CoreContext: vi.fn(function (this: any) {
    this.config = {}
    return this
  }),
  loadConfig: vi.fn(async (config: any) => ({
    patterns: config?.patterns || [],
    cwd: config?.cwd || process.cwd(),
    watch: config?.watch || false,
  })),
}))

vi.mock('consola', () => ({
  consola: {
    log: vi.fn(),
    start: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
}))

vi.mock('tinyglobby', () => ({
  glob: vi.fn(async () => []),
}))

vi.mock('../src/watcher', () => ({
  getWatcher: vi.fn(async () => ({
    on: vi.fn(),
    close: vi.fn(),
  })),
}))

describe('index', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('handle', () => {
    it('should throw when no patterns provided', async () => {
      await expect(handle({ patterns: [] })).rejects.toThrow('No glob patterns')
    })

    it('should execute in production mode', async () => {
      const { glob } = await import('tinyglobby')
      const { core } = await import('@pkg-placeholder/core')
      const { consola } = await import('consola')

      vi.mocked(glob).mockResolvedValue(['/test/file1.ts', '/test/file2.ts'])

      await handle({ patterns: ['src/**/*.ts'], watch: false })

      expect(glob).toHaveBeenCalled()
      expect(core).toHaveBeenCalled()
      expect(consola.success).toHaveBeenCalledWith('pkg-placeholder done')
    })

    it('should start watcher in watch mode', async () => {
      const { glob } = await import('tinyglobby')
      const { getWatcher } = await import('../src/watcher')
      const { consola } = await import('consola')

      const mockWatcher = { on: vi.fn(), close: vi.fn() }
      vi.mocked(getWatcher).mockResolvedValue(mockWatcher as any)
      vi.mocked(glob).mockResolvedValue([])

      await handle({ patterns: ['src/**/*.ts'], watch: true })

      expect(getWatcher).toHaveBeenCalled()
      expect(mockWatcher.on).toHaveBeenCalledWith('all', expect.any(Function))
      expect(consola.info).toHaveBeenCalled()
    })

    it('should handle file changes in watch mode', async () => {
      const { readFileSync } = await import('node:fs')
      const { glob } = await import('tinyglobby')
      const { getWatcher } = await import('../src/watcher')
      const { core } = await import('@pkg-placeholder/core')

      let watchCallback: any
      const mockWatcher = {
        on: vi.fn((event, callback) => {
          watchCallback = callback
        }),
        close: vi.fn(),
      }
      vi.mocked(getWatcher).mockResolvedValue(mockWatcher as any)
      vi.mocked(glob).mockResolvedValue(['/test/file.ts'])
      vi.mocked(readFileSync).mockReturnValue('updated content' as any)

      await handle({ patterns: ['src/**/*.ts'], cwd: '/test', watch: true })

      vi.clearAllMocks()
      watchCallback('change', 'src/file.ts')
      await new Promise(resolve => setTimeout(resolve, 150))

      expect(readFileSync).toHaveBeenCalledWith('/test/src/file.ts', 'utf8')
      expect(core).toHaveBeenCalled()
    })

    it('should handle file deletion in watch mode', async () => {
      const { glob } = await import('tinyglobby')
      const { getWatcher } = await import('../src/watcher')
      const { core } = await import('@pkg-placeholder/core')

      let watchCallback: any
      const mockWatcher = {
        on: vi.fn((event, callback) => {
          watchCallback = callback
        }),
        close: vi.fn(),
      }
      vi.mocked(getWatcher).mockResolvedValue(mockWatcher as any)
      vi.mocked(glob).mockResolvedValue(['/test/file.ts'])

      await handle({ patterns: ['src/**/*.ts'], cwd: '/test', watch: true })

      vi.clearAllMocks()
      watchCallback('unlink', 'src/file.ts')
      await new Promise(resolve => setTimeout(resolve, 150))

      expect(core).toHaveBeenCalled()
    })
  })
})
