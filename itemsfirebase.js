import { db } from "./firebase";

export const shoppingItemsRef = db.collection("items");
export let shoppingItems = [];

// Retrieve items from Firebase and update shoppingItems array
shoppingItemsRef.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    shoppingItems.push(item);
  });
});

// Function to fetch items asynchronously
export const fetchShoppingItems = async () => {
  const querySnapshot = await shoppingItemsRef.get();
  shoppingItems = querySnapshot.docs.map((doc) => {
    const item = doc.data();
    item.id = doc.id;
    return item;
  });
};

// Fetch items when the app initializes
fetchShoppingItems();
