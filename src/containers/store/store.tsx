import React from 'react';
import { useParams } from 'react-router-dom';

const Store = () => {
  const params = useParams();
  return <div>Store id: {params.storeId}</div>;
};

export default Store;
