"use client";
import { trendingItems } from "@/json/home/homeData";
import React, { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "@/redux-toolkit-config/slice/slice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";

const Bestselling = () => {
  // State for handling item hover
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const dispatch = useDispatch();

  // Function to handle product hover
  const handleHover = (itemId) => {
    setHoveredProductId(itemId);
    // console.log("hover testing", itemId);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleAddToCartButtonClick = (item) => {
    console.log("Item added to cart.", item);
    dispatch(addToCart(item));

    toast.success("Item successfully added to cart.", {
      position: "top-right",
    });
  };

  return (
    <>
      <div className=" mx-auto xl:mx-10 my-8 ">
        <div className=" mt-8 px-5 md:px-10 mx-auto max-w-screen-2xl">
          <span className="flex justify-center flex-col items-center">
            <h1 className="font-bold text-[14px] mt-5 md:text-xl xl:text-2xl">
              BEST SELLER
            </h1>
            <p className="italic text-[#777977] xl:text-xl">
              Top sale in this week
            </p>
          </span>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-4">
            {trendingItems.slice(0, 8).map((item) => {
              return (
                <Link href={`/product-details/${item.id}`} key={item.id}>
                  <div
                    key={item.id}
                    className="flex flex-col relative hover:cursor-pointer"
                    onMouseEnter={() => handleHover(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Show cart icon only on mobile screens */}
                    <button
                      className="absolute top-2 right-2 md:hidden bg-white text-black hover:bg-black hover:text-white rounded-full p-2"
                      onClick={() => handleAddToCartButtonClick(item)}
                    >
                      <CiShoppingCart
                        size={25}
                        className="hover:cursor-pointer "
                      />
                    </button>
                    {/* Show "Add to Cart" button on hover for larger screens */}
                    {hoveredProductId === item.id && (
                      <>
                        <button
                          className="hidden md:block absolute top-28 font-semibold text-[14px] xl:text-xl left-7 md:top-1/2 md:left-12  lg:left-1/3 xl:left-1/4 bg-white text-black hover:bg-black hover:text-white rounded-3xl md:font-bold p-2 px-4"
                          onClick={() => handleAddToCartButtonClick(item)}
                        >
                          Add to cart
                        </button>
                      </>
                    )}
                    <Image
                      width={340}
                      height={300}
                      src={item.url}
                      alt="product"
                    />
                    <p className="mt-3 text-[14px] xl:text-xl md:font-bold">
                      {item.itemName}
                    </p>
                    <p className="text-[14px] xl:text-xl">{item.price}</p>
                    <p className="text-[14px] xl:text-xl">{item.rating}⭐</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bestselling;
