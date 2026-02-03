import App from '@/app/App';
import Home from '@/pages/home/HomePage';
import NotFound from '@/pages/not-found/NotFoundPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);
