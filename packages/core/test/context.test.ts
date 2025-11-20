import type { ContextOptions } from '../src'
import { describe, expect, it } from 'vitest'
import { CoreContext } from '../src'

describe('context', () => {
  describe('coreContext', () => {
    it.for([
      ['empty options', undefined],
      ['single config', { configs: { patterns: ['src/**/*.ts'] } }],
      ['array of configs', {
        configs: [
          { patterns: ['src/**/*.ts'] },
          { patterns: ['test/**/*.ts'] },
        ],
      }],
      ['empty config', { configs: [] }],
    ] satisfies [string, ContextOptions | undefined][])('should create context instance with %s', ([_, options]) => {
      const context = new CoreContext(options)

      expect(context).toBeInstanceOf(CoreContext)
      expect(context.config).toBeDefined()
      expect(context.hooks).toBeDefined()
    })
  })
})
