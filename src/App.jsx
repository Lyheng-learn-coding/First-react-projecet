import Navbar from "./components/navbar";
import ProductCarousel from "./components/Carousell";
import Swiper from "./components/Swiper";
import Footer from "./components/Footer";

function HeaderTitle(prop) {
  return (
    <h1 className="text-center text-[red] md:text-[2rem] text-[1.3rem] mt-[30px]">
      {prop.textTitle}
    </h1>
  );
}

function Products() {
  return (
    <>
      <Swiper />
      <main className="md:mt-[100px] mt-5 max-w-[1300px] m-auto  px-2.5">
        <HeaderTitle textTitle="Our Products" />
        <ProductCarousel category="smartphones" title="Smartphones" />
        <ProductCarousel category="laptops" title="Laptops" />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Products />
    </>
  );
}

export default App;
