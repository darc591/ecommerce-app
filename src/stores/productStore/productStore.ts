import { api } from 'api/api';
import { CrearVarianteBody } from 'api/product/productSchemas';
import { useAppStore } from 'stores/appStore/appStore';
import { create } from 'zustand';

type ProductVariantsOption = Record<string, Record<string, { label: string; value: number }>>;

type ProductVariant = {
  id: number;
  name: string;
  value: string;
};

type ProductState = {
  variants: ProductVariant[] | null;
  variantOptions: ProductVariantsOption | null;
};

type ProductStore = ProductState & {
  listVariants(): Promise<void>;
  createVariant(body: CrearVarianteBody, callback: () => void): Promise<void>;
};

const initialState: ProductState = {
  variants: null,
  variantOptions: null,
};

export const useProductStore = create<ProductStore>((set, get) => ({
  ...initialState,
  async listVariants() {
    const handleErrors = useAppStore.getState().handleErrors;
    const setLoading = useAppStore.getState().setLoading;

    try {
      setLoading(true);
      const result = await api.product.listVariants();

      const variantOptions: ProductVariantsOption = {};

      for (const variant of result.data.data) {
        if (variantOptions[variant.name] !== undefined) {
          variantOptions[variant.name][variant.value] = {
            label: variant.value,
            value: variant.id,
          };
        } else {
          variantOptions[variant.name] = {
            [variant.value]: {
              label: variant.value,
              value: variant.id,
            },
          };
        }
      }

      set({
        variantOptions,
        variants: result.data.data,
      });
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  },
  async createVariant(body, callback) {
    const handleErrors = useAppStore.getState().handleErrors;
    const setNotification = useAppStore.getState().setNotification;
    const setLoading = useAppStore.getState().setLoading;

    try {
      setLoading(true);
      await api.product.createVariant(body);

      setNotification({
        message: 'Variante creada!',
      });
      callback();
      get().listVariants();
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  },
}));
