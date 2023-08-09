import { CloseRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import Autocomplete from 'components/autocomplete/autocomplete';
import Form from 'components/form/form';
import TextField from 'components/textField/textField';
import { useEffect } from 'react';
import { useProductStore } from 'stores/productStore/productStore';

import { required } from 'utils/validators/required';
const ModalNuevaVariante = ({ onClose }: { onClose(): void }) => {
  const { listVariants, variantOptions, createVariant } = useProductStore();

  const handleSubmit = (formValues: { tipo: string; variante: string }) => {
    createVariant(
      {
        name: formValues.tipo,
        value: formValues.variante,
      },
      onClose,
    );
  };

  useEffect(() => {
    if (variantOptions === null) {
      listVariants();
    }
  }, [variantOptions]);
  return (
    <Dialog open style={{ padding: '10px' }} maxWidth='xs' fullWidth>
      <Form onSubmit={handleSubmit}>
        <DialogTitle>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='h5' fontWeight={700}>
              Nueva variante
            </Typography>
            <IconButton style={{ color: 'black' }} onClick={onClose}>
              <CloseRounded />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <Autocomplete
                name='tipo'
                label='Tipo'
                options={Object.keys(variantOptions ?? {})}
                required
                freeSolo
                rules={required}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField name='variante' label='Variante' required rules={required} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: '15px 20px' }}>
          <Button type='submit'>Crear</Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default ModalNuevaVariante;
