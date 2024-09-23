import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // Adds an item or increments the quantity if it already exists in the cart
    addToCart(state, action) {
      console.log("Add to cart action dispatched with item:", action.payload);
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        // If item exists, increment its quantity
        state.cart[itemIndex].quantity += 1;
      } else {
        // If item doesn't exist, add it to the cart with quantity 1
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.count = state.cart.length;
    },

    // Increment quantity for a specific item
    incrementItem(state, action) {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity += 1;
      }
    },

    // Decrement quantity for a specific item
    decrementItem(state, action) {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0 && state.cart[itemIndex].quantity > 1) {
        state.cart[itemIndex].quantity -= 1;
      } else {
        // Remove the item from the cart if the quantity is 1
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      }
      state.count = state.cart.length;
    },

    // Remove item from cart
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      state.count = state.cart.length;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, incrementItem, decrementItem, removeFromCart } =
  cartSlice.actions;
