import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F3A7D', // Deep blue
        accent: '#C9A961', // Gold
        light: '#FAF8F3', // Warm beige
        text: '#3D4D61', // Slate gray
        border: '#E8E5DC', // Light gray
        success: '#4CAF50',
        error: '#D32F2F',
      },
      fontFamily: {
        sans: ["'Heebo'", 'system-ui', '-apple-system', 'sans-serif'],
        serif: ["'Playfair Display'", 'Georgia', 'serif'],
      },
      spacing: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
        '5xl': '8rem',
      },
      fontSize: {
        xs: '13px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '28px',
        '3xl': '36px',
        '4xl': '48px',
      },
    },
  },
  plugins: [],
};

export default config;
