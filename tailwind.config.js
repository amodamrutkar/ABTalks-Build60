/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#05030D',
          card: '#0F0A1F',
          cardHover: '#16102E',
        },
        brand: {
          purple: '#8B5CF6',
          violet: '#A855F7',
          deepPurple: '#6D28D9',
          indigo: '#6366F1',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        outfit: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -4px rgba(139, 92, 246, 0.35)',
        'glow-violet': '0 0 25px -4px rgba(168, 85, 247, 0.35)',
        'glow-soft': '0 0 40px -10px rgba(139, 92, 246, 0.25)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'marquee': 'marquee 35s linear infinite',
      }
    },
  },
  plugins: [],
}
