#!/usr/bin/env node
import process from 'node:process'
import cac from 'cac'
import pkg from '../package.json' with { type: 'json' }
import { greeting } from './index.ts'

const cli = cac('pkg-placeholder')

cli.command('hello [name]', 'Say hello')
  .option('--shout', 'Shout the greeting')
  .option('--cwd <path>', 'Set the current working directory', { default: process.cwd() })
  .action((name = 'World', options) => {
    let message = greeting(`Hello, ${name}!`)
    if (options.shout) {
      message = message.toUpperCase()
    }
    console.log(message)
  })

cli.help()
cli.version(pkg.version)
cli.parse()
