import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

export const colors = {
  primary: '#293244',
  secondary: '#FF7262',
  tertiary: '#616161',
  textPrimary: '#2D3748',
  textSecondary: '#2B6CB0',
  textTertiary: '',
  success: '#0ACF2A',
  info: '',
  warning: '',
  danger: '#f44336',
};

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: colors.primary,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: colors.secondary,
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffffff',
    },
    // grey: {
    //   main: 'red',
    //   light: 'red',
    //   dark: 'red',
    //   contrastText: '#ffffff',
    // },
    success: {
      main: colors.success,
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
