import { Button, Divider, Grid, Typography } from '@mui/material';
import Form from 'components/form/form';
import TextField from 'components/textField/textField';
import FormLayout from 'containers/layouts/restricted/formLayout/formLayout';
import { useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { required } from 'utils/validators/required';
import zodValidator from 'utils/validators/zodValidator';
import { z } from 'zod';
import useSignup from './useSignup';

const RestrictedBanner = '/svgs/restrictedBanner.svg';
const LoginAdmin = '/svgs/loginAdmin.svg';
const LoginCliente = '/svgs/loginCliente.svg';

const Signup = () => {
  const { pathname } = useLocation();
  const [queryParams] = useSearchParams();

  const isAdmin = useMemo(() => {
    return pathname.includes('admin');
  }, [pathname]);

  const { handleSignup } = useSignup({ isAdmin });

  useEffect(() => {
    console.log(queryParams.get('code'));
  }, [queryParams]);

  return (
    <FormLayout
      leftBackgroundImage={RestrictedBanner}
      leftImage={isAdmin ? LoginAdmin : LoginCliente}
      formComponent={
        <Grid container spacing={4} maxWidth={400}>
          <Grid item xs={12}>
            <Typography variant='h3'>
              {isAdmin ? 'Complete su registro de administrador!' : 'Complete su registro!'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' color='GrayText'>
              Informe los datos para completar su registro
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Form onSubmit={handleSignup}>
              {({ watch }) => (
                <Grid container spacing={2}>
                  {isAdmin && (
                    <>
                      <Grid item xs={12}>
                        <TextField name='inviteCode' label='Código de invitación' fullWidth required rules={required} />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12}>
                    <TextField name='firstName' label='Nombre' fullWidth required rules={required} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name='lastName' label='Apellido' fullWidth required rules={required} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name='email' label='Email' fullWidth required rules={zodValidator(z.string().email())} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name='password'
                      label='Contraseña'
                      type='password'
                      fullWidth
                      required
                      rules={zodValidator(z.string().min(6))}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name='confirmPassword'
                      label='Confirmar contraseña'
                      type='password'
                      fullWidth
                      required
                      rules={zodValidator(
                        z
                          .string()
                          .min(6)
                          .refine((val) => val === watch('password'), 'Las contraseñas no coinciden'),
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth type='submit'>
                      Completar registro
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Form>
          </Grid>
        </Grid>
      }
    />
  );
};

export default Signup;
