import React from "react";
import Head from "next/head";
import Layout from "../app/layout";
import { FaFileAlt } from "react-icons/fa";
import Image from "next/image.js";
const Payment = () => {
  return (
    <Layout>
      <Head>
        <title>Amir Ibraimov</title>
        <meta
          name="description"
          content="Товары для геймеров в Казахстане. Магазин электроники в Казахстане. Купить игровую мышь в Казахстане, купить монитор в Казахстане, купить клавиатуру в Казахстане, купить Монитор в Казахстане."
        />
      </Head>

      <div className="bg-white min-h-screen w-full mx-auto" translate="no">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold py-6 text-center text-black">
            Delivery and Payment
          </h1>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/2 px-4 mb-8">
              <div className="bg-white shadow-lg rounded-lg px-6 py-6">
                <h1 className="text-3xl font-bold py-6 text-center text-black">
                  Payment
                </h1>

                <p className="text-gray-700 text-lg mb-6">
                  For your convenience we are using FreedomPay. It allows you to
                  pay using VISA and MasterCard.
                </p>
                <div className="flex flex-col md:flex-row md:items-center md:justify-center">
                  <Image
                    src="/assets/freedompay.png" // Replace with the actual image source
                    alt="Payment Options"
                    className="w-48 h-auto md:w-64 md:h-auto mx-auto"
                    height={150}
                    width={150}
                  />
                  <Image
                    src="/assets/visa_mastercard.png" // Replace with the actual image source
                    alt="Payment Options"
                    className="w-32 h-auto md:w-64 md:h-auto mx-auto"
                    height={150}
                    width={150}
                  />
                </div>

                <p className="text-gray-700 text-lg mb-6">
                  When paying online, we ensure confidentiality and payment
                  security. We use the most modern verification methods,
                  encryption and data transmission over secure communication
                  channels.
                </p>

                <p className="text-gray-700 text-lg mb-6">
                  To enter your bank card details, go to the secure FreedomPay
                  payment page. You will need to enter your card number, owner's
                  name, expiration date and three-digit security code (CVV2 for
                  VISA or CVC2 for MasterCard). All necessary information is
                  provided on the map itself.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-8">
              <div className="bg-white shadow-lg rounded-lg px-6 py-6">
                <h1 className="text-3xl font-bold text-center text-black mb-8 pt-12">
                  Delivery
                </h1>

                <p className="text-gray-700 text-lg mb-4">
                  Delivery across Republic of Kazakhstan is free of charge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
