import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        cream: {
          50: '#fdfcf9',
          100: '#fbf9f4',
          200: '#f5f1e8',
        },
        brand: {
          green: '#1b6b45',
          emerald: '#1b6b45',
        },
      },
    },
  },
}
