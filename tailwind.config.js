/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'btn': 'rgba(51, 51, 51, 0.5)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}