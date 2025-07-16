import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
            },
            keyframes: {
                shake: {
                    '0%': { transform: 'translateX(0)' },
                    '10%': { transform: 'translateX(-5px)' },
                    '20%': { transform: 'translateX(5px)' },
                    '30%': { transform: 'translateX(-5px)' },
                    '40%': { transform: 'translateX(5px)' },
                    '50%': { transform: 'translateX(0)' },
                    '60%': { transform: 'translateX(-5px)' },
                    '70%': { transform: 'translateX(5px)' },
                    '80%': { transform: 'translateX(-5px)' },
                    '90%': { transform: 'translateX(5px)' },
                    '100%': { transform: 'translateX(0)' }
                }
            },
            animation: {
                shake: 'shake 6s ease-in-out'
            }
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                lg: "4rem",
                xl: "5rem",
                "2xl": "6rem"
            }
        },
        screens: {
            xs: "375px", // iPhone SE / small mobile
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px"
        }
    },
    plugins: [
        require('tailwindcss-motion'),
        require('tailwindcss-intersect')
    ]
};

export default config;
