import React, { useState, useContext } from "react";

import CartItems from "./CartItems";

import { CartContext } from "../../context/CartContext";

import Payment from "./payment";
function Checkout() {
  const { cartItems, getTotalCost } = useContext(CartContext);
  const [currentStep, setCurrentStep] = useState("delivery");
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  function handleNext() {
    switch (currentStep) {
      case "delivery":
        setCurrentStep("payment");
        break;
      case "payment":
        // handle submission or confirmation here
        break;
      default:
        break;
    }
  }

  function handlePrevious() {
    switch (currentStep) {
      case "payment":
        setCurrentStep("delivery");
        break;
      default:
        break;
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  return (
    <div className="container mx-auto w-full py-8 px-8 text-black">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Order</h1>
      </div>
      <div className="flex justify-center items-center mb-8">
        <div className="w-full max-w-lg">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: currentStep === "payment" ? "100%" : "50%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-300"
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <div>Delivery Information</div>
              <div>Payment</div>
            </div>
          </div>
        </div>
      </div>
      {currentStep === "delivery" && (
        <DeliveryInfo
          onNext={handleNext}
          onDeliveryInputChange={handleChange}
          formData={formData}
        />
      )}
      {currentStep === "payment" && (
        <Payment
          onPrevious={handlePrevious}
          formData={formData}
          cartItems={cartItems}
          getTotalCost={getTotalCost}
        />
      )}
    </div>
  );
}

function DeliveryInfo({ onNext, onDeliveryInputChange, formData }) {
  function allFieldsFilled() {
    const fields = ["name", "lastName", "city", "address", "phone", "zip"];
    return fields.every((field) => formData[field].length > 0);
  }

  return (
    <div className="justify-center items-center">
      <div class="container mx-auto">
        <div class="flex justify-center px-6 my-12">
          <div class="w-full xl:w-3/4 lg:w-11/12 flex">
            <div class="w-full h-auto  hidden lg:block lg:w-4/12 bg-cover rounded-l-lg">
              <CartItems />
            </div>

            <div class="w-full lg:w-7/12 bg-white  rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center text-black">
                <span className="text-2xl align-middle mr-2"></span>
                Delivery information
              </h3>
              <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div class="mb-4">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="firstname"
                  >
                    First Name
                  </label>
                  <input
                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstname"
                    type="text"
                    placeholder="Receiver's firstname"
                    name="name"
                    value={formData.name}
                    onChange={onDeliveryInputChange}
                    required
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="text"
                    placeholder="Receiver's lastname"
                    name="lastName"
                    value={formData.lastName}
                    onChange={onDeliveryInputChange}
                    required
                  />
                </div>

                <div class="mb-4">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="city"
                  >
                    City
                  </label>
                  <input
                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="city"
                    type="text"
                    placeholder="Enter city of delivery"
                    name="city"
                    value={formData.city}
                    onChange={onDeliveryInputChange}
                    required
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="address"
                  >
                    Delivery Address
                  </label>
                  <input
                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="address"
                    type="text"
                    placeholder="Full address of delivery"
                    name="address"
                    value={formData.address}
                    onChange={onDeliveryInputChange}
                    required
                  />
                </div>

                <div class="mb-4">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="phoneNumber"
                  >
                    Phone number
                  </label>
                  <input
                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="phoneNumber"
                    type="text"
                    placeholder="Receiver's phonenumber"
                    name="phone"
                    value={formData.phone}
                    onChange={onDeliveryInputChange}
                    required
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="zip"
                  >
                    ZIP Code
                  </label>
                  <input
                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="zip"
                    type="text"
                    placeholder="ZIP code"
                    name="zip"
                    value={formData.zip}
                    onChange={onDeliveryInputChange}
                    required
                  />
                </div>

                <div class="mb-6 text-center">
                  <button
                    disabled={!allFieldsFilled()} // disable the button if not all fields are filled
                    onClick={() => {
                      if (allFieldsFilled()) {
                        // Add your logic here for when all fields are filled
                        onNext(formData);
                      }
                    }}
                    className={`w-32 mx-auto ${
                      allFieldsFilled()
                        ? "bg-pink-500 hover:bg-pink-300"
                        : "bg-pink-200 cursor-not-allowed"
                    } text-white rounded-md py-2`}
                  >
                    Next
                  </button>
                </div>
                <hr class="mb-6 border-t" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
