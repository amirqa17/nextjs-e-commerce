import React from "react";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { formatPrice } from "../../../context/formatPrice";
import Link from "next/link";
import Image from "next/image";

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    getTotalCost,
    getTotalQuantity,
  } = useContext(CartContext);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="bg-gray-100 pt-6 text-black m-auto p-4">
      <h1 className="mb-10 text-center text-2xl font-bold">Your items</h1>
      <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
        <div className="md:w-2/3 ">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="mb-6 rounded-lg bg-white p-6 shadow-md flex"
            >
              <div className="w-40 mr-6">
                <Image
                  height={150}
                  width={150}
                  src={item.image}
                  alt="product-image"
                  className="w-full rounded-lg"
                />
              </div>
              <div className="flex-grow">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-xs text-gray-700">{item.category}</p>

                  <Link href={`/items/${item.slug}`}>
                    {" "}
                    <p className="mt-1 text-xs text-gray-700">Open item page</p>
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="rounded-l bg-pink-500 py-1 px-3.5 duration-100 hover:bg-pink-300 hover:text-blue-50 text-white"
                    >
                      -
                    </button>
                    <input
                      className="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="number"
                      value={item.quantity}
                      min="1"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="rounded-r bg-pink-500 py-1 px-3 duration-100 hover:bg-pink-300 hover:text-blue-50 text-white"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">{formatPrice(item.price)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="cursor-pointer hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Total Price</p>
            <p className="text-gray-700">{formatPrice(getTotalCost())}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Delivery</p>
            <p className="text-gray-700">Free</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total Price</p>
            <div>
              <p className="mb-1 text-lg font-bold">
                {formatPrice(getTotalCost())}
              </p>
              <p className="text-sm text-gray-700">Including Tax</p>
            </div>
          </div>
          <Link href="/checkoutpage">
            <button className="mt-6 w-full mb-12 rounded-md bg-pink-500 py-1.5 font-medium text-blue-50 hover:bg-pink-300">
              Proceed to checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
