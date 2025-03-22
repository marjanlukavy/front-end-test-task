import ReactDOM from "react-dom/client";
import App from "./App";
import { StrictMode } from "react";
import "./main.css";
import { ThemeProvider } from "./context/ThemeProvider";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
