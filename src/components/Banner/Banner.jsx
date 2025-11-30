import React, { useCallback, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // required styles for react-slick
import "slick-carousel/slick/slick-theme.css";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
} from "../../assets/images";
import Image from "../designLayouts/Image";

/**
 * CustomSlide: small, accessible slide component
 */
const CustomSlide = ({
  subtitle,
  imgSrc,
  title,
  buttonLink,
  buttonText,
  index,
}) => (
  <section
    aria-roledescription="slide"
    aria-label={`${title} — Slide ${index + 1}`}
    className="relative w-full h-[400px] lg:h-[500px] overflow-hidden"
  >
    {/* Background image (semantically decorative) */}
    <Image
      imgSrc={imgSrc}
      alt={title || "Promotional background"}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

    {/* Content */}
    <div className="relative z-10 h-full flex items-center justify-start px-6 lg:px-20">
      <div className="max-w-2xl text-left animate-fadeIn">
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-base lg:text-lg text-gray-100 mb-6 max-w-xl">
          {subtitle}
        </p>
        <Link
          to={buttonLink}
          className="inline-block"
          aria-label={`${buttonText} — ${title}`}
        >
          <span className="bg-primeColor text-white font-semibold py-3 px-8 rounded-md hover:bg-white hover:text-primeColor transition-all duration-300 inline-block shadow">
            {buttonText}
          </span>
        </Link>
      </div>
    </div>
  </section>
);

CustomSlide.propTypes = {
  subtitle: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  index: PropTypes.number,
};

/**
 * Banner: main carousel
 *
 * Improvements made:
 * - Adds keyboard navigation (Left/Right) for accessibility
 * - Uses lazy-loading for images
 * - Uses react-slick CSS imports (required)
 * - Memoizes slides array and settings for stability
 * - Replaces decorative dots with accessible buttons and aria-current
 * - Adds role/aria attributes for the carousel region & slides
 * - Adds PropTypes for better developer ergonomics
 */
const Banner = () => {
  const [dotActive, setDotActive] = useState(0);
  const sliderRef = useRef(null);

  // Slides - memoized so object identity is stable across renders
  const slides = useMemo(
    () => [
      {
        imgSrc: bannerImgOne,
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
    ],
    []
  );

  // Settings - kept stable with useCallback to avoid re-creating functions each render
  const beforeChange = useCallback((current, next) => {
    setDotActive(next);
  }, []);

  const settings = useMemo(
    () => ({
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
      beforeChange,
      appendDots: (dots) => (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <ul
            className="flex gap-3 items-center justify-center"
            role="tablist"
            aria-label="Slide dots"
          >
            {dots}
          </ul>
        </div>
      ),
      // render a button per dot for accessibility
      customPaging: (i) => (
        <button
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === dotActive ? "true" : "false"}
          className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
            i === dotActive
              ? "bg-primeColor scale-125"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        />
      ),
    }),
    [beforeChange, dotActive]
  );

  // keyboard navigation (left/right) when slider is focused
  const onKeyDown = useCallback(
    (e) => {
      if (!sliderRef.current) return;
      if (e.key === "ArrowLeft") {
        sliderRef.current.slickPrev();
      } else if (e.key === "ArrowRight") {
        sliderRef.current.slickNext();
      }
    },
    [sliderRef]
  );

  return (
    <div
      className="w-full relative bg-white overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Promotional carousel"
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 700ms ease-out both; }
      `}</style>

      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Carousel container. Use left and right arrow keys to navigate."
      >
        <Slider ref={sliderRef} {...settings}>
          {slides.map((slide, index) => (
            <CustomSlide key={index} index={index} {...slide} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
