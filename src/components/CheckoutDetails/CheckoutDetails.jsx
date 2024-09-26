import React from "react";
import ShippingAddress from "./ShippingAddress";
import ShippingMethods from "./ShippingMethods";
import OrderSummary from "./OrderSummary";

const CheckoutDetails = () => {
  return (
    <>
      <div className="mx-auto xl:mx-10 my-8">
        <div className=" flex flex-col lg:flex-row gap-5 mt-8 px-5 md:px-10 mx-auto max-w-screen-2xl">
          <ShippingAddress />
          <ShippingMethods />
          <OrderSummary />
        </div>
      </div>
    </>
  );
};

export default CheckoutDetails;
