"use client";
import React, { useState } from "react";
import PaymentMethods from "./PaymentMethods";
import { Calendar } from "@/components/ui/calendar";
import { useDispatch } from "react-redux";
// import { setShippingAmount } from "@/redux-toolkit-config/slice/slice";
import { setShippingAmount } from "@/redux-toolkit-config/slice/shippingDetailsSlice";
// import {
//   setDeliveryComment,
//   setDeliveryDate,
// } from "@/redux-toolkit-config/slice/deliveryDateAndCommentSlice";
import {
  setDeliveryDate,
  setDeliveryComment,
} from "@/redux-toolkit-config/slice/shippingDetailsSlice";

const ShippingMethods = () => {
  const [date, setDate] = useState(null);
  const [comment, setComment] = useState(""); // State to store comment
  const [showCalendar, setShowCalendar] = useState(false); // State to toggle calendar

  const dispatch = useDispatch();

  // Format the date as MM/DD/YYYY
  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleShippingSelection = (amount) => {
    dispatch(setShippingAmount(amount)); // Dispatch shipping amount to Redux store
    // console.log("shipment amount: ", amount);
  };

  const handleDateSelect = (newDate) => {
    setDate(newDate);
    dispatch(setDeliveryDate(newDate)); // Dispatch selected date to Redux store
    setShowCalendar(false); // Hide calendar after date is selected
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    dispatch(setDeliveryComment(e.target.value)); // Dispatch comment to Redux store
  };

  return (
    <>
      <div className="flex flex-col lg:w-1/3 gap-7">
        <div className="border p-4 pt-5 pb-10">
          <h3 className="border-b text-2xl pb-2 mb-4">Shipping Methods</h3>

          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <tbody>
                <tr onClick={() => handleShippingSelection(0)}>
                  <td className="px-4 py-2">
                    <input
                      type="radio"
                      className="cursor-pointer"
                      name="shipping"
                    />
                  </td>
                  <td className="px-4 py-2 xl:text-lg">$ 0.00</td>
                  <td className="px-4 py-2 xl:text-lg">Free</td>
                  <td className="px-4 py-2 xl:text-lg">Free Shipping</td>
                </tr>
                <tr onClick={() => handleShippingSelection(20)}>
                  <td className="px-4 py-2">
                    <input
                      type="radio"
                      className="cursor-pointer"
                      name="shipping"
                    />
                  </td>
                  <td className="px-4 py-2 xl:text-lg">$ 20.00</td>
                  <td className="px-4 py-2 xl:text-lg">Fixed</td>
                  <td className="px-4 py-2 xl:text-lg">Flat Rate</td>
                </tr>
              </tbody>
            </table>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="delivery-date"
                className="text-[14px] xl:text-lg mb-3"
              >
                Delivery Date
              </label>
              <input
                type="text"
                id="delivery-date"
                placeholder="Select a delivery date"
                className="border-black border-2 focus:outline-none rounded-3xl py-3 px-4 text-[14px] xl:text-lg cursor-pointer"
                value={formatDate(date)} // Show formatted date in the input
                onClick={() => setShowCalendar((prev) => !prev)} // Toggle calendar visibility
                readOnly // Make input read-only, user cannot type in it
              />

              {showCalendar ? (
                <div className="mt-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect} // Dispatch the selected date
                    className="rounded-md border xl:text-lg"
                  />
                </div>
              ) : null}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="text" className="text-[14px] xl:text-lg mb-3">
                Dellivery Comment
              </label>
              <textarea
                rows={3}
                value={comment} // Show comment value
                onChange={handleCommentChange}
                className="border-black border-2 focus:outline-none rounded-2xl py-3 px-4 text-[14px] xl:text-lg"
                placeholder="Enter your comment here..."
              />
            </div>
          </div>
        </div>
        <PaymentMethods />
      </div>
    </>
  );
};

export default ShippingMethods;
