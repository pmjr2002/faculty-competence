/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust the paths according to your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [

  ],
}