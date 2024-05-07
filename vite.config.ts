import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import prism from 'vite-plugin-prismjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    prism({
      languages: [
        'javascript', 'typescript', 'cpp', 'cmake'
      ],
      theme: 'twilight',
      css: true
    })
  ],
})
