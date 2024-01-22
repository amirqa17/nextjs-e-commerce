import React, { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { db } from "../../../firebase";


export const ItemReviewAverage = ({ productSlug }) => {
    const [averageRating, setAverageRating] = useState(0);
  
    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
              const querySnapshot = await db
                .collection("product_reviews")
                .where("product_slug", "==", productSlug)
                .get();
          
              if (!querySnapshot.empty) {
                const totalRating = querySnapshot.docs.reduce(
                  (acc, review) => {
                    const rating = review.data().rating;
                    console.log(`Review ID: ${review.id}, Rating: ${rating}`);
                    return acc + Number(rating);  // Convert the rating to a number
                  },
                  0
                );
          
                const average = totalRating / querySnapshot.docs.length;
          
                console.log(`Total Rating: ${totalRating}`);
                console.log(`Number of Reviews: ${querySnapshot.docs.length}`);
                console.log(`Calculated Average: ${average}`);
          
                setAverageRating(average);
              }
            } catch (error) {
              console.error("Error fetching average rating:", error);
            }
          };
        fetchAverageRating();
      }, [productSlug]);
    return (
      <div className="flex items-center space-x-1 cursor-pointer">
      <StarRating
        rating={averageRating}
        onRatingChange={null} // Pass null to make stars unclickable
      />
      <span className="ml-2 text-sm text-gray-500">
        {averageRating.toFixed(1)}
      </span>
    </div>
    );
  };


const StarRating = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleStarClick = (selectedRating) => {
    onRatingChange(selectedRating);
  };

  const handleStarHover = (hoveredRating) => {
    setHoveredRating(hoveredRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(null);
  };

  const renderStar = (index) => {
    const isSelected = index <= rating;
    const isHovered = index <= hoveredRating;

    if (isSelected) {
      return <FaStar key={index} className="text-yellow-500" />;
    } else if (isHovered) {
      return <FaStarHalfAlt key={index} className="text-yellow-500" />;
    } else {
      return <FaStar key={index} className="text-gray-300" />;
    }
  };

  return (
    <div className="flex items-center space-x-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => handleStarHover(index)}
          onMouseLeave={handleStarLeave}
        >
          {renderStar(index)}
        </div>
      ))}
    </div>
  );
};

export default StarRating;

