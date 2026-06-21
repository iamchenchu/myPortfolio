import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` must match the GitHub Pages project path so built asset URLs resolve
// at https://iamchenchu.github.io/myPortfolio/ . The router reads this same
// value via import.meta.env.BASE_URL for its basename.
export default defineConfig({
  base: '/myPortfolio/',
  plugins: [react()],
})
