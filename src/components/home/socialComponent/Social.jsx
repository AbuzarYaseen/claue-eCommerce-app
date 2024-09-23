"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images } from "@/json/socialImages/social";

const Social = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024, // Tablet (641px to 1024px)
        settings: {
          slidesToShow: 4, // Show 4 images on tablet
        },
      },
      {
        breakpoint: 640, // Mobile (up to 640px)
        settings: {
          slidesToShow: 2, // Show 2 images on mobile
        },
      },
    ],
  };
  return (
    <div className="mt-8">
      <span className="flex justify-center flex-col items-center mb-3">
        <h1 className="font-bold md:text-[26px]">@FOLLOW US ON INSTAGRAM</h1>
      </span>
      <div className="overflow-y-hidden overflow-x-hidden ">
        <Slider {...settings}>
          {images.map((img) => {
            return <Image src={img.url} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Social;
