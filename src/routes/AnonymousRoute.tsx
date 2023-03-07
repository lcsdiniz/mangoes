import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../hooks/auth';
import { Navigate } from 'react-router-dom';

export const AnonymousRoute = ({ children }: any) => {
  const { user } = useContext(AuthContext) as AuthContextType;

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};