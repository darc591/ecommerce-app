import { useAppStore } from 'store/app/app';
import { SignupFormTypes } from './signup.types';
import { api } from 'api/api';
import { UserType } from 'api/auth/authSchemas';

const useSignup = ({ isAdmin }: { isAdmin: boolean }) => {
  const setLoading = useAppStore((state) => state.setLoading);

  const handleSignup = async (formValues: SignupFormTypes) => {
    try {
      setLoading(true);
      await api.auth.signup({
        userType: isAdmin ? UserType.ADMIN : UserType.CUSTOMER,
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        password: formValues.password,
        inviteCode: formValues.inviteCode,
      });
    } catch (error) {
      console.log(error);
      //TODO hanbleErrors
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup };
};

export default useSignup;
