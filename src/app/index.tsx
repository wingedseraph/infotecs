import { AppProviders } from '@/app/providers/AppProviders';
import { router } from '@/app/router/router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';

ReactDOM.render(
  <StrictMode>
    <AppProviders>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </AppProviders>
  </StrictMode>,
  document.getElementById('root')
);
