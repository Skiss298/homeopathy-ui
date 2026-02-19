/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',   // (safe even if you don't use /pages)
    './src/**/*.{js,ts,jsx,tsx,mdx}',     // (safe even if you don't use /src)
  ],
  theme: {
    extend: {
      colors: {
        forest: '#4E6F75',
        sage: '#E1E6E5',
        cream: '#F7F5F0',
        charcoal: '#2E3536',
        gold: '#C6A15B',
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
