"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import {
  incrementItem,
  decrementItem,
} from "@/redux-toolkit-config/slice/slice";
import { setOrderComment } from "@/redux-toolkit-config/slice/shippingDetailsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const OrderSummary = () => {
  const [viewCartItems, setViewCartItems] = useState(false);
  const [comment, setComment] = useState(""); // State to store comment
  const [isChecked, setIsChecked] = useState(false); // Track terms checkbox
  const [error, setError] = useState(false); // Track error state

  const itemsInCart = useSelector((state) => {
    return state.cart.count;
  });
  const subTotal = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const shippingAmount = useSelector(
    (state) => state.shippingDetails.shippingAmount
  ); // Get shipping amount

  // Getting details from store to send to firebase

  const shippingDetails = useSelector(
    (state) => state.shippingDetails.shippingAddressData
  );
  const deliveryDate = useSelector(
    (state) => state.shippingDetails.deliveryDate
  );
  const deliveryComment = useSelector(
    (state) => state.shippingDetails.deliveryComment
  );
  const paymentMethod = useSelector(
    (state) => state.shippingDetails.paymentMethod
  );
  // Getting details from store to send to firebase

  const handleIncrement = (id) => {
    dispatch(incrementItem({ id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementItem({ id }));
  };

  const handleOrderCommentChange = (e) => {
    setComment(e.target.value);
    dispatch(setOrderComment(e.target.value)); // Dispatch comment to Redux store
  };

  // Calculate order total based on shipping method
  const orderTotal = subTotal + shippingAmount;

  const handlePlaceOrder = async () => {
    const user = auth.currentUser; // Get the current authenticated user

    if (!isChecked) {
      setError(true); // Show error if terms are not accepted
    } else {
      setError(false);

      if (!user) {
        toast.error("Login first to place order.", {
          position: "top-right",
        }); // Show error toast if user is not logged in
        return; // Exit early if not logged in
      }

      // Order details to send to Firebase
      const orderData = {
        userId: user.uid,
        email: user.email,
        shippingDetails: shippingDetails,
        deliveryDate: deliveryDate,
        deliveryComment: deliveryComment,
        paymentMethod: paymentMethod,
        subTotal: subTotal,
        shippingAmount: shippingAmount,
        orderTotal: orderTotal,
        orderComment: comment,
        // placedAt: new Date().toISOString(), // Timestamp for order
      };

      try {
        // Generate a new document in the 'orders' collection with the user's ID
        await setDoc(doc(db, "orders", user.uid), orderData);
        toast.success("Order placed successfully!", {
          position: "top-right",
        });
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Failed to place order. Please try again.", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="w-1/3">
      <div className="border-2 p-4 pt-5 pb-">
        <h3 className="border-b text-2xl pb-2 mb-4">Order Summary</h3>
        <div>
          <span
            className="border-b text-2xl mb-6 py-3 pb-7 cursor-pointer flex justify-between"
            onClick={() => {
              setViewCartItems(!viewCartItems);
            }}
          >
            <h3>{itemsInCart} ITEMS IN CART</h3>
            <IoIosArrowDown />
          </span>

          {/* View item details conditionally */}
          {viewCartItems ? (
            <div className="flex flex-col">
              {cartItems?.map((item) => {
                return (
                  <div className="flex ml-3 mb-4 gap-4" key={item.id}>
                    <div>
                      <Image src={item.url.src} width={60} height={100} />
                    </div>
                    <div className="flex flex-col w-4/5 gap-2">
                      <div className="flex gap-4 justify-between">
                        <p className="">{item.itemName}</p>
                        <p>${Number(item.price).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p>Qty: </p>
                        <div className="gap-x-1 border border-gray-500 rounded-3xl w-1/3 flex justify-between items-center">
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
        <div className="flex border-b mb-6 py-3 pb-4 justify-between">
          <h3 className="italic">CART SUBTOTAL</h3>
          <p className="font-semibold text-[18px]">${subTotal.toFixed(2)}</p>
        </div>
        <div className="flex border-b mb-6 py-3 pb-4 justify-between">
          <h3 className="italic">SHIPPING</h3>
          <p className="font-semibold text-[18px]">${shippingAmount}</p>
        </div>
        <div className="flex border-b mb-6 py-2 justify-between">
          <h3 className="text-2xl font-semibold py-1 pb-3">ORDER TOTAL</h3>
          <p className="font-semibold text-[18px]">${orderTotal.toFixed(2)}</p>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="text" className="text-[14px] mb-3">
            Order Comment
          </label>
          <textarea
            rows={5}
            onChange={handleOrderCommentChange}
            value={comment}
            className="border-black border-2 focus:outline-none rounded-2xl py-3 px-4 text-[14px]"
            placeholder="Order Comment..."
          />
        </div>
        <div className="flex gap-5 mb-2">
          <label className="flex items-center gap-5 cursor-pointer">
            <input
              type="checkbox"
              name="payment"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <p className="text-blue-400">I agree terms and conditions.</p>
          </label>
        </div>
        {error ? (
          <p className="text-red-500 mb-2">
            You must accept the terms and conditions.
          </p>
        ) : null}
      </div>
      <button
        className="w-full py-3 mt-7 rounded-full bg-black text-white hover:bg-[#D19C88]"
        onClick={handlePlaceOrder}
      >
        PLACE ORDER
      </button>
    </div>
  );
};

export default OrderSummary;
