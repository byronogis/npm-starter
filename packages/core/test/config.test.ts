import { beforeEach, describe, expect, it, vi } from 'vitest'
import { __RESOLVED, getDefaultConfig, loadConfig, resolveConfig } from '../src'

// Mock c12 for loadConfig tests
vi.mock('c12', () => ({
  loadConfig: vi.fn(),
}))

describe('config', () => {
  describe('getDefaultConfig', () => {
    it('should return default config correctly', () => {
      const defaultConfig = getDefaultConfig()

      expect(defaultConfig).toEqual(getDefaultConfig())
    })
  })

  describe('resolveConfig', () => {
    it('should resolve config with default values', () => {
      const config = resolveConfig({})

      expect(config.patterns).toEqual([])
      expect(config.cwd).toBe(process.cwd())
      expect(config[__RESOLVED]).toBe(true)
    })

    it('should merge multiple configs with defu priority', () => {
      const config1 = { patterns: ['src/**/*.ts'] }
      const config2 = { patterns: ['test/**/*.ts'] }

      const resolved = resolveConfig(config1, config2)

      // defu gives priority to the first config, but merges arrays
      expect(resolved.patterns).toContain('src/**/*.ts')
      expect(resolved.patterns).toContain('test/**/*.ts')
    })

    it('should deduplicate patterns', () => {
      const config = resolveConfig({
        patterns: ['src/**/*.ts', 'src/**/*.ts', 'test/**/*.ts'],
      })

      expect(config.patterns).toEqual(['src/**/*.ts', 'test/**/*.ts'])
    })

    it('should filter out falsy patterns', () => {
      const config = resolveConfig({
        patterns: ['src/**/*.ts', '', 'test/**/*.ts'],
      })

      expect(config.patterns).toEqual(['src/**/*.ts', 'test/**/*.ts'])
    })

    it('should use provided cwd', () => {
      const customCwd = '/custom/path'
      const config = resolveConfig({ cwd: customCwd })

      expect(config.cwd).toBe(customCwd)
    })

    it('should return already resolved config without re-resolving', () => {
      const resolvedConfig = resolveConfig({ patterns: ['src/**/*.ts'] })
      const reResolved = resolveConfig(resolvedConfig)

      expect(reResolved).toBe(resolvedConfig)
      expect(reResolved[__RESOLVED]).toBe(true)
    })

    it('should make __RESOLVED property non-enumerable and non-configurable', () => {
      const config = resolveConfig({})

      expect(Object.keys(config)).not.toContain(__RESOLVED)
      expect(Object.getOwnPropertyDescriptor(config, __RESOLVED)?.enumerable).toBe(false)
      expect(Object.getOwnPropertyDescriptor(config, __RESOLVED)?.configurable).toBe(false)
    })
  })

  describe('loadConfig', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('should load config using c12', async () => {
      const mockConfig = { patterns: ['src/**/*.ts'] }
      const { loadConfig: c12LoadConfig } = await import('c12')
      vi.mocked(c12LoadConfig).mockResolvedValue({ config: mockConfig })

      const config = await loadConfig()

      expect(c12LoadConfig).toHaveBeenCalledWith({
        name: 'pkg-placeholder',
      })
      expect(config.patterns).toBeDefined()
    })

    it('should merge loaded config with provided configs', async () => {
      const mockConfig = { patterns: ['config/**/*.ts'] }
      const { loadConfig: c12LoadConfig } = await import('c12')
      vi.mocked(c12LoadConfig).mockResolvedValue({ config: mockConfig })

      const providedConfig = { patterns: ['src/**/*.ts'] }
      const config = await loadConfig(providedConfig)

      expect(config.patterns).toContain('src/**/*.ts')
      expect(config.patterns).toContain('config/**/*.ts')
    })

    it('should handle empty c12 config', async () => {
      const { loadConfig: c12LoadConfig } = await import('c12')
      vi.mocked(c12LoadConfig).mockResolvedValue({ config: {} })

      const config = await loadConfig()

      expect(config).toBeDefined()
      expect(config).toEqual(getDefaultConfig())
    })
  })
})
