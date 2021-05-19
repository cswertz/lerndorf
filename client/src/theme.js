import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#293244',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: '#FF7262',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffffff',
    },
    grey: {
      main: 'red',
      light: 'red',
      dark: 'red',
      contrastText: '#ffffff',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  // overrides: {
  //   MuiTypography: {
  //     h1: {
  //       fontSize: [16, '!important'],
  //     },
  //   },
  // },
  shape: {
    borderRadius: 4,
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: ['"Helvetica"', 'Arial', 'sans-serif'].join(','),
  },
});

export default theme;
