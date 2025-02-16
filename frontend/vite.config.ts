import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from '@tailwindcss/vite'
//import path from 'path-browserify'; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(),tailwindcss()],
  resolve: {
    alias: {
      '@': '/src'
    },
  },
})
