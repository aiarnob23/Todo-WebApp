import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import router from './routes/route.jsx';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './authProvider/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

