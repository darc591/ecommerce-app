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
import { useCallback, useEffect, useState } from 'react';
import { CloseRounded } from '@mui/icons-material';
import TextField from 'components/textField/textField';
import { CrearProductoFormTypes } from './modalNuevoProducto.types';
import Select from 'components/select/select';
import Dropzone from 'components/dropzone/dropzone';
import { required } from 'utils/validators/required';
import { useProductStore } from 'stores/productStore/productStore';
import Autocomplete from 'components/autocomplete/autocomplete';
import { useAppStore } from 'stores/appStore/appStore';
import { fileToBase64 } from 'utils/fileToBase64';
import { api } from 'api/api';
import imageCompression from 'browser-image-compression';

const ModalNuevoProducto = ({ onClose }: { onClose(): void }) => {
  const [step, setStep] = useState(0);
  const { handleErrors, setNotification, setLoading } = useAppStore();
  const { listVariants, variantOptions, listCategories, categories } = useProductStore();

  const handleCrearProducto = async (formValues: CrearProductoFormTypes) => {
    try {
      setLoading(true);
      let imgBase64 = undefined;
      if (formValues?.image?.file !== undefined) {
        const compressedImg = await imageCompression(formValues.image.file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 600,
        });
        imgBase64 = (await fileToBase64(compressedImg)).split(',')[1];
      }

      await api.product.create({
        name: formValues.nombre,
        category_id: formValues.categoria.value,
        data: [
          {
            description: formValues.descripcion,
            price: formValues.precio,
            sku: formValues.sku,
            stock: Number(formValues.stock),
            variant_id: formValues.variante.value,
            image: imgBase64,
          },
        ],
      });
      setNotification({
        message: 'Producto creado!',
      });
      onClose();
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = useCallback(
    (formValues: CrearProductoFormTypes) => {
      switch (step) {
        case 0:
          setStep(1);
          break;
        case 1:
          handleCrearProducto(formValues);
          break;
      }
    },
    [step],
  );

  useEffect(() => {
    listVariants();
    listCategories();
  }, []);

  return (
    <Dialog open style={{ padding: '10px' }} maxWidth={step === 0 ? 'xs' : 'sm'}>
      <Form onSubmit={handleSubmit}>
        {({ setValue, watch }) => {
          const TIPO = watch('tipo');
          return (
            <>
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
                        <TextField
                          name='nombre'
                          label='Nombre'
                          required
                          fullWidth
                          rules={required}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Select
                          name='categoria'
                          placeholder='Categoria'
                          required
                          rules={required}
                          options={categories ?? []}
                        />
                      </Grid>
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <Grid item xs={4}>
                        <Box>
                          <Dropzone
                            onChange={(files) => {
                              if (files.length === 0) {
                                setValue('image', undefined);
                              } else {
                                setValue('image', files[0]);
                              }
                            }}
                            label='Seleccione una imagen'
                            accept='.png'
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={8}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              name='descripcion'
                              label='Descripción'
                              rows={3}
                              multiline
                              fullWidth
                              required
                              rules={required}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField name='sku' label='SKU' fullWidth required rules={required} />
                          </Grid>
                          <Grid item xs={6}>
                            <Autocomplete
                              name='tipo'
                              label='Tipo'
                              options={Object.keys(variantOptions ?? {})}
                              required
                              rules={required}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Autocomplete
                              name='variante'
                              label='Variante'
                              options={Object.values(variantOptions?.[TIPO] ?? {})}
                              required
                              rules={required}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              name='stock'
                              label='Cantidad'
                              required
                              rules={required}
                              type='number'
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              name='precio'
                              label='Precio'
                              required
                              rules={required}
                              mask='currency'
                              InputLabelProps={{ shrink: true }}
                              placeholder='$0,00'
                            />
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
            </>
          );
        }}
      </Form>
    </Dialog>
  );
};

export default ModalNuevoProducto;
