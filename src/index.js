import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { CartProvider } from "./context/cart-context";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { LoaderContextProvider } from "./context/loader-context";
import { SnackbarContextProvider } from "./context/snackbar-context";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
      <Router>
      <LoaderContextProvider>
      <AuthProvider>
      <SnackbarContextProvider>
      <CartProvider>
        <App />
        </CartProvider>
        </SnackbarContextProvider>
        </AuthProvider>
        </LoaderContextProvider>
      </Router>
  </StrictMode>,
  rootElement
);
