import { ROUTES } from '@/app/router/consts';
import { isLoggedIn } from '@/shared/lib/auth-service';
import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RedirectRoute = ({ children }: { children: ReactElement }) => {
  const location = useLocation();
  const isAuth = isLoggedIn();

  if (isAuth && location.pathname === '/') {
    return <Navigate to={ROUTES.USERS} state={{ from: location }} replace />;
  }

  return children;
};

export default RedirectRoute;
