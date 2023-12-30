// src/utils/formatPrice.js
export const formatPrice = (price) => {
  const formattedPrice = parseFloat(price) * 1000;
  return `₸${formattedPrice.toLocaleString("en-US")}`;
};
