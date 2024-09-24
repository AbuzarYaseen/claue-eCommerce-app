import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import shippingDetailsSlice from "../slice/shippingDetailsSlice";

// Persist configuration for the cart slice
const cartPersistConfig = {
  key: "cart", // This will save the cart under the "cart" key
  storage, // Use localStorage as the default storage
};

// Combine reducers (in case you want to add more slices in the future)
const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartSlice), // Persisted cart reducer
  ShippingDetails: shippingDetailsSlice,
});

// Create the store with persisted reducer
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistedStore = persistStore(store);

export default store;
export { persistedStore };
