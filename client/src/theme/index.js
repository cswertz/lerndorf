import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

export const colors = {
  primary: {
    light: '#D8E2F7',
    // medium: '#8997B1',
    main: '#7A95CA',
    // dark: '#56657F',
    dark: '#293244',
  },
  secondary: {
    // light: '#D8E2F7',
    main: '#7A95CA',
    // dark: '#293244',
  },
  tertiary: {
    // light: '#D8E2F7',
    main: '#616161',
    // dark: '#293244',
  },
  accent: '#FF7262',
  grey: {
    50: '#ffffff',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  textPrimary: '#2D3748',
  textSecondary: '#2B6CB0',
  // textTertiary: '',
  success: {
    main: '#0ACF2A',
  },
  // info: {
  //   main: '',
  // },
  // warning: {
  //   main: '',
  // },
  danger: {
    main: '#f44336',
  },
};

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      light: colors.primary.light,
      main: colors.primary.dark,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: colors.secondary.main,
      // dark: will be calculated from palette.secondary.main,
      contrastText: colors.textPrimary,
    },
    // grey: {
    //   main: 'red',
    //   light: 'red',
    //   dark: 'red',
    //   contrastText: '#ffffff',
    // },
    success: {
      main: colors.success.main,
    },
    text: {
      secondary: colors.textSecondary,
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    allVariants: {
      color: colors.textPrimary,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
    fontFamily: ['"Helvetica"', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '3rem',
    },
    h3: {
      // fontSize: '1rem',
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
  },
});

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
