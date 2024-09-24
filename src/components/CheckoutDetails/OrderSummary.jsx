"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import {
  incrementItem,
  decrementItem,
  removeFromCart,
} from "@/redux-toolkit-config/slice/slice";

const OrderSummary = () => {
  const [viewCartItems, setViewCartItems] = useState(false);
  const itemsInCart = useSelector((state) => {
    return state.cart.count;
  });
  const subTotal = useSelector((state) => state.cart.totalAmount);
  const orderTotal = useSelector((state) => state.cart.orderTotal);
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const shippingAmount = useSelector((state) => state.cart.shippingAmount); // Get shipping amount

  const handleIncrement = (id) => {
    dispatch(incrementItem({ id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementItem({ id }));
  };

  // Calculate order total based on shipping method
  // const orderTotal = subTotal + flatRate;

  return (
    <div className="w-1/3  ">
      <div className="border-2 p-4 pt-5 pb-">
        <h3 className="border-b  text-2xl pb-2 mb-4">Order Summary</h3>
        <div>
          <span
            className="border-b  text-2xl mb-6 py-3 pb-7 cursor-pointer flex justify-between"
            onClick={() => {
              setViewCartItems(!viewCartItems);
            }}
          >
            <h3>{itemsInCart} ITEMS IN CART</h3>
            <IoIosArrowDown />
          </span>

          {/* View item details conditioanlly */}
          {viewCartItems ? (
            <div className="flex flex-col">
              {cartItems?.map((item) => {
                return (
                  <div className="flex ml-3  gap-2">
                    <div>
                      <Image src={item.url.src} width={60} height={80} />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-4">
                        <p className="">{item.itemName}</p>
                        <p>${Number(item.price).toFixed(2)}</p>
                      </div>
                      <div className="flex">
                        <p>Qty:</p>
                        <div className=" gap-x-2 border border-gray-500 py-1 rounded-3xl w-1/3 flex justify-between items-center">
                          <button
                            className="text-black px-2 py-1 rounded"
                            onClick={() => handleDecrement(item.id)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="text-black px-2 py-1 rounded"
                            onClick={() => handleIncrement(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="flex border-b  mb-6 py-3 pb-4 justify-between">
          <h3 className=" italic">CART SUBTOTAL</h3>
          <p className="font-semibold text-[18px]">${subTotal.toFixed(2)}</p>
        </div>
        <div className="flex border-b  mb-6 py-3 pb-4 justify-between">
          <h3 className=" italic">SHIPPING</h3>
          <p className="font-semibold text-[18px]">${shippingAmount}</p>
        </div>
        <div className="flex border-b  mb-6 py-2 justify-between">
          <h3 className="text-2xl font-semibold py-1 pb-3">ORDER TOTAL</h3>
          <p className="font-semibold text-[18px]">${orderTotal.toFixed(2)}</p>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="text" className="text-[14px] mb-3">
            Order Comment
          </label>
          <textarea
            rows={5}
            className="border-black border-2 focus:outline-none rounded-2xl py-3 px-4 text-[14px]"
            placeholder="Order Comment..."
          />
        </div>
        <div className="flex gap-5 mb-2">
          <label className="flex items-center gap-5 cursor-pointer">
            <input type="checkbox" name="payment" />
            <p className="text-blue-400">I agree terms and conditions.</p>
          </label>
        </div>
      </div>
      <button className="w-full py-3 mt-7 rounded-full bg-black text-white hover:bg-[#D19C88]">
        PLACE ORDER
      </button>
    </div>
  );
};

export default OrderSummary;
