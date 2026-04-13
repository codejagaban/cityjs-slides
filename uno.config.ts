import { defineConfig } from 'unocss'

export default defineConfig({
  safelist: [
    ...Array.from({ length: 30 }, (_, i) => `delay-${(i + 1) * 100}`),
    'animate-pulse',
  ],
})
