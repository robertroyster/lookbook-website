import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

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
