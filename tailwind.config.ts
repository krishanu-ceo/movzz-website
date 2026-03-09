import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020810',
          900: '#030B18',
          800: '#061224',
          700: '#0D1A2D',
          600: '#112240',
          500: '#1A3558',
        },
        brand: {
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          'blue-light': '#3B82F6',
          'blue-glow': 'rgba(37,99,235,0.25)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'pulse-blue': 'pulseBlue 2.5s ease-in-out infinite',
        'pulse-red': 'pulseRed 1.5s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        ticker: 'ticker 25s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'crack': 'crack 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-14px) rotate(1.5deg)' },
          '66%': { transform: 'translateY(7px) rotate(-1deg)' },
        },
        pulseBlue: {
          '0%,100%': { boxShadow: '0 0 20px rgba(37,99,235,0.3), 0 0 60px rgba(37,99,235,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(37,99,235,0.6), 0 0 120px rgba(37,99,235,0.2)' },
        },
        pulseRed: {
          '0%,100%': { boxShadow: '0 0 20px rgba(239,68,68,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(239,68,68,0.7), 0 0 100px rgba(239,68,68,0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        bounceSoft: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        crack: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.05) rotate(2deg)' },
          '100%': { opacity: '0', transform: 'scale(0.8) rotate(-5deg)', display: 'none' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)',
        'blue-glow': 'radial-gradient(circle at center, rgba(37,99,235,0.2) 0%, transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
