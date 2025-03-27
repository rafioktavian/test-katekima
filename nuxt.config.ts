import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'url'
import { splitVendorChunkPlugin } from 'vite'
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=500, initial-scale=1',
      title: 'Test Katekima',
      htmlAttrs: {
        lang: 'id',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'msapplication-TileColor', content: '#01172f' },
        { name: 'msapplication-TileImage', content: '/mstile-144x144.png' },
        { name: 'theme-color', content: '#01172f' },
      ],
      link: [
        { rel: 'stylesheet', href: '/css/float-label.min.css' },
        { rel: 'stylesheet', href: '/css/icons.css' },
        { rel: 'stylesheet', href: '/css/fonts.css' },
        { rel: 'stylesheet', href: '/css/animate.css' },
        { rel: 'stylesheet', href: '/css/main.css' },
        { rel: 'stylesheet', href: '/css/custom.css' },
        { rel: 'stylesheet', href: '/css/style.css' },
      ],
    },
    rootId: 'app',
  },

  devtools: { enabled: true },

  imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ['stores'],
  },

  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    'nuxt-icons',
  ],

  plugins: [
    '~/core/plugins/vee-validate'
  ],
  runtimeConfig: {
    public: {
    },
  },

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VForm',
      Field: 'VField',
      FieldArray: 'VFieldArray',
      ErrorMessage: 'VErrorMessage',
    },
  },

  css: ['~/assets/css/main.css'],
  vite: {
    build: {
      chunkSizeWarningLimit: 3000,
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
    optimizeDeps: {
      // exclude: [`@ionic/pwa-elements/loader`],
    },
    plugins: [
      tailwindcss(),
      splitVendorChunkPlugin(),
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json'),
        ],
      }),
    ],
  },
  compatibilityDate: '2024-11-01',
})
