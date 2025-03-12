import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./myPages/App.tsx";
import Metrics from "./myPages/Metrics.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboards from "./myPages/Dashboards.tsx";
import Historical from "./myPages/Historical.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/metrics/:city" element={<Metrics />} />
        <Route path="/metrics/:city/historical" element={<Historical />} />
        <Route path="/dashboards" element={<Dashboards />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
