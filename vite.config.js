import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
 base: '/Campaign-Tracker-/',/ Change this to your GitHub repo name
})
