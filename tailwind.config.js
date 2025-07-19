/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* light gray */
        input: 'var(--color-input)', /* pure white */
        ring: 'var(--color-ring)', /* professional blue */
        background: 'var(--color-background)', /* warm off-white */
        foreground: 'var(--color-foreground)', /* near-black with subtle warmth */
        primary: {
          DEFAULT: 'var(--color-primary)', /* professional blue */
          foreground: 'var(--color-primary-foreground)' /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* sophisticated slate */
          foreground: 'var(--color-secondary-foreground)' /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* clear red */
          foreground: 'var(--color-destructive-foreground)' /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* light gray background */
          foreground: 'var(--color-muted-foreground)' /* medium gray text */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* lighter blue */
          foreground: 'var(--color-accent-foreground)' /* white */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* pure white */
          foreground: 'var(--color-popover-foreground)' /* near-black */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* pure white */
          foreground: 'var(--color-card-foreground)' /* near-black */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* professional green */
          foreground: 'var(--color-success-foreground)' /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber */
          foreground: 'var(--color-warning-foreground)' /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* clear red */
          foreground: 'var(--color-error-foreground)' /* white */
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }]
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px'
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'modal': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'dropdown': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'floating': '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
        'slide-down': 'slideDown 300ms cubic-bezier(0.4, 0, 0.2, 1)'
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms'
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      zIndex: {
        '1000': '1000',
        '1100': '1100',
        '1200': '1200',
        '2000': '2000'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ]
}