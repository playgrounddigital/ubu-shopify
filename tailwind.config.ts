module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
    './constants/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    listStyleType: {
      tick: '✓',
      alpha: 'lower-alpha',
      roman: 'lower-roman',
    },
    screens: {
      // Used to override main styles
      xxs: '1px',
      xs: '390px',
      xsm: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '1.5xl': '1440px',
      '2xl': '1536px',
      '3xl': '1900px',
    },
    extend: {
      colors: {
        'contact-card': {
          border: '#C5C5C5',
        },
        switch: { border: '#3C3C3C', thumb: '#1E1E1E' },
        form: {
          success: '#3BC93B',
        },
        'loading-dot': {
          grey: '#D9D9D9',
        },
        grey: {
          black: '#0D0D0D',
          950: '#0D1403',
          900: '#161616',
          800: '#1F1F1F',
          700: '#323232',
          600: '#454545',
          500: '#696969',
          300: '#B2B2B2',
          200: '#B2B2B2',
          100: '#EDEDED',
        },
      },
    },
    fontFamily: {
      sans: ['var(--font-geist)'],
      display: ['var(--font-instrument-serif)'],
      mono: ['var(--font-ibm-plex-mono)'],
      hellovetica: ['"Hellovetica"', 'sans-serif'],
      doto: ['var(--font-doto)'],
    },
  },
}
