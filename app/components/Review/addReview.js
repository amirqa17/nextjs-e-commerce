import { useState } from "react";
import { db } from "../../../firebase";
import "firebase/firestore";
import firebase from "firebase/compat/app";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";


const StarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (selectedRating) => {
    onRatingChange(selectedRating);
  };

  const handleHover = (selectedRating) => {
    setHoverRating(selectedRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const renderStar = (i) => {
    if (i <= (hoverRating || rating)) {
      return (
        <FaStar
          key={i}
          className="text-yellow-500"
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleHover(i)}
          onMouseLeave={handleMouseLeave}
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      return (
        <FaStarHalfAlt
          key={i}
          className="text-yellow-500"
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleHover(i)}
          onMouseLeave={handleMouseLeave}
        />
      );
    } else {
      return (
        <FaStar
          key={i}
          className="text-gray-300"
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleHover(i)}
          onMouseLeave={handleMouseLeave}
        />
      );
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((i) => renderStar(i))}
    </div>
  );
};

const AddReview = ({ shoppingItem, onReviewAdded }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    rating: 3,
    reviewText: "",
    reviewTitle: "",
  });

  const formFields = [
    { label: "Username", type: "text", name: "username" },
    { label: "E-mail", type: "email", name: "email" },
    { label: "Phone", type: "text", name: "phone" },
    { label: "Title", type: "text", name: "reviewTitle" },
    { label: "Review content", type: "textarea", name: "reviewText" },
    { label: "Product score (Choose 1 to 5)", type: "rating", name: "rating" },
  ];

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const review = {
      email: formData.email,
      phone: formData.phone,
      product_slug: shoppingItem.slug,
      rating: formData.rating,
      review_text: formData.reviewText,
      review_title: formData.reviewTitle,
      username: formData.username,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    };

    try {
      await db.collection("product_reviews").add(review);
      console.log("Review added successfully");
      onReviewAdded();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="">
      {formFields.map((field) => (
        <div key={field.name} className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor={`grid-${field.name}`}
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id={`grid-${field.name}`}
              />
            ) : field.type === "rating" ? (
              <div className="mb-4">
                <StarRating
                  rating={formData.rating}
                  onRatingChange={(rating) => handleChange("rating", rating)}
                />
              </div>
            ) : (
              <input
                type={field.type}
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id={`grid-${field.name}`}
              />
            )}
          </div>
        </div>
      ))}
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full px-3">
          <button
            onClick={handleSubmit}
            className="bg-pink-500 text-white px-4 py-2 rounded"
          >
            Leave Review
          </button>
          <button
            onClick={onReviewAdded}
            className="bg-pink-500 text-white px-4 py-2 rounded ml-4"
          >
            Close
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddReview;
