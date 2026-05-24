import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                'body-md': ['Figtree', ...defaultTheme.fontFamily.sans],
                'label-md': ['Figtree', ...defaultTheme.fontFamily.sans],
                'headline-md': ['Figtree', ...defaultTheme.fontFamily.sans],
                'headline-lg': ['Figtree', ...defaultTheme.fontFamily.sans],
                'display-lg': ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                background: '#fffbfe',
                'on-background': '#1c1b1f',
                surface: '#fffbfe',
                'on-surface': '#1c1b1f',
                'on-surface-variant': '#49454f',
                'surface-container-low': '#f7f2f7',
                'surface-container-lowest': '#ffffff',
                'surface-container': '#f3eef3',
                primary: '#6750a4',
                'on-primary': '#ffffff',
                'primary-container': '#eaddff',
                'on-primary-container': '#21005e',
                'primary-fixed': '#6750a4',
                secondary: '#625b71',
                'on-secondary': '#ffffff',
                'secondary-container': '#e8def8',
                'on-secondary-container': '#1d192b',
                'secondary-fixed': '#e8def8',
                'on-secondary-fixed': '#1d192b',
                'secondary-container': '#e8def8',
                outline: '#79747e',
                'outline-variant': '#cac7d0',
                error: '#b3261e',
                'on-error': '#ffffff',
                'error-container': '#f9dedc',
            },
            spacing: {
                'margin-mobile': '1rem',
                'margin-desktop': '2rem',
                'gutter': '1rem',
                'stack-sm': '0.5rem',
                'stack-md': '1.5rem',
                'stack-lg': '2rem',
                'section-gap': '3rem',
            },
            maxWidth: {
                'container-max': '1280px',
            },
            fontSize: {
                'display-lg': ['3.5rem', { lineHeight: '4rem', fontWeight: '700' }],
                'headline-lg': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700' }],
                'headline-md': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
                'body-lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
                'body-md': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
                'label-md': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
                'label-sm': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                fadeInUp: {
                    'from': { opacity: '0', transform: 'translateY(30px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                marquee: 'marquee 30s linear infinite',
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
            },
        },
    },

    plugins: [forms],
}
