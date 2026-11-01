import React, {StrictMode, lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
const App = lazy(() => import("./App.jsx"));
import LoadingSpinner from "./components/LoadingSpiner/LoadingSpiner";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <AuthProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <App />
          </Suspense>
        </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
  
);
