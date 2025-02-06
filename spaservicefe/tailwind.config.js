/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,jsx,ts,tsx,scss}' // Thêm đuôi .scss
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        'purple1': '#9E5CA6'
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)'
      },
      backgroundImage: {
        'custom-bg1': "url('https://senspa.com.vn/wp-content/themes/thuythu/images/bf_slider.png')",
        'custom-bg2': "url('https://senspa.com.vn/wp-content/themes/thuythu/images/bf_site.png')",
        'custom-bg3': "url('https://senspa.com.vn/wp-content/uploads/2020/11/bg_about_us.png')",
        'custom-bg4': "url('https://senspa.com.vn/wp-content/themes/thuythu/images/bf_process_history.png')",
        'custom-bg5': "url('https://senspa.com.vn/wp-content/themes/thuythu/images/bg_spa.png')"
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    }
  },
  plugins: [require('tailwindcss-animate')]
}
