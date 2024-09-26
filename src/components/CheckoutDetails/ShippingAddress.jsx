"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { shippingSchema } from "@/formValidationSchema/schema";
import { useDispatch } from "react-redux";
import { setShippingAddressData } from "@/redux-toolkit-config/slice/shippingDetailsSlice";

const ShippingAddress = () => {
  const [createAccount, setCreateAccount] = useState(false);
  const dispatch = useDispatch();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      country: "",
      city: "",
      zip: "",
      state: "",
      company: "",
      phoneNumber: "",
    },
    validationSchema: shippingSchema(createAccount),
    onSubmit: (values) => {
      dispatch(setShippingAddressData(values));
      // Handle form submission
      console.log(values);
    },
  });

  return (
    <div className="lg:w-1/3 border p-4 pt-5 pb-10">
      <h3 className="border-b text-2xl pb-2 mb-4 ">Shipping Address</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="text-[14px] xl:text-lg mb-3">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="border-black border-2 focus:outline-none rounded-3xl py-3 px-4 text-[14px] xl:text-lg"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-xs xl:text-lg">
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        <div className="flex gap-5 mb-4">
          <input
            type="checkbox"
            onChange={() => setCreateAccount(!createAccount)}
          />
          <p className="text-[14px] font-medium xl:text-lg">Create account</p>
        </div>

        {createAccount && (
          <>
            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="text-[14px] xl:text-lg mb-3">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="border-black border-2 focus:outline-none rounded-3xl py-3 px-4 text-[14px] xl:text-lg"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs xl:text-lg">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="confirmPassword"
                className="text-[14px] mb-3 xl:text-lg"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="border-black border-2 focus:outline-none rounded-3xl py-3 px-4 text-[14px] xl:text-lg"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-xs xl:text-lg">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
          </>
        )}

        {[
          "firstName",
          "lastName",
          "streetAddress",
          "country",
          "city",
          "zip",
          "state",
          "company",
          "phoneNumber",
        ].map((field) => (
          <div className="flex flex-col mb-4" key={field}>
            <label htmlFor={field} className="text-[14px] xl:text-lg mb-3">
              {field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={field === "phoneNumber" ? "text" : "text"} // Use 'text' for phone to avoid number input issues
              name={field}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[field]}
              className="border-black border-2 focus:outline-none rounded-3xl py-3 px-4 text-[14px]"
            />
            {formik.touched[field] && formik.errors[field] ? (
              <div className="text-red-500 text-xs">{formik.errors[field]}</div>
            ) : null}
          </div>
        ))}

        <button
          type="submit"
          className="bg-black hover:bg-[#D19C88] text-white rounded-3xl py-2 px-5 mt-4 xl:text-lg"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ShippingAddress;
