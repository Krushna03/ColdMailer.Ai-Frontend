import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      "d3ff-2409-40c2-117-b4c8-6506-a2e3-7e63-fb8e.ngrok-free.app"
    ]
  }
})
