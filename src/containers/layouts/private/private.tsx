import React from 'react';
import { Outlet } from 'react-router-dom';

const Private = () => {
  return (
    <div>
      <h1>Private</h1>
      <Outlet />
    </div>
  );
};

export default Private;
