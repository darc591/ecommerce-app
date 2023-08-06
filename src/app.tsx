import Routes from './containers/routes/routes';
import { ThemeProvider } from '@mui/material';
import './styles/global.css';
import { theme } from './styles/theme';
import i18next from 'i18next';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/es/zod.json';
import { z } from 'zod';
import AppLoader from 'components/appLoader/appLoader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';

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
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </ThemeProvider>
  );
};

export default App;
