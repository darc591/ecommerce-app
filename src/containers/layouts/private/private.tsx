import { Box } from '@mui/material';
import Drawer from 'components/drawer/drawer';
import { Outlet, useNavigate } from 'react-router-dom';
import { Inventory, Dashboard } from '@mui/icons-material';
import { UserType, useAuthStore } from 'stores/authStore/authStore';
import { useEffect } from 'react';
const Private = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/admin-login');
    } else if (user.type === UserType.CUSTOMER) {
      navigate('/admin-login');
    }
  }, [user]);

  return (
    <Box>
      <h1>Private</h1>
      <Drawer
        routes={[
          {
            label: 'Dashboard',
            icon: <Dashboard />,
            route: '/admin/dashboard',
          },
          {
            label: 'Productos',
            icon: <Inventory />,
            route: '/admin/products',
          },
        ]}
      />
      <Box ml='250px'>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Private;
