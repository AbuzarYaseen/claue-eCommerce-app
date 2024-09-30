"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux-toolkit-config/slice/slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Slider } from "antd";
import { CiShoppingCart } from "react-icons/ci";
import { db } from "../../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const CategoryDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const category = params.category;

  const [priceRange, setPriceRange] = useState([0, 5000]); // Initial range values
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    // Fetch data from Firestore
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const allProducts = [];
      querySnapshot.forEach((doc) => {
        allProducts.push(doc.data());
      });
      setProducts(allProducts);
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    // Calculate min and max prices based on available products
    const categoryProducts = products.filter((item) => item.cat === category);
    if (categoryProducts.length > 0) {
      const minPrice = Math.min(...categoryProducts.map((item) => item.price));
      const maxPrice = Math.max(...categoryProducts.map((item) => item.price));

      // Set initial price range based on min and max prices
      setPriceRange([minPrice, maxPrice]);
      setFilteredProducts(categoryProducts); // Show all initially
    } else {
      setFilteredProducts([]);
    }
  }, [products, category]);

  // Update filteredProducts based on price range changes
  useEffect(() => {
    const categoryProducts = products.filter((item) => item.cat === category);
    const newFilteredProducts = categoryProducts.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    setFilteredProducts(newFilteredProducts);
  }, [priceRange, products, category]);

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

  if (products.length === 0) {
    return <p>Loading products in the "{category}" category.</p>;
  }

  return (
    <div className="mx-auto xl:mx-10 my-8">
      <div className="mt-8 px-5 md:px-10 mx-auto max-w-screen-2xl">
        <span className="flex justify-center flex-col items-center">
          <h1 className="font-bold text-[14px] mt-5 md:text-xl xl:text-2xl capitalize">
            {category} Products
          </h1>
          <p className="italic text-[#777977] text-[14px] md:text-xl xl:text-2xl">
            Browse top items in this category
          </p>
        </span>

        <div className="flex flex-col lg:flex-row gap-6 mx-auto">
          <div className="mt-5 lg:w-1/5 xl:w-1/4 flex flex-col items-center">
            <h1 className="text-[14px] md:text-xl xl:text-2xl font-bold mb-3">
              Filter by Price
            </h1>
            <span className="w-2/4 lg:w-full">
              <Slider
                range
                min={priceRange[0]} // Use the minimum price
                max={priceRange[1]} // Use the maximum price
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
              <div
                key={item.id}
                className="flex flex-col relative hover:cursor-pointer"
                onMouseEnter={() => handleHover(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="absolute top-2 right-2 md:hidden bg-white text-black hover:bg-black hover:text-white rounded-full p-2"
                  onClick={() => handleAddToCartButtonClick(item)}
                >
                  <CiShoppingCart size={25} />
                </button>
                {hoveredProductId === item.id && (
                  <button
                    className="hidden md:block absolute top-28 font-semibold text-[14px] xl:text-xl left-7 md:top-1/2 md:left-12 lg:top-2/4 lg:left-1/4 bg-white text-black hover:bg-black hover:text-white rounded-3xl md:font-bold p-2 px-4"
                    onClick={() => handleAddToCartButtonClick(item)}
                  >
                    Add to cart
                  </button>
                )}
                <Link href={`/product-details/${item.id}`}>
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
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
