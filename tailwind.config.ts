import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"; // ES module import

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Add custom themes here if needed
  },
  plugins: [typography], // Use the imported typography plugin
};

export default config;
