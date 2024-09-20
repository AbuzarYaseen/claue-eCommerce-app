"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/app/public/assests/logo_claue_1.png";
import { navLinks } from "@/json/navLinks/navlinks";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { CiShoppingCart } from "react-icons/ci";
import { HiMenuAlt3 } from "react-icons/hi"; // Hamburger menu icon
import { AiOutlineClose } from "react-icons/ai"; // Close icon
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const cart = useSelector((state) => {
    return state.cart.count;
  });

  const renderHome = () => {
    router.push("/home");
  };

  return (
    <div className="flex justify-between px-4 py-4 items-center md:px-20">
      {/* Hamburger Icon for Mobile and Tablet */}
      <HiMenuAlt3
        size={30}
        className="lg:hidden cursor-pointer"
        onClick={() => setDrawerOpen(true)}
      />

      {/* Logo in the center on mobile and left on larger screens */}
      <div className="flex-grow text-center lg:flex-grow-0">
        <Image
          src={logo}
          width={100}
          height={100}
          alt="Logo"
          onClick={renderHome}
          className="hover:cursor-pointer"
        />
      </div>

      {/* Normal Navbar for larger screens */}
      <div className="hidden lg:flex">
        <ul className="flex flex-row space-x-14">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className="cursor-pointer font-bold hover:text-red-300"
            >
              <Link href={link.url}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Icons (Search, Shopping Cart, Account) */}
      <div className="flex w-36 justify-end space-x-4 md:w-36 md:justify-between">
        <CiSearch size={30} className="hover:cursor-pointer" />

        <div className="relative inline-block">
          <CiShoppingCart size={30} className="hover:cursor-pointer " />
          {cart > 0 ? (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cart}
            </span>
          ) : null}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <VscAccount size={30} className="hover:cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/login">Sign in</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/signup">Create An Account</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Side Drawer for Mobile and Tablet */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`} // Show on mobile and tablet
      >
        <div className="flex justify-between items-center p-4">
          <Image src={logo} width={80} height={80} alt="Logo" />
          <AiOutlineClose
            size={30}
            className="cursor-pointer"
            onClick={() => setDrawerOpen(false)}
          />
        </div>
        <ul className="flex flex-col p-4 space-y-4">
          {navLinks.map((link) => (
            <li key={link.id} className="text-lg font-bold">
              <Link href={link.url} onClick={() => setDrawerOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
