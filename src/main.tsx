import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeChooserProvider } from "./contexts/theme-chooser.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

// Create a client
export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeChooserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeChooserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
