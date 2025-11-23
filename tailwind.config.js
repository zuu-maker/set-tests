/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-cyan": "#00acc1",
        "secondary-cyan": "#00e5ff",
        "light-cyan": "#b2ebf2",
        "pale-cyan": "#e0f7fa",
        "dark-text": "#1a1a2e",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
