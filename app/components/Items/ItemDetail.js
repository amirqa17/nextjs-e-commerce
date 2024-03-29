import React, { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { shoppingItemsRef } from "../../../itemsfirebase";
import { CartContext } from "../../../context/CartContext";
import Review from "../Review/Review";
import Head from "next/head";
import Image from "next/image";
import { RiseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { ItemReviewAverage } from "../Review/starRating";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
const ItemDetail = () => {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();
  const { slug } = router.query;
  const [averageRating, setAverageRating] = useState(0); // New state for average rating
  const [item, setItem] = useState(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (slug) {
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
          {item.name}
          {item.category} - Amir Ibraimov
        </title>
        <meta name="description" content={item.description} />
      </Head>

      <div className="lg:w-9/12 mx-auto text-black">
        <h1 className="text-3xl text-center font-bold text-slate-900 p-8">
        {item.name}
        </h1>
        <div className="border-2 border-gray-200">
        <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold text-slate-900">
      <ItemReviewAverage productSlug={item.slug} />
        </h2>
  
      </div>
          <div className="flex flex-col md:flex-row mt-4">
            <div className="flex flex-col md:flex-row mx-auto">
              <div className="mx-auto">
                <Image
                  src={selectedImageSrc}
                  alt={item.name}
                  height={300}
                  width={3000}
                  className="w-80 h-80 object-scale-down cursor-pointer border-1"
                  onClick={() => setIsImageZoomed(!isImageZoomed)}
                />
              </div>
              <div className="md:w-full">
                <div className="flex flex-wrap">
                  {item.imagesItem &&
                    item.imagesItem.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={item.name}
                        height={150}
                        width={150}
                        className={`w-20 h-20 object-cover m-2 cursor-pointer border ${
                          selectedImageIndex === index
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      />
                    ))}
                </div>

                <div className="p-4">
                  <span>
                    <h2 className="text-1xl font-bold text-slate-900">
                      Category:
                    </h2>{" "}
                    <p>{item.category}</p>
                  </span>
                  <span>
                    <h2 className="text-1xl font-bold text-slate-900">
                      Included:
                    </h2>{" "}
                    <p>{item.complect}</p>
                  </span>
                  <span>
                    <h2 className="text-1xl font-bold text-slate-900">
                      Description:
                    </h2>{" "}
                    <p>{item.description}</p>
                  </span>
                  <div className="flex flex-col items-center mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 p-8">
                      Price: {item.price}
                    </h2>

                    <button
                      className="flex items-center mx-auto rounded-md bg-pink-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-300"
                      onClick={handleAddToCart}
                      disabled={!item.available}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to cart
                    </button>
                  </div>
                </div>
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
                      height={150}
                      width={150}
                      className="max-h-screen mx-auto"
                      style={{ filter: "none" }}
                    />
                  </div>
                </div>
              )}
            </div>
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
                  height={150}
                  width={150}
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