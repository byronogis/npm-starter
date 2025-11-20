import type { Hookable } from 'hookable'
import type { ResolvedConfig } from './config.ts'
import type { CoreReturns, ResolvedCoreOptions } from './core.ts'
import { createHooks } from 'hookable'

export function resolveHooks(config: ResolvedConfig): Hookable<Hooks> {
  const hooks = createHooks<Hooks>()

  // Register user-defined hooks from config
  if (config.hooks) {
    for (const [name, handler] of Object.entries(config.hooks)) {
      if (!handler) {
        continue
      }

      const hookName = name as keyof Hooks
      const handlers = [handler].flat()

      for (const h of handlers) {
        hooks.hook(hookName, h)
      }
    }
  }

  return hooks
}

export interface Hooks {
  'event:core:start': (option: ResolvedCoreOptions) => void
  'event:core:end': (option: ResolvedCoreOptions, res: CoreReturns) => void
  // TODO more hooks can be added here
}

export type HookKeys = keyof Hooks
