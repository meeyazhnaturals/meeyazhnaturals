/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'meeyazh': {
                    50: '#f6f7f2', // light cream
                    100: '#e9ede0',
                    200: '#d5deca',
                    300: '#b8c9ab',
                    400: '#94af80', // muted sage
                    500: '#758e61', // earthy green
                    600: '#5a7149',
                    700: '#46583a',
                    800: '#3a4831',
                    900: '#323d2b',
                },
                'earth': {
                    50: '#faf7f2',
                    100: '#f2eae0',
                    200: '#e3d0bb',
                    300: '#ceaf8d',
                    400: '#b78c64',
                    500: '#a7754d', // warm brown
                    600: '#986442',
                    700: '#7f5139',
                    800: '#684333',
                    900: '#56392c',
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Outfit"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
