import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes as RouterDomRoutes, Route, Navigate } from 'react-router-dom';

const Dashboard = lazy(() => import('../dashboard/dashboard'));
const Private = lazy(() => import('../layouts/private/private'));
const Public = lazy(() => import('../layouts/public/public'));
const Restricted = lazy(() => import('../layouts/restricted/restricted'));
const Login = lazy(() => import('../login/login'));
const Signup = lazy(() => import('../signup/signup'));
const Store = lazy(() => import('../store/store'));
const NewStore = lazy(() => import('../newStore/newStore'));

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>...Loading</h1>}>
        <RouterDomRoutes>
          <Route path='/' element={<Restricted />}>
            <Route path='*' element={<Navigate to='/login' />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />

            <Route path='admin'>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
            </Route>

            <Route path='store'>
              <Route path='new' element={<NewStore />} />
            </Route>
          </Route>

          <Route path='/' element={<Public />}>
            <Route path='store'>
              <Route path=':storeId' element={<Store />} />
            </Route>
          </Route>

          <Route path='/' element={<Private />}>
            <Route path='admin'>
              <Route path='dashboard' element={<Dashboard />} />
            </Route>
          </Route>
        </RouterDomRoutes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
