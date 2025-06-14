import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, isInitialized } = useAuth();
  console.log(isInitialized);
  console.log(user);
  if (!isInitialized) {
    return null; // 或者 loading spinner
  }

  return user ? children : <Navigate to="/login" replace />;
};