import { useRef } from "react";
import FetchData from "./FetchData";
import { Fade } from "react-awesome-reveal";

function ProductCarousel({ category, title }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // Adjust the scroll amount as needed
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // Adjust the scroll amount as needed
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mb-5 mt-5">
      <h2 className="md:text-[2rem]  text-[1rem] pl-2.5 md:pl-0 font-bold mb-2  text-left">
        {title}
      </h2>

      <Fade direction="bottom" duration={2000} delay={200} triggerOnce>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scroll-smooth snap-x-mandatory  px-2.5  gap-2.5 hide-scrollbar"
        >
          <FetchData category={category} />
        </div>
      </Fade>

      <button
        onClick={scrollLeft}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-[0.8rem] md:text-2xl text-white rounded-full bg-black/50 hover:bg-black/70 cursor-pointer size-8 md:size-10 flex items-center justify-center"
      >
        <i className="fi fi-rs-angle-left flex justify-center items-center"></i>
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-[0.8rem] md:text-2xl text-white rounded-full bg-black/50 hover:bg-black/70 cursor-pointer size-8 md:size-10 flex items-center justify-center"
      >
        <i className="fi fi-rs-angle-right flex justify-center items-center"></i>
      </button>
    </div>
  );
}
export default ProductCarousel;
