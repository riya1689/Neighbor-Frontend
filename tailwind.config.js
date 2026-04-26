/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        amber: {
          DEFAULT: '#BA7517',
          50: '#FDF8F3',
          100: '#FAF0E5',
          200: '#F3DAC0',
          300: '#EBC49B',
          400: '#E4AE76',
          500: '#DC9851',
          600: '#CE7D2C',
          700: '#BA7517', // Base
          800: '#8A5610',
          900: '#5A380A',
          950: '#321F05',
        },
        teal: {
          DEFAULT: '#1D9E75',
          50: '#EFFDF8',
          100: '#D5F9EB',
          200: '#ABF2D5',
          300: '#81EBBF',
          400: '#57E4A8',
          500: '#3DCE91',
          600: '#2DB37D',
          700: '#1D9E75', // Base
          800: '#167959',
          900: '#0F543E',
          950: '#0A3829',
        }
      },
    },
  },
  plugins: [],
};
