import { z } from 'zod';

const productDataSchema = z.object({
  description: z.string(),
  image: z.string(),
  sku: z.string(),
  price: z.number(),
  stock: z.number(),
  variant_id: z.number(),
});

const productSchema = z.object({
  name: z.string(),
  store_id: z.number(),
  category_id: z.number(),
  data: z.array(productDataSchema).min(1),
});

const productCategorySchema = z.object({
  name: z.string(),
  store_id: z.number(),
});

export type CrearProductoBody = z.infer<typeof productSchema>;

export type CrearCategoriaBody = z.infer<typeof productCategorySchema>;
