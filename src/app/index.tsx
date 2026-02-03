import { router } from '@/app/router/router';
import { AppProviders } from '@/app/providers/AppProviders';
import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);
