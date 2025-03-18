import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectuserName } from '../features/users/userSlice';

const ProtectedRoute: React.FC = () => {
  const username = useSelector(selectuserName);
  
  // If the user is not logged in, redirect to the login page
  if (!username) {
    return <Navigate to="/" replace />;
  }

  // If the user is logged in, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;