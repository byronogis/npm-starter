import { describe, expect, it, vi } from 'vitest'
import { resolveConfig, resolveHooks } from '../src'

describe('hooks', () => {
  describe('resolveHooks', () => {
    it('should create hookable instance', () => {
      const config = resolveConfig({})
      const hooks = resolveHooks(config)

      expect(hooks).toBeDefined()
      expect(hooks.hook).toBeTypeOf('function')
      expect(hooks.callHook).toBeTypeOf('function')
    })

    it('should register user-defined hooks from config', async () => {
      const userHookSpy = vi.fn()
      const config = resolveConfig({
        hooks: {
          'event:core:start': userHookSpy,
        },
      })
      const hooks = resolveHooks(config)

      await hooks.callHook('event:core:start', {} as any)

      expect(userHookSpy).toHaveBeenCalled()
    })

    it('should register multiple user-defined hooks for same event', async () => {
      const userHook1 = vi.fn()
      const userHook2 = vi.fn()
      const config = resolveConfig({
        hooks: {
          'event:core:start': [userHook1, userHook2],
        },
      })
      const hooks = resolveHooks(config)

      await hooks.callHook('event:core:start', {} as any)

      expect(userHook1).toHaveBeenCalled()
      expect(userHook2).toHaveBeenCalled()
    })

    it('should register user-defined hooks for multiple events', async () => {
      const coreStartHook = vi.fn()
      const taskEndHook = vi.fn()
      const config = resolveConfig({
        hooks: {
          'event:core:start': coreStartHook,
          'event:core:end': taskEndHook,
        },
      })
      const hooks = resolveHooks(config)

      await hooks.callHook('event:core:start', {} as any)
      await hooks.callHook('event:core:end', {} as any, 'result')

      expect(coreStartHook).toHaveBeenCalled()
      expect(taskEndHook).toHaveBeenCalledWith(expect.any(Object), 'result')
    })

    it('should handle empty hooks config', () => {
      const config = resolveConfig({
        hooks: {},
      })
      const hooks = resolveHooks(config)

      expect(hooks).toBeDefined()
    })

    it('should handle undefined hooks in config', () => {
      const config = resolveConfig({
        hooks: undefined,
      })
      const hooks = resolveHooks(config)

      expect(hooks).toBeDefined()
    })

    it('should skip null or undefined hook handlers', async () => {
      const validHook = vi.fn()
      const config = resolveConfig({
        hooks: {
          'event:core:start': validHook,
          'event:core:end': null as any,
        },
      })
      const hooks = resolveHooks(config)

      await hooks.callHook('event:core:start', {} as any)
      await hooks.callHook('event:core:end', {} as any, 'result')

      expect(validHook).toHaveBeenCalled()
    })
  })
})
