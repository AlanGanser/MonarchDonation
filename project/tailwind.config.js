/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.tsx"
  ],
  // purge: false,
  // safelist: [
  //   {
  //     pattern: /-top-./},
  // ],
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