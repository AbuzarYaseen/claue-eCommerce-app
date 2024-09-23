"use client";
import { trendingItems } from "@/json/home/homeData";
import React, { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  incrementByAmount,
  incrementItem,
} from "@/redux-toolkit-config/slice/slice";
import { useDispatch } from "react-redux";

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
    dispatch(incrementByAmount(item));

    toast.success("Item successfully added to cart.", {
      position: "top-right",
    });
  };

  return (
    <>
      <div className="mt-8 px-5">
        <span className="flex justify-center flex-col items-center">
          <h1 className="font-bold text-[26px]">BEST SELLER</h1>
          <p className="italic text-[#777977]">Top sale in this week</p>
        </span>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-4">
          {trendingItems.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col relative hover:cursor-pointer"
                onMouseEnter={() => handleHover(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                {hoveredProductId === item.id && (
                  <>
                    <button
                      className="absolute top-28 font-semibold text-[14px] left-7 md:top-1/2 md:left-12 lg:top-2/3 lg:left-1/3 bg-white text-black hover:bg-black hover:text-white rounded-3xl md:font-bold p-2 px-4"
                      onClick={() => handleAddToCartButtonClick(item)}
                    >
                      Add to cart
                    </button>
                  </>
                )}
                <Image width={340} height={300} src={item.url} alt="product" />
                <p className="mt-3 text-[14px] md:font-bold">{item.itemName}</p>
                <p className="text-[14px]">{item.price}</p>
                <p className="text-[14px]">{item.rating}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default Bestselling;
