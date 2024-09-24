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
  deliveryDate: null,
  deliveryComment: "",
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
  },
});

export const {
  setShippingAddressData,
  setPaymentMethod,
  setDeliveryComment,
  setDeliveryDate,
} = shippingDetailsSlice.actions;

export default shippingDetailsSlice.reducer;
