import { beforeEach, describe, expect, it, vi } from 'vitest'
import { core, CoreContext, resolveCoreOptions } from '../src'

// Mock c12 for loadConfig tests
vi.mock('c12', () => ({
  loadConfig: vi.fn(),
}))

describe('core', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('resolveCoreOptions', () => {
    it('should return options with existing ctx', async () => {
      const ctx = new CoreContext({ configs: {} })
      const options = { ctx }

      const resolved = await resolveCoreOptions(options)

      expect(resolved.ctx).toBe(ctx)
    })

    it('should create ctx when not provided', async () => {
      const { loadConfig: c12LoadConfig } = await import('c12')
      vi.mocked(c12LoadConfig).mockResolvedValue({ config: {} })

      const resolved = await resolveCoreOptions()

      expect(resolved.ctx).toBeInstanceOf(CoreContext)
    })

    it('should load config when creating new ctx', async () => {
      const mockConfig = { patterns: ['src/**/*.ts'] }
      const { loadConfig: c12LoadConfig } = await import('c12')
      vi.mocked(c12LoadConfig).mockResolvedValue({ config: mockConfig })

      const resolved = await resolveCoreOptions()

      expect(resolved.ctx.config).toBeDefined()
      expect(c12LoadConfig).toHaveBeenCalled()
    })
  })

  describe('core function', () => {
    it('should return core string', async () => {
      const result = await core({})

      expect(result).toBe('[pkg-placeholder] core')
    })

    it('should use provided context', async () => {
      const ctx = new CoreContext({ configs: {} })
      const result = await core({ ctx })

      expect(result).toBe('[pkg-placeholder] core')
    })

    it('should call event:core:start hook', async () => {
      const ctx = new CoreContext({ configs: {} })
      const hookSpy = vi.fn()
      ctx.hooks.hook('event:core:start', hookSpy)

      await core({ ctx })

      expect(hookSpy).toHaveBeenCalled()
    })

    it('should pass resolved options to hook', async () => {
      const ctx = new CoreContext({ configs: {} })
      const hookSpy = vi.fn()
      ctx.hooks.hook('event:core:start', hookSpy)

      const files = ['file1.ts', 'file2.ts']
      await core({ ctx, files })

      expect(hookSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          ctx,
          files,
        }),
      )
    })

    it('should work with files option', async () => {
      const ctx = new CoreContext({ configs: {} })
      const files = ['src/index.ts', 'src/utils.ts']

      const result = await core({ ctx, files })

      expect(result).toBe('[pkg-placeholder] core')
    })

    it('should work with empty options', async () => {
      const result = await core()

      expect(result).toBe('[pkg-placeholder] core')
    })
  })
})
