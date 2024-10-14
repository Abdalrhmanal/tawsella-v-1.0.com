import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { theme } from './theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import router from 'routes/router';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BreakpointsProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </BreakpointsProvider>
      </ThemeProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
