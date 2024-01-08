import React from "react";
import { useEffect, useState} from "react";
import ShoppingItem from "./Item";
import { RiseLoader } from "react-spinners";
import { shoppingItemsRef } from "../../../itemsfirebase";

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

  const sortElements = [
    { title: "All items", category: null },
    { title: "Mouse", category: "mouse" },
    { title: "Keyboard", category: "keyboard" },
    { title: "Gamepad", category: "gamepad" },
    { title: "Headset", category: "headset" },
    { title: "Mousepad", category: "mousepad" },
    { title: "Monitor", category: "monitor" },
  ];

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
        setRandomizedItems(shuffleArray(items));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
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
       <div className="flex flex-wrap lg:w-full mx-auto justify-center bg-gray-100">
        <div className="sub-navbar px-8 bg-gray-600  lg:w-full">
        
        <section className="sub-navbar xl:bg-gray-600 pt-4 pb-4 lg:w-full space-x-2 md:space-x-14 flex flex-wrap justify-center">
  {sortElements.map((element) => (
    <button
      key={element.title}
      onClick={() => handleSort(element.category)}
      type="button"
      className={`mb-2 md:mb-0 inline-block font-medium rounded-full py-2 px-4 transition-colors duration-200 ease-in-out ${
        sortType === element.category
          ? "bg-pink-500 text-white shadow-md hover:bg-pink-600"
          : "bg-white text-gray-800 shadow-sm hover:bg-pink-100 hover:text-pink-500"
      }`}
    >
      {element.title}
    </button>
  ))}
</section>
          </div>
          {filteredItems.map((item) => (
            <ShoppingItem key={item.id} item={item} />
          ))}
        </div>
  

      <section className="flex justify-center items-center py-4 mx-auto ">
        <p className="text-gray-600 text-sm md:text-lg mx-auto ">
          <span className="font-bold">{filteredItems.length}</span> items found
        </p>
      </section>
    </>
  );
}

export default ShoppingList;