import { api } from 'api/api';
import { useAppStore } from 'store/app/app';

const useLogin = () => {
  const setLoading = useAppStore((state) => state.setLoading);

  const handleSubmit = async (formValues: { email: string; password: string }) => {
    try {
      setLoading(true);
      const result = await api.auth.login({
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

export default useLogin;
