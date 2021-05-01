import React from "react";
import { useReducer, useContext } from "react";

export const CartContext = React.createContext();

export const ACTIONS = {
  ADD_TO_CART: "add-to-cart",
  INCREASE_QUANTITY: "increase-quantity",
  DECREASE_QUANTITY: "decrease-quantity",
  // TOTAL_CART_VALUE: "total-cart-value",
  ADD_TO_WISHLIST: "add-to-wishlist",
  REMOVE_FROM_WISHLIST: "remove-from-wishlist",
  ADD_TO_CART_FROM_WISHLIST: "add-to-cart-from-wishlist",
  GET_WISHLIST_STATUS: "get-wishlist-status"
};

export function CartProvider({ children }) {
  const reducer = (state, action) => {
    const { cartItems, wishListItems } = state;
    switch (action.type) {
      case ACTIONS.INCREASE_QUANTITY:
        return {
          ...state,
          cartItems: cartItems.map((item) => {
            return item.id === action.payload.itemId
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          })
        };
      case ACTIONS.DECREASE_QUANTITY:
        if (action.payload.quantity > 0) {
          return {
            ...state,
            cartItems: cartItems.map((item) =>
              item.id === action.payload.itemId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          };
        } else {
          return {
            ...state,
            cartItems: cartItems.filter(
              (item) => item.id !== action.payload.itemId
            )
          };
        }
      case ACTIONS.ADD_TO_CART:
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              id: action.payload.id,
              name: action.payload.name,
              image: action.payload.image,
              price: action.payload.price,
              quantity: 1
            }
          ]
        };
      case ACTIONS.ADD_TO_WISHLIST:
        return {
          ...state,
          wishListItems: [
            ...state.wishListItems,
            {
              id: action.payload.id,
              name: action.payload.name,
              image: action.payload.image,
              price: action.payload.price,
              inWishList: true
            }
          ]
        };

      case ACTIONS.REMOVE_FROM_WISHLIST:
        return {
          ...state,
          wishListItems: wishListItems.filter(
            (item) => item.id !== action.payload.id
          )
        };

      case ACTIONS.ADD_TO_CART_FROM_WISHLIST:
        if (
          !cartItems.filter((item) => item.id === action.payload.id).length > 0
        ) {
          return {
            ...state,
            cartItems: [
              ...state.cartItems,
              {
                id: action.payload.id,
                name: action.payload.name,
                image: action.payload.image,
                price: action.payload.price,
                quantity: 1
              }
            ]
          };
        } else {
          return {
            ...state,
            cartItems: cartItems.map((item) => {
              return item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item;
            })
          };
        }

      // case ACTIONS.TOTAL_CART_VALUE:
      //   return {
      //     ...state,
      //     cartValue: state.cartItems.reduce(
      //       (prev, item) => prev + item.quantity * item.price,
      //       0
      //     )
      //   };

      default:
        return state;
    }
  };

  const [{ cartItems, wishListItems }, dispatch] = useReducer(reducer, {
    cartItems: [],
    wishListItems: []
    // cartValue: 0
  });
  return (
    <CartContext.Provider value={{ cartItems, wishListItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
