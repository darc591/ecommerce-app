import { ExtFile } from '@dropzone-ui/react';
import { SelectOption } from 'components/select/select';

export type CrearProductoFormTypes = {
  nombre: string;
  categoria: SelectOption;
  descripcion: string;
  image?: ExtFile;
  sku: string;
  tipo: string;
  variante: SelectOption;
  stock: string;
  precio: number;
};
