/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Enable debug screens via experimental (most common method now)
  experimental: {
    debugScreens: {
      position: ['bottom', 'left'],
    },
  },
};