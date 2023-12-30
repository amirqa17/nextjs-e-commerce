import React, { useState, useEffect } from "react";
import ShoppingItem from "./ShoppingItem";
import { shoppingItems } from "../../itemsfirebase";
import { RiseLoader } from "react-spinners";

import { shoppingItemsRef } from "../../itemsfirebase";

function shuffleArray(array) {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function ShoppingList() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [sortType, setSortType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [randomizedItems, setRandomizedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await shoppingItemsRef.get();
        const items = [];

        querySnapshot.forEach((doc) => {
          const item = doc.data();
          item.id = doc.id;
          items.push(item);
        });

        // Shuffle items and set the state
        setRandomizedItems(shuffleArray(items));
        setLoading(false); // Mark data loading as complete
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Mark data loading as complete even on error
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // The empty dependency array ensures this effect runs once on mount

  const handleSort = (type) => {
    setSortType(type);
  };

  const selectedClass = "bg-gray-800 text-white";

  const filteredItems = randomizedItems.filter((item) => {
    return !sortType || item.type === sortType;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RiseLoader color="pink" />
        <span className="ml-2 text-xl text-gray-900 font-semibold">
          Loading items
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center py-4 mx-auto ">
        <p className="text-gray-600 text-sm md:text-lg mx-auto">
          {" "}
          <span className="font-bold">{filteredItems.length}</span> items found
        </p>
      </div>

      <div className="flex flex-wrap lg:w-full mx-auto  justify-center bg-gray-100">
        <div className="sub-navbar px-8 bg-gray-100 pt-4 pb-4 lg:w-full">
          <div className="flex flex-col items-center md:flex-row md:justify-center">
            <button
              onClick={() => handleSort(null)}
              type="button"
              className={`mb-2 md:mb-0 inline-block font-medium rounded-full py-2 px-4 mx-2 transition-colors duration-200 ease-in-out ${
                sortType === null
                  ? "bg-pink-500 text-white shadow-md hover:bg-pink-600"
                  : "bg-white text-gray-800 shadow-sm hover:bg-pink-100 hover:text-pink-500"
              }`}
            >
              All items
            </button>

            <button
              onClick={() => handleSort("mouse")}
              type="button"
              className={`mb-2 md:mb-0 inline-block font-medium rounded-full py-2 px-4 mx-2 transition-colors duration-200 ease-in-out ${
                sortType === "mouse"
                  ? "bg-pink-500 text-white shadow-md hover:bg-pink-600"
                  : "bg-white text-gray-800 shadow-sm hover:bg-pink-100 hover:text-pink-500"
              }`}
            >
              Mouse
            </button>

            <button
              onClick={() => handleSort("keyboard")}
              type="button"
              className={`mb-2 md:mb-0 inline-block font-medium rounded-full py-2 px-4 mx-2 transition-colors duration-200 ease-in-out ${
                sortType === "keyboard"
                  ? "bg-pink-500 text-white shadow-md hover:bg-pink-600"
                  : "bg-white text-gray-800 shadow-sm hover:bg-pink-100 hover:text-pink-500"
              }`}
            >
              Keyboard
            </button>

            <button
              onClick={() => handleSort("gamepad")}
              type="button"
              className={`mb-2 md:mb-0 inline-block font-medium rounded-full py-2 px-4 mx-2 transition-colors duration-200 ease-in-out ${
                sortType === "gamepad"
                  ? "bg-pink-500 text-white shadow-md hover:bg-pink-600"
                  : "bg-white text-gray-800 shadow-sm hover:bg-pink-100 hover:text-pink-500"
              }`}
            >
              Gamepad
            </button>

            <button
              onClick={() => handleSort("headset")}
              type="button"
              className={`mb-2 md:mb-0 inline-block font-medium rounded-full py-2 px-4 mx-2 transition-colors duration-200 ease-in-out ${
                sortType === "headset"
                  ? "bg-pink-500 text-white shadow-md hover:bg-pink-600"
                  : "bg-white text-gray-800 shadow-sm hover:bg-pink-100 hover:text-pink-500"
              }`}
            >
              Headset
            </button>

            <button
              onClick={() => handleSort("mousepad")}
              type="button"
              className={`mb-2 md:mb-0 inline-block font-medium rounded-full py-2 px-4 mx-2 transition-colors duration-200 ease-in-out ${
                sortType === "mousepad"
                  ? "bg-pink-500 text-white shadow-md hover:bg-pink-600"
                  : "bg-white text-gray-800 shadow-sm hover:bg-pink-100 hover:text-pink-500"
              }`}
            >
              Mousepad
            </button>

            <button
              onClick={() => handleSort("monitor")}
              type="button"
              className={`mb-2 md:mb-0 inline-block font-medium rounded-full py-2 px-4 mx-2 transition-colors duration-200 ease-in-out ${
                sortType === "monitor"
                  ? "bg-pink-500 text-white shadow-md hover:bg-pink-600"
                  : "bg-white text-gray-800 shadow-sm hover:bg-pink-100 hover:text-pink-500"
              }`}
            >
              Monitor
            </button>
          </div>
        </div>
        {filteredItems.map((item) => (
          <ShoppingItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export default ShoppingList;
