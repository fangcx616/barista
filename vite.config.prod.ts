import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    // 核心修复：确保生产环境资源路径正确
    base: '/barista/', 
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: false, 
        rollupOptions: {
            output: {
                manualChunks: undefined
            }
        }
    }
})