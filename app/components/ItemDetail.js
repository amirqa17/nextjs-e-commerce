import React, { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { shoppingItemsRef } from "../../itemsfirebase";
import Layout from "../layout";
import { CartContext } from "../../context/CartContext";
import Review from "./Review";
import Head from "next/head";
import Image from "next/image";
import { RiseLoader } from "react-spinners";
import { toast } from "react-toastify";

const ItemDetail = () => {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();
  const { slug } = router.query;

  const [item, setItem] = useState(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (slug) {
      // Fetch the item with the specified slug from Firestore
      const fetchItem = async () => {
        try {
          const querySnapshot = await shoppingItemsRef
            .where("slug", "==", slug)
            .get();

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            setItem(doc.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching item:", error);
        }
      };
      fetchItem();
    }
  }, [slug]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (item) {
      addToCart(item);
      console.log("Toast should be displayed here");
      toast.success(` ${item.name} добавлен в корзину`);
    }
  };

  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RiseLoader color="pink" />
        <span className="ml-2 text-xl text-gray-900 font-semibold">
          Loading items
        </span>
      </div>
    );
  }

  const selectedImageSrc =
    item.imagesItem && item.imagesItem[selectedImageIndex];

  return (
    <>
      <Head>
        <title>
          {item.name}　{item.category} - Amir Ibraimov
        </title>
        <meta name="description" content={item.description} />
      </Head>

      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex flex-wrap">
          <h2 className="font-bold text-2xl mb-4 text-black mx-auto">
            {item.name}
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row px-12">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative">
                <Image
                  src={selectedImageSrc}
                  alt={item.name}
                  height={200}
                  width={200}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setIsImageZoomed(!isImageZoomed)}
                />
              </div>
              <div className="md:w-1/2 p-4">
                <div className="flex flex-wrap">
                  {item.imagesItem &&
                    item.imagesItem.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={item.name}
                        height={200}
                        width={200}
                        className={`w-20 h-20 object-cover mx-1 my-1 cursor-pointer border ${
                          selectedImageIndex === index
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      />
                    ))}
                </div>
                {/* Keep the rest of your content (title, description, price, button, etc.) */}
              </div>
              {isImageZoomed && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                  onClick={() => setIsImageZoomed(false)}
                >
                  <div className="max-w-3xl mx-auto">
                    <button
                      className="absolute right-0 top-0 m-4 text-white text-2xl font-bold"
                      onClick={() => setIsImageZoomed(false)}
                    >
                      &times;
                    </button>
                    <Image
                      src={item.imagesItem[selectedImageIndex]}
                      alt={item.name}
                      height={200}
                      width={200}
                      className="max-h-screen mx-auto"
                      style={{ filter: "none" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Rest of your item details rendering */}
          </div>

          <div className="p-4 text-black">
            <p className="font-bold"> Category: </p> {item.category}
            <p className="font-bold"> Included: </p> {item.complect}
            <p className="font-bold"> Description:</p>
            <p className="text-gray-700 text-base mb-4">{item.description}</p>
            <div className="flex flex-wrap justify-between items-center">
              <p className="text-black text-lg font-bold mb-4">
                {item.content}
              </p>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              <p className="text-green-500 text-lg font-bold mb-4">
                Price: {item.price} KZT
                <button
                  className="bg-pink-500 mx-auto hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 active:scale-90 flex items-center space-x-2 flex-shrink-0"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </p>
            </div>
            <hr className="border-t-2 border-gray-400 my-8 mx-auto" />
          </div>
        </div>

        <Review shoppingItem={item} productSlug={item.slug} />

        <div className="bg-white rounded-lg shadow-lg overflow-hidden my-4">
          <div className="flex flex-col items-center">
            {item.images &&
              item.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={item.name}
                  height={800}
                  width={600}
                  className="w-full cursor-pointer"
                  style={{
                    filter:
                      isImageZoomed && selectedImageIndex === index
                        ? "brightness(50%)"
                        : "none",
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
