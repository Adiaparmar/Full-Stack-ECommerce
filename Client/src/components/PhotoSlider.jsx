import { useState } from "react";

const slides = [
  { top: "#C2D2CA", bottom: "#F5F9F7", text: "Slide 1 Text" },
  { top: "#E5A0A0", bottom: "#FFE7E7", text: "Slide 2 Text" },
  { top: "#C2D2CA", bottom: "#F5F9F7", text: "Slide 3 Text" },
  { top: "#E5A0A0", bottom: "#FFE7E7", text: "Slide 4 Text" },
  { top: "#C2D2CA", bottom: "#F5F9F7", text: "Slide 5 Text" },
  { top: "#E5A0A0", bottom: "#FFE7E7", text: "Slide 6 Text" },
];

const PhotoSliderMobile = ({ headerText = "Current favourites!" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = 2;
  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (totalSlides - slidesToShow + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (totalSlides - slidesToShow + 1)) %
        (totalSlides - slidesToShow + 1)
    );
  };

  return (
    <div className="relative w-full max-w-full mx-auto overflow-hidden bg-[#EDF1F1]">
      <div
        className="text-3xl py-4 pl-1 flex justify-center text-[#255640]"
        style={{ fontFamily: "Jacques Francois, serif" }}
      >
        {headerText}
      </div>
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-none px-2"
            style={{ minWidth: "50%" }}
          >
            <div className="h-80 relative hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div
                className="h-3/4"
                style={{ backgroundColor: slide.top }}
              ></div>
              <div
                className="h-1/4"
                style={{ backgroundColor: slide.bottom }}
              ></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <p className="text-white text-2xl font-semibold">
                  {slide.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute top-3/4 left-0 transform -translate-y-1/2 px-4 py-2 text-gray-700 rounded-r text-2xl"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute top-3/4 right-0 transform -translate-y-1/2 px-4 py-2 text-gray-700 rounded-l text-2xl"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

const PhotoSliderWeb = ({ headerText = "Current favourites!" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = 5;
  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (totalSlides - slidesToShow + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (totalSlides - slidesToShow + 1)) %
        (totalSlides - slidesToShow + 1)
    );
  };

  return (
    <div className="relative w-full max-w-full mx-auto overflow-hidden bg-[#EDF1F1]">
      <div
        className="text-5xl p-4 flex justify-center text-[#255640]"
        style={{ fontFamily: "Jacques Francois, serif", fontSize: "3rem" }}
      >
        {headerText}
      </div>
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-1/5 flex-none px-2"
            style={{ minWidth: "20%" }}
          >
            <div className="h-96 relative hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div
                className="h-3/4"
                style={{ backgroundColor: slide.top }}
              ></div>
              <div
                className="h-1/4"
                style={{ backgroundColor: slide.bottom }}
              ></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <p className="text-white text-2xl font-semibold">
                  {slide.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute top-3/4 left-0 transform -translate-y-1/2 px-4 py-2 text-gray-700 rounded-r text-2xl"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute top-3/4 right-0 transform -translate-y-1/2 px-4 py-2 text-gray-700 rounded-l text-2xl"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

const PhotoSlider = () => {
  return (
    <div>
      {/* Hidden on medium and larger screens (md:hidden) */}
      <div className="md:hidden">
        <PhotoSliderMobile />
      </div>

      {/* Hidden on small screens (sm:hidden) */}
      <div className="hidden md:block">
        <PhotoSliderWeb />
      </div>
    </div>
  );
};

export default PhotoSlider;
