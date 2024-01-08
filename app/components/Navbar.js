import React, { useContext, useState } from "react";
import Link from "next/link";
import { CartContext } from "../../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/router";

function Navbar() {
  const { getTotalQuantity } = useContext(CartContext);
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLinkActive = (href) => router.pathname === href;
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const menuElements = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/payment",
      title: "Payment and Delivery",
    },
    {
      href: "/contact",
      title: "Contact",
    },
  ];
  const menuItems = menuElements.map((item) => (
    <Link
      href={item.href}
      passHref
      key={item.href}
      className={`mb-2 md:mb-0 inline-block font-medium rounded-full py-2 px-4 mx-2 transition-colors duration-200 ease-in-out ${
        isLinkActive(item.href) ? "bg-pink-500 text-white" : ""
      }`}
    >
      {item.title}
    </Link>
  ));

  const cartElements = [
    {
      href: "/cartpage",
      title: "",
      icon: "/assets/cart.svg",
      reducer: "",
    },
  ];

  const cartItems = cartElements.map((cartitem) => (
    <Link href="/cartpage" className="relative flex items-center">
      <div className="flex flex-col items-center">
        <span className="mb-1 text-sm text-black hidden md:block ">
          {cartitem.title}
        </span>
        <div className="relative flex items-center">
          <span className="mr-2 mx-auto">
            <Image src={cartitem.icon} alt="Cart Icon" width="40" height="40" />
          </span>
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full flex items-center justify-center text-white font-bold w-6 h-6">
            {getTotalQuantity()}
          </span>
        </div>
      </div>
    </Link>
  ));

  const cartMobile = (
    <Link href={cartElements[0].href} passHref className="flex items-center ">
      <span className="mr-2">
        <Image
          src={cartElements[0].icon}
          alt="Cart Icon"
          width="40"
          height="40"
        />
      </span>
      <span className=" font-bold">({getTotalQuantity()})</span>
    </Link>
  );

  return (
    <nav className="bg-gray-200 text-black p-4 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        {/*Logo*/}
        <Link
          href="/"
          passHref
          className="inline-flex items-center gap-2.5 text-xl font-bold text-black md:text-3xl"
          aria-label="logo"
        >
          Nextjs E-Commerce
        </Link>
        {/*Mobile menu toggle button*/}
        <button
          className="md:hidden pl-2"
          onClick={handleMobileMenuToggle}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
        {/*Menu items desktop*/}
        <div className="hidden md:flex">{menuItems}</div>

        {/*Cart desktop*/}
        <div className="hidden md:flex space-x-4">{cartItems}</div>
      </div>
      {/*Menu items mobile*/}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4">
          {menuItems}
        </div>
      )}
      {/*Cart mobile*/}
      <div className="md:hidden fixed bottom-4 right-4 bg-gray-300 p-4 rounded-full shadow-md z-50 ">
        {cartMobile}
      </div>
    </nav>
  );
}

export default Navbar;
