import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'stores/authStore/authStore';
import Cookie from 'js-cookie';

const Restricted = () => {
  const { user, login } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const cookieToken = Cookie.get('id_token');
    if (!user && cookieToken) {
      login(cookieToken, navigate);
    }
  }, [user]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Restricted;
