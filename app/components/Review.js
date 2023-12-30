import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { FaReadme, FaPen } from "react-icons/fa";
import firebase from "firebase/compat/app";

const Review = ({ shoppingItem, productSlug }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(3);
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleSubmit = async (event) => {
    event.preventDefault();

    toast.success("Благодарим за отзыв!");
    setShowModal(false);

    const review = {
      email,
      phone,
      product_slug: shoppingItem.slug,
      rating,
      review_text: reviewText,
      review_title: reviewTitle,
      username,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    };

    try {
      await db.collection("product_reviews").add(review);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const querySnapshot = await db
          .collection("product_reviews")
          .where("product_slug", "==", productSlug) // Use productSlug
          .get();

        const reviews = querySnapshot.docs.map((doc) => doc.data());
        setReviews(reviews);
      } catch (error) {
        console.error(error);
      }
    };

    if (productSlug) {
      fetchReviews();
    }
  }, [productSlug]);

  return (
    <>
      <div>
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 sm:space-y-0 space-y-4">
          <button
            className="bg-pink-500 text-white px-6 py-2 rounded flex items-center"
            onClick={() => setIsReviewVisible(!isReviewVisible)}
          >
            <FaReadme className="mr-2" />
            <span>Show reviews of this item ({reviews.length} reviews)　</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-pink-500 text-white px-6 py-2 rounded flex items-center"
          >
            <FaPen className="mr-2" />
            <span>Leave your review</span>
          </button>
        </div>

        <div
          className={`bg-white shadow-lg px-4 py-4 rounded hover:bg-gray-200 transition-colors duration-200 ease-in-out ${
            isReviewVisible ? "bg-gray-300" : "bg-gray-200"
          }`}
        >
          {isReviewVisible && (
            <div className="mt-6">
              <h1 className="text-xl font-bold mb-4 text-black">
                Reviews of {shoppingItem.name}
              </h1>
              {reviews.length > 0 ? (
                reviews
                  .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
                  .map((review) => (
                    <div
                      className="flex flex-col bg-white rounded-lg p-6 shadow-md my-6  text-black"
                      key={review.email}
                    >
                      <h2 className="text-lg font-medium mb-2">
                        {review.review_title}
                      </h2>
                      <div className="flex items-center mb-4">
                        <h3 className="font-medium mr-2">
                          Name: {review.username}
                        </h3>
                      </div>
                      <div className="flex items-center mb-4"></div>
                      <div className="flex items-center mb-4">
                        <h3 className="font-medium mr-2">
                          Product score: {review.rating} из 5
                        </h3>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">
                        {review.review_text}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-2">
                          Review completed{" "}
                          {new Date(
                            review.createdAt.seconds * 1000,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-lg font-medium mb-2 mx-auto text-black">
                  No reviews yet.
                </div>
              )}

              <div className="mt-4">
                {page > 1 && (
                  <button
                    className="text-sm font-medium text-pink-500 hover:underline mr-4"
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>
                )}
                {page < totalPages && (
                  <button
                    className="text-sm font-medium text-pink-500 hover:underline"
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white lg:w-1/2 rounded-lg p-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 7.293a1 1 0 00-1.414 0L10 8.586 8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <form onSubmit={handleSubmit} className="my-6 text-black">
              <div className="mb-4 ">
                <label className="block mb-1">Имя</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Телефон</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Заголовок</label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  required
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">
                  Product score (Choose 1 to 5)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>

              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded"
              >
                Leave Review
              </button>
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
