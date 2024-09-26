"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { trendingItems } from "@/json/home/homeData";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux-toolkit-config/slice/slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Slider } from "antd";

const CategoryDetails = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const params = useParams();
  const category = params.category;

  const categoryProducts = trendingItems.filter(
    (item) => item.cat === category
  );
  const [priceRange, setPriceRange] = useState([0, 5000]); // Initial range values
  const [filteredProducts, setFilteredProducts] = useState(categoryProducts);

  const [hoveredProductId, setHoveredProductId] = useState(null);

  // Calculate min and max prices based on available products
  const minPrice = Math.min(
    ...categoryProducts.map((item) => item.price),
    Infinity
  );
  const maxPrice = Math.max(
    ...categoryProducts.map((item) => item.price),
    -Infinity
  );

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

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  useEffect(() => {
    // Filter products based on the current price range
    const newFilteredProducts = categoryProducts.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    setFilteredProducts(newFilteredProducts);
  }, [priceRange, categoryProducts]);

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
          <div className="flex flex-col lg:flex-row gap-6  mx-auto ">
            <div className="mt-5 lg:w-1/5 xl:w-1/4 flex flex-col  items-center">
              <h1 className="text-[14px] md:text-xl xl:text-2xl font-bold mb-3">
                Filter by Price
              </h1>
              <span className="w-2/4 lg:w-full">
                <Slider
                  range
                  min={minPrice}
                  max={maxPrice}
                  defaultValue={[minPrice, maxPrice]}
                  onChange={handlePriceChange}
                  value={priceRange}
                />
              </span>
              <p className="text-sm xl:text-[16px]">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-4">
              {filteredProducts.map((item) => (
                <Link href={`/product-details/${item.id}`} key={item.id}>
                  <div
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
