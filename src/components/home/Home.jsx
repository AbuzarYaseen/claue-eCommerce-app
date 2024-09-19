import React from "react";
import Navbar from "../navBar/Navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "animate.css";
import Trending from "./trending/Trending";
import Bestselling from "./bestSelling/Bestselling";

const Home = () => {
  return (
    <>
      <Navbar />
      {/* <div className="container w-full mx-auto py-8 bg-slate-600"> */}
      <div className="relative w-full   bg-[#E2DAD3]">
        <Carousel className="relative overflow-hidden w-full">
          <CarouselContent className="flex space-x-4  transition-transform duration-300 ease-linear">
            <CarouselItem className="w-full   p-8 rounded-md shadow-lg flex justify-around carousel1-background ">
              <div className="flex flex-col px-12 py-12">
                <div className="w-2/4 animate__animated animate__slideInLeft">
                  <h1 className="font-bold text-[18px] italic mb-7">
                    Spring Summer Sale
                  </h1>
                  <h1 className="font-bold text-[50px]  mb-7">
                    FLASH SALE OF 50%
                  </h1>
                  <p className="mb-7">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Sunt natus porro voluptatem eligendi sit repudiandae dolores
                    maiores ipsa culpa asperiores, illo temporibus ea eos
                    voluptates perferendis, modi quis, vel cumque.
                  </p>
                  <button className="border-2 border-black p-2 rounded-3xl px-8 font-bold text-[14px]">
                    Shop now
                  </button>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="w-full  carousel2-background p-8 rounded-md shadow-lg flex justify-around">
              <div className="flex flex-col px-12 py-12">
                <div className="w-2/4 animate__animated animate__slideInLeft">
                  <h1 className="font-bold text-[18px] italic mb-7">
                    Spring Summer Sale
                  </h1>
                  <h1 className="font-bold text-[50px]  mb-7">
                    FLASH SALE OF 70%
                  </h1>
                  <p className="mb-7">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Sunt natus porro voluptatem eligendi sit repudiandae dolores
                    maiores ipsa culpa asperiores, illo temporibus ea eos
                    voluptates perferendis, modi quis, vel cumque.
                  </p>
                  <button className="border-2 border-black p-2 rounded-3xl px-8 font-bold text-[14px]">
                    Shop now
                  </button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          {/* Previous button */}
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white cursor-pointer">
            ‹
          </CarouselPrevious>

          {/* Next button */}
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white cursor-pointer">
            ›
          </CarouselNext>
        </Carousel>
      </div>
      {/* </div> */}
      <Trending></Trending>
      <Bestselling></Bestselling>
    </>
  );
};

export default Home;
