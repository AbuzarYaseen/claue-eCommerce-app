"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { countries } from "@/json/countriesList/countries";
import { useRouter } from "next/navigation";

const Shipping = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [shippingMethod, setShippingMethod] = useState("free");
  const [showShippingDetailsForm, setShowShippingDetailsForm] = useState(false);
  const [showDiscountCode, setShowDiscountCode] = useState(false);

  const cartItems = useSelector((state) => state.cart.cart);
  // Get total amount from Redux store
  const subTotal = useSelector((state) => state.cart.totalAmount);

  const flatRate = 20.0;

  // Calculate order total based on shipping method
  const orderTotal = shippingMethod === "free" ? subTotal : subTotal + flatRate;

  const router = useRouter();
  const checkoutButton = () => {
    router.push("/checkout");
  };

  // Update provinces based on the selected country
  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find(
        (country) => country.name === selectedCountry
      );

      if (country) {
        setProvinces(country.provinces);
      } else {
        setProvinces([]);
      }
    }
  }, [selectedCountry]);

  // If no cart items, return null to prevent rendering
  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mx-auto xl:mx-10 my-8">
        <div className="flex flex-col lg:flex-row gap-5 mt-8 px-5 md:px-10 mx-auto max-w-screen-2xl">
          <div className="container   lg:w-[70%] flex flex-col md:flex-row gap-3 border">
            <div className="flex flex-col py-6 border-r">
              <button
                onClick={() => setShowDiscountCode(false)}
                className={`p-2 py-3 text-[14px] border xl:text-lg ${
                  !showDiscountCode
                    ? "bg-black text-white"
                    : "text-black bg-white"
                }`}
              >
                Estimate Shipping and Tax
              </button>
              <button
                onClick={() => setShowDiscountCode(true)}
                className={`p-2 py-3 text-[14px] border xl:text-lg ${
                  showDiscountCode
                    ? "bg-black text-white"
                    : "text-black bg-white "
                }`}
              >
                Apply Discount Code
              </button>
            </div>

            {showDiscountCode ? (
              <div className="flex flex-col p-6 mb-5 md:w-[70%]">
                <input
                  type="text"
                  placeholder="Enter your discount code"
                  className="mb-2 p-2 border border-gray-300 rounded-3xl px-5 text-[14px] xl:text-lg focus:outline-none"
                />
                <button className="bg-black text-white px-4 py-2 rounded-3xl text-[14px] xl:text-lg hover:bg-[#D19C88] md:w-1/3">
                  Apply Discount
                </button>
              </div>
            ) : (
              <div className="mb-4 p-6 md:w-[70%]">
                <p className="text-[14px] mb-4 xl:text-lg">
                  Enter your destination to get a shipping estimate.
                </p>
                <div className="flex flex-row items-center justify-between mb-5">
                  <label
                    htmlFor="country"
                    className="block text-sm font-semibold mb-1 text-[14px] xl:text-lg"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    className=" p-3 border border-gray-300 rounded-3xl text-[14px] xl:text-lg px-4 w-3/4 focus:outline-none"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="">Please select a country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-row items-center justify-between mb-5">
                  <label
                    htmlFor="province"
                    className="block text-sm font-semibold mb-1 focus:outline-none xl:text-lg"
                  >
                    State/Province
                  </label>
                  <select
                    id="province"
                    className="p-3 border border-gray-300 rounded-3xl text-[14px] px-4 w-3/4"
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                  >
                    <option value="">Please select a province</option>
                    {provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <h3 className="text-[14px] font-semibold mb-2 xl:text-lg">
                    FREE SHIPPING
                  </h3>
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id="free"
                      name="shipping"
                      value="free"
                      className="mr-2 xl:text-lg"
                      checked={shippingMethod === "free"}
                      onChange={() => setShippingMethod("free")}
                    />
                    <label htmlFor="free" className="text-[14px] xl:text-lg">
                      Free - $0.00
                    </label>
                  </div>
                  <h3 className="text-[14px] font-semibold mb-2 xl:text-lg">
                    FLAT RATE
                  </h3>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="flat"
                      name="shipping"
                      value="flat"
                      className="mr-2 xl:text-lg"
                      checked={shippingMethod === "flat"}
                      onChange={() => setShippingMethod("flat")}
                    />
                    <label htmlFor="flat" className="text-[14px] xl:text-lg">
                      Fixed - $20.00
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:w-[30%]   ">
            <div className="px-3 border  flex justify-between py-5">
              <h3 className="text-[14px]  mb-2 xl:text-lg">Subtotal</h3>
              <p className="text-[14px] xl:text-lg">${subTotal.toFixed(2)}</p>
            </div>
            <div className="px-3 border  flex justify-between py-5">
              <h3 className="text-[20px]  mb-2 xl:text-lg">Order Total</h3>
              <p className="text-[20px] xl:text-lg">${orderTotal.toFixed(2)}</p>
            </div>
            <div className="w-full">
              <button
                className="mt-4 bg-black text-white px-4 py-3 rounded-3xl hover:bg-[#D19C88]  w-[100%] xl:text-lg"
                onClick={checkoutButton}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
