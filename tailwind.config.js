/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        800: '#121212',
        700: '#1e2023',
        600: '#282b2f',
        500: '#33363a',
        400: '#4f5358',
        300: '#73777d',
        200: '#9a9ca0',
        100: '#d5d7d9',
        50: '#e9ebed',
        red: '#ff4d4d',
        green: {
          DEFAULT: '#33cc33',
          500: '#22c55e', // Added this for the success toast
        },
        blue: {
          DEFAULT: '#3399ff',
          500: '#3b82f6', // Added this for the button background
          600: '#2563eb', // Added this for the button hover state
        },
        yellow: {
          DEFAULT: '#ffcc33',
          500: '#eab308', // Added this for the icon color
        },
        purple: '#cc66ff',
        orange: '#ff9933',
        cyan: '#33cccc',
        pink: '#ff6699',
        gray: {
          DEFAULT: '#666666',
          50: '#f9fafb', // Added this for the footer background
          100: '#f3f4f6', // Added this for border colors
          200: '#e5e7eb', // Added this for border colors
          500: '#6b7280', // Added this for text colors
          600: '#4b5563', // Added this for text colors
          700: '#374151', // Added this for text colors
          800: '#1f2937', // Added this for text colors
        },
        white: '#ffffff',
        black: '#000000',
        primary: '#ff4d4d',
        guru: '#ed8936',
        master: '#9f7aea',
        artisan: '#f56565',
        professional: '#ecc94b',
        skilled: '#4299e1',
        beginner: '#48bb78',
      },
      borderOpacity: theme => theme('opacity'),
      borderColor: theme => ({
        ...theme('colors'),
      }),
      textColor: theme => ({
        ...theme('colors'),
      }),
    },
  },
  plugins: [],
  safelist: [
    'text-guru',
    'text-master',
    'text-artisan',
    'text-professional',
    'text-skilled',
    'text-beginner',
    'border-guru',
    'border-master',
    'border-artisan',
    'border-professional',
    'border-skilled',
    'border-beginner',
  ],
}
