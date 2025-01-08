// TODO
// see https://github.com/unjs/unbuild/issues/248
// see https://github.com/unjs/unbuild/issues/447
// import { sum } from 'pkg-placeholder'
import { sum } from '../../packages/core/src'
import 'virtual:uno.css'
import './style.css'

console.info(`[pkg-placeholder]`, { sum: sum(1, 2) })
