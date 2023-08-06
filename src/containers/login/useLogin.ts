import { api } from 'api/api';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from 'stores/appStore/appStore';
import { useAuthStore } from 'stores/authStore/authStore';

const useLogin = () => {
  const { setLoading, handleErrors } = useAppStore();
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (formValues: { email: string; password: string }) => {
    try {
      setLoading(true);
      const result = await api.auth.login({
        email: formValues.email,
        password: formValues.password,
      });
      login(result.data.data.token as string, navigate);
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit };
};

export default useLogin;
