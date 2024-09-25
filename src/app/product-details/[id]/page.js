"use client";
import { useState } from "react";
import { useParams } from "next/navigation"; // Use useParams from next/navigation
import { trendingItems } from "@/json/home/homeData";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementItem,
  decrementItem,
} from "@/redux-toolkit-config/slice/slice";
import { addToCart } from "@/redux-toolkit-config/slice/slice";
import { toast } from "react-toastify";

const ProductDetails = ({}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const params = useParams(); // Get the dynamic params from the URL
  const id = params.id; // Extract the id

  // Find the product using the dynamic ID from the URL
  const product = trendingItems.find((item) => item.id === parseInt(id));

  // State to keep track of the selected image
  const [selectedImage, setSelectedImage] = useState(product.url);

  // Find the current product in the cart to display its quantity
  const cartProduct = cartItems.find((item) => item.id === product.id);
  const quantity = cartProduct ? cartProduct.quantity : 1;

  // Handle cases where the product is not found
  if (!product) {
    return <p>this is testing {id}</p>;
  }

  const handleIncrement = () => {
    dispatch(incrementItem({ id: product.id }));
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      dispatch(decrementItem({ id: product.id }));
    }
  };

  const handleAddToCartButtonClick = (product) => {
    dispatch(addToCart(product));

    toast.success("Item successfully added to cart.", {
      position: "top-right",
    });
  };

  return (
    <div className=" mx-auto xl:mx-10 my-8 ">
      <div className="flex flex-col md:flex-row md:gap-8 px-5 md:px-10 xl:w-full max-w-screen-2xl m-auto">
        <div className="flex flex-col  mt-4 ">
          <Image
            width={800}
            height={500}
            src={selectedImage}
            alt={product.itemName}
          />
          {/* Thumbnails */}
          <div className="mt-8 flex space-x-2">
            {product.images.map((image, index) => (
              <Image
                key={index}
                width={120}
                height={150}
                src={image}
                alt={`${product.itemName} - ${index + 1}`}
                onClick={() => setSelectedImage(image)}
                className={`cursor-pointer min-w-9 w-24 md:w-32 xl:w-40 ${
                  selectedImage === image ? "border-2 border-blue-500" : ""
                }`}
              />
            ))}
          </div>
        </div>
        <div className="md: pt-2">
          <h1 className="text-[14px] mt-2 md:mt-4 md:text-2xl xl:text-4xl  font-bold">
            {product.itemName}
          </h1>
          <p className="mt-2 md:mt-4 text-[14px] md:text-[18px] xl:text-[24px]">
            Price: ${product.price}
          </p>
          <p className="mt-2 md:mt-4 text-[14px] md:text-[18px] xl:text-[24px]">
            Rating: {product.rating}
          </p>

          {/* Ordered List for brief description */}
          <ol className="list-disc ml-5 mt:2 md:mt-4">
            {product.brief_desc.map((desc, index) => (
              <li
                key={index}
                className="mt-2 text-[14px] md:text-[18px] xl:text-[24px]"
              >
                {desc}
              </li>
            ))}
          </ol>
          <p className="mt:2 md:mt-4 text-[14px] md:text-[18px] xl:text-[24px]">
            {product.desc || "No description available"}
          </p>

          {/* Increment/Decrement Buttons */}
          <div className="flex items-center mt-4 gap-3 md:gap-6">
            <div className="flex items-center gap-5 justify-center border xl:px-10 xl:rounded-full border-gray-500  px-2 rounded-3xl py-1">
              <button
                onClick={handleDecrement}
                className="text-black px-2  rounded font-semibold text-[14px] md:text-[18px] xl:text-[24px]"
                disabled={quantity === 0}
              >
                -
              </button>
              <span className="font-semibold text-[14px] md:text-[18px] xl:text-[24px]">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="text-black px-2  rounded font-semibold text-[14px] md:text-[18px] xl:text-[24px]"
              >
                +
              </button>
            </div>
            <div>
              <button
                className=" font-semibold text-[14px] md:text-[18px] xl:text-[24px] xl:px-10 xl:rounded-full py-2 bg-[#D19C88] hover:bg-black text-white rounded-3xl md:font-bold p-2 px-5"
                onClick={() => handleAddToCartButtonClick(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
