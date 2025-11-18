import { defineCommand, runMain } from 'citty'
import pkg from '../package.json' with { type: 'json' }
import { handle } from './index.ts'

const main = defineCommand({
  meta: {
    name: 'pkg-placeholder',
    version: pkg.version,
    description: pkg.description,
  },
  args: {
    patterns: {
      type: 'positional',
      description: 'Glob pattern',
      required: false,
    },
    cwd: {
      type: 'string',
      description: 'Current working directory',
      valueHint: 'dir',
    },
    watch: {
      type: 'boolean',
      description: 'Watch mode',
      alias: 'w',
    },
  },
  run({ args }) {
    handle({
      ...args,
      patterns: Array.isArray(args.patterns) ? args.patterns : [args.patterns],
    })
  },
})

runMain(main)
