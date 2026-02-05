import App from '@/app/App';
import { ROUTES } from '@/app/router/consts';
import LoginPage from '@/pages/login/LoginPage';
import NotFoundPage from '@/pages/not-found/NotFoundPage';
import UsersPage from '@/pages/users/UsersPage';
import PrivateRoute from '@/shared/ui/PrivateRoute';
import RedirectRoute from '@/shared/ui/RedirectRoute';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        element: (
          <RedirectRoute>
            <LoginPage />
          </RedirectRoute>
        ),
      },
      {
        path: ROUTES.USERS,
        element: (
          <PrivateRoute>
            <UsersPage />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.NOT_FOUND,
        Component: NotFoundPage,
      },
    ],
  },
]);
