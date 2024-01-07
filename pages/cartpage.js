import React from "react";
import Cart from "../app/components/Cart/Cart";
import Layout from "../app/layout";
import Head from "next/head.js";
const CartPage = () => {
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
        <h1 className="text-3xl font-bold py-6 text-center text-black">Cart</h1>
        <div className="mx-auto">
          <Cart />
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
