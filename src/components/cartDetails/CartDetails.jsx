"use client";
import React from "react";
import { useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CartDetails = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalAmount = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const router = useRouter();

  const handleCheckout = () => {
    // Implement checkout logic here
    // router.push("/checkout");
    console.log("clicked");
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
          <ul className="space-y-4">
            {cartItems?.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div className="flex items-center">
                  <Image
                    src={item.url.src}
                    alt={item.itemName}
                    width={40}
                    height={40}
                    className="w-40 h-40 object-cover rounded"
                  />
                  <div className="ml-4">
                    <h2 className="font-semibold">{item.itemName}</h2>
                    <p className="text-gray-500">Price: {item.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* <div className="flex justify-between mt-6 font-bold text-lg">
            <span>Total:</span>
            <span>${totalAmount}</span>
          </div> */}
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-red-300 text-white px-4 py-2 rounded hover:bg-red-400"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartDetails;
