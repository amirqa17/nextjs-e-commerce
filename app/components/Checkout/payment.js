import React, { useState } from "react";
import { formatPrice } from "../../../context/formatPrice";
import FreedomPayPayment from "./freedompay";

function Payment({ onPrevious, formData, cartItems, getTotalCost }) {
  const [orderId] = useState(generateOrderId());

  function generateOrderId() {
    const NUMBERS = "0123456789";
    let orderId = "";
    for (let i = 0; i < 5; i++) {
      orderId += NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length));
    }
    return orderId;
  }

  function handleOrderCreated() {
    const orderData = {
      orderId: orderId,
      user: {
        name: formData.name,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        phone: formData.phone,
      },
      cartItems: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalCost: getTotalCost(),
      isPaid: false,
    };

    // Send order data to Sendinblue SMTP API endpoint
    fetch("https://api.sendinblue.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "",
      },
      body: JSON.stringify({
        sender: {
          name: "Your Company Name",
          email: "noreply@yourcompany.com",
        },
        to: [
          {
            email: "ibraimov.amir1996@gmail.com",
          },
        ],
        subject: `Поступил заказ № ${orderData.orderId}`,
        htmlContent: `
        <html>
          <head>
            <style>
              /* CSS styles for the email */
              body {
                font-family: Arial, sans-serif;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              h2 {
                color: #333;
              }
              ul {
                list-style-type: none;
                padding: 0;
              }
              li {
                margin-bottom: 10px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Заказ № ${orderData.orderId}</h2>
              <ul>
                <li>ФИО: ${orderData.user.name} ${orderData.user.lastName}</li>
                <li>Адрес доставки: ${orderData.user.address}, ${
                  orderData.user.city
                }, ${orderData.user.state} ${orderData.user.zip}</li>
                <li>Телефон: ${orderData.user.phone}</li>
                <li>Товары:</li>
                <ul>
                  ${orderData.cartItems
                    .map(
                      (item) => `
                        <li>${item.name} x ${item.quantity} = ${(
                          item.price * item.quantity
                        ).toLocaleString("ru-RU", {
                          style: "currency",
                          currency: "KZT",
                        })}</li>
                      `,
                    )
                    .join("")}
                </ul>
                <li>Общая сумма: ${orderData.totalCost.toLocaleString("ru-RU", {
                  style: "currency",
                  currency: "KZT",
                })}</li>
              </ul>
            </div>
          </body>
        </html>
        `,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          console.log("Order created successfully!");
        } else {
          console.error("Error creating order:", response.statusText);
        }
      })
      .catch(function (error) {
        console.error("Error creating order:", error);
      });
  }

  function handleOrderPaid() {
    const orderData = {
      orderId: orderId,
      user: {
        name: formData.name,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        phone: formData.phone,
      },
      cartItems: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalCost: getTotalCost(),
      isPaid: false,
    };

    // Send order data to Sendinblue SMTP API endpoint
    fetch("https://api.sendinblue.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.NEXT_PUBLIC_REACT_APP_EMAIL_ENV,
      },
      body: JSON.stringify({
        sender: {
          name: "Your Company Name",
          email: "noreply@yourcompany.com",
        },
        to: [
          {
            email: "uwuhm3250@gmail.com",
          },
        ],
        subject: `Заказ №${orderData.orderId} Оплачен`,
        htmlContent: `
     
          <p>Заказ №${orderData.orderId} успешно оплачен.</p>
          <ul>
            <li>Имя: ${orderData.user.name} ${orderData.user.lastName}</li>
            <li>Адрес доставки: ${orderData.user.address}, ${
              orderData.user.city
            }, ${orderData.user.state} ${orderData.user.zip}</li>
            <li>Телефон: ${orderData.user.phone}</li>
            <li>Товары:</li>
            <ul>
              ${orderData.cartItems
                .map(
                  (item) =>
                    `<li>${item.name} x ${item.quantity} = ${
                      item.price * item.quantity
                    }</li>`,
                )
                .join("")}
            </ul>
            <li>Общая сумма: ${orderData.totalCost}</li>
          </ul>
        `,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          console.log("Order created successfully!");
        } else {
          console.error("Error creating order:", response.statusText);
        }
      })
      .catch(function (error) {
        console.error("Error creating order:", error);
      });
  }
  return (
    <div className="flex flex-col">
      <div className="bg-white w-full mx-auto max-w-md rounded-md shadow-md p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-medium">Payment</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onPrevious}
          >
            Change delivery address
          </button>
        </div>

        <div className="mb-8">
          <p className="text-black font-medium mb-2">Delivery information:</p>
          <p className="mb-1">
            {formData.name} {formData.lastName}
          </p>
          <p className="mb-1">{formData.address}</p>
          <p className="mb-1">
            {formData.city}, {formData.state} {formData.zip}
          </p>
          <p className="mb-1">{formData.phone}</p>
        </div>

        <p className="text-black font-medium mb-2">Order number {orderId}</p>

        <div className="mb-8">
          <p className="text-b font-medium mb-2">Your items:</p>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <p>
                {item.name} x {item.quantity} items
              </p>
              <p>{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <p className="text-gray-700 font-medium mb-2">Total:</p>
          <p className="text-2xl font-bold">{formatPrice(getTotalCost())}</p>
        </div>
        <div
          class="flex p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50"
          role="alert"
        >
          <svg
            aria-hidden="true"
            class="flex-shrink-0 inline w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">
              Make sure your information is correct.
            </span>{" "}
            Please make sure that all fields are filled correctly.
          </div>
        </div>
        <div className="flex items-center justify-center">
          <FreedomPayPayment
            orderId={orderId}
            onPaymentSuccess={() => {}}
            onOrderCreated={handleOrderCreated}
            onOrderPaid={handleOrderPaid}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="text-sm text-center ext-gray-500 mt-2 px-4">
          By pressing "Pay" button, you agree to our
          <a
            href="../assets/policy.pdf"
            target="_blank"
            className="text-blue-500 underline hover:text-blue-700"
          >
            {" "}
            Privacy Policy
          </a>{" "}
          и{" "}
          <a
            href="../assets/agreement.pdf"
            target="_blank"
            className="text-blue-500 underline hover:text-blue-700"
          >
            and Public Agreement
          </a>{" "}
          of our platform.
        </div>
      </div>
    </div>
  );
}

export default Payment;
