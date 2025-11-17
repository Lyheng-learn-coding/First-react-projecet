import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { saveCartPro, getCartPro } from "../localStorage/data";

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

function FetchData({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [category]); // Re-run effect when category changes

  if (loading) {
    return <p className="text-center w-full">Loading products...</p>;
  }

  if (error) {
    return (
      <p className="text-center w-full text-red-500">Error: {error.message}</p>
    );
  }

  return (
    <>
      {products.map((product) => (
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
      ))}
    </>
  );
}

export default FetchData;
