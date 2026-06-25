import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#f4b000',
          black: '#151515',
          ink: '#242424',
          steel: '#546579',
          line: '#e6e8eb',
          soft: '#f6f7f8',
        },
      },
      boxShadow: {
        subtle: '0 12px 34px rgba(17, 24, 39, 0.08)',
      },
    },
  },
  plugins: [forms],
}

export default config
