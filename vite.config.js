import {defineConfig} from 'vite';

export default defineConfig({
    server: {
        port: 3000
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "/src/styles/helpers/mixins.scss" as *;`
            }
        }
    }
})
