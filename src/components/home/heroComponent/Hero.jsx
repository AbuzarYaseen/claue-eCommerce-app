import React from "react";

const Hero = () => {
  return (
    <div className="pt-14">
      <div className="px-3 m-auto flex flex-col md:flex-row">
        <div className="overflow-hidden w-1/2 ml-12">
          <div className="heroWomen  lg:h-[45rem]  relative hover:cursor-pointer transform hover:scale-105 transition-transform duration-300 ">
            <button
              className="absolute bg-white text-black hover:text-white hover:bg-[#CF9784] rounded-2xl text-[14px] 
          font-semibold p-2 px-10 lg:top-3/4 lg:left-64"
            >
              Women
            </button>
          </div>
        </div>
        <div className="overflow-hidden w-1/2 mr-12 ml-5 flex flex-col">
          <div className="watches  lg:h-1/2 mb-5 relative hover:cursor-pointer transform hover:scale-105 transition-transform duration-300 ">
            <button
              className="absolute bg-white text-black hover:text-white hover:bg-[#CF9784] rounded-2xl text-[14px] 
          font-semibold p-2 px-10 lg:top-3/4 lg:left-64"
            >
              Watches
            </button>
          </div>
          <div className="heroAccessries  lg:h-1/2 mt-5 relative hover:cursor-pointer transform hover:scale-105 transition-transform duration-300 ">
            <button
              className="absolute bg-white text-black hover:text-white hover:bg-[#CF9784] rounded-2xl text-[14px] 
          font-semibold p-2 px-10 lg:top-3/4 lg:left-64"
            >
              Accessories
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Hero;
