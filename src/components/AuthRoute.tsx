import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 

const AuthRoute: React.FC = () => {
  const { isAuthenticated } = useAuth(); 

  if (!isAuthenticated) {
    return <Navigate to="/authentication/login" />;
  }

  return <Outlet />;
};

export default AuthRoute;
