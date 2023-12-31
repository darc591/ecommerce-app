import { Add } from '@mui/icons-material';
import { Box, Button, Grid } from '@mui/material';
import { useState } from 'react';
import ModalNuevoProducto from './modalNuevoProducto/modalNuevoProducto';
import ModalNuevaCategoria from './modalNuevaCategoria/modalNuevaCategoria';
import ModalNuevaVariante from './modalNuevaVariante/modalNuevaVariante';

const Products = () => {
  const [modalNuevoProducto, setModalNuevoProducto] = useState(false);
  const [modalNuevaCategoria, setModalNuevaCategoria] = useState(false);
  const [modalNuevaVariante, setModalNuevaVariante] = useState(false);
  return (
    <>
      {modalNuevoProducto && <ModalNuevoProducto onClose={() => setModalNuevoProducto(false)} />}
      {modalNuevaCategoria && <ModalNuevaCategoria onClose={() => setModalNuevaCategoria(false)} />}
      {modalNuevaVariante && <ModalNuevaVariante onClose={() => setModalNuevaVariante(false)} />}
      <Box width='100%' padding={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} display='flex' justifyContent='end' gap={1}>
            <Button size='large' startIcon={<Add />} onClick={() => setModalNuevaVariante(true)}>
              Nueva variante
            </Button>
            <Button size='large' startIcon={<Add />} onClick={() => setModalNuevaCategoria(true)}>
              Nueva categoria
            </Button>
            <Button size='large' startIcon={<Add />} onClick={() => setModalNuevoProducto(true)}>
              Nuevo producto
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Products;
