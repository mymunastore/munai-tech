import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/print.css";

// Verify React is properly loaded
if (typeof createRoot === 'undefined') {
  console.error('React is not properly loaded. Please check your dependencies.');
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
