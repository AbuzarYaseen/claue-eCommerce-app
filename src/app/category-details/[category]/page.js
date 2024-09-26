"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { trendingItems } from "@/json/home/homeData";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux-toolkit-config/slice/slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";

const CategoryDetails = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const params = useParams();
  const category = params.category;

  const categoryProducts = trendingItems.filter(
    (item) => item.cat === category
  );

  const [hoveredProductId, setHoveredProductId] = useState(null);

  // State for the slider, with min = 10 and max = 250
  const [sliderValue, setSliderValue] = useState([10, 250]);

  useEffect(() => {
    if (categoryProducts.length > 0) {
      const prices = categoryProducts.map((item) => item.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      // Set the slider value only if the min/max prices change
      if (sliderValue[0] !== minPrice || sliderValue[1] !== maxPrice) {
        setSliderValue([minPrice, maxPrice]);
      }
    }
  }, [categoryProducts, sliderValue]);

  const handleHover = (itemId) => {
    setHoveredProductId(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleAddToCartButtonClick = (item) => {
    dispatch(addToCart(item));
    toast.success("Item successfully added to cart.", {
      position: "top-right",
    });
  };

  if (categoryProducts.length === 0) {
    return <p>No products found in the "{category}" category.</p>;
  }

  return (
    <>
      <div className=" mx-auto xl:mx-10 my-8 ">
        <div className="mt-8 px-5 md:px-10 mx-auto max-w-screen-2xl">
          <div>
            <p className="text-[14px] xl:text-xl">
              Go sporty this summer with this vintage navy and white striped
              v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing
              with denim and white kicks for a stylish sporty vibe. Will fit a
              UK 8-10, model shown is a UK 8 and 5’5. Typography is the work of
              typesetters, compositors, typographers, graphic designers, art
              directors, manga artists, comic book artists, graffiti artists,
              and now—anyone who arranges words, letters, numbers, and symbols
              for publication, display, or distribution—from clerical workers
              and newsletter writers to anyone self-publishing materials.
            </p>
          </div>
          <span className="flex justify-center flex-col items-center">
            <h1 className="font-bold text-[14px] mt-5 md:text-xl xl:text-2xl capitalize">
              {category} Products
            </h1>
            <p className="italic text-[#777977] text-[14px] md:text-xl xl:text-2xl">
              Browse top items in this category
            </p>
          </span>
          <div className="flex flex-col md:flex-row gap-6 lg:px-4 mx-auto ">
            <div className="mt-5 lg:w-1/5 xl:w-1/4">
              <h1 className="text-[14px] md:text-xl xl:text-2xl font-bold mb-3">
                Filter by price
              </h1>

              {/* Slider Component */}
              <Slider
                defaultValue={sliderValue} // Use the dynamic range
                max={sliderValue[1]} // Set max to the maximum price
                step={5}
                onValueChange={(value) => setSliderValue(value)} // Capture both min and max values
              />

              {/* Display the selected price range */}
              <div className="flex justify-between">
                <span className=" text-[14px] md:text-xl xl:text-2xl font-medium">
                  ${sliderValue[0]} {/* Minimum value */}
                </span>
                <span className=" text-[14px] md:text-xl xl:text-2xl font-medium">
                  ${sliderValue[1]} {/* Maximum value */}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-4">
              {categoryProducts.map((item) => (
                <Link href={`/product-details/${item.id}`} key={item.id}>
                  <div
                    key={item.id}
                    className="flex flex-col relative hover:cursor-pointer"
                    onMouseEnter={() => handleHover(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {hoveredProductId === item.id && (
                      <button
                        className="absolute top-28 font-semibold text-[14px] xl:text-xl left-7 md:top-1/2 md:left-12 lg:top-2/4 lg:left-1/4 bg-white text-black hover:bg-black hover:text-white rounded-3xl md:font-bold p-2 px-4"
                        onClick={() => handleAddToCartButtonClick(item)}
                      >
                        Add to cart
                      </button>
                    )}
                    <Image
                      width={250}
                      height={300}
                      src={item.url}
                      alt={item.itemName}
                    />
                    <p className="mt-3 text-[14px] md:text-xl xl:text-xl md:font-bold">
                      {item.itemName}
                    </p>
                    <p className="text-[14px] md:text-xl xl:text-xl">
                      ${item.price}
                    </p>
                    <p className="text-[14px] md:text-xl xl:text-xl">
                      {item.rating} ⭐
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryDetails;
