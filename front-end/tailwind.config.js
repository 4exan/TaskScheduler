/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "fira-mono": ["Fira Mono", "monospace"],
      },
      colors: {
        crust: "#11111b",
        mantle: "#181825",
        base: "#1e1e2e",
        surface: {
          0: "#313244",
          1: "#45475a",
          2: "#585b70",
        },
        overlay: {
          0: "#6c7086",
          1: "#7f849c",
          2: "#9399b2",
        },
        subtext: {
          0: "#a6adc8",
          1: "#bac2de",
        },
        text: "#cdd6f4",
        lavander: "#b4befe",
        blue: "#89b4fa",
        sapphire: "#74c7ec",
        sky: "#89dceb",
        teal: "#94e2d5",
        green: "#a6e3a1",
        yellow: "#f9e2af",
        peach: "#fab387",
        maroon: "#eba0ac",
        red: "#f38ba8",
        mauve: "#cba6f7",
        pink: "#f5c2e7",
        flamingo: "#f2cdcd",
        rosewater: "#f5e0dc",
      },
    },
  },
  plugins: [],
};