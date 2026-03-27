/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#E8F6F7',
          100: '#C5E8EA',
          200: '#8FD1D5',
          300: '#59BAC0',
          400: '#23A3AB',
          500: '#0E7C86',
          600: '#0A5C63',
          700: '#073F44',
          800: '#042A2E',
          900: '#021517',
        },
        hamster: {
          body: '#8B6914',
          belly: '#D4A843',
          nose: '#E8A0B0',
          dark: '#5C4510',
        },
        warm: {
          50: '#FFF9F0',
          100: '#FFF0DB',
          200: '#FFE0B2',
        },
      },
      fontFamily: {
        display: ['"Fredoka"', '"Noto Sans TC"', 'sans-serif'],
        body: ['"Noto Sans TC"', '"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
