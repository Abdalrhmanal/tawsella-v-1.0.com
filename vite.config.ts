import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip'],
  },
  define: {
    'process.env': {
        VITE_REVERB_APP_KEY: process.env.VITE_REVERB_APP_KEY,
        VITE_REVERB_HOST: process.env.VITE_REVERB_HOST,
        VITE_REVERB_PORT: process.env.VITE_REVERB_PORT,
        VITE_REVERB_SCHEME: process.env.VITE_REVERB_SCHEME,
     }
    },
  plugins: [tsconfigPaths(), react()],
  server: {
    host: '0.0.0.0', 
  },
  base: '/',
});
