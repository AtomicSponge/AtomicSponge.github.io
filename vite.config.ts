import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import prism from 'vite-plugin-prismjs'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), cssInjectedByJsPlugin(),
    prism({
      languages: [
        'javascript', 'typescript', 'cpp', 'cmake'
      ],
      theme: 'twilight',
      css: true
    })
  ],
})
