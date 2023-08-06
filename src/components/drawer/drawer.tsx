import {
  Box,
  Grid,
  List,
  ListItem,
  Drawer as MuiDrawer,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'stores/authStore/authStore';

export type DrawerProps = {
  routes: {
    label: string;
    icon: React.ReactNode;
    route: string;
  }[];
};

const Drawer = ({ routes }: DrawerProps) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <MuiDrawer anchor='left' variant='permanent' open>
      <Box
        sx={{
          width: 250,
          backgroundColor: '#153C65',
          height: '100%',
        }}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Grid container spacing={1}>
          <Grid item xs={12} display='flex' justifyContent='center' alignItems='center' marginTop={8} marginBottom={2}>
            <Box
              height={120}
              width={120}
              borderRadius='50%'
              style={{
                background: 'url(https://placehold.co/120x120?font=roboto&text=DR)',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <List>
              {routes.map((route) => (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate(route.route)}
                    selected={pathname.includes(route.route)}
                    disableRipple
                  >
                    <ListItemIcon style={{ color: 'white' }}>{route.icon}</ListItemIcon>
                    <ListItemText primary={route.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        <List>
          <ListItem disablePadding>
            <ListItemButton disableRipple>
              <ListItemIcon style={{ color: 'white' }}>
                <Settings />
              </ListItemIcon>
              <ListItemText primary='Configuraciones' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => logout()}>
              <ListItemIcon style={{ color: 'white' }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary='Salir' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
