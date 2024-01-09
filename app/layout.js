import React from "react";
import Navbar from "./components/Navbar";
import "@/app/globals.css";

import { CartProvider } from "../context/CartContext";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const Layout = ({ children }) => {
  return (

    <CartProvider>
      <Head>
        <title>Framezone.kz - Товары для геймеров.</title>
        <meta
          name="description"
          content="Товары для геймеров в Казахстане. Магазин электроники в Казахстане. Купить игровую мышь в Казахстане, купить монитор в Казахстане, купить клавиатуру в Казахстане, купить Монитор в Казахстане."
        />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={3000} // Adjust the autoClose duration as needed
        />
      </div>
    </CartProvider>

  );
};

export default Layout;
