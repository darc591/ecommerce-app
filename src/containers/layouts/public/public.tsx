import React from 'react';
import { Outlet } from 'react-router-dom';
const Public = () => {
  return (
    <div>
      <h1>Public</h1>
      <Outlet />
    </div>
  );
};

export default Public;
