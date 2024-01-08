import Layout from "@/app/layout";
import React from "react";
import Head from "next/head";
import ShoppingList from "../app/components/Items/itemList";

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Nextjs E-Commerce</title>
        <meta
          name="description"
          content="Товары для геймеров в Казахстане. Магазин электроники в Казахстане. Купить игровую мышь в Казахстане, купить монитор в Казахстане, купить клавиатуру в Казахстане, купить Монитор в Казахстане."
        />
      </Head>

      <div className="w-full px-4 text-black">
        <ShoppingList />
      </div>
    </Layout>
  );
};

export default Home;
