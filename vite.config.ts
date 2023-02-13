import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
        less: {
            modifyVars: {
                hack: `true; @import "${path.join(__dirname, './src/assets/less/index.less')}";`,
            },
            javascriptEnabled: true,
        },
    },
},
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/package.ts'),
      name: 'modestiny',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        }
      }
    },
  },
})
