import { Middleware } from "@reduxjs/toolkit";

export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    if (action.type.startsWith("cart/")) {
      const { cart } = store.getState();
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return result;
  };
