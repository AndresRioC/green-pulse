import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Metrics from "./Metrics";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboards from "./Dashboards.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/metrics/:city" element={<Metrics />} />
        <Route path="/dashboards" element={<Dashboards />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
