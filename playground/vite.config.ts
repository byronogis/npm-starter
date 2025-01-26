import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import pkg from '../package.json'

export default defineConfig({
  base: '/pkg-placeholder',
  plugins: [
    UnoCSS(),
    createHtmlPlugin({
      entry: '/src/main.ts',
      inject: {
        data: {
          title: `pkg-placeholder | Playground`,
          name: 'pkg-placeholder',
          version: pkg.version,
          repo: pkg.repository.url,
        },
      },
    }),
  ],
})
