import { Box } from '@mui/material';
import Drawer from 'components/drawer/drawer';
import { Outlet } from 'react-router-dom';
import { Inventory, Dashboard } from '@mui/icons-material';
const Private = () => {
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
      <Outlet />
    </Box>
  );
};

export default Private;
