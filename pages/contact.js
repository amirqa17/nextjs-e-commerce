import React from "react";
import Cart from "../app/components/Cart.js";
import Layout from "../app/layout";
import Head from "next/head.js";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
const Contact = () => {
  return (
    <Layout>
      <Head>
        <title>Amir Ibraimov</title>
        <meta
          name="description"
          content="Товары для геймеров в Казахстане. Магазин электроники в Казахстане. Купить игровую мышь в Казахстане, купить монитор в Казахстане, купить клавиатуру в Казахстане, купить Монитор в Казахстане."
        />
      </Head>
      <div className="bg-white min-h-screen lg:w-1/2 w-full mx-auto">
        <h1 className="text-3xl font-bold py-6 text-center text-black">
          Contact information
        </h1>
        <div className="mx-auto">
          <div className="flex flex-col items-center justify-center">
            <div className="md:w-max-w-lg lg:w-6/12 bg-white shadow-lg rounded-lg px-12 py-12 mb-96">
              <div className="flex items-center mb-6">
                <p className="text-gray-700 text-lg">
                  You can contact us regarding any questions.
                </p>
              </div>
              <div className="flex items-center mb-6">
                <FaPhoneAlt className="text-xl text-gray-700 mr-4" />
                <p className="text-gray-700 text-lg">
                  Phone number: +81 (3137) 31371220
                </p>
              </div>

              <div className="flex items-center mb-6">
                <FaEnvelope className="text-xl text-gray-700 mr-4" />
                <p className="text-gray-700 text-lg">
                  Email: ibraimov.amir1996@gmail.com
                </p>
              </div>

              <div className="flex items-center mb-6">
                <FaMapMarkerAlt className="text-xl text-gray-700 mr-4" />
                <p className="text-gray-700 text-lg">
                  Address: Japan, Chiba Prefecture, Matsudo city.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
