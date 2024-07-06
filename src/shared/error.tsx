import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode; // ReactNode allows any React renderable content
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    console.error(error); // You can log the error here
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error boundary caught an error:", error, errorInfo);
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>; // Render fallback UI
    }

    return this.props.children; // Render children components normally
  }
}

export default ErrorBoundary;
