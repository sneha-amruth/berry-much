import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { CartProvider } from "./context/cart-context";
import { BrowserRouter as Router } from "react-router-dom";
import {AuthProvider} from "./context/auth-context";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
      <Router>
      <AuthProvider>
      <CartProvider>
        <App />
        </CartProvider>
        </AuthProvider>
      </Router>
  </StrictMode>,
  rootElement
);
