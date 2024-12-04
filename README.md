# pkg-placeholder

<!-- automd:badges license codecov bundlephobia packagephobia -->

[![npm version](https://img.shields.io/npm/v/pkg-placeholder)](https://npmjs.com/package/pkg-placeholder)
[![npm downloads](https://img.shields.io/npm/dm/pkg-placeholder)](https://npm.chart.dev/pkg-placeholder)
[![bundle size](https://img.shields.io/bundlephobia/minzip/pkg-placeholder)](https://bundlephobia.com/package/pkg-placeholder)
[![codecov](https://img.shields.io/codecov/c/gh/byronogis/pkg-placeholder)](https://codecov.io/gh/byronogis/pkg-placeholder)
[![license](https://img.shields.io/github/license/byronogis/pkg-placeholder)](https://github.com/byronogis/pkg-placeholder/blob/main/LICENSE)

<!-- /automd -->

[![JSDocs][jsdocs-src]][jsdocs-href]

_description_

> **Note**:
> Replace `pausable-timers`, `_description_` and `byronogis` globally to use this template.

## Installation

<!-- automd:pm-install -->

```sh
# ✨ Auto-detect
npx nypm install pkg-placeholder

# npm
npm install pkg-placeholder

# yarn
yarn add pkg-placeholder

# pnpm
pnpm install pkg-placeholder

# bun
bun install pkg-placeholder

# deno
deno install pkg-placeholder
```

<!-- /automd -->

## Example

<!-- automd:file src="./example/index.ts" code -->

```ts [index.ts]
import { sum } from '../src'

// Basic usage examples
// 基本用法示例
sum(2, 3) // => 5

// Large number examples
// 大数计算示例
sum(1000, 2000) // => 3000

// Decimal examples (with precision handling)
// 小数计算示例（已处理精度问题）
sum(0.1, 0.2) // => 0.3
sum(1.5, 2.7) // => 4.2

// Negative number examples
// 负数计算示例
sum(-5, 3) // => -2
sum(-2, -3) // => -5
```

<!-- /automd -->

<!-- automd:fetch url="gh:byronogis/.github/main/snippets/readme-contrib-node-pnpm.md" -->

## Contribution

<details>
  <summary>Local development</summary>

- Clone this repository
- Install the latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run tests using `pnpm dev` or `pnpm test`

</details>

<!-- /automd -->

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/byronogis/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/byronogis/static/sponsors.svg'/>
  </a>
</p>

## License

<!-- automd:contributors author="byronogis" license="MIT" -->

Published under the [MIT](https://github.com/byronogis/pkg-placeholder/blob/main/LICENSE) license.
Made by [@byronogis](https://github.com/byronogis) and [community](https://github.com/byronogis/pkg-placeholder/graphs/contributors) 💛
<br><br>
<a href="https://github.com/byronogis/pkg-placeholder/graphs/contributors">
<img src="https://contrib.rocks/image?repo=byronogis/pkg-placeholder" />
</a>

<!-- /automd -->

<!-- automd:with-automd lastUpdate -->

---

_🤖 auto updated with [automd](https://automd.unjs.io) (last updated: Thu Dec 05 2024)_

<!-- /automd -->

<!-- Badges -->

[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-1fa669
[jsdocs-href]: https://www.jsdocs.io/package/pausable-timers
