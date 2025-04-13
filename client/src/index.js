import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import main from "./themes/theme";
import AuthProvider from "./context/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStatesContextProvider from "./context/GlobalStatesProvider";
import HouseProvider from "./context/HouseProvider";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HouseProvider>
          <GlobalStatesContextProvider>
            <ThemeProvider theme={main}>
              <App />
            </ThemeProvider>
          </GlobalStatesContextProvider>
        </HouseProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
