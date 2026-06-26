/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#172B36',
        'alt-bg': '#114C5A',
        primary: '#FFC801',
        secondary: '#FF9932',
        'text-heading': '#F1F6F4',
        'text-body': '#D9E8E2',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
