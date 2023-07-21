import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes as RouterDomRoutes, Route, Navigate } from 'react-router-dom';

const Private = lazy(() => import('../layouts/private/private'));
const Public = lazy(() => import('../layouts/public/public'));
const Restricted = lazy(() => import('../layouts/restricted/restricted'));
const Login = lazy(() => import('../login/login'));
const Signup = lazy(() => import('../signup/signup'));
const Store = lazy(() => import('../store/store'));
const NewStore = lazy(() => import('../newStore/newStore'));
const Dashboard = lazy(() => import('../dashboard/dashboard'));
const Products = lazy(() => import('../products/products'));

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>...Loading</h1>}>
        <RouterDomRoutes>
          <Route path='/' element={<Restricted />}>
            <Route path='*' element={<Navigate to='/login' />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='new-store' element={<NewStore />} />
            <Route path='admin-login' element={<Login />} />
            <Route path='admin-signup' element={<Signup />} />
          </Route>

          <Route path='/' element={<Public />}>
            <Route path='store'>
              <Route path=':storeId' element={<Store />} />
            </Route>
          </Route>

          <Route path='/' element={<Private />}>
            <Route path='admin'>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='products' element={<Products />} />
            </Route>
          </Route>
        </RouterDomRoutes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
