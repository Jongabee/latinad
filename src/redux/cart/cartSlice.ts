import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Display } from "../../types";

export interface CartItem extends Display {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalDays: number;
}

const initialState: CartState = {
  items: [],
  totalDays: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ display: Display; days: number }>
    ) => {
      const { display, days } = action.payload;
      const existingItem = state.items.find((item) => item.id === display.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...display, quantity: 1 });
      }
      state.totalDays = days;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setTotalDays: (state, action: PayloadAction<number>) => {
      state.totalDays = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setTotalDays,
} = cartSlice.actions;

export default cartSlice.reducer;
