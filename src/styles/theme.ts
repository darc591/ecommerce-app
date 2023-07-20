import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material';

const customTheme = createTheme({
  breakpoints: {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  },
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: 'white',
        },
      },
    },
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
