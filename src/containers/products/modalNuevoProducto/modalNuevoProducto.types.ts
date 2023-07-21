type SelectObject = {
  label: string;
  value: number;
};

export type CrearProductoFormTypes = {
  nombre: string;
  categoria: SelectObject;
  descripcion: string;
  sku: string;
  tipo: string;
  variante: string;
  stock: number;
  precio: number;
};
