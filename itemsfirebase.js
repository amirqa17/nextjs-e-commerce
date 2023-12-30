import { db } from "./firebase";

export const shoppingItemsRef = db.collection("items");
export const shoppingItems = [];

// Retrieve items from Firebase and update shoppingItems array
shoppingItemsRef.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    shoppingItems.push(item);
  });
});
