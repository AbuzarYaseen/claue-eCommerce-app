"use client";
import React from "react";
import blog2 from "@/app/public/assests/blog/blog2.png";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { blogData } from "@/json/blog/blog";

const Blog = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024, // Tablet (641px to 1024px)
        settings: {
          slidesToShow: 3, // Show 4 images on tablet
        },
      },
      {
        breakpoint: 640, // Mobile (up to 640px)
        settings: {
          slidesToShow: 1, // Show 2 images on mobile
        },
      },
    ],
  };
  return (
    <div className=" mx-auto xl:mx-10 my-8 ">
      <div className="mt-8 px-5 md:px-10 mx-auto max-w-screen-2xl">
        <span className="flex justify-center flex-col items-center">
          <h1 className="font-bold text-[14px] mt-5 md:text-xl xl:text-2xl">
            LATEST FROM BLOG
          </h1>
          <p className="italic text-[#777977] xl:text-xl">
            The freshest and most exciting news
          </p>
        </span>
        <div className="overflow-y-hidden overflow-x-hidden ">
          <Slider {...settings}>
            {blogData.map((data) => {
              return (
                <div className="px-2">
                  <Image src={data.url} />
                  <h2 className="xl:text-xl">{data.title}</h2>
                  <p className="text-[#777977] xl:text-xl">{data.writter}</p>
                  <p className="text-[#777977] text-[14px] xl:text-xl leading-6">
                    {data.description}
                  </p>
                </div>
              );
            })}
          </Slider>
        </div>
        {/* <div className="flex gap-4">
        <div className="flex flex-col">
          <Image src={blog2} width={400} height={250} />
          <h2 className="text-[16px] mt-4 font-bold hover:text-[#CF9784] hover:cursor-pointer">
            Burberry CollectionFor Women
          </h2>
          <p className="text-[#777977]">By claaue2</p>
          <p className="text-[#777977] text-[14px] leading-6">
            In recent years, the fashion industry has shifted its focus towards
            sustainability. Designers are increasingly using eco...{" "}
          </p>
        </div>

        <div className="flex flex-col">
          <Image src={blog2} width={400} height={250} />
          <h2 className="text-[16px] mt-4 font-bold hover:text-[#CF9784] hover:cursor-pointer">
            Paris Fashion Week For Women
          </h2>
          <p className="text-[#777977]">By claaue2</p>
          <p className="text-[#777977] text-[14px] leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            perferendis eveniet sit. Nihil adipisci eius dolore autem et amet,
            animi iure deleniti.
          </p>
        </div>

        <div className="flex flex-col">
          <Image src={blog2} width={400} height={250} />
          <h2 className="text-[16px] mt-4 font-bold hover:text-[#CF9784] hover:cursor-pointer">
            Fashion And Mental Health: Boosting Your Mood Through Dress
          </h2>
          <p className="text-[#777977]">By claaue2</p>
          <p className="text-[#777977] text-[14px] leading-6">
            In recent years, the fashion industry has shifted its focus towards
            sustainability. Designers are increasingly using eco...{" "}
          </p>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default Blog;
