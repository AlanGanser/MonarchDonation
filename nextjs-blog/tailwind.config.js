/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.tsx",
    "./componenets/**/*.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto-serif': ['"Roboto Serif"', 'serif'],
      },
    },
  },
  plugins: [
    'prettier-plugin-tailwindcss',
    require('@tailwindcss/forms'),
  ],
}