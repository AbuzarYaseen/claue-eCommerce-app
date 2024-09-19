import { trendingItems } from "@/json/home/homeData";
import React from "react";
import Image from "next/image";

const Trending = () => {
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
                <div key={item.id} className="flex flex-col ">
                  <Image width={340} height={300} src={item.url} />
                  <p className="mt-3 font-bold">{item.itemName}</p>
                  <p>{item.price}</p>
                  <p>{item.rating}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:justify-between h-72">
          <div className="divImg1 w-2/4 ml-12 mr-4 flex flex-col justify-center items-center transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h1 className="font-bold text-white text-[30px]">LOOKBOOK 2023</h1>
            <h1 className="font-bold text-white text-[17px]">
              MAKE LOVE THIS BOOK
            </h1>
          </div>

          <div className="divImg2 w-2/4 ml-12 mr-4 flex flex-col justify-center items-center transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h1 className="font-bold text-white text-[20px] ">SUMMER SALE</h1>
            <h1 className="font-bold text-white text-[40px] ">UP TO 70%</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
