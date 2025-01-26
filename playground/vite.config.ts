import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import pkg from '../package.json'

export default defineConfig({
  base: '/pkg-placeholder',
  plugins: [
    UnoCSS(),
    ViteEjsPlugin({
      title: `pkg-placeholder | Playground`,
      name: 'pkg-placeholder',
      version: pkg.version,
      repo: pkg.repository.url,
    }),
  ],
})
