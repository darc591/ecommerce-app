import { CloseRounded } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { api } from 'api/api';
import Form from 'components/form/form';
import TextField from 'components/textField/textField';
import { useAppStore } from 'stores/appStore/appStore';
import { useAuthStore } from 'stores/authStore/authStore';
import { required } from 'utils/validators/required';

const ModalNuevaCategoria = ({ onClose }: { onClose(): void }) => {
  const { handleErrors, setLoading, setNotification } = useAppStore();
  const { currentStore } = useAuthStore();
  const handleSubmit = async (formValues: { nombre: string }) => {
    try {
      setLoading(true);
      await api.product.createCategory({
        name: formValues.nombre,
        store_id: currentStore!,
      });
      setNotification({
        message: 'Categoria creada!',
      });
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  return (
    <Dialog open style={{ padding: '10px' }} maxWidth='xs' fullWidth>
      <Form onSubmit={handleSubmit}>
        <DialogTitle>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='h5' fontWeight={700}>
              Nueva categoria
            </Typography>
            <IconButton style={{ color: 'black' }} onClick={onClose}>
              <CloseRounded />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <TextField name='nombre' label='nombre' required rules={required} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions style={{ padding: '15px 20px' }}>
          <Button type='submit'>Crear</Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default ModalNuevaCategoria;
