import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/faceDetector/',
  plugins: [react()],
  preview: {
    port: parseInt(process.env.PORT) || 8080, // Use PORT env variable or default to 4173
    host: '0.0.0.0', // Allow access from outside the container
    allowedHosts: ["facedetector-web.onrender.com", "localhost"],
  },
})
