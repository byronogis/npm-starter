import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  preflights: [
    { layer: 'starlight', getCSS: () => undefined },
  ],
  layers: {
    starlight: 1,
    default: 2,
  },
  outputToCssLayers: {
    cssLayerName(layer) {
      if (layer === 'starlight') {
        return 'starlight'
      }

      return layer === 'default'
        ? 'uno-default'
        : `uno.${layer}`
    },
  },
  shortcutsLayer: 'default',
  shortcuts: [
    {
      'bg-base': 'bg-white dark:bg-black',
      'color-base': 'text-black dark:text-white',
      'border-base': 'border-[#8884]',
    },
    [/^btn-(\w+)$/, ([_, color]) => `op50 px2.5 transition-all duration-200 ease-out no-underline! hover:(op100 text-${color} bg-${color}/10) border border-base! rounded`],
  ],
  presets: [
    presetWind4(),
    presetIcons({
      autoInstall: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'width': '1.2em',
        'height': '1.2em',
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  safelist: [
    // ...
  ],
  rules: [
    [/^grid-wrap-(.+)$/, ([, s]) => ({ 'grid-template-columns': `repeat(auto-fit, minmax(${s}, 1fr))` })],
  ],
})
