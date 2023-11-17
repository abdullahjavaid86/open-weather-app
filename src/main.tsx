import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeChooserProvider } from "./contexts/theme-chooser.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeChooserProvider>
      <App />
    </ThemeChooserProvider>
  </React.StrictMode>
);
