import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "/src/styles/helpers/mixins.scss" as *;',
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.vue'],
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
});
