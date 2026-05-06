import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Set `base` to match your GitHub Pages URL path.
// If your site is at https://username.github.io/csdm5/ → base: '/csdm5/'
// If it's at https://username.github.io/ (root) → base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/csdm5/',
})
