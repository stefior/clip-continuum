/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  content: [],
  theme: {
    fontFamily: {
      'title': ['Montserrat', 'Helvetica', 'Arial', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}

