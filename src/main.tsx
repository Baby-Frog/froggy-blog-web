import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import "sweetalert2/src/sweetalert2.scss";
import App from "./App.tsx";
import { theme } from "./constants/themes.ts";
import { AuthProvider } from "./contexts/auth.contexts.tsx";
import GlobalStyle from "./styles/globalStyles.ts";
import "./styles/index.scss";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <App />
          </AuthProvider>
          <GlobalStyle />
          <ReactQueryDevtools />
          <ToastContainer
            closeOnClick
            newestOnTop
            pauseOnHover={false}
            autoClose={3000}
            draggable
          />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
