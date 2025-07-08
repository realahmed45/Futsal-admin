// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      // Liga Futsoul Custom Colors
      colors: {
        "futsoul-green": {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        "cyber-blue": {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      // Custom Fonts
      fontFamily: {
        orbitron: ["Orbitron", "monospace"],
        rajdhani: ["Rajdhani", "sans-serif"],
        sans: ["Rajdhani", "ui-sans-serif", "system-ui"],
      },
      // Custom Animations
      animation: {
        "bounce-slow": "bounce 3s infinite",
        "pulse-fast": "pulse 1s infinite",
        "spin-slow": "spin 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        confetti: "confetti-fall 3s linear forwards",
      },
      // Custom Keyframes
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-20px) rotate(180deg)",
          },
        },
        glow: {
          "0%": {
            boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
          },
          "100%": {
            boxShadow: "0 0 40px rgba(34, 197, 94, 0.8)",
          },
        },
        "confetti-fall": {
          "0%": {
            transform: "translateY(-100vh) rotate(0deg)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(100vh) rotate(720deg)",
            opacity: "0",
          },
        },
      },
      // Custom Box Shadows
      boxShadow: {
        "neon-green":
          "0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)",
        "neon-blue":
          "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)",
        "neon-red":
          "0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(239, 68, 68, 0.3)",
        "neon-yellow":
          "0 0 20px rgba(245, 158, 11, 0.5), 0 0 40px rgba(245, 158, 11, 0.3)",
        glass: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        cyber: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
      },
      // Custom Backdrop Blur
      backdropBlur: {
        xs: "2px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },
      // Custom Border Radius
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      // Custom Spacing
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
    },
  },
  plugins: [],
};
