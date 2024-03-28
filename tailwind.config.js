/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'search-bg': "url('/src/assets/images/background.png')",
                '01d': "url('/src/assets/images/01d.png')",
                '01n': "url('/src/assets/images/01n.png')",
                '02d': "url('/src/assets/images/02d.png')",
                '02n': "url('/src/assets/images/02n.png')",
                '03d': "url('/src/assets/images/03d.png')",
                '03n': "url('/src/assets/images/03n.png')",
                '04d': "url('/src/assets/images/04d.png')",
                '04n': "url('/src/assets/images/04n.png')",
                '09d': "url('/src/assets/images/09d.png')",
                '09n': "url('/src/assets/images/09n.png')",
                '11d': "url('/src/assets/images/11d.png')",
                '11n': "url('/src/assets/images/11n.png')",
                '13d': "url('/src/assets/images/13d.png')",
                '13n': "url('/src/assets/images/13n.png')",
                '50d': "url('/src/assets/images/50d.png')",
                '50n': "url('/src/assets/images/50n.png')",
            },
        },
        colors: {
            'blue-light': '#8FB2F5',
            'gray-900': '#13131A',
            'gray-800': '#16161F',
            'gray-700': '#1C1C27',
            'gray-600': '#22222F',
            'gray-500': '#3B3B54',
            'gray-400': '#7F7F98',
            'gray-300': '#ABABC4',
            'gray-200': '#BFBFD4',
            'gray-100': '#FAFAFA',
            white: '#FFFFFF',
        },
        fontFamily: {
            nunito: ['Nunito', 'sans-serif'],
        },
        fontSize: {
            'heading-hg': ['96px', { lineHeight: '100%', fontWeight: 'bolder' }],
            'heading-xl': ['48px', { lineHeight: '120%', fontWeight: 'bolder' }],
            'heading-lg': ['32px', { lineHeight: '140%', fontWeight: 'bold' }],
            'heading-md': ['20px', { lineHeight: '140%', fontWeight: 'bold' }],
            'heading-sm': ['16px', { lineHeight: '140%', fontWeight: 'bold' }],
            'heading-xs': ['14px', { lineHeight: '140%', fontWeight: 'bold' }],
            'text-lg': ['20px', { lineHeight: '140%', fontWeight: '400' }],
            'text-md': ['16px', { lineHeight: '140%', fontWeight: '400' }],
            'text-sm': ['14px', { lineHeight: '140%', fontWeight: '400' }],
            'text-xs': ['12px', { lineHeight: '140%', fontWeight: '400' }],
        },
    },
    plugins: [],
};
