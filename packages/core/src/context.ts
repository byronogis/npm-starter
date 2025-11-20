import type { Hookable } from 'hookable'
import type { Arrayable } from 'type-fest'
import type { Config, ResolvedConfig } from './config.ts'
import type { Hooks } from './hooks.ts'
import { resolveConfig } from './config.ts'
import { resolveHooks } from './hooks.ts'

export class CoreContext {
  config: ResolvedConfig
  hooks: Hookable<Hooks>

  constructor(options: ContextOptions = {}) {
    const {
      configs = [],
    } = options

    this.config = resolveConfig(...[configs].flat())

    this.hooks = resolveHooks(this.config)
  }
}

export interface ContextOptions {
  configs?: ResolvedConfig | Arrayable<Config>
}
