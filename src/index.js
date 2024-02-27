import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MessageProvider } from "./contexts/MessageContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { MessageAlertProvider } from "./contexts/MessageAlertContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MessageAlertProvider>
    <ErrorProvider>
      <AuthProvider>
        <NotificationProvider>
          <MessageProvider>
            <BrowserRouter>
              <App />
              <ToastContainer position="top-center" />
            </BrowserRouter>
          </MessageProvider>
        </NotificationProvider>
      </AuthProvider>
    </ErrorProvider>
  </MessageAlertProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
