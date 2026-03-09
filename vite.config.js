import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
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
