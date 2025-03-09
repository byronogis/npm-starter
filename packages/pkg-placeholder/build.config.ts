import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: 'node16',
  clean: true,
  rollup: {
    emitCJS: false,
    inlineDependencies: ['@pkg-placeholder/shared'],
  },
})
