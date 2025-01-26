import { defineCommand, runMain } from 'citty'
import { handle } from '.'
import { description, version } from '../package.json'

const main = defineCommand({
  meta: {
    name: 'unmini',
    version,
    description,
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
