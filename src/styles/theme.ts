import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material';

const customTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {},
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    neutral: {
      main: '#555555',
      contrastText: '#FFFFFF',
    },
  },
} as ThemeOptions);

export const theme = responsiveFontSizes(customTheme);
