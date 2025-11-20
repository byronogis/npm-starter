import type { /* Arrayable, */ SetRequiredDeep } from 'type-fest'
import type { Hooks } from './hooks.ts'
import process from 'node:process'
import { loadConfig as _loadConfig } from 'c12'
import { defu } from 'defu'

export async function loadConfig<T extends Config = Config>(...configs: T[]): Promise<ResolvedConfig> {
  const { config } = await _loadConfig<T>({
    name: 'pkg-placeholder',
  })

  const resolvedConfig = resolveConfig(...configs, config)

  return resolvedConfig
}

export function getDefaultConfig(): Config {
  return {
    patterns: [],
    cwd: process.cwd(),
  }
}

export const __RESOLVED = '__resolved__'

export function resolveConfig(...configs: Config[]): ResolvedConfig {
  const [config = {}, ...rest] = configs

  if (__RESOLVED in config) {
    return config as ResolvedConfig
  }

  const resolvedConfig = defu<Config, Config[]>(config, ...rest, getDefaultConfig())

  resolvedConfig.patterns = Array.from(new Set(resolvedConfig.patterns)).filter(Boolean)
  Object.defineProperty(resolvedConfig, __RESOLVED, {
    value: true,
    enumerable: false,
    configurable: false,
  })

  return resolvedConfig as ResolvedConfig
}

export interface Config {
  /**
   * the patterns to match files
   *
   * powered by [tinyglobby](https://github.com/SuperchupuDev/tinyglobby#readme)
   *
   * 匹配文件的 glob 模式
   *
   * @default []
   */
  patterns?: string[]
  /**
   * work directory
   *
   * 工作目录
   *
   * @default process.cwd()
   */
  cwd?: string
  /**
   * custom hooks
   *
   * 自定义钩子
   */
  hooks?: {
    [K in keyof Hooks]?: Hooks[K] | Hooks[K][]
  }
}

export type ResolvedConfig = SetRequiredDeep<
  Config,
  | 'patterns'
  | 'cwd'
> & {
  /**
   * whether the config has been resolved
   *
   * 配置是否已经被解析
   */
  [__RESOLVED]: true
}
