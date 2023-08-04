import { useAppStore } from 'stores/appStore/appStore';
import { SignupFormTypes } from './signup.types';
import { api } from 'api/api';
import { UserType } from 'api/auth/authSchemas';
import { useNavigate } from 'react-router-dom';

const useSignup = ({ isAdmin }: { isAdmin: boolean }) => {
  const navigate = useNavigate();
  const { setLoading, handleErrors, setNotification } = useAppStore();

  const handleSignup = async (formValues: SignupFormTypes) => {
    try {
      setLoading(true);
      await api.auth.signup({
        type_: isAdmin ? UserType.ADMIN : UserType.CUSTOMER,
        email: formValues.email,
        first_name: formValues.firstName,
        last_name: formValues.lastName,
        password: formValues.password,
        invite_code: formValues.inviteCode,
      });
      setNotification({ message: 'Usuário registrado!' });

      navigate(isAdmin ? `/admin-login?email=${formValues.email}` : `/login?email=${formValues.email}`);
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup };
};

export default useSignup;
