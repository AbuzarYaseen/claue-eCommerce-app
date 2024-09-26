// import React from "react";

// const PaymentMethods = () => {
//   return (
//     <div className=" border p-4 pt-5 pb-10">
//       <h3 className="border-b  text-2xl pb-2 mb-4">Payment Methods</h3>
//       <div className="flex flex-col">
//         <div className="flex gap-5 mb-2">
//           <label className="flex items-center gap-5 cursor-pointer">
//             <input type="radio" id="check-money" name="payment" />
//             <p>Check / Money order</p>
//           </label>
//         </div>
//         <div className="flex gap-5 mb-2">
//           <label className="flex items-center gap-5 cursor-pointer">
//             <input type="radio" id="purchase-order" name="payment" />
//             <p>Purchase Order</p>
//           </label>
//         </div>
//         <div className="flex gap-5 mb-2">
//           <label className="flex items-center gap-5 cursor-pointer">
//             <input type="radio" id="bank-transfer" name="payment" />
//             <p>Bank Transfer Payment</p>
//           </label>
//         </div>
//         <div className="flex gap-5 mb-2">
//           <label className="flex items-center gap-5 cursor-pointer">
//             <input type="radio" id="cash-on-delivery" name="payment" />
//             <p>Cash On Delivery</p>
//           </label>
//         </div>
//         <div>
//           <p>My billing and shipping address are the same</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentMethods;

"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux"; // Import useDispatch
// import { setPaymentMethod } from "@/redux-toolkit-config/slice/paymentMethodSlice";
import { setPaymentMethod } from "@/redux-toolkit-config/slice/shippingDetailsSlice";

const PaymentMethods = () => {
  // State to track if payment method has been touched
  const [touched, setTouched] = useState(false);
  const dispatch = useDispatch(); // Initialize dispatch

  // Formik setup
  const formik = useFormik({
    initialValues: {
      payment: "", // Initial value for the payment method
    },
    validationSchema: Yup.object({
      payment: Yup.string().required("Payment method is required"), // Validation rule
    }),
    onSubmit: (values) => {
      // Handle form submission (optional)
      console.log("Selected Payment Method:", values.payment);
    },
  });

  // Effect to check if payment method is touched
  useEffect(() => {
    // Check on initial render if payment method is empty
    if (!formik.values.payment) {
      setTouched(true); // Set touched to true if no payment method is selected
    }
  }, [formik.values.payment]);

  return (
    <div className="border p-4 pt-5 pb-10">
      <h3 className="border-b text-2xl pb-2 mb-4">Payment Methods</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          {[
            "check-money",
            "purchase-order",
            "bank-transfer",
            "cash-on-delivery",
          ].map((paymentMethod) => (
            <div className="flex gap-5 mb-2" key={paymentMethod}>
              <label className="flex items-center gap-5 xl:text-lg cursor-pointer">
                <input
                  type="radio"
                  id={paymentMethod}
                  name="payment"
                  value={paymentMethod}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldTouched("payment", true); // Mark field as touched on change
                    setTouched(true); // Set touched to true when a payment method is selected
                    dispatch(setPaymentMethod(e.target.value)); // Dispatch the selected payment method to the store
                  }}
                  onBlur={formik.handleBlur}
                  checked={formik.values.payment === paymentMethod}
                />
                <p>
                  {paymentMethod
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </p>
              </label>
            </div>
          ))}
          {formik.touched.payment && formik.errors.payment ? (
            <div className="text-red-500 xl:text-lg ">
              {formik.errors.payment}
            </div>
          ) : touched && !formik.values.payment ? (
            <div className="text-red-500 xl:text-lg">
              Payment method is required
            </div>
          ) : null}
        </div>
        <div className="mt-3 xl:text-lg">
          <p>My billing and shipping address are the same</p>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethods;
