/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, /* https://stackoverflow.com/questions/76028495/tailwind-css-is-removing-the-default-styles-for-html-elements-headings-inputs */
  }
}