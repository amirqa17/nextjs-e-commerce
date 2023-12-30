import Layout from "@/app/layout";
import Link from "next/link";
import React from "react";
import Head from "next/head";
import { RiArchiveDrawerLine } from "react-icons/ri";
import Items from "../app/components/ShoppingList";
import ShoppingList from "../app/components/ShoppingList";

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
      <div className="bg-white pb-6 sm:pb-12 lg:pb-12">
        <div className="mx-auto w-center px-4 md:px-8 text-black">
          <ShoppingList />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
