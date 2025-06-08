
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,css}"],
  theme: {
    extend: {
      fontFamily: {
        supersonic: ['supersonic', 'sans-serif'],
        contrax: ['contrax', 'sans-serif'],
        osaka: ['osaka', 'sans-serif'],
        dune: ['dune', 'sans-serif'],
        neuro: ['neuro', 'sans-serif'],
        cool: ['cool', 'sans-serif'],
      },
    },
  },
  plugins: [],
}