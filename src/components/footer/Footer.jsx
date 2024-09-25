import React from "react";
import Image from "next/image";
import logo from "@/app/public/assests/logo-2x.png";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { categories, information, links } from "@/json/footerLinks/footerlinks";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className=" mx-auto xl:mx-10 my-8 ">
        <div className=" mt-8 px-5 md:px-10 mx-auto max-w-screen-2xl">
          <div className="bg-[#F6F6F8] px-4 xl:px-14 grid  items-center mt-4 py-16">
            <div className="grid  md:grid-cols-2 md:grid-rows-2 xl:grid-cols-5 xl:grid-rows-1 ">
              <ul className="flex flex-col md:mr-5 pr-6 mt-8">
                <li className="mb-8">
                  <Image src={logo} className="h-6 w-20" />
                </li>
                <li className="mb-3">
                  <span className="flex items-center">
                    <CiLocationOn className="text-base xl:text-4xl" />
                    <span className="pl-3 xl:pl-2 text-[14px] xl:text-[17px]">
                      184 Main Rd E, St Albans VIC 3021, Australia
                    </span>
                  </span>
                </li>
                <li className="mb-3">
                  <span className="flex items-center">
                    <CiMail clas />
                    <span className="pl-3 text-[14px] xl:text-[17px]">
                      contact@company.com
                    </span>
                  </span>
                </li>
                <li className="mb-3">
                  <span className="flex items-center">
                    <FaPhoneAlt />
                    <span className="pl-3 text-[14px] xl:text-[17px]">
                      +001 2233 456
                    </span>
                  </span>
                </li>
                <li className="mb-3">
                  <span className="flex justify-between lg:w-1/4 xl:w-3/4">
                    <span>
                      {" "}
                      <FaFacebookF />
                    </span>
                    <span>
                      {" "}
                      <RiTwitterXFill />
                    </span>
                    <span>
                      {" "}
                      <FaInstagram />
                    </span>
                  </span>
                </li>
              </ul>
              <div className="mt-8">
                <h3 className="font-bold mb-7 xl:text-[17px]">Categories</h3>
                <ul className="flex flex-col">
                  {categories.map((cat, index) => {
                    return (
                      <li
                        key={cat.id}
                        className="mb-3 hover:cursor-pointer hover:text-red-300 text-[14px] xl:text-[17px]"
                      >
                        <Link href={cat.url}>{cat.catName}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="font-bold mb-7 xl:text-[17px]">Information</h3>
                <ul className="flex flex-col">
                  {information.map((info, index) => {
                    return (
                      <li
                        key={info.id}
                        className="mb-3 hover:cursor-pointer hover:text-red-300 text-[14px] xl:text-[17px]"
                      >
                        {info.info}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="font-bold mb-7 xl:text-[17px]">Quick Links</h3>
                <ul className="flex flex-col">
                  {links.map((info, index) => {
                    return (
                      <li
                        key={info.id}
                        className="mb-3 hover:cursor-pointer hover:text-red-300 text-[14px] xl:text-[17px]"
                      >
                        {info.info}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="font-bold mb-7 xl:text-[17px]">Newsletter</h3>
                <div className="flex flex-col gap-3">
                  <p className="text-[14px] xl:text-[17px]">
                    Subscribe to our newsletter and get 10% off your first
                    purchase
                  </p>
                  <div className=" flex border-[1px] rounded-3xl border-black bg-white">
                    <input
                      type="email"
                      placeholder="Your email"
                      className=" p-3 px-4 xl:text-[17px] rounded-3xl w-full focus:outline-none"
                    />
                    <button className="border-[1px] xl:text-[17px] border-black bg-black text-white rounded-3xl font-bold m-1 p-2 px-4">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:px-14 py-5 flex justify-center items-center md:justify-center ">
            <p className=" xl:text-[17px]">
              {" "}
              © 2024 Copyright By CyberEvanglists.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
