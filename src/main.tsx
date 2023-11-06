import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import "sweetalert2/src/sweetalert2.scss";
import "react-datepicker/dist/react-datepicker.css";
import App from "./App.tsx";
import { theme } from "./constants/themes.ts";
import { AuthProvider } from "./contexts/auth.contexts.tsx";
import GlobalStyle from "./styles/globalStyles.ts";
import "./styles/index.scss";

const queryClient = new QueryClient({
  defaultOptions: {},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <App />
          </AuthProvider>
          <GlobalStyle />
          <ToastContainer
            closeOnClick
            newestOnTop
            pauseOnHover
            autoClose={3000}
            position="top-center"
            className="froggy-blog-toast"
            draggable
          />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
