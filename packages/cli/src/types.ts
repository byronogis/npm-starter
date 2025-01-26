import type { Config, ResolvedConfig } from '@pkg-placeholder/core'

interface BaseCLIConfig {
  /**
   * Watch mode
   * @default false
   */
  watch?: boolean
}

export type CliConfig = BaseCLIConfig & Config

export type ResolvedCliConfig = BaseCLIConfig & ResolvedConfig
