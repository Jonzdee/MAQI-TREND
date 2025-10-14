import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
} from "../../assets/images";
import Image from "../designLayouts/Image";

const CustomSlide = ({ Subtext, imgSrc, text, buttonLink, buttonText }) => (
  <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-100 py-8 px-4 lg:px-16">
    {/* Text Section */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-start lg:items-start text-center lg:text-left p-6">
      <h1 className="text-2xl lg:text-4xl font-bold text-black mb-4">
        {text}
      </h1>
      <p className="text-lg lg:text-xl text-gray-700 mb-6">{Subtext}</p>
      <Link to={buttonLink}>
        <button className="bg-primeColor text-white font-semibold py-2 px-6 rounded hover:bg-black transition duration-300">
          {buttonText}
        </button>
      </Link>
    </div>

    {/* Image Section */}
    <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
      <Image imgSrc={imgSrc} className="w-full h-auto object-cover" />
    </div>
  </div>
);

const Banner = () => {
  const [dotActive, setDotActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    beforeChange: (prev, next) => setDotActive(next),
    appendDots: (dots) => (
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <ul className="space-y-2">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`${
          i === dotActive
            ? "text-black border-r-4 border-black"
            : "text-transparent border-r-4 border-white"
        } py-2 cursor-pointer`}
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          appendDots: (dots) => (
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
              <ul className="space-y-1">{dots}</ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              className={`${
                i === dotActive
                  ? "text-black border-r-3 border-black text-sm"
                  : "text-transparent border-r-3 border-white text-sm"
              } cursor-pointer`}
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  const slides = [
    {
      imgSrc: bannerImgThree,
      text: "Enhance Your Printing Experience",
      Subtext:
        "Explore our premium printers and consumables for exceptional results.",
      buttonLink: "/offer",
      buttonText: "Shop Now",
    },
    {
      imgSrc: bannerImgTwo,
      text: "Quality Printing Solutions",
      Subtext:
        "Discover our wide range of printers and consumables designed for professional printing needs.",
      buttonLink: "/shop",
      buttonText: "About Us",
    },
    {
      imgSrc: bannerImgThree,
      text: "Efficiency Redefined",
      Subtext:
        "Maximize productivity with our advanced printers and high-quality consumables.",
      buttonLink: "/contact",
      buttonText: "Contact Us",
    },
  ];

  return (
    <div className="w-full bg-white">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
