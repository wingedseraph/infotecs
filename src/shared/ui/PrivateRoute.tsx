import { isLoggedIn } from '@/shared/lib/auth-service';
import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const location = useLocation();
  const isAuth = isLoggedIn();

  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
