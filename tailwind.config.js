/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        mono: ['var(--font-mono)', 'Geist Mono', 'monospace'],
      },
      colors: {
        metal: {
          chrome: '#e8e8e8',
          silver: '#c0c0c0',
          steel: '#8a8a9a',
          gunmetal: '#2a2a35',
        },
      },
      keyframes: {
        'grain-drift': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-1px, 1px)' },
          '50%': { transform: 'translate(1px, -1px)' },
          '75%': { transform: 'translate(-1px, -1px)' },
        },
        'marquee-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'silver-shine': {
          '0%': { backgroundPosition: '-200%' },
          '100%': { backgroundPosition: '200%' },
        },
        'subtitle-breathe': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.02)' },
        },
        'particle-float': {
          '0%, 100%': { opacity: '0.6', transform: 'translateY(0px)' },
          '50%': { opacity: '1', transform: 'translateY(-6px)' },
        },
        'onyx-pulse': {
          '0%, 100%': { borderColor: 'rgba(255,255,255,0.05)', boxShadow: '0 0 20px 2px rgba(255,255,255,0.05)' },
          '50%': { borderColor: 'rgba(255,255,255,0.15)', boxShadow: '0 0 35px 5px rgba(255,255,255,0.08)' },
        },
      },
      animation: {
        'grain-drift': 'grain-drift 8s linear infinite',
        'marquee-scroll': 'marquee-scroll 30s linear infinite',
        'silver-shine': 'silver-shine 3s linear infinite',
        'subtitle-breathe': 'subtitle-breathe 4s ease-in-out infinite',
        'particle-float': 'particle-float 2s ease-in-out infinite',
        'onyx-pulse': 'onyx-pulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
