const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './sections/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'blue-opaque': 'rgb(13 42 148 / 18%)'
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.600')
              },
              code: { color: theme('colors.blue.400') }
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300')
            },
            'h2,h3,h4': {
              color: theme('colors.gray.100'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') }
              }
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.500') }
              }
            },
            strong: { color: theme('colors.gray.300') },
            thead: {
              color: theme('colors.gray.100')
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700')
              }
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
};