import Navbar from "./navbar";
import SwiperContainer from "./Swiper";
import ProductCarouselSearch from "./FetchSearchData";
import Footer from "./Footer";

function SearchContainer() {
  return (
    <>
      <Navbar />
      <SwiperContainer />
      <div className="max-w-[1300px] m-auto p-2.5 md:p-0">
        <ProductCarouselSearch />
      </div>
      <Footer />
    </>
  );
}

export default SearchContainer;
