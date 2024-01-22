import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import { toast } from "react-toastify";
import { ItemReviewAverage } from "../Review/starRating";
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
    <div className="relative drop-shadow-xl transition duration-300 transform hover:scale-105 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md ">
      <Link
        key={item.id}
        href={`/items/${item.slug}`}
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl group  transition duration-500 ease-in-out transform group-hover:scale-110"
      >
        <Image
          src={item.image}
          alt={item.name}
          className="object-scale-down w-full h-full transition duration-500 ease-in-out transform group-hover:scale-110"
          height={150}
          width={150}
        />
        {item.available === false && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            Not Available
          </span>
        )}
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link key={item.id} href={`/items/${item.slug}`}>
          <h5 className="text-xl tracking-tight text-slate-900 line-clamp-1">
            {item.name}
          </h5>
        </Link>
        <div className="mb-2">
          <span>
            <b>Category : </b>
            {item.category}
          </span>
        </div>

        <article className="mb-2 line-clamp-4 overflow-hidden leading-tight min-h-[4.5em]">
          <p>{item.briefcontent}</p>
        </article>

        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              {item.price}
            </span>
            {item.discount && (
              <span className="text-sm text-slate-900 line-through">
                {item.originalPrice}
              </span>
            )}
          </p>
          <div className="flex items-center">
          <ItemReviewAverage productSlug={item.slug} />
          </div>
        </div>
        <button
          className="flex items-center mx-auto justify-center rounded-md bg-pink-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-300"
          onClick={handleAddToCart}
          disabled={!item.available}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ShoppingItem;
