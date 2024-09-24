import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  cart: [],
  totalAmount: 0,
  shippingAmount: 0,
  orderTotal: 0,
};

const calculateTotalAmount = (cart) => {
  return cart.reduce(
    (acc, item) => acc + item.subTotal, // Use subTotal for total amount
    0
  );
};

const calculateItemSubTotal = (price, quantity) => {
  return Number(price) * (Number(quantity) || 1);
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
        state.cart[itemIndex].subTotal = calculateItemSubTotal(
          state.cart[itemIndex].price,
          state.cart[itemIndex].quantity
        );
      } else {
        const newItem = {
          ...action.payload,
          quantity: 1,
          subTotal: calculateItemSubTotal(action.payload.price, 1),
        };
        state.cart.push(newItem);
      }
      state.count = state.cart.length;
      //Calculating total amount of order without shipping
      state.totalAmount = calculateTotalAmount(state.cart);
      // Calculating order total which includes shipping amount also
      state.orderTotal = state.totalAmount + state.shippingAmount;
    },

    //Setting shipping amount
    setShippingAmount(state, action) {
      state.shippingAmount = action.payload; // Set the shipping amount
      state.orderTotal = state.totalAmount + state.shippingAmount; // Recalculate order total
    },

    // Increment quantity for a specific item
    incrementItem(state, action) {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity += 1;
        state.cart[itemIndex].subTotal = calculateItemSubTotal(
          state.cart[itemIndex].price,
          state.cart[itemIndex].quantity
        );
      }
      state.totalAmount = calculateTotalAmount(state.cart);
    },

    // Decrement quantity for a specific item
    decrementItem(state, action) {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0 && state.cart[itemIndex].quantity > 1) {
        state.cart[itemIndex].quantity -= 1;
        state.cart[itemIndex].subTotal = calculateItemSubTotal(
          state.cart[itemIndex].price,
          state.cart[itemIndex].quantity
        );
      }
      // else {
      //   state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      // }
      state.count = state.cart.length;
      state.totalAmount = calculateTotalAmount(state.cart);
    },

    // Remove item from cart
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      state.count = state.cart.length;
      state.totalAmount = calculateTotalAmount(state.cart);
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  incrementItem,
  decrementItem,
  removeFromCart,
  setShippingAmount,
} = cartSlice.actions;
