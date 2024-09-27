"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";

const BannerComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // Tablet (up to 1024px)
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 640, // Mobile (up to 640px)
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="mx-auto xl:mx-10 my-8 ">
      <div className="mt-8 px-5 md:px-10 xl:w-full mx-auto max-w-screen-2xl ">
        <Slider {...settings}>
          {/* First slide */}
          <div className="w-full md:p-8 rounded-md shadow-lg flex px-8 justify-around carousel2-background">
            <div className="flex flex-col md:px-12 py-12">
              <div className="md:w-2/4 animate__animated animate__slideInLeft">
                <h1 className="font-bold hidden md:block md:text-[18px] italic mb-7">
                  Spring Summer Sale
                </h1>
                <h1 className="font-bold text-[25px] md:text-[50px] mb-7">
                  FLASH SALE OF 50%
                </h1>
                <p className="mb-7 hidden lg:block text-[14px] xl:text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                  natus porro voluptatem eligendi sit repudiandae dolores
                  maiores.
                </p>
                <button className="border-2 border-black p-2 rounded-3xl px-8 font-bold text-[14px]">
                  Shop now
                </button>
              </div>
            </div>
          </div>

          {/* Second slide */}
          <div className="w-full md:p-8 rounded-md shadow-lg flex px-8 justify-around carousel2-background">
            <div className="flex flex-col md:px-12 py-12">
              <div className="md:w-2/4 animate__animated animate__slideInLeft">
                <h1 className="font-bold hidden md:block md:text-[18px] italic mb-7">
                  Spring Summer Sale
                </h1>
                <h1 className="font-bold text-[25px] md:text-[50px] mb-7">
                  FLASH SALE OF 70%
                </h1>
                <p className="mb-7 hidden lg:block text-[14px] xl:text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                  natus porro voluptatem eligendi sit repudiandae dolores
                  maiores.
                </p>
                <button className="border-2 border-black p-2 rounded-3xl px-8 font-bold text-[14px]">
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default BannerComponent;
