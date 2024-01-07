import React, { useContext, useState } from "react";
import CryptoJS from "crypto-js";
import { CartContext } from "../../../context/CartContext";
import { ClipLoader } from "react-spinners";
import dotenv from "dotenv";
dotenv.config();
const FreedomPayPayment = ({ orderId, onOrderCreated }) => {
  const { getTotalCost, cartItems } = useContext(CartContext);

  const [showSpinner, setShowSpinner] = useState(false);
  const [showPayButton, setShowPayButton] = useState(true);

  function handleOrderCreated() {
    onOrderCreated();
  }

  async function initPayment(handleOrderCreated) {
    setShowSpinner(true);
    const pg_order_id = orderId;
    const pg_merchant_id = process.env.NEXT_PUBLIC_REACT_APP_MERCHANT_ID;
    const pg_salt = process.env.NEXT_PUBLIC_REACT_APP_SALT;
    const secret_key = process.env.NEXT_PUBLIC_REACT_APP_FREEDOMPAY_API;
    const pg_amount = getTotalCost() * 1000;
    const pg_description = `Покупка на сайте Framezone. Оплата за: ${cartItems
      .map((item) => `${item.name} (${item.quantity})`)
      .join(", ")}`;

    function generateSignature() {
      const signatureString = [
        "payment.php",
        pg_amount,
        pg_description,
        pg_merchant_id,
        pg_order_id,
        pg_salt,
        secret_key,
      ].join(";");
      return CryptoJS.MD5(signatureString).toString();
    }

    const pg_sig = generateSignature();

    const url = `https://api.freedompay.money/payment.php?pg_order_id=${pg_order_id}&pg_merchant_id=${pg_merchant_id}&pg_amount=${pg_amount}&pg_description=${pg_description}&pg_salt=${pg_salt}&pg_sig=${pg_sig}`;

    return { url, pg_order_id };
  }

  async function handleClick() {
    const { url, pg_order_id } = await initPayment();

    handleOrderCreated();

    window.location.href = url;
    setShowPayButton(false);
  }

  return (
    <div>
      {showPayButton && (
        <button
          disabled={showSpinner}
          onClick={handleClick}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Pay
        </button>
      )}

      {!showPayButton && (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
          role="alert"
        >
          <span className="font-medium">
            <ClipLoader /> Please wait for FreedomPay to proceed
          </span>
        </div>
      )}
    </div>
  );
};

export default FreedomPayPayment;
