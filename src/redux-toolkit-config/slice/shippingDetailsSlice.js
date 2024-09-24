import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddressData: {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    country: "",
    city: "",
    zip: "",
    state: "",
    company: "",
    phoneNumber: "",
  },
  paymentMethod: "",
  deliveryDate: "",
  deliveryComment: "",
  orderComment: "",
  orderTotal: 0,
  shippingAmount: 0,
};

const shippingDetailsSlice = createSlice({
  name: "shippingDetails",
  initialState,
  reducers: {
    setShippingAddressData: (state, action) => {
      state.shippingAddressData = action.payload;
    },

    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload; // Update payment method
    },

    setDeliveryDate(state, action) {
      state.deliveryDate = action.payload;
    },

    setDeliveryComment(state, action) {
      state.deliveryComment = action.payload;
    },

    setShippingAmount(state, action) {
      state.shippingAmount = action.payload; // Set the shipping amount
    },

    setOrderComment(state, action) {
      state.orderComment = action.payload;
    },
  },
});

export const {
  setShippingAddressData,
  setPaymentMethod,
  setDeliveryComment,
  setDeliveryDate,
  setOrderComment,
  setShippingAmount,
} = shippingDetailsSlice.actions;

export default shippingDetailsSlice.reducer;
