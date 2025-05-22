import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      jsxImportSource: 'react',
      babel: {
        presets: [],
        plugins: [],
      },
      include: /\.(js|jsx)$/,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
