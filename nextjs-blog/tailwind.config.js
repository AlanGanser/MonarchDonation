/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto-serif': ['"Roboto Serif"', 'serif'],
      },
      colors: {
        'primary': {
          300: '#f97316', //f97316
        },
        // 'secondary': '#D32C4D',8fced1
        'secondary': '#EA580C',
        'tertiary': '#BE2457',
        'quaternary': '#752569',
      },
    },
  },
  plugins: [
    'prettier-plugin-tailwindcss',
    require('@tailwindcss/forms'),
  ],
}