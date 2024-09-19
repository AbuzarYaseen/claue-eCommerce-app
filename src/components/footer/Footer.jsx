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

const Footer = () => {
  return (
    <div className="bg-[#F6F6F8] p-14 grid justify-center items-center">
      <div className="grid  md:grid-cols-2 md:grid-rows-2 xl:grid-cols-5 xl:grid-rows-1 ">
        <ul className="flex flex-col mr-5 pr-6">
          <li className="mb-6">
            <Image src={logo} className="h-6 w-20" />
          </li>
          <li className="mb-3">
            <span className="flex items-center">
              <CiLocationOn size={40} />
              <span className="pl-3 text-[14px]">
                184 Main Rd E, St Albans VIC 3021, Australia
              </span>
            </span>
          </li>
          <li className="mb-3">
            <span className="flex items-center">
              <CiMail />
              <span className="pl-3 text-[14px]">contact@company.com</span>
            </span>
          </li>
          <li className="mb-3">
            <span className="flex items-center">
              <FaPhoneAlt />
              <span className="pl-3 text-[14px]">+001 2233 456</span>
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
        <div>
          <h3 className="font-bold mb-4">Categories</h3>
          <ul className="flex flex-col">
            {categories.map((cat, index) => {
              return (
                <li
                  key={cat.id}
                  className="mb-3 hover:cursor-pointer hover:text-red-300 text-[14px]"
                >
                  {cat.catName}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Information</h3>
          <ul className="flex flex-col">
            {information.map((info, index) => {
              return (
                <li
                  key={info.id}
                  className="mb-3 hover:cursor-pointer hover:text-red-300 text-[14px]"
                >
                  {info.info}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Quick Links</h3>
          <ul className="flex flex-col">
            {links.map((info, index) => {
              return (
                <li
                  key={info.id}
                  className="mb-3 hover:cursor-pointer hover:text-red-300 text-[14px]"
                >
                  {info.info}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Newsletter</h3>
          <div className="flex flex-col">
            <p className="text-[14px]">
              Subscribe to our newsletter and get 10% off your first purchase
            </p>
            <div>
              <input
                type="email"
                placeholder="Your email"
                className="border-[1px] p-3 px-4 rounded-3xl border-black relative"
              />
              <button className="border-[1px] border-black bg-black text-white rounded-3xl font-bold p-2 absolute left-40 px-4 top-[1704px] md:top-[1200px] lg:top-[1140px] lg:left-56 xl:top-[837px] xl:left-[1225px]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
