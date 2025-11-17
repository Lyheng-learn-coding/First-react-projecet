import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { saveCartPro, getCartPro } from "../localStorage/data";

function Navbar({ title }) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <nav className=" w-full p-2.5 bg-white fixed top-0 left-0 z-10 ">
      <button
        onClick={goBack}
        className="btnBack absolute left-2.5 top-1/2 -translate-y-1/2 text-[2rem] text-black cursor-pointer"
      >
        <FaChevronLeft />
      </button>
      <h2 className="text-center md:text-[2rem]  text-[1.3rem]">{title}</h2>
    </nav>
  );
}

function StarRating({ rating }) {
  const starElements = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starElements.push(<FaStar key={i} />); // Full star
    } else if (i - 0.5 <= rating) {
      starElements.push(<FaStarHalfAlt key={i} />); // Half star
    } else {
      starElements.push(<FaRegStar key={i} />); // Empty star
    }
  }
  return (
    <div className="flex items-center gap-1 text-yellow-500 text-[1.3rem]">
      {starElements}
      <span className="text-gray-600 ml-2 text-sm text-[1.2rem]">
        ({rating.toFixed(1)}) review
      </span>
    </div>
  );
}

// ADD TO LOCAL STORAGE CART
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
      className="text-white text-[1.2rem]  bg-black hover:bg-white hover:text-black duration-300 border py-2.5 px-2.5 rounded-[5px]  cursor-pointer"
    >
      <FaCartShopping className="inline-block -mt-1 mr-1" /> Add to cart
    </button>
  );
}

function DetailContainer({ product }) {
  const { thumbnail, title, description, price, rating } = product;
  const [qty, setQty] = useState(1);
  const handleDecrement = () => {
    setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
  };

  const handleIncrement = () => {
    setQty((prevQty) => prevQty + 1);
  };

  return (
    <>
      <Navbar title="Product Details" />
      <section className="detailContainer flex w-full h-full md:flex-row flex-col justify-center items-center md:mt-[150px] mt-[100px]">
        <div className="md:w-[400px] w-full">
          <img src={thumbnail} alt={title} className="w-full" />
        </div>
        <div className="p-2.5">
          <h2 className="font-bold text-[1.5rem]">{title}</h2>
          <div className="mt-2.5 mb-3">
            <StarRating rating={rating} />
          </div>
          <h2 className="font-bold text-[1.5rem]">Description</h2>
          <p className="max-w-prose">{description}</p>
          <h2 className="text-[red] font-bold my-2.5 text-[1.5rem]">
            ${price}
          </h2>
          <div className="flex gap-2.5 justify-end md:justify-start flex-col-reverse md:flex-row ">
            <AddToCart item={product} />
            <div className="flex gap-2.5 justify-end">
              <button
                onClick={handleDecrement}
                className="bg-gray-200 py-2.5 px-4 rounded-[5px] text-black text-[1.3rem]  cursor-pointer"
              >
                <LuMinus />
              </button>
              <span className="qtyDisplay bg-gray-200 p-4 px-5 rounded-[5px] text-black text-[1rem]">
                {qty}
              </span>
              <button
                onClick={handleIncrement}
                className="bg-gray-200 py-2.5 px-4 rounded-[5px] text-black text-[1.3rem]  cursor-pointer"
              >
                <LuPlus />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function GetDataAndFetchData() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: productid } = useParams();

  useEffect(() => {
    if (!productid) {
      setLoading(false);
      setError(new Error("No product ID found"));
      return;
    }

    fetch(`https://dummyjson.com/products/${productid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [productid]);

  if (loading) {
    return <p className="text-center text-2xl mt-10">Loading product...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-2xl text-red-500 mt-10">
        Error: {error.message}
      </p>
    );
  }

  if (!product) {
    return <p className="text-center text-2xl mt-10">Product not found.</p>;
  }

  return <DetailContainer product={product} />;
}

export default GetDataAndFetchData;