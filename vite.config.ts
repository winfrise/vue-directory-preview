import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'src/mock',
      enable: true,
      watchFiles: true
    })
  ],
  server: {
    port: 5173, // 可选：指定前端端口
    proxy: {
      '/api/albums': {
        target: 'http://192.168.1.100:8085', // 你的后端服务地址
        changeOrigin: true,              // 改变 origin，适用于虚拟主机
        rewrite: (path) => path.replace(/^\/api/, '') // 可选：重写路径，去掉 /api 前缀
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})