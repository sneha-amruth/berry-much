import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { CartProvider } from "./context/cart-context";
import { BrowserRouter as Router } from "react-router-dom";
import {AuthProvider} from "./context/auth-context";
import {LoaderContextProvider} from "./context/loader-context";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
      <Router>
      <LoaderContextProvider>
      <AuthProvider>
      <CartProvider>
        <App />
        </CartProvider>
        </AuthProvider>
        </LoaderContextProvider>
      </Router>
  </StrictMode>,
  rootElement
);
