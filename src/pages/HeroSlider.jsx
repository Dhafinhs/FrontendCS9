import { useState, useEffect } from "react";
import img1 from "../assets/promo1.jpg";
import img2 from "../assets/promo2.jpg";
import img3 from "../assets/promo3.jpg";
import img4 from "../assets/promo4.jpg";

const slides = [img1, img2, img3, img4];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-11/12 sm:w-4/5 lg:w-3/4 mx-auto mt-6 rounded-xl shadow-lg overflow-hidden z-10 bg-blue200">

      <img
        src={slides[current]}
        alt={`Slide ${current}`}
        className="w-full h-48 sm:h-64 object-contain"
      />

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-blue50/70 hover:bg-white p-2 rounded-full shadow"
      >
        ◀
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue50/70 hover:bg-white p-2 rounded-full shadow"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 w-full flex justify-center space-x-2">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? "bg-blue-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
