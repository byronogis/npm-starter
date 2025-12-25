import recat from '@astrojs/react'
import starlight from '@astrojs/starlight'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  base: '/pkg-placeholder/',
  site: 'https://byronogis.github.io/pkg-placeholder/',
  integrations: [
    vue(),
    recat(),
    UnoCSS(),
    starlight({
      title: 'pkg-placeholder',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/byronogis/pkg-placeholder' }],
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
      ],
    }),
  ],
})
