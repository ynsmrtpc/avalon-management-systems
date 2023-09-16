/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './layouts/**/*.{js,ts,jsx,tsx,mdx}',
        'node_modules/preline/dist/*.js',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                primary_bg_dark: '#131727',
                primary_bg_light: '#f9fafb',
                card_bg_dark: '#212837',
                card_bg_light: '#ffffff',
                primary_logo_light: '#fdfcd7',
                primary_logo_dark: '#9D8050',
            }
        },
    },
    plugins: [
        require('preline/plugin'),
    ],
}
