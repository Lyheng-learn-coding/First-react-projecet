import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { saveCartPro, getCartPro } from "../localStorage/data";

function Navbar({ title, goBack }) {
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

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCartPro());
  }, []);

  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    saveCartPro(updatedCart);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (quantity < 1) {
      return;
    }
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: quantity } : item
    );
    setCartItems(updatedCart);
    saveCartPro(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const goBack = () => {
    navigate(-1); // Navigates to the previous page in history
  };

  const btnCheckOut = () => {
    if (cartItems.length === 0) {
      return;
    }
    saveCartPro([]);
    setCartItems([]); // clear the state to update the ui

    Swal.fire({
      title: "Your order has been placed",
      text: "Thank you for shopping with ZIZA Shop!",
      icon: "success",
      confirmButtonColor: "#008000",
      confirmButtonText: "Return to home page!",
      draggable: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar title="My Cart" goBack={goBack} />
        <p className="text-center text-2xl mt-[100px]">Your cart is empty.</p>
      </>
    );
  }

  return (
    <>
      <Navbar title="My Carts" goBack={goBack} />
      <section className="flex flex-col md:flex-row p-2.5 pt-0 gap-2.5 w-full mt-[100px] ">
        <div className="w-full overflow-auto hide-scrollbar pt-2.5 max-h-[80vh]">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-left text-[#7c7d86]">Product</th>
                <th></th>
                <th className="text-[#7c7d86]">Each</th>
                <th className="text-[#7c7d86]">Quantity</th>
                <th className="text-[#7c7d86]">Total</th>
                <th className="text-[#7c7d86]">Remove</th>
              </tr>
            </thead>
            <tbody className="border-t-2 border-b-2 border-[#e5e5e5]">
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="flex md:size-40 size-30 p-2 align-top">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </td>
                  <td className="text-center align-top p-2.5 min-w-[150px]">
                    {item.title}
                  </td>
                  <td className="text-center align-top p-2.5 font-bold">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="p-2.5 text-center align-top">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      className="px-5 py-2 border-2 border-[#e5e5e5] rounded-[5px]"
                    >
                      {[...Array(10).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="text-center align-top p-2.5 font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="text-center p-2.5 align-top ">
                    <button onClick={() => handleRemoveItem(item.id)}>
                      <i className="fa-solid fa-trash-can text-[1.2rem] text-[red] cursor-pointer"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-2 md:w-[40%] w-full md:pl-2.5 ">
          <h2 className="text-bold text-black  text-[1.5rem] font-bold">
            Total: <span>${calculateTotal()}</span>
          </h2>
          <button
            onClick={btnCheckOut}
            className="bg-black text-white text-[1rem] p-2.5 w-full hover:bg-white hover:text-black border duration-300"
          >
            Check out
          </button>
        </div>
      </section>
    </>
  );
}

export default Cart;
