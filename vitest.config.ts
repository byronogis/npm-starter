import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      'test',
      'packages/*',
    ],
    coverage: {
      enabled: true,
    },
    server: {
      deps: {
        inline: ['vitest-package-exports'],
      },
    },
  },
})
