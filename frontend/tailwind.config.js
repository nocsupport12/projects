/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        dancing: ['Dancing Script', 'cursive'],
        poppins: ['Poppins', 'sans']
      },
      colors: {
        primary: "#3182CE",
        green: "#A7FF0E",
        secondary: "#111827",
        lightDark: "#666666",
        darkModeGray: "#1F1F1F",
        darkModeBlack: "#121212",
        white : "#F5F5F5",
        semidimLight: "#EDF1F7",
        purewhite: "#FFFFFF",
        lightGray: "#F6F6F9",

        purple: {
          350: "#5568FE",
          
         },

         gray: {
          350: "#1F2937",
          650: "#202427"
         }
      },
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
};
