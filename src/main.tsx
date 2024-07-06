import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./shared/error.tsx";
import Layout from "./layout/layout.tsx";
import Glassmorphism from "./assets/glassmorphism.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Glassmorphism />
      <Layout>
        <App />
      </Layout>
    </ErrorBoundary>
  </React.StrictMode>
);
