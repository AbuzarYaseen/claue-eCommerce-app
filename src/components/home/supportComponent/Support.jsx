import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { SlSupport } from "react-icons/sl";
import { GiReturnArrow } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";

const Support = () => {
  return (
    <div className="grid md:grid-cols-2 xl:md:grid-cols-2 xl:grid-cols-4 xl:px-12 py-5 xl:mt-5 ">
      <div className="flex px-3">
        <LiaShippingFastSolid size={35} />
        <span className="flex flex-col ml-4">
          <h1 className="text-[14px] font-semibold">FREE SHIPPING</h1>
          <p className="text-[14px]">
            Free shipping on all US order or order above $200.
          </p>
        </span>
      </div>
      <div className="flex px-3">
        <SlSupport size={35} />
        <span className="flex flex-col ml-4">
          <h1 className="text-[14px] font-semibold">SUPPORT 24/7</h1>
          <p className="text-[14px]">
            Contact us 24 hours a day, 7 days a week.
          </p>
        </span>
      </div>
      <div className="flex px-3">
        <GiReturnArrow size={35} />
        <span className="flex flex-col ml-4">
          <h1 className="text-[14px] font-semibold">30 DAYS RETURN</h1>
          <p className="text-[14px]">
            Simply return it within 30 days for an exchange.
          </p>
        </span>
      </div>
      <div className="flex px-3">
        <RiSecurePaymentFill size={35} />
        <span className="flex flex-col ml-4">
          <h1 className="text-[14px] font-semibold">100% PAYMENT SECURE</h1>
          <p className="text-[14px]">We ensure secure payment with PEV.</p>
        </span>
      </div>
    </div>
  );
};

export default Support;
