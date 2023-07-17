import { Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Restricted = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Restricted;
