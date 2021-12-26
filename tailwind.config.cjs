module.exports = {
  content: [
    "./**/*.{html,js,svelte}",
    "../../lib/**/*.{html,js,svelte}"
  ],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['"Roboto"', 'sans-serif'],
      },
      backgroundImage: {
        'led': "url('/led/led-pic-bg.jpg')"
      }
    }
  },
  plugins: [
    require('daisyui'),
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen xl': {
            maxWidth: '1280px',
          },
        }
      })
    }
  ],
  daisyui: {
    themes: [],
  },
}
