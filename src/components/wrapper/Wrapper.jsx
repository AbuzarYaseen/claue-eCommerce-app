"use client";
import React from "react";
import { Provider } from "react-redux";
import store, { persistedStore } from "@/redux-toolkit-config/store/store.js";
import Navbar from "../navBar/Navbar";
import Footer from "../footer/Footer";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

const Wrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <Navbar></Navbar>
        <div>{children}</div>
        <Footer></Footer>
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
};

export default Wrapper;
