import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import WishList from "./components/WishList/WishList";
import ProductList from "./components/Products/ProductList";
import Cart from "./components/Cart/Cart";
import { Link } from "react-router-dom";
import { useCart } from "./context/cart-context";
import ProductDetailPage from "./components/Products/ProductDetailPage";
import NotFound from "./components/404";
import Login from "./components/Login/Login";
import Account from "./components/Account/Account";
import PrivateRoute from "./components/Login/PrivateRoute";
import SignUp from "./components/Login/SignUp";
import FetchProductsData from "./components/Products/FetchProductsData";

export default function App() {
  const { cartItems, wishListItems } = useCart();
 
  return (
    <div className="App">
      <p className="top-header">
        Your one stop destinaton to all things skincare!
        <br />
        Thank you for choosing us ❤️
      </p>
      <nav className="top-nav-container">
        <div className="brand-conatiner">
          <Link to="/">
            <h1 className="brand-name">Berry Much</h1>
          </Link>
        </div>
        <ul className="pills">
          <li className="dropdown">
            <Link to="/products">Product Type</Link>
            <div className="dropdown-content">
              <Link to="/products">Cleansers</Link>
              <Link to="/products">Toners</Link>
              <Link to="/products">Moisturizers</Link>
              <Link to="/products">Moisturizers</Link>
            </div>
          </li>
          <li className="dropdown">
            <Link to="/products">Skin type</Link>
            <div className="dropdown-content">
              <Link to="/products">Oily Skin</Link>
              <Link to="/products">Dry Skin</Link>
              <Link to="/products">Sensitive Skin</Link>
              <Link to="/products">Combination Skin</Link>
            </div>
          </li>
          <li className="dropdown">
            <Link to="/products">Brands</Link>
            <div className="dropdown-content">
              <Link to="/products">Cosrx</Link>
              <Link to="/products">Klairs</Link>
              <Link to="/products">Dr. Oracle</Link>
            </div>
          </li>
        </ul>
        <div className="icons-li">
        <Link to="/account">
          <button className="btn icon">
            <i className="fas fa-user icon"></i>
          </button>
          </Link>
          <Link to="/wishlist">
            <button className="btn icon">
              <i className="far fa-heart icon"></i>
              {wishListItems.length > 0 ? (
                <p className="quantity-icon">{wishListItems.length}</p>
              ) : (
                ""
              )}
            </button>
          </Link>
          <Link to="/cart">
            <button className="btn icon">
              <i className="fas fa-shopping-cart icon"></i>
              {cartItems.length > 0 ? (
                <p className="quantity-icon">{cartItems.length}</p>
              ) : (
                ""
              )}
            </button>
          </Link>
        </div>
      </nav>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<FetchProductsData />} /> 
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<SignUp/>} />
        <Route path="*" element={<NotFound />} />
        <PrivateRoute path="/account" element={<Account/>} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<WishList/>} />
      </Routes>
    </div>
  );
}
