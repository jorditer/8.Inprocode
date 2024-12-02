import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    server: {
      proxy: {
        '/api': {
          target: `http://localhost:${env.PORT || 5000}`, // prevents cors error
          changeOrigin: true
        }
  //   '/public': {
  //     target: 'http://localhost:5000',
  //     changeOrigin: true
  // },
    }
  },
  plugins: [react()],
  root: path.resolve(__dirname, 'frontend'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
  },
}
})