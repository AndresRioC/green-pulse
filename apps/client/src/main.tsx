import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Metrics from "./Metrics";
import { RouterProvider, createBrowserRouter } from "react-router"; // Using react-router

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/metrics", element: <Metrics /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
