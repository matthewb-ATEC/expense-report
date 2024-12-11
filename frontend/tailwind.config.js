/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F9FAFB',
          DEFAULT: '#FFFFFF',
          dark: '#1F2937',
        },
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          muted: '#9CA3AF',
        },
        container: {
          light: '#FFFFFF',
          DEFAULT: '#F3F4F6',
          dark: '#374151',
        },
        atec: {
          light: '#0278ed',
          DEFAULT: '#0152A1',
          dark: '#012c56',
        },
      },
      fontFamily: {
        sans: ['Century Gothic', 'sans-serif'],
      },
    },
    screens: {
      md: '640px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
}
