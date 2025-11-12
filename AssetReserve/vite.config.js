import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/Projeto-PW2/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        reservas: resolve(__dirname, 'reservas.html'),
      },
    },
  },
})
