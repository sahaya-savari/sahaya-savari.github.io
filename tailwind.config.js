/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#C1E5E7',
        cream: {
          DEFAULT: '#FCF9E0',
          bg: '#FCFAF3',
        },
        gold: {
          DEFAULT: '#DCD27D',
        },
        primary: {
          DEFAULT: '#652929',
        },
        'border-muted': '#7C4844',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero': ['clamp(2.75rem, 0.42vw + 2.4rem, 9.50625rem)', { lineHeight: '0.94', letterSpacing: '-1.1px', fontWeight: '700' }],
        'section-h2': ['clamp(2rem, 0.21vw + 1.33rem, 4.753125rem)', { lineHeight: '0.98', letterSpacing: '-0.5px', fontWeight: '700' }],
        'section-h3': ['clamp(1.375rem, 0.07vw + 1.15rem, 2.3765625rem)', { lineHeight: '1.12', fontWeight: '700' }],
        'subtitle': ['clamp(1.125rem, 0.065vw + 0.92rem, 2.07949375rem)', { lineHeight: '1.1', letterSpacing: '-0.665438px', fontWeight: '500' }],
        'body-lg': ['clamp(0.9375rem, 0.03vw + 0.84rem, 1.33681875rem)', { lineHeight: '1.4', fontWeight: '400' }],
        'body-md': ['clamp(0.875rem, 0.025vw + 0.80rem, 1.18828125rem)', { lineHeight: '1.4', fontWeight: '400' }],
        'body-sm': ['clamp(0.875rem, 0.015vw + 0.83rem, 1rem)', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['clamp(0.8125rem, 0.01vw + 0.78rem, 0.875rem)', { lineHeight: '1.4', fontWeight: '400' }],
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px #652929',
        'brutal-reverse': '-8px -8px 0px 0px #652929',
        'brutal-hover': '4px 4px 0px 0px #652929',
        'brutal-none': '0px 0px 0px 0px #652929',
        'soft': 'rgba(164, 168, 192, 0.2) 0px 2px 12px 0px',
      },
      borderWidth: {
        'ref': '0.8px',
      },
      borderRadius: {
        'navbar': '48.0949px',
        'cta': '47.5312px',
        'badge': '24.0475px',
        'input': '24px',
        'submit': '100px',
        'view-all': '59.4141px',
        'story': '118.828px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out 1.5s infinite',
        'marquee': 'marquee 18s linear infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      spacing: {
        'page-x': '73px',
        'page-x-sm': '16px',
        'col-pad': '48px',
        'col-pad-sm': '24px',
        'navbar-top': '48px',
        'navbar-top-sm': '24px',
      },
      maxWidth: {
        'navbar': '1390px',
        'content': '1390px',
        'blog-content': '1190px',
        'newsletter-input': '754px',
      },
      height: {
        'navbar': '67.46px',
        'hero': '840px',
        'hero-sm': '600px',
      },
      width: {
        'logo': '57px',
        'social-icon': '47.525px',
      },
    },
  },
  plugins: [],
}
