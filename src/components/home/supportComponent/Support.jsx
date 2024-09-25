import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { SlSupport } from "react-icons/sl";
import { GiReturnArrow } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";

const Support = () => {
  return (
    <div className=" mx-auto xl:mx-10 my-8 ">
      <div className="grid md:grid-cols-2 xl:md:grid-cols-2 xl:grid-cols-4 xl:px-12 py-5 mt-4  px-5 md:px-10  mx-auto max-w-screen-2xl">
        <div className="flex px-4 mb-5">
          <span className="text-[35px] xl:text-[50px]">
            <LiaShippingFastSolid />
          </span>
          <span className="flex flex-col ml-4 gap-1 ">
            <h1 className="text-[14px] font-semibold xl:text-xl">
              FREE SHIPPING
            </h1>
            <p className="text-[14px] xl:text-xl">
              Free shipping on all US order or order above $200.
            </p>
          </span>
        </div>
        <div className="flex px-4 mb-5">
          <span className="text-[35px] xl:text-[50px]">
            <SlSupport />
          </span>
          <span className="flex flex-col ml-4 gap-1 ">
            <h1 className="text-[14px] font-semibold xl:text-xl">
              SUPPORT 24/7
            </h1>
            <p className="text-[14px] xl:text-xl">
              Contact us 24 hours a day, 7 days a week.
            </p>
          </span>
        </div>
        <div className="flex px-4 mb-5">
          <span className="text-[35px] xl:text-[50px]">
            <GiReturnArrow />
          </span>
          <span className="flex flex-col ml-4 gap-1">
            <h1 className="text-[14px] font-semibold xl:text-xl">
              30 DAYS RETURN
            </h1>
            <p className="text-[14px] xl:text-xl">
              Simply return it within 30 days for an exchange.
            </p>
          </span>
        </div>
        <div className="flex px-4 mb-5">
          <span className="text-[35px] xl:text-[50px]">
            <RiSecurePaymentFill />
          </span>
          <span className="flex flex-col ml-4 gap-1 xl:text-xl">
            <h1 className="text-[14px] font-semibold xl:text-xl">
              100% PAYMENT SECURE
            </h1>
            <p className="text-[14px] xl:text-xl">
              We ensure secure payment with PEV.
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Support;
