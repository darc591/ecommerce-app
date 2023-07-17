import { Button, Divider, Grid, Typography } from '@mui/material';
import Form from 'components/form/form';
import TextField from 'components/textField/textField';
import FormLayout from 'containers/layouts/restricted/formLayout/formLayout';
import { required } from 'utils/validators/required';
import zodValidator from 'utils/validators/zodValidator';
import { z } from 'zod';
const RestrictedBanner = '/svgs/restrictedBanner.svg';
const OnlineShopping = '/svgs/onlineShopping.svg';
const NewStore = () => {
  return (
    <FormLayout
      leftBackgroundImage={RestrictedBanner}
      leftImage={OnlineShopping}
      formComponent={
        <Grid container spacing={4} maxWidth={400}>
          <Grid item xs={12}>
            <Typography variant='h4'>Crear nueva tienda</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' color='GrayText'>
              Informe los datos para el registro de su nueva tienda
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Form onSubmit={(v) => console.log(v)}>
              {({ watch }) => (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField name='storeName' label='Nombre de la tienda' fullWidth required rules={required} />
                  </Grid>
                  {/* TODO logo img */}
                  <Grid item xs={12}>
                    <Divider>
                      <Typography variant='caption' color='GrayText'>
                        Datos del administrador
                      </Typography>
                    </Divider>
                  </Grid>
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
                      Crear tienda
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

export default NewStore;
