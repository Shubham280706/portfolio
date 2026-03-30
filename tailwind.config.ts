import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#171311",
        cream: "#F7F4EE",
        sage: "#7A8DFF",
        border: "rgba(23, 19, 17, 0.1)"
      },
      fontFamily: {
        display: ["var(--font-bodoni)"],
        body: ["var(--font-manrope)"],
        mono: ["var(--font-space-mono)"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 19, 17, 0.06)",
        card: "0 24px 60px rgba(23, 19, 17, 0.1)"
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem"
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-slow": "marquee 42s linear infinite",
        bounceSoft: "bounceSoft 2.8s ease-in-out infinite",
        shimmer: "shimmer 14s linear infinite"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        }
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.25, 0.1, 0.25, 1)"
      }
    }
  },
  plugins: []
};

export default config;
