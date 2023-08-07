import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/src/sweetalert2.scss";
import { Provider } from "react-redux";
import { store } from "./store.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
);
