import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (mode === 'production' && env.VITE_API_URL) {
    const url = new URL(env.VITE_API_URL)
    if (url.protocol !== 'https:' || /^(localhost|127\.|192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(url.hostname)) {
      throw new Error('El build de producción necesita una API pública HTTPS.')
    }
  }
  return {
    plugins: [react()],
    server: {
      proxy: { '/api': { target: env.DEV_API_URL || 'http://127.0.0.1:3300', changeOrigin: true } },
    },
    build: {
      rollupOptions: {
        input: {
          home: resolve(__dirname, 'index.html'),
          stories: resolve(__dirname, 'stories/index.html'),
        },
      },
    },
  }
})
