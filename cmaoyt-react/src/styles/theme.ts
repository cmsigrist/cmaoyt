import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#022747',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#ffc107',
    },
    white: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#FFFFFF',
      contrastText: '#000000',
    },
  },
});
