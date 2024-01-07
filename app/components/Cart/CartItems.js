import React, { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { formatPrice } from "../../../context/formatPrice";
import Image from "next/image";

const CartItems = () => {
  const { cartItems, getTotalCost } = useContext(CartContext);

  return (
    <div className="bg-white pt-20 text-black ">
      <h2 class="pt-4 text-2xl text-center text-black mb-4">Your items:</h2>
      <div className="mx-auto w-5/6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="mb-6 p-4 rounded-lg bg-gray-100 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                <p className="mt-1 text-xs text-gray-700">{item.category}</p>
                <p className="mt-1 text-xs text-gray-700">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm">{formatPrice(item.price)}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="mb-4 flex justify-end">
          <p className="text-lg font-bold">
            Total: {formatPrice(getTotalCost())}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
