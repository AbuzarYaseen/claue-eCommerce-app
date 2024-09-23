// "use client";
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { CiShoppingCart } from "react-icons/ci";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import {
//   incrementItem,
//   decrementItem,
//   removeFromCart,
// } from "@/redux-toolkit-config/slice/slice";

// const CartDetails = () => {
//   const cartItems = useSelector((state) => state.cart.cart);
//   const totalAmount = cartItems?.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleCheckout = () => {
//     // Implement checkout logic here
//     console.log("Checkout clicked");
//     // router.push("/checkout");
//   };

//   const handleIncrement = (id) => {
//     dispatch(incrementItem({ id }));
//   };

//   const handleDecrement = (id) => {
//     dispatch(decrementItem({ id }));
//   };

//   const handleRemove = (id) => {
//     dispatch(removeFromCart({ id }));
//   };

//   return (
//     <>
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">
//         <CiShoppingCart className="inline mr-2" />
//         Shopping Cart
//       </h1>

//       {cartItems?.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-lg">Your cart is empty.</p>
//           <button
//             onClick={() => router.push("/")}
//             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <>
//           <ul className="space-y-4">
//             {cartItems?.map((item) => (
//               <li
//                 key={item.id}
//                 className="flex justify-between items-center border-b pb-4"
//               >
//                 <div className="flex items-center">
//                   <Image
//                     src={item.url.src}
//                     alt={item.itemName}
//                     width={40}
//                     height={40}
//                     className="w-40 h-40 object-cover rounded"
//                   />
//                   <div className="ml-4">
//                     <h2 className="font-semibold">{item.itemName}</h2>
//                     <p className="text-gray-500">Price: {item.price}</p>
//                     <p className="text-gray-500">Quantity: {item.quantity}</p>
//                   </div>
//                 </div>

//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleDecrement(item.id)}
//                     className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => handleIncrement(item.id)}
//                     className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
//                   >
//                     +
//                   </button>
//                   <button
//                     onClick={() => handleRemove(item.id)}
//                     className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <div className="flex justify-between mt-6 font-bold text-lg">
//             <span>Total:</span>
//             <span>${totalAmount.toFixed(2)}</span>
//           </div>

//           <button
//             onClick={handleCheckout}
//             className="mt-6 w-full bg-red-300 text-white px-4 py-2 rounded hover:bg-red-400"
//           >
//             Proceed to Checkout
//           </button>
//         </>
//       )}
//     </div>

//     </>
//   );
// };

// export default CartDetails;

"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  incrementItem,
  decrementItem,
  removeFromCart,
} from "@/redux-toolkit-config/slice/slice";

const CartDetails = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalAmount = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const router = useRouter();
  const dispatch = useDispatch();

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
          <div className="space-y-6">
            {cartItems?.map((item) => (
              <div
                key={item.id}
                className="border rounded-md p-4 flex flex-col space-y-4 bg-white sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Product Image and Details */}
                <div className="flex items-center sm:flex-row">
                  <Image
                    src={item.url.src}
                    alt={item.itemName}
                    width={120}
                    height={120}
                    className="object-cover rounded"
                  />
                  <div className="ml-4">
                    <h2 className="font-semibold text-lg">{item.itemName}</h2>
                    <div className="flex justify-between w-full sm:block">
                      <p className="text-gray-500 mt-2">{item.price}</p>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-700 mt-2"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quantity Control and Subtotal */}
                <div className="flex items-center justify-between sm:block">
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-500">
                    Subtotal: $
                    {(Number(item.price || 0) * (item.quantity || 0)).toFixed(
                      2
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping and Update Cart Buttons */}
          <div className="mt-8 space-y-4 text-center">
            <button
              onClick={() => router.push("/")}
              className="w-full bg-[#D19C88] text-white px-4 py-2 rounded-lg hover:bg-[#C08A76]"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => {}}
              className="w-full border border-black text-black px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Update Shopping Cart
            </button>
          </div>

          {/* Total Amount */}
          <div className="mt-8 flex justify-between text-lg font-bold sm:text-right">
            <span>Total Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDetails;
