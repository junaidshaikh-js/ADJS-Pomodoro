/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', ...fontFamily.sans],
        bebas: ['var(--font-bebas)', ...fontFamily.sans]
      },
      colors: {
        'baltic-sea': '#2B2A30',
        'green-haze': '#09A65A',
        'totem-pole': '#900A0A',
        'ship-gray': '#3A393F',
      }
    }
  },
  plugins: []
}
