"use client";
import { trendingItems } from "@/json/home/homeData";
import React, { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bestselling = () => {
  // State for handling item hover
  const [hoveredProductId, setHoveredProductId] = useState(null);

  // Function to handle product hover
  const handleHover = (itemId) => {
    setHoveredProductId(itemId);
    // console.log("hover testing", itemId);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleAddToCartButtonClick = (itemId) => {
    console.log("Item added to cart.", itemId);
    toast.success("Item successfully added to cart.", {
      position: "top-right",
    });
  };

  return (
    <>
      <div className="mt-8 px-11">
        <span className="flex justify-center flex-col items-center">
          <h1 className="font-bold text-[26px]">BEST SELLER</h1>
          <p className="italic">Top sale in this week</p>
        </span>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-8">
          {trendingItems.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col relative"
                onMouseEnter={() => handleHover(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                {hoveredProductId === item.id && (
                  <>
                    <button
                      className="absolute top-2/3 left-1/3 bg-white text-black hover:bg-black hover:text-white rounded-3xl font-bold p-2 px-4"
                      onClick={() => handleAddToCartButtonClick(item.id)}
                    >
                      Add to cart
                    </button>
                  </>
                )}
                <Image width={340} height={300} src={item.url} alt="product" />
                <p className="mt-3 font-bold">{item.itemName}</p>
                <p>{item.price}</p>
                <p>{item.rating}</p>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Bestselling;
