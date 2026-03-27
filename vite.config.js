import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        try: resolve(__dirname, 'try.html')
      }
    }
  },
  // Copy static site files to dist
  publicDir: 'public'
})
