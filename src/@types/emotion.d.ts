import '@emotion/react';
import '@mui/material/styles';
import '@s_mart/core';
import type { Theme as MaterialUITheme } from '@mui/material';

declare module '@mui/material/styles' {
  export interface ThemeOptions {}
}

declare module '@emotion/react' {
  export interface Theme extends MaterialUITheme {}
}
