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
        'woodsmoke': '#17171A',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'outer-glow': '-5px 14px 44px #000000, 5px -16px 50px rgba(255, 255, 255, 0.15)',
      }
    }
  },
  plugins: []
}
