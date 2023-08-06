import { useAppStore } from 'stores/appStore/appStore';
import { NewStoreFormTypes } from './newStore.types';
import { api } from 'api/api';

const useNewStore = () => {
  const setLoading = useAppStore((state) => state.setLoading);

  const handleSubmit = async (formValues: NewStoreFormTypes) => {
    try {
      setLoading(true);
      await api.store.create({
        storeName: formValues.storeName,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit };
};

export default useNewStore;
