/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/view/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        109: '27.25rem',
        100: '25.125rem',
        buttonWidth: '127px',
        buttonHeight: '52px',
      },
      colors: {
        grayblue: '#3A4562',
        'button-bg': '#384564',
        'grey-text': 'rgba(56, 65, 93, 0.355988)',
        'amber-100': '#FFCF0026',
        'amber-700': '#988B49',
      },
      screens: {
        desktop: '1600px',
      },
    },
  },
  plugins: [],
};

