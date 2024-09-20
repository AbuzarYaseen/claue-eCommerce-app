import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    incrementItem(state) {
      state.count += 1;
    },
    decrementItem(state) {
      state.count -= 1;
    },
    incrementByAmount(state, action) {
      // Add the item to the cart array
      state.cart.push(action.payload);
      state.count = state.cart.length;
    },
  },
});

export default cartSlice.reducer;
export const { incrementItem, decrementItem, incrementByAmount } =
  cartSlice.actions;
