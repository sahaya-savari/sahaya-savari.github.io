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
        display: ['Impact', '"Arial Black"', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero': ['152.1px', { lineHeight: '136.89px', letterSpacing: '-3.042px', fontWeight: '700' }],
        'section-h2': ['76.05px', { lineHeight: '72.2475px', letterSpacing: '-1.521px', fontWeight: '700' }],
        'section-h3': ['38.025px', { lineHeight: '41.8275px', fontWeight: '700' }],
        'subtitle': ['33.2719px', { lineHeight: '36.5991px', letterSpacing: '-0.665438px', fontWeight: '500' }],
        'body-lg': ['21.3891px', { lineHeight: '29.9447px', fontWeight: '400' }],
        'body-md': ['19.0125px', { lineHeight: '26.6175px', fontWeight: '400' }],
        'body-sm': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label': ['14px', { lineHeight: '19.6px', fontWeight: '400' }],
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
        'col-pad': '48px',
        'navbar-top': '48px',
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
      },
      width: {
        'logo': '57px',
        'social-icon': '47.525px',
      },
    },
  },
  plugins: [],
}
