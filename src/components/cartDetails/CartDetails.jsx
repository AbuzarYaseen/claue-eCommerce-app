"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  incrementItem,
  decrementItem,
  removeFromCart,
} from "@/redux-toolkit-config/slice/slice";
import { MdDeleteForever } from "react-icons/md";

const CartDetails = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [totalAmount, setTotalAmount] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    const total = cartItems?.reduce(
      (acc, item) =>
        acc + (Number(item.price) * (Number(item.quantity) || 1) || 0),
      0
    );
    setTotalAmount(total);
  };

  const handleCheckout = () => {
    console.log("Checkout clicked");
  };

  const handleIncrement = (id) => {
    dispatch(incrementItem({ id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementItem({ id }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        <CiShoppingCart className="inline mr-2" />
        Shopping Cart
      </h1>

      {cartItems?.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg">Your cart is empty.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="container mx-auto p-4">
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="text-gray-600 uppercase text-sm leading-normal hidden sm:table-header-group">
                  <tr>
                    <th className="py-3 px-6 text-center border border-gray-300">
                      Product
                    </th>
                    <th className="py-3 px-6 text-center border border-gray-300">
                      Price
                    </th>
                    <th className="py-3 px-6 text-center border border-gray-300">
                      Quantity
                    </th>
                    <th className="py-3 px-6 text-center border border-gray-300">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm ">
                  {cartItems?.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-x-gray-200 flex flex-col md:table-row"
                    >
                      <td className="md:py-3 md:px-6 text-left flex items-center ">
                        <Image
                          src={item.url.src}
                          alt={item.itemName}
                          width={120}
                          height={150}
                          className="object-cover "
                        />
                        <div className="ml-4 flex flex-col w-full sm:w-auto">
                          <span className="font-semibold break-words w-full">
                            {item.itemName}
                          </span>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <MdDeleteForever size={30} />
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center border border-gray-300">
                        ${Number(item.price).toFixed(2)}
                      </td>

                      <td className="py-3 px-24 md:px-6 text-center border border-gray-300">
                        <div className="flex items-center justify-center space-x-2 border border-gray-500 py-1 rounded-3xl">
                          <button
                            onClick={() => handleDecrement(item.id)}
                            className="text-black px-2 py-1 rounded "
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleIncrement(item.id)}
                            className="text-black px-2 py-1 rounded "
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center border border-gray-300">
                        $
                        {(
                          Number(item.price) * (Number(item.quantity) || 1)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Continue Shopping and Update Cart Buttons */}
          <div className="mt-8 text-center flex px-4 flex-col md:flex-row gap-3 md:justify-between">
            <button
              onClick={() => router.push("/")}
              className="bg-[#D19C88] text-white px-7 font-semibold text-[14px] py-2 rounded-3xl hover:bg-black"
            >
              Continue Shopping
            </button>
            <button
              onClick={calculateTotalAmount} // Call the calculateTotalAmount function
              className="border border-black text-black px-7 font-semibold text-[14px] py-2 rounded-3xl hover:bg-gray-100"
            >
              Update Shopping Cart
            </button>
          </div>

          {/* Total Amount */}
          <div className="mt-8 flex justify-between text-lg font-bold sm:text-right">
            <span>Total Amount:</span>
            <span>${totalAmount.toFixed(2) || "0.00"}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDetails;
