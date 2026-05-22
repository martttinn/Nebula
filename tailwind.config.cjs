/** @type {import("tailwindcss").Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        muted: "var(--muted)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        ring: "var(--ring)",
        nebula: {
          void: "#09090F",
          navy: "#0A0F2E",
          lilac: "#534AB7",
          silver: "#E8E8F0",
          haze: "#B5B1E3",
          line: "#24243A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        panel: "0 24px 80px rgba(4, 5, 15, 0.38)",
        glow: "0 0 0 1px rgba(232, 232, 240, 0.08), 0 20px 60px rgba(83, 74, 183, 0.24)",
      },
      backgroundImage: {
        "nebula-grid":
          "linear-gradient(to right, rgba(232, 232, 240, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(232, 232, 240, 0.05) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(circle at top, rgba(83, 74, 183, 0.22), transparent 42%), radial-gradient(circle at 85% 20%, rgba(10, 15, 46, 0.72), transparent 32%), linear-gradient(180deg, rgba(9, 9, 15, 0.96), rgba(9, 9, 15, 1))",
      },
      keyframes: {
        "soft-float": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(16px, -18px, 0) scale(1.04)" },
        },
      },
      animation: {
        "soft-float": "soft-float 7s ease-in-out infinite",
        orbit: "orbit 28s linear infinite",
        shimmer: "shimmer 10s linear infinite",
        drift: "drift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

module.exports = config;
