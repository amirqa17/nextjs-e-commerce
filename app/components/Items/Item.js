import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import { toast } from "react-toastify";
import Head from "next/head";
function ShoppingItem({ item }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (item.available) {
      addToCart(item);
      toast.success(`You added ${item.name} to the cart`);
    }
  };

  return (
    <div
      className={`bg-white max-w-sm text-black rounded overflow-hidden shadow-2xl m-8 transition duration-300 transform hover:scale-105 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative ${
        !item.available ? "opacity-70 pointer-events-none" : ""
      }`}
    >
      {item.available === false && (
        <span className=" right-0 bg-red-500 text-white font-bold py-1 px-2 rounded-tl">
          Expecting arrival
        </span>
      )}
      <div className="font-bold text-xl mb-2 py-6 px-10  truncate">
        {item.name}
      </div>

      <Link key={item.id} href={`/items/${item.slug}`} prefetch>
        <div style={{ position: "relative" }}>
          <a>
            <Image
              src={item.image}
              alt={item.name}
              className="w-72 mx-auto bg-white transition duration-500 ease-in-out transform hover:scale-110"
              height={400}
              width={400}
            />
          </a>
        </div>
      </Link>

      <div
        className="p-4 text-sm text-gray-800 rounded-lg h-40 overflow-hidden"
        role="alert"
      >
        <div className="mb-2">
          <span className="font-medium">
            <b>Category : </b>
          </span>
          {item.category}
        </div>
        <div className="mb-2 line-clamp-3 leading-tight min-h-16">
          <span className="font-medium">
            <b>Description :</b>{" "}
          </span>
          {item.briefcontent}
        </div>
        <div className="text-green-600 font-bold text-xl">
          Price: {item.price} ₸
        </div>
      </div>

      <div className="bg-white py-4 px-4 flex flex-col sm:flex-row mx-auto">
        <button
          className={`bg-pink-500 mx-auto hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 active:scale-90 flex items-center space-x-2 flex-shrink-0 ${
            !item.available ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={handleAddToCart}
          disabled={!item.available}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ShoppingItem;
