import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DFFF5A", 
        secondary: "#222222",
        thirdly: "#D9D9D9",
        backPrimary: "#F0F0F0", 
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        DEFAULT: "16px",
        sm: "14px",
        md: "18px",
        lg: "20px",
        xl: "24px",
        xl2: "32",
      },
      borderRadius: {
        DEFAULT: "12px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
    },
  },
  plugins: [],
} satisfies Config;

