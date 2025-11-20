import type { SetRequired } from 'type-fest'
import { loadConfig } from './config.ts'
import { CoreContext } from './context.ts'

export async function resolveCoreOptions(options: CoreOptions = {}): Promise<ResolvedCoreOptions> {
  if (!options.ctx) {
    const configs = await loadConfig()
    options.ctx = new CoreContext({ configs })
  }

  return options as ResolvedCoreOptions
}

export async function core(options: CoreOptions = {}): Promise<CoreReturns> {
  const resolvedOptions = await resolveCoreOptions(options)

  await resolvedOptions.ctx.hooks.callHook('event:core:start', resolvedOptions)

  // ... TODO do core stuff here ...

  const res: CoreReturns = '[pkg-placeholder] core'

  await resolvedOptions.ctx.hooks.callHook('event:core:end', resolvedOptions, res)

  return res
}

export interface CoreOptions {
  /**
   * core context
   */
  ctx?: CoreContext
  files?: string[]
  // ...
}

export type ResolvedCoreOptions = SetRequired<CoreOptions, 'ctx'>

export type CoreReturns = string
