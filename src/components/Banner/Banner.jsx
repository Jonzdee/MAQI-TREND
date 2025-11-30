import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
} from "../../assets/images";
import Image from "../designLayouts/Image";

/**
 * CustomSlide Component
 * Renders an individual slide with image and text content
 *
 * @param {Object} props - Component props
 * @param {string} props.subtitle - Subtitle text for the slide
 * @param {string} props.imgSrc - Image source URL
 * @param {string} props.title - Main heading text
 * @param {string} props.buttonLink - Navigation link for the CTA button
 * @param {string} props.buttonText - Text displayed on the CTA button
 */
const CustomSlide = ({ subtitle, imgSrc, title, buttonLink, buttonText }) => (
  <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
    {/* Background Image */}
    <Image
      imgSrc={imgSrc}
      className="absolute inset-0 w-full h-full object-cover"
      alt={title}
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

    {/* Content Section */}
    <div className="relative z-10 h-full flex items-center justify-start px-8 lg:px-20">
      <div className="max-w-2xl text-left animate-fadeIn">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
          {title}
        </h1>
        <p className="text-lg lg:text-xl text-gray-100 mb-8 leading-relaxed drop-shadow-lg max-w-xl">
          {subtitle}
        </p>
        <Link to={buttonLink}>
          <button className="bg-primeColor text-white font-semibold py-4 px-10 rounded-md hover:bg-white hover:text-primeColor transition-all duration-300 shadow-2xl hover:shadow-2xl hover:scale-105 transform">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  </div>
);

/**
 * Banner Component
 * Main carousel component displaying promotional slides
 */
const Banner = () => {
  const [dotActive, setDotActive] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    fade: true,
    cssEase: "ease-in-out",
    beforeChange: (_, next) => setDotActive(next),
    appendDots: (dots) => (
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <ul className="flex gap-3 items-center justify-center">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
          i === dotActive
            ? "bg-primeColor scale-125"
            : "bg-gray-400 hover:bg-gray-500"
        }`}
        aria-label={`Go to slide ${i + 1}`}
      ></div>
    ),
  };

  const slides = [
    {
      imgSrc: bannerImgThree,
      title: "Elevate Your Style",
      subtitle:
        "Discover our premium collection of carefully curated fashion pieces designed to enhance your wardrobe.",
      buttonLink: "/offer",
      buttonText: "Shop Now",
    },
    {
      imgSrc: bannerImgTwo,
      title: "Quality Meets Fashion",
      subtitle:
        "Experience exceptional craftsmanship and timeless designs that reflect your unique personality.",
      buttonLink: "/shop",
      buttonText: "Learn More",
    },
    {
      imgSrc: bannerImgThree,
      title: "Redefining Elegance",
      subtitle:
        "Explore our collection featuring innovative designs and premium materials that set new standards in fashion.",
      buttonLink: "/contact",
      buttonText: "Contact Us",
    },
  ];

  return (
    <div className="w-full relative bg-white overflow-hidden">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
