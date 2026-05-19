/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /** Derived from Gecko Hostel logo: cream ground, forest + sage greens */
        gecko: {
          cream: '#f4f1ea',
          sand: '#e6e1d6',
          mist: '#dce6df',
          forest: '#1e3d32',
          forestDeep: '#142923',
          sage: '#7d9d86',
          sageLight: '#a8c9b0',
          clay: '#b85c3a',
        },
        primary: '#1e3d32',
        dark: '#142923',
      },
      fontFamily: {
        /** Nav / caps: closest free match to logo’s bold condensed “woodblock” feel */
        nav: ['"Bebas Neue"', 'Impact', 'Haettenschweiler', 'sans-serif'],
        display: ['Comfortaa', 'cursive', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        label: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
