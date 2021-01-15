module.exports = {
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      noto: ['Noto\\ Sans\\ JP', 'sans-serif']
    },
    extend: {
      colors:{
        primary: "#2F80ED",
        'primary_hover': '#2569C5',
        gray1: "#FAFAFA",
        gray2: "#F2F2F2",
        gray3: "#FAFAFA",
        gray4: "BDBDBD",
        gray5: "#4F4F4F",
        red1: "EB5757",
        green2: "27AE60",
        blue2: "2D9CDB",
        
      },
      height: {
        navbar: '68px',
        withoutNavbar: 'calc(100vh - 68px)'
      },
      width: {
        authContainer: "500px"
      },
      maxWidth: {
        container: "1120px"
      }
    }
  },
  variants: {},
  plugins: [],
  purge: {
    // Filenames to scan for classes
    content: [
      './src/**/*.html',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.ts',
      './src/**/*.tsx',
      './public/index.html',
    ],
    // Options passed to PurgeCSS
    options: {
      // Whitelist specific selectors by name
      // safelist: [],
    },
  },
}
