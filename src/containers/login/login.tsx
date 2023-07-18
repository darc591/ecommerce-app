import { useLocation } from 'react-router-dom';
import { Button, Grid, Link, Typography } from '@mui/material';
import TextField from '../../components/textField/textField';
import Form from '../../components/form/form';
import { z } from 'zod';
import zodValidator from '../../utils/validators/zodValidator';
import { useEffect, useMemo } from 'react';
import FormLayout from '../layouts/restricted/formLayout/formLayout';
const LoginCliente = '/svgs/loginCliente.svg';
const RestrictedBanner = '/svgs/restrictedBanner.svg';
const LoginAdmin = '/svgs/loginAdmin.svg';
const Login = () => {
  const { pathname } = useLocation();

  const handleSubmit = (formValues: { email: string; password: string }) => {
    console.log(formValues);
  };

  const isAdmin = useMemo(() => {
    return pathname.includes('admin');
  }, [pathname]);

  return (
    <FormLayout
      leftBackgroundImage={RestrictedBanner}
      leftImage={isAdmin ? LoginAdmin : LoginCliente}
      formComponent={
        <Grid container spacing={4} maxWidth={400}>
          <Grid item xs={12}>
            <Typography variant='h3'>{isAdmin ? 'Bienvenido al área de administrador!' : 'Bienvenido!'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' color='GrayText'>
              Inicie sesión con su cuenta para continuar!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name='email'
                    label='Email'
                    inputMode='email'
                    required
                    fullWidth
                    rules={zodValidator(z.string().email())}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name='password'
                    label='Contraseña'
                    type='password'
                    required
                    rules={zodValidator(z.string().min(6))}
                  />
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                  <Link variant='caption' style={{ cursor: 'pointer' }}>
                    Olvido su contraseña?
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth type='submit'>
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Grid>
        </Grid>
      }
    />
  );
};

export default Login;
