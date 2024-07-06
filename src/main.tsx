import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./shared/error.tsx";
import Layout from "./layout/layout.tsx";
import Glassmorphism from "./assets/glassmorphism.tsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <Glassmorphism />
        <Layout>
          <App />
        </Layout>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
