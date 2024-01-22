import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { FaReadme, FaPen } from "react-icons/fa";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import AddReview from "./addReview";
const Review = ({ shoppingItem, productSlug }) => {
  const [showModal, setShowModal] = useState(false);
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handleAddReview = () => {
    setShowModal(true);
    setIsReviewVisible(false); // Close the review section when opening the modal
  };

  const closeModal = () => {
    console.log("Closing modal");
    setShowModal(false);

    // Do other things if needed
  };

  const renderStarRating = (score) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 !== 0;

    // Array to store star components
    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }

    // Add half star if necessary
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }

    // Fill the remaining space with empty stars
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return <div className="flex items-center space-x-1">{stars}</div>;
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
        <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-4">
          <button
            className="bg-pink-500 text-white px-6 py-2 rounded flex items-center"
            onClick={() => setIsReviewVisible(!isReviewVisible)}
          >
            <FaReadme className="mr-2" />
            <span>Show reviews of this item ({reviews.length} reviews)　</span>
          </button>
        
          <button
            onClick={handleAddReview}
            className="bg-pink-500 text-white px-6 py-2 rounded flex items-center"
          >
            <FaPen className="mr-2" />
            <span>Leave your review</span>
          </button>
        </div>
       {/* Modal for AddReview */}
       {showModal && (
          <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
           <div className="bg-white rounded-lg p-8 w-full md:w-1/3">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">Leave Your Review</h2>
              <AddReview
  shoppingItem={shoppingItem}
  productSlug={productSlug}
  onReviewAdded={closeModal}
/>
            </div>
          </div>
        )}
        <div
          className={`bg-white shadow-lg px-4 py-4 rounded  transition-colors duration-200 ease-in-out ${
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
                      className="flex flex-col border-2 rounded-lg p-6 shadow-md my-6  text-black"
                      key={review.email}
                    >
                      <h2 className="text-lg font-medium mb-2">
                        {review.review_title}
                      </h2>
                      <div className="flex items-center mb-4">
                        <h3 className="font-medium mr-2">
                          User: {review.username}
                        </h3>
                      </div>
                      <div className="flex items-center mb-4"></div>
                      <div className="flex items-center mb-4">
                        <h3 className="font-medium mr-2">
                          {renderStarRating(review.rating)}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">
                        {review.review_text}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-2">
                          Review completed{" "}
                          {new Date(
                            review.createdAt.seconds * 1000
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

     
    </>
  );
};

export default Review;
