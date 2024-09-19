import { trendingItems } from "@/json/home/homeData";
import React from "react";
import Image from "next/image";

const Bestselling = () => {
  return (
    <div className="mt-8">
      <span className="flex justify-center flex-col items-center">
        <h1 className="font-bold text-[26px]">BEST SELLER</h1>
        <p className="italic">Top sale in this week</p>
      </span>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 mx-10 gap-5">
        {trendingItems.map((item) => {
          return (
            <div key={item.id} className="flex flex-col">
              <Image width={250} height={300} src={item.url} />
              <p className="mt-3 font-bold">{item.itemName}</p>
              <p>{item.price}</p>
              <p>{item.rating}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bestselling;
