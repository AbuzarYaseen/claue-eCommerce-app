"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "@/app/public/assests/social/img1.png";
import img2 from "@/app/public/assests/social/img2.png";
import img3 from "@/app/public/assests/social/img3.png";
import img4 from "@/app/public/assests/social/img4.png";
import img5 from "@/app/public/assests/social/img5.png";
import img6 from "@/app/public/assests/social/img6.png";
import img7 from "@/app/public/assests/social/img7.png";
import img8 from "@/app/public/assests/social/img8.png";
import img9 from "@/app/public/assests/social/img9.png";
import img10 from "@/app/public/assests/social/img10.png";

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
        <h1 className="font-bold text-[26px]">@FOLLOW US ON INSTAGRAM</h1>
      </span>
      <div className="w-full mx-auto overflow-x-hidden overflow-y-hidden">
        <Slider
          {...settings}
          className="flex items-center justify-center space-x-4"
        >
          <div className="flex items-center justify-center ">
            <Image
              src={img1}
              width={200}
              height={100}
              className="object-contain"
              alt="Image 1"
            />
          </div>
          <div className="flex items-center justify-center ">
            <Image
              src={img2}
              width={200}
              height={100}
              className="object-contain"
              alt="Image 2"
            />
          </div>
          <div className="flex items-center justify-center ">
            <Image
              src={img3}
              width={200}
              height={100}
              className="object-contain"
              alt="Image 3"
            />
          </div>
          <div className="flex items-center justify-center ">
            <Image
              src={img4}
              width={200}
              height={100}
              className="object-contain"
              alt="Image 4"
            />
          </div>
          <div className="flex items-center justify-center ">
            <Image
              src={img5}
              width={200}
              height={100}
              className="object-contain"
              alt="Image 5"
            />
          </div>
          <div className="flex items-center justify-center ">
            <Image
              src={img6}
              width={200}
              height={100}
              className="object-contain"
              alt="Image 6"
            />
          </div>
          <div className="flex items-center justify-center ">
            <Image
              src={img7}
              width={200}
              height={100}
              className="object-contain"
              alt="Image 7"
            />
          </div>
          <div className="flex items-center justify-center ">
            <Image
              src={img8}
              width={200}
              height={100}
              className="object-contain"
              alt="Image 8"
            />
          </div>
          <div className="flex items-center justify-center ">
            <Image
              src={img9}
              width={200}
              height={100}
              className="object-contain"
              alt="Image 9"
            />
          </div>
          <div className="flex items-center justify-center ">
            <Image
              src={img10}
              width={200}
              height={100}
              className="object-contain"
              alt="Image 10"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Social;
