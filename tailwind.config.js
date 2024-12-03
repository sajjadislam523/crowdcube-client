/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        "nunito": ["Nunito", "sans-serif"],
      }
    },
  },
  plugins: [daisyui],
}

