"use client";
import { trendingItems } from "@/json/home/homeData";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "@/redux-toolkit-config/slice/slice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { db } from "../../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const Trending = () => {
  // State for handling item hover
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [trending, setTrending] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    //Creating an async function to fetch data from Firestore
    const fetchData = async () => {
      const q = query(
        collection(db, "products"),
        where("trending", "==", true)
      );

      const querySnapshot = await getDocs(q);
      const terndingProducts = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data());
        terndingProducts.push(doc.data());
      });
      setTrending(terndingProducts);
      // console.log("trending Products", terndingProducts);
    };
    fetchData().catch(console.error);
  }, []);

  // Function to handle product hover
  const handleHover = (itemId) => {
    setHoveredProductId(itemId);
    // console.log("hover testing", itemId);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleAddToCartButtonClick = (item) => {
    console.log("Item added to cart.", item);
    dispatch(addToCart(item));
    toast.success("Item successfully added to cart.", {
      position: "top-right",
    });
  };
  return (
    <>
      <div className=" mx-auto xl:mx-10 my-8 ">
        <div className="w-full  mt-8 px-5 md:px-10 xl:w-full mx-auto max-w-screen-2xl">
          <div className="mt-8">
            <span className="flex justify-center flex-col items-center">
              <h1 className="font-bold text-[14px] mt-5 md:text-xl xl:text-2xl">
                TRENDING
              </h1>
              <p className="italic text-[#777977] xl:text-xl">
                Top view in this week
              </p>
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-4 ">
              {trending.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-col relative hover:cursor-pointer"
                    onMouseEnter={() => handleHover(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Show cart icon only on mobile screens */}
                    <button
                      className="absolute top-2 right-2 md:hidden bg-white text-black hover:bg-black hover:text-white rounded-full p-2"
                      onClick={() => handleAddToCartButtonClick(item)}
                    >
                      <CiShoppingCart
                        size={25}
                        className="hover:cursor-pointer "
                      />
                    </button>
                    {/* Show "Add to Cart" button on hover for larger screens */}
                    {hoveredProductId === item.id && (
                      <>
                        <button
                          className="hidden md:block absolute top-28 font-semibold text-[14px] xl:text-xl left-7 md:top-1/2 md:left-12  lg:left-1/3 xl:left-1/4 bg-white text-black hover:bg-black hover:text-white rounded-3xl md:font-bold p-2 px-4"
                          onClick={() => handleAddToCartButtonClick(item)}
                        >
                          Add to cart
                        </button>
                      </>
                    )}
                    <Link href={`/product-details/${item.id}`} key={item.id}>
                      <Image
                        width={340}
                        height={300}
                        src={item.url}
                        alt="product"
                      />
                      <p className="mt-3 text-[14px] xl:text-xl md:font-bold">
                        {item.itemName}
                      </p>
                      <p className="text-[14px] xl:text-xl">${item.price}</p>
                      <p className="text-[14px] xl:text-xl">{item.rating}⭐</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row md:justify-between h-72 gap-4">
            <div className="md:w-2/4 h-full  overflow-hidden">
              <div className="divImg1  flex flex-col justify-center items-center transform hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
                <h1 className="font-bold text-white text-[30px]">
                  LOOKBOOK 2023
                </h1>
                <h1 className="font-bold text-white text-[17px]">
                  MAKE LOVE THIS BOOK
                </h1>
              </div>
            </div>
            <div className="md:w-2/4  h-full overflow-hidden">
              <div className="divImg2 flex flex-col justify-center items-center transform hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
                <h1 className="font-bold text-white text-[20px] ">
                  SUMMER SALE
                </h1>
                <h1 className="font-bold text-white text-[40px] ">UP TO 70%</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
