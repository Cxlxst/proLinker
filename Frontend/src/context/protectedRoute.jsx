import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext.jsx';

// Sert à vérifier si un user est connecté pour accéder à la page
const ProtectedRoute = ({ children }) => {
    const { getUserInfos } = useContext(UserContext);
    const user = getUserInfos();

  if (!user) {
    return <Navigate to="/connexion" />;
  }

  return children;
};

export default ProtectedRoute;