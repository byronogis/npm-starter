import type { Config } from '@pkg-placeholder/core'

export * from '@pkg-placeholder/cli'
export * from '@pkg-placeholder/core'

export function defineConfig(config: Config): Config {
  return config
}
