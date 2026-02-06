import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist', // 对应 vue.config.js 的 outputDir
    assetsDir: 'static', // 对应 vue.config.js 的 assetsDir
    sourcemap: false, // 对应 vue.config.js 的 productionSourceMap
    rollupOptions: {
      // 对应 vue.config.js 的 configureWebpack
      output: {
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: '[ext]/[name].[hash].[ext]'
      }
    }
  },
  plugins: [
    vue(),
  ],
  server: {
    port: 5173, // 可选：指定前端端口
    proxy: {
      '^/api': {
        target: 'http://192.168.1.100:8085', // 你的后端服务地址
        changeOrigin: true,              // 改变 origin，适用于虚拟主机
        // rewrite: (path) => path.replace(/^\/api/, '') // 可选：重写路径，去掉 /api 前缀
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})