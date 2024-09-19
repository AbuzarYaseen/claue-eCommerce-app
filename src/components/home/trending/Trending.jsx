"use client";
import { trendingItems } from "@/json/home/homeData";
import React, { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Trending = () => {
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
      <div className="w-full px-11">
        <div className="mt-8">
          <span className="flex justify-center flex-col items-center">
            <h1 className="font-bold text-[26px]">TRENDING</h1>
            <p className="italic">Top view in this week</p>
          </span>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-8 ">
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
                        className="absolute top-28 font-semibold text-[14px] left-6 md:top-1/2 md:left-12 lg:top-2/3 lg:left-1/3 bg-white text-black hover:bg-black hover:text-white rounded-3xl md:font-bold p-2 px-4"
                        onClick={() => handleAddToCartButtonClick(item.id)}
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
                  <p className="mt-3 font-bold">{item.itemName}</p>
                  <p>{item.price}</p>
                  <p>{item.rating}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:justify-between h-72">
          <div className="w-2/4 ml-12 mr-4 overflow-hidden">
            <div className="divImg1  flex flex-col justify-center items-center transform hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
              <h1 className="font-bold text-white text-[30px]">
                LOOKBOOK 2023
              </h1>
              <h1 className="font-bold text-white text-[17px]">
                MAKE LOVE THIS BOOK
              </h1>
            </div>
          </div>
          <div className="w-2/4 ml-12 mr-4 overflow-hidden">
            <div className="divImg2 flex flex-col justify-center items-center transform hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
              <h1 className="font-bold text-white text-[20px] ">SUMMER SALE</h1>
              <h1 className="font-bold text-white text-[40px] ">UP TO 70%</h1>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Trending;
