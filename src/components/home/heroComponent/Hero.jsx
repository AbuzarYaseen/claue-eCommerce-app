"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <div className=" mx-auto xl:mx-10 my-8 ">
      <div className="mt-8 px-5 md:px-10 xl:w-full mx-auto max-w-screen-2xl  flex flex-col md:flex-row gap-4">
        <div className="overflow-hidden md:w-1/2 ">
          <div className="heroWomen h-96 lg:h-[45rem]   hover:cursor-pointer transform hover:scale-105 transition-transform duration-300 flex  items-end justify-center">
            <button
              onClick={() => {
                router.push("/category-details/man");
              }}
              className=" bg-white text-black hover:text-white hover:bg-[#CF9784] rounded-2xl text-[14px] xl:text-xl 
          font-semibold p-2 px-10  mb-8"
            >
              Men
            </button>
          </div>
        </div>
        <div className="overflow-hidden md:w-1/2   flex flex-col gap-4">
          <div className="watches h-96 md:h-48 lg:h-1/2 hover:cursor-pointer transform hover:scale-105 transition-transform duration-300 flex  items-end justify-center">
            <button
              onClick={() => {
                router.push("/category-details/watches");
              }}
              className=" bg-white text-black hover:text-white hover:bg-[#CF9784] rounded-2xl text-[14px] xl:text-xl 
          font-semibold p-2 px-10 mb-8"
            >
              Watches
            </button>
          </div>
          <div className="heroAccessries h-48 lg:h-1/2  hover:cursor-pointer transform hover:scale-105 transition-transform duration-300 flex  items-end justify-center">
            <button
              className=" bg-white text-black hover:text-white hover:bg-[#CF9784] rounded-2xl text-[14px] xl:text-xl 
          font-semibold p-2 px-10 mb-8"
            >
              Accessories
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Hero;
