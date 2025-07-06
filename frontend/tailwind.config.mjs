export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#F2F5F7",
                surface: "#FFFFFF",
                primary: "#7BA7D7",
                secondary: "#D6E4F0",
                accent: "#A4C3D9",
                "primary-text": "#2C3E50",
                "secondary-text": "#5D6D7E",
                border: "#E0E6EB",
            },
            boxShadow: {
                sm: "0 1px 2px #7C94AF14, 0 2px 4px #7C94AF1F",
                md: "0 2px 4px #7C94AF1F, 0 4px 8px #7C94AF26",
                lg: "0 4px 8px #7C94AF26,0 8px 16px #7C94AF26",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                heading: ["Poppins", "sans-serif"],
            },
        },
    },
    plugins: [],
};
  