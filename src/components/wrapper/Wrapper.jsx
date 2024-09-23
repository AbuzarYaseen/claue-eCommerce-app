"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "@/redux-toolkit-config/store/store.js";
import Navbar from "../navBar/Navbar";
import Footer from "../footer/Footer";
import { ToastContainer } from "react-toastify";

const Wrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <Navbar></Navbar>
      <div>{children}</div>
      <Footer></Footer>
      <ToastContainer />
    </Provider>
  );
};

export default Wrapper;
