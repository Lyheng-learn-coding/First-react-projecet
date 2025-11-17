import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import letterZ from "../assets/letterZ.png";
// import icon
import { FaSearch } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { FaCartShopping } from "react-icons/fa6";
import {
  getCartPro,
  getRecentSearch,
  saveRecentSearch,
} from "../localStorage/data";

function ShowQuantity() {
  const [checkLength, setCheckLength] = useState(getCartPro().length);

  useEffect(() => {
    const handleCartUpdate = () => {
      setCheckLength(getCartPro().length);
    };
    window.addEventListener("cart-updated", handleCartUpdate);
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, []);

  return (
    <Link to="/Cart" className="text-[1.5rem] relative ">
      <FaCartShopping />
      <span
        className={`absolute -top-2.5 -right-3 bg-orange-400 rounded-[50%] text-white text-[0.9rem] size-5 flex justify-center items-center ${
          checkLength >= 1 ? "visible" : "invisible"
        } `}
      >
        {checkLength > 0 ? checkLength : ""}
      </span>
    </Link>
  );
}

const toggleSearch = () => {
  const navbarInput = document.querySelector(".navBarInput");
  const overlayDark = document.querySelector(".overlayDark");
  const input = document.querySelector(".inputValue");

  if (navbarInput.classList.contains("-top-full")) {
    navbarInput.classList.remove("-top-full");
    navbarInput.classList.add("top-0");
    overlayDark.classList.remove("hidden");
    overlayDark.classList.add("block");
    input.focus();
  } else {
    navbarInput.classList.remove("top-0");
    navbarInput.classList.add("-top-full");
    overlayDark.classList.remove("block");
    overlayDark.classList.add("hidden");
  }
};

const closeSearch = () => {
  const navbarInput = document.querySelector(".navBarInput");
  const overlayDark = document.querySelector(".overlayDark");

  navbarInput.classList.remove("top-0");
  navbarInput.classList.add("-top-full");
  overlayDark.classList.remove("block");
  overlayDark.classList.add("hidden");
};

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedSearch = getRecentSearch();
    if (savedSearch) {
      setInputValue(savedSearch);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = inputValue.trim();
    if (searchTerm !== "") {
      saveRecentSearch(searchTerm);
      navigate(`/search?pro=${searchTerm}`);
      closeSearch();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="flex justify-between  items-center p-5  bg-white shadow-lg fixed top-0 w-full z-10 left-0">
        <Link to="/" className="flex gap-1.5 items-center">
          <img src={letterZ} alt="letter Z" className="size-8 rounded-2.5" />
          {/* <span className="text-black">ZIZA Shop</span> */}
        </Link>

        <div className="relative md:block hidden mr-[-150px]">
          <input
            type="text"
            readOnly
            value={inputValue}
            className="inputSearchBtn text-[1rem] text-black hover:bg-gray-100 p-2.5 border cursor-pointer"
            onClick={toggleSearch}
            placeholder="Search..."
          />
          <FaSearch className="absolute right-2.5 top-3 text-[1.2rem]" />
        </div>

        <div className="md:flex gap-2.5 hidden ">
          <ShowQuantity />
          <ul className=" gap-2.5 flex">
            <li className="relative">
              <Link
                to="/"
                className=" after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:rounded-[5px] hover:after:w-full after:transition-all after:duration-200"
              >
                Home
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/about"
                className=" after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:rounded-[5px] hover:after:w-full after:transition-all after:duration-200"
              >
                About
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/contact"
                className="after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:rounded-[5px] hover:after:w-full after:transition-all after:duration-200"
              >
                Contact
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/services"
                className="after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:rounded-[5px] hover:after:w-full after:transition-all after:duration-200"
              >
                Services
              </Link>
            </li>
          </ul>
        </div>
        <MyButton onMobileMenuClick={toggleMobileMenu} />
      </nav>
      <InputZando
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSearch={handleSearch}
      />
      <NavBarMobile isMobileMenuOpen={isMobileMenuOpen} />
      <OverlayDark />
    </>
  );
}

function InputZando({ inputValue, setInputValue, handleSearch }) {
  return (
    <nav className="navBarInput bg-white w-full fixed -top-full h-[250px] py-2.5 px-[50px]  z-20 transition-all duration-300">
      <form
        onSubmit={handleSearch}
        className="relative w-full flex mb-[-100px] mt-[35px]"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="inputValue w-full pb-2.5  md:text-[1.5rem] text-[1rem] text-black border-b outline-none "
          placeholder="What are you looking for?"
        />
        <div className="bg-white p-2.5 gap-2.5 flex absolute right-0 md:top-0 -top-2.5 ">
          <button type="submit" className="cursor-pointer">
            <FaSearch className="text-[1.2rem]" />
          </button>
          <button
            type="button"
            className="btnRemoveNav cursor-pointer"
            onClick={closeSearch}
          >
            <HiXMark className="text-[1.5rem]" />
          </button>
        </div>
      </form>
    </nav>
  );
}

function OverlayDark() {
  return (
    <div
      className="overlayDark bg-black/50 fixed inset-0 z-10 hidden"
      onClick={closeSearch}
    ></div>
  );
}

function MyButton({ onMobileMenuClick }) {
  return (
    <div className="flex  items-center gap-2.5 md:hidden">
      <ShowQuantity />
      <button
        onClick={toggleSearch}
        className="inputSearchBtn md:hidden block text-[1.5rem] text-black font-bold"
      >
        <FaSearch />
      </button>
      <button
        onClick={onMobileMenuClick}
        className="md:hidden block text-[1.5rem] text-black "
      >
        <i className="fa-solid fa-bars"></i>
      </button>
    </div>
  );
}

function NavBarMobile({ isMobileMenuOpen }) {
  return (
    <nav
      className={`navbarMobileMenu flex justify-center flex-col  gap-10  items-center bg-black  text-[1rem] w-full  ${
        isMobileMenuOpen ? "h-[500px]" : "h-0"
      }  md:hidden mt-20 duration-200`}
    >
      <Link
        to="/"
        className="text-white text-2xl w-full p-2.5 hover:bg-[#ccc] text-center"
      >
        Home
      </Link>

      <Link
        to="/about"
        className="text-white text-2xl w-full p-2.5 hover:bg-[#ccc] text-center"
      >
        About
      </Link>
      <Link
        to="/contact"
        className="text-white text-2xl w-full p-2.5 hover:bg-[#ccc]  text-center"
      >
        Contact
      </Link>
      <Link
        to="/services"
        className="text-white text-2xl w-full p-2.5 hover:bg-[#ccc]  text-center"
      >
        Services
      </Link>
    </nav>
  );
}

export default Navbar;
