import React, { useContext, useState } from "react";
import Link from "next/link";
import { CartContext } from "../../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/router";

import { AiFillPhone, AiOutlineFieldTime } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";
function Navbar() {
  const { getTotalQuantity } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gray-50  ">
      <div className="lg:w-4/5 flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/">
          <div className="text-center text-black">
            <div className="text-3xl font-bold">Nextjs E-Commerce</div>
            <div className="text-lg">Amir Ibraimov</div>
          </div>
        </Link>
       

        {/* Hamburger Menu for Mobile */}

        <button
          className="md:hidden block p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className="sr-only">Меню</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Navigation Menu */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:w-auto md:block mt-4 md:mt-0`}
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col font-medium bg-gray-50 md:flex-row md:space-x-8 md:bg-transparent text-black">
            <li>
              <Link
                href="/"
                onClick={closeMenu}
                className={`block py-2 pr-3 pl-3 ${
                  router.pathname === "/" ? "bg-pink-500 text-white" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/payment"
                onClick={closeMenu}
                className={`block py-2 pr-3 pl-3 ${
                  router.pathname === "/payment" ? "bg-pink-500 text-white" : ""
                }`}
              >
                Delivery and Payment
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={closeMenu}
                className={`block py-2 pr-3 pl-3 ${
                  router.pathname === "/contact" ? "bg-pink-500 text-white" : ""
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Address Section */}
        <div className=" text-black">
          <Link href="/cartpage" className="relative flex items-center">
            {/* Add "Your Cart" above the cart icon */}
            <div className="flex flex-col items-center">
              <span className="mb-1 text-sm text-black hidden md:block ">
                Your cart
              </span>
              <div className="relative flex items-center">
                <span className="mr-2 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full flex items-center justify-center text-white font-bold w-6 h-6">
                  {getTotalQuantity()}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
