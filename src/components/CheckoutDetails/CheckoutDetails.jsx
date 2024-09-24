import React from "react";
import ShippingAddress from "./ShippingAddress";
import ShippingMethods from "./ShippingMethods";
import OrderSummary from "./OrderSummary";

const CheckoutDetails = () => {
  return (
    <>
      <div className=" flex flex-row gap-5 mx-8 ">
        <ShippingAddress />
        <ShippingMethods />
        <OrderSummary />
      </div>
    </>
  );
};

export default CheckoutDetails;
