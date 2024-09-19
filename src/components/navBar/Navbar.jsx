import React from "react";
import Image from "next/image";
import logo from "@/app/public/assests/logo_claue_1.png";
import { navLinks } from "@/json/navLinks/navlinks";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { CiShoppingCart } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <div className="flex justify-between px-20 py-4 items-center">
      <Image src={logo} width={100} height={100} />
      <div>
        <ul className="flex flex-row space-x-14">
          {navLinks.map((link, index) => {
            return (
              <li
                key={link.id}
                className="cursor-pointer font-bold hover:text-red-300"
              >
                <Link href={link.url}>{link.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex w-36  justify-between">
        <CiSearch size={30} className="hover:cursor-pointer" />
        <CiShoppingCart size={30} className="hover:cursor-pointer" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <VscAccount size={30} className="hover:cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {" "}
              <Link href="/login"> Sign in</Link>{" "}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <Link href="/signup"> Create An Account</Link>{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
