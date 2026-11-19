import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

const QUANTA_ICONS_SHIM = fileURLToPath(new URL('../../src/lib/quanta-material-icons.ts', import.meta.url))
const QUANTA_ICONS_PATTERN = new RegExp('^@higgsfield-ai/icons(/.*)?$')

export default defineConfig({
  resolve: {
    alias: [{ find: QUANTA_ICONS_PATTERN, replacement: QUANTA_ICONS_SHIM }],
  },
  test: {
    projects: [
      {
        test: {
          name: 'codegen',
          environment: 'node',
          include: ['scripts/**/*.test.ts'],
        },
      },
      {
        test: {
          name: 'runtime',
          environment: 'happy-dom',
          include: ['src/runtime/**/*.test.ts'],
        },
      },
      {
        resolve: {
          alias: [{ find: QUANTA_ICONS_PATTERN, replacement: QUANTA_ICONS_SHIM }],
        },
        test: {
          name: 'components',
          environment: 'happy-dom',
          include: ['src/components/**/*.test.tsx'],
          setupFiles: ['./src/test/setup-components.ts'],
          alias: {
            'use-sync-external-store/shim/with-selector':
              'use-sync-external-store/shim/with-selector.js',
            'use-sync-external-store/shim': 'use-sync-external-store/shim/index.js',
            'use-sync-external-store/with-selector': 'use-sync-external-store/with-selector.js',
          },
          server: {
            deps: {
              inline: [/use-sync-external-store/, /@base-ui\/react/],
            },
          },
        },
      },
    ],
  },
})
