import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  exports: {
    devExports: true,
  },
  dts: true,
})
