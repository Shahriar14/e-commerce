// src/components/Slider.jsx
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useState } from "react";
import { sliderItems } from "../data";
import { Link } from "react-router-dom"; // If you have links in slides

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden hidden md:flex">

      {/* Left Arrow */}
      <div
        className="absolute top-0 bottom-0 left-4 m-auto w-12 h-12 bg-white bg-opacity-70 rounded-full flex items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300 shadow-lg z-10"
        onClick={() => handleClick("left")}
      >
        <SlArrowLeft className="text-2xl text-gray-700" />
      </div>

      {/* Wrapper for Slides */}
      <div
        className="h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
      >
        {sliderItems.map((item) => (
          <div
            key={item.id}
            className={`w-screen h-screen flex items-center bg-gradient-to-r from-${item.bg}-400 to-${item.bg}-700`}
          >
            {/* Info Container */}
            <div className="flex-1 p-8 md:p-16 space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold  shadow-lg">
                {item.title}
              </h1>
              <p className="text-lg md:text-2xl font-semibold tracking-wide  shadow-md">
                {item.desc}
              </p>
              <Link to="/products">
                <button className="px-6 mt-6 py-2 text-lg font-medium bg-blue-500 hover:bg-blue-600  transition-all rounded-lg shadow-md">
                  SHOP NOW
                </button>
              </Link>
            </div>

            {/* Image Container */}
            <div className="flex-1 h-full flex justify-center items-center bg-gray-100">
              <img
                src={item.img}
                alt={item.title}
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <div
        className="absolute top-0 bottom-0 right-4 m-auto w-12 h-12 bg-white bg-opacity-70 rounded-full flex items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300 shadow-lg z-10"
        onClick={() => handleClick("right")}
      >
        <SlArrowRight className="text-2xl text-gray-700" />
      </div>
    </div>
  );
};

export default Slider;
