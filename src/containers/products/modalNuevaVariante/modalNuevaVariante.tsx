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
import { required } from 'utils/validators/required';

const ModalNuevaVariante = ({ onClose }: { onClose(): void }) => {
  return (
    <Dialog open style={{ padding: '10px' }} maxWidth='xs' fullWidth>
      <Form onSubmit={(v) => console.log(v)}>
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
                options={[{ label: 'test', value: 1 },{ label: 'aaaa', value: 1 }]}
                freeSolo
                rules={required}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                name='variante'
                label='Variante'
                options={[{ label: 'test', value: 2 }]}
                freeSolo
                rules={required}
              />
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
