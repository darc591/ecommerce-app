import Routes from './containers/routes/routes';
import { ThemeProvider } from '@mui/material';
import './styles/global.css';
import { theme } from './styles/theme';
import i18next from 'i18next';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/es/zod.json';
import { z } from 'zod';
import AppLoader from 'components/appLoader/appLoader';

i18next.init({
  lng: 'es',
  resources: {
    es: { zod: translation },
  },
});

z.setErrorMap(zodI18nMap);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppLoader />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
