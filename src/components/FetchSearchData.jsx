import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { saveCartPro, getCartPro } from "../localStorage/data";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { Fade } from "react-awesome-reveal";

function AddToCart({ item }) {
  const addTheProduct = () => {
    let cart = getCartPro();
    let quantity = 1;

    let checkExisting = cart.find((p) => p.id === item.id);
    if (checkExisting) {
      checkExisting.quantity += quantity;
      Swal.fire({
        title: "Quantity Updated",
        text: "The product quantity has been updated in your cart.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        draggable: true,
      });
    } else {
      let productToAdd = { ...item, quantity: 1 };
      cart.push(productToAdd);
      Swal.fire({
        title: "Added to Cart!",
        text: "Product has been added to your cart.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        draggable: true,
      });
    }
    saveCartPro(cart);
  };

  return (
    <button
      onClick={addTheProduct}
      className="p-2.5 text-white text-[1rem] bg-black hover:bg-[#ccc] hover:text-black duration-300"
    >
      Add to cart
    </button>
  );
}

function ProductCarouselSearch() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const query = searchParams.get("pro");

    if (query) {
      setLoading(true);
      fetch(`https://dummyjson.com/products/search?q=${query}`)
        .then((res) => {
          if (!res.ok) {
            const msg = res.status;
            throw new Error(msg);
          }
          return res.json();
        })
        .then((data) => {
          const allowedCategories = ["smartphones", "laptops"];
          const filteredProducts = data.products.filter((product) =>
            allowedCategories.includes(product.category)
          );
          setProducts(filteredProducts);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [searchParams]);

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

  if (loading) {
    return <p className="text-center w-full">Loading products...</p>;
  }

  if (error) {
    return (
      <p className="text-center w-full text-red-500">Error: {error.message}</p>
    );
  }

  return (
    <div className="relative mb-5 mt-5">
      <h2 className="md:text-[2rem]  text-[1rem] font-bold mb-2  text-left">
        Products Available
      </h2>

      <Fade duration={2000} delay={200} triggerOnce>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scroll-smooth snap-x-mandatory  gap-2.5 hide-scrollbar"
        >
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="rounded-[10px] snap-start shrink-0 w-[150px] md:w-1/4 p-2"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-[200px] p-2.5 rounded-[10px] md:h-full aspect-6/7 object-cover shadow-sm"
                  />
                </Link>
                <div className="flex flex-col gap-2.5 pt-5">
                  <h2 className="font-bold text-[1.3rem] truncate">
                    {product.title}
                  </h2>
                  <p className="text-[green] text-[1rem] ">
                    Price <span>${product.price}</span>
                  </p>
                  <AddToCart item={product} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full text-[1.5rem] text-[red]">
              No products found
            </p>
          )}
        </div>
      </Fade>

      {products.length > 0 && (
        <>
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
        </>
      )}
    </div>
  );
}

export default ProductCarouselSearch;
