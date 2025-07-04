// import { StrictMode } from "react";
import './polyfills';

import React from 'react'
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./index.css";
import App from "./App";
import { Dashboard } from './components/onboarding/dashboard/Dashboard';
import { AuthProvider } from './components/AuthContext';
import { SolanaWalletProvider } from './components/WalletProvider';
// import WalletContextProvider from "./context/WalletProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: (
      <AuthProvider>
        <SolanaWalletProvider>
          <Dashboard onBackToLanding={() => window.location.href = '/'} />
        </SolanaWalletProvider>
      </AuthProvider>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  // <WalletContextProvider>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  // </WalletContextProvider>
);
