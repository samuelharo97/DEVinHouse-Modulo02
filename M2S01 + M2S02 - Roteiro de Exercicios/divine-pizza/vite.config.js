import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components/index.js'),
      '@router': path.resolve(__dirname, './src/router/index.js'),
      '@hooks': path.resolve(__dirname, './src/hooks/index.js'),
      '@styles': path.resolve(__dirname, './src/styles/index.js'),
      '@pages': path.resolve(__dirname, './src/pages/index.js')
    }
  },
  plugins: [react()]
})
