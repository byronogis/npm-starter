import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getWatcher } from '../src/watcher'

vi.mock('chokidar', () => ({
  watch: vi.fn(),
}))

vi.mock('@pkg-placeholder/core', () => ({
  resolveConfig: vi.fn(config => ({
    patterns: config?.patterns || ['**/*'],
    cwd: config?.cwd || process.cwd(),
  })),
}))

describe('watcher', () => {
  const mockWatcher = { on: vi.fn(), close: vi.fn() }

  beforeEach(async () => {
    vi.clearAllMocks()
    const { watch } = await import('chokidar')
    vi.mocked(watch).mockReturnValue(mockWatcher as any)
  })

  describe('getWatcher', () => {
    it('should create watcher with default config', async () => {
      const { watch } = await import('chokidar')

      const watcher = await getWatcher()

      expect(watch).toHaveBeenCalledWith(
        ['**/*'],
        expect.objectContaining({
          ignoreInitial: true,
          ignorePermissionErrors: true,
          ignored: ['**/{.git,node_modules}/**'],
        }),
      )
      expect(watcher).toBe(mockWatcher)
    })

    it('should create watcher with custom config', async () => {
      const { watch } = await import('chokidar')

      const watcher = await getWatcher({
        patterns: ['src/**/*.ts'],
        cwd: '/test/path',
      })

      expect(watch).toHaveBeenCalledWith(
        ['src/**/*.ts'],
        expect.objectContaining({
          cwd: '/test/path',
        }),
      )
      expect(watcher).toBe(mockWatcher)
    })

    it('should return cached watcher when called without config', async () => {
      const { watch } = await import('chokidar')

      const firstWatcher = await getWatcher({ patterns: ['**/*'] })
      const secondWatcher = await getWatcher()

      expect(secondWatcher).toBe(firstWatcher)
      expect(watch).toHaveBeenCalledTimes(1)
    })
  })
})
