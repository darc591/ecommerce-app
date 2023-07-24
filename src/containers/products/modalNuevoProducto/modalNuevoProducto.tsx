import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import Form from 'components/form/form';
import { useCallback, useState } from 'react';
import { CloseRounded } from '@mui/icons-material';
import TextField from 'components/textField/textField';
import { CrearProductoFormTypes } from './modalNuevoProducto.types';
import Select from 'components/select/select';

const ModalNuevoProducto = ({ onClose }: { onClose(): void }) => {
  const [step, setStep] = useState(0);

  const handleSubmit = useCallback(
    (formValues: CrearProductoFormTypes) => {
      switch (step) {
        case 0:
          setStep(1);
          break;
        case 1:
          console.log(formValues);
          break;
      }
    },
    [step],
  );

  return (
    <Dialog open style={{ padding: '10px' }} maxWidth={step === 0 ? 'xs' : 'sm'}>
      <Form onSubmit={handleSubmit}>
        <DialogTitle>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='h5' fontWeight={700}>
              Nuevo producto
            </Typography>
            <IconButton style={{ color: 'black' }} onClick={onClose}>
              <CloseRounded />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={4} mt={1}>
            <Grid item xs={12}>
              <Stepper activeStep={step} alternativeLabel>
                <Step key='nombre-categoria'>
                  <StepLabel>Nombre y categoria</StepLabel>
                </Step>
                <Step key='descripcion'>
                  <StepLabel>Descripción y precio</StepLabel>
                </Step>
              </Stepper>
            </Grid>
            {step === 0 && (
              <>
                <Grid item xs={12}>
                  <TextField name='nombre' label='Nombre' fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Select name='categoria' placeholder='Categoria' options={[{ label: 'Test', value: 1 }]} />
                </Grid>
              </>
            )}
            {step === 1 && (
              <>
                <Grid item xs={4}>
                  <Box width='150px' height='150px' border='1px solid black'>
                    image
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField name='descripcion' label='Descripción' rows={3} multiline fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField name='sku' label='SKU' fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <Select name='tipo' placeholder='Tipo' options={[{ label: 'Test', value: 1 }]} />
                    </Grid>
                    <Grid item xs={6}>
                      <Select name='variante' placeholder='Variante' options={[{ label: 'Test', value: 1 }]} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField name='stock' label='Cantidad' />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField name='precio' label='Precio' />
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          <Button color='neutral' onClick={() => (step === 0 ? onClose() : setStep(0))}>
            {step === 0 ? 'Cancelar' : 'Volver'}
          </Button>
          <Button type='submit'>Continuar</Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default ModalNuevoProducto;
