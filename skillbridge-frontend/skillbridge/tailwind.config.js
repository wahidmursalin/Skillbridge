/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF4FF',
          100: '#DBE6FE',
          400: '#5B8DEF',
          500: '#2563EB',
          600: '#1D4FC4',
          700: '#173D97'
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        canvas: '#F8FAFC',
        ink: '#0F172A',
        surface: {
          light: '#FFFFFF',
          dark: '#111827'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backgroundImage: {
        'bridge-dots': 'radial-gradient(circle, #2563EB33 1px, transparent 1px)'
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(15,23,42,0.06), 0 1px 3px 0 rgba(15,23,42,0.08)'
      }
    }
  },
  plugins: []
}
