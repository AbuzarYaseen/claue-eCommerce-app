import React from "react";
import blog1 from "@/app/public/assests/blog/blog1.png";
import blog2 from "@/app/public/assests/blog/blog2.png";
import blog3 from "@/app/public/assests/blog/blog3.png";
import Image from "next/image";

const Blog = () => {
  return (
    <div className="mt-8 px-11">
      <span className="flex justify-center flex-col items-center">
        <h1 className="font-bold text-[26px]">LATEST FROM BLOG</h1>
        <p className="italic text-[#777977]">
          The freshest and most exciting news
        </p>
      </span>
      <div className="flex gap-4">
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
      </div>
    </div>
  );
};

export default Blog;
